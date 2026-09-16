package com.jobapplication.gateway.filter;

import java.io.IOException;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jobapplication.gateway.config.GatewayProperties;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Enterprise Rate Limiting Filter implementing the Token Bucket algorithm.
 *
 * <p>Protects downstream microservices from request flooding by enforcing
 * per-client rate limits. Clients are identified by IP address (respecting
 * {@code X-Forwarded-For} for load-balanced deployments).</p>
 *
 * <p>When a client exceeds the configured burst capacity, the filter
 * short-circuits the request pipeline and returns a standardised
 * {@code 429 Too Many Requests} JSON response with a {@code Retry-After} header.</p>
 *
 * <p>Rate limit metadata headers ({@code X-RateLimit-Limit},
 * {@code X-RateLimit-Remaining}) are added to every successful response
 * for client-side consumption.</p>
 */
@Slf4j
@Component
@Order(5)
@RequiredArgsConstructor
public class RateLimitingFilter extends OncePerRequestFilter {

    private final GatewayProperties gatewayProperties;
    private final ConcurrentHashMap<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        if (!gatewayProperties.getRateLimit().isEnabled()
                || request.getRequestURI().startsWith("/actuator")) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientKey = resolveClientKey(request);
        TokenBucket bucket = buckets.computeIfAbsent(clientKey, k -> new TokenBucket(
                gatewayProperties.getRateLimit().getBurstCapacity(),
                gatewayProperties.getRateLimit().getReplenishRate()
        ));

        if (!bucket.tryConsume()) {
            log.warn("Rate limit exceeded for client: {} on URI: {}", clientKey, request.getRequestURI());
            writeRateLimitResponse(request, response);
            return;
        }

        response.setHeader("X-RateLimit-Limit",
                String.valueOf(gatewayProperties.getRateLimit().getBurstCapacity()));
        response.setHeader("X-RateLimit-Remaining",
                String.valueOf(bucket.getRemainingTokens()));

        // Evict stale client buckets to prevent unbounded memory growth
        if (buckets.size() > 5_000) {
            long now = System.currentTimeMillis();
            buckets.entrySet().removeIf(e -> now - e.getValue().lastRefillTimestamp > 300_000);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveClientKey(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr() != null ? request.getRemoteAddr() : "anonymous";
    }

    private void writeRateLimitResponse(HttpServletRequest request,
                                        HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader("Retry-After", "60");

        String correlationId = MDC.get(CorrelationIdFilter.MDC_KEY);
        String json = """
                {\
                "timestamp":"%s",\
                "status":429,\
                "error":"Too Many Requests",\
                "message":"Rate limit quota exceeded. Please slow down and retry after 60 seconds.",\
                "path":"%s",\
                "correlationId":"%s"\
                }""".formatted(
                Instant.now().toString(),
                request.getRequestURI(),
                correlationId != null ? correlationId : "");

        response.getWriter().write(json);
    }

    // -----------------------------------------------------------------------
    // Token Bucket Implementation
    // -----------------------------------------------------------------------
    private static class TokenBucket {
        private final int capacity;
        private final double refillRatePerMs;
        private double availableTokens;
        private long lastRefillTimestamp;

        TokenBucket(int capacity, int refillPerMinute) {
            this.capacity = capacity;
            this.refillRatePerMs = (double) refillPerMinute / 60_000.0;
            this.availableTokens = capacity;
            this.lastRefillTimestamp = System.currentTimeMillis();
        }

        synchronized boolean tryConsume() {
            refill();
            if (availableTokens >= 1.0) {
                availableTokens -= 1.0;
                return true;
            }
            return false;
        }

        synchronized int getRemainingTokens() {
            refill();
            return (int) Math.max(0, availableTokens);
        }

        private void refill() {
            long now = System.currentTimeMillis();
            long elapsed = now - lastRefillTimestamp;
            if (elapsed > 0) {
                availableTokens = Math.min(capacity,
                        availableTokens + (elapsed * refillRatePerMs));
                lastRefillTimestamp = now;
            }
        }
    }
}
