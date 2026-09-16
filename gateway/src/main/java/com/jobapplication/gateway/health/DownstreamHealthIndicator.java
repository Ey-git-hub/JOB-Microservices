package com.jobapplication.gateway.health;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.health.contributor.Health;
import org.springframework.boot.health.contributor.HealthIndicator;
import org.springframework.stereotype.Component;

import com.jobapplication.gateway.config.GatewayProperties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class DownstreamHealthIndicator implements HealthIndicator {

    private final GatewayProperties gatewayProperties;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(1000))
            .build();

    @Override
    public Health health() {
        Map<String, Object> details = new HashMap<>();
        boolean allUp = true;

        allUp &= checkService("companyService", gatewayProperties.getServices().getCompanyUrl(), details);
        allUp &= checkService("jobService", gatewayProperties.getServices().getJobUrl(), details);
        allUp &= checkService("reviewService", gatewayProperties.getServices().getReviewUrl(), details);

        Health.Builder builder = allUp ? Health.up() : Health.up().withDetail("warning", "One or more downstream services are unreachable");
        details.forEach(builder::withDetail);
        return builder.build();
    }

    private boolean checkService(String name, String url, Map<String, Object> details) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url + "/actuator/health"))
                    .timeout(Duration.ofMillis(1000))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            boolean isUp = response.statusCode() >= 200 && response.statusCode() < 400;
            details.put(name, Map.of(
                    "status", isUp ? "UP" : "DOWN",
                    "statusCode", response.statusCode(),
                    "url", url
            ));
            return isUp;
        } catch (Exception e) {
            details.put(name, Map.of(
                    "status", "UNREACHABLE",
                    "url", url,
                    "error", e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName()
            ));
            return false;
        }
    }
}
