package com.jobapplication.gateway.filter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(10)
public class UserContextPropagationFilter extends OncePerRequestFilter {

    public static final String HEADER_USER_ID = "X-User-Id";
    public static final String HEADER_USER_EMAIL = "X-User-Email";
    public static final String HEADER_USER_NAME = "X-User-Name";
    public static final String HEADER_USER_ROLES = "X-User-Roles";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwtAuth && authentication.isAuthenticated()) {
            Jwt jwt = jwtAuth.getToken();
            CorrelationIdFilter.HeaderMapRequestWrapper requestWrapper =
                    request instanceof CorrelationIdFilter.HeaderMapRequestWrapper existingWrapper
                            ? existingWrapper
                            : new CorrelationIdFilter.HeaderMapRequestWrapper(request);

            String userId = jwt.getSubject();
            if (StringUtils.hasText(userId)) {
                requestWrapper.addHeader(HEADER_USER_ID, userId);
            }

            String email = jwt.getClaimAsString("email");
            if (StringUtils.hasText(email)) {
                requestWrapper.addHeader(HEADER_USER_EMAIL, email);
            }

            String preferredUsername = jwt.getClaimAsString("preferred_username");
            if (StringUtils.hasText(preferredUsername)) {
                requestWrapper.addHeader(HEADER_USER_NAME, preferredUsername);
            } else if (StringUtils.hasText(jwt.getClaimAsString("name"))) {
                requestWrapper.addHeader(HEADER_USER_NAME, jwt.getClaimAsString("name"));
            }

            List<String> roles = extractRoles(jwt, jwtAuth.getAuthorities());
            if (!roles.isEmpty()) {
                requestWrapper.addHeader(HEADER_USER_ROLES, String.join(",", roles));
            }

            filterChain.doFilter(requestWrapper, response);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private List<String> extractRoles(Jwt jwt, Collection<GrantedAuthority> authorities) {
        Object realmAccess = jwt.getClaims().get("realm_access");
        if (realmAccess instanceof Map<?, ?> realmAccessMap) {
            Object rolesClaim = realmAccessMap.get("roles");
            if (rolesClaim instanceof Collection<?> roles) {
                return roles.stream()
                        .filter(String.class::isInstance)
                        .map(String.class::cast)
                        .toList();
            }
        }

        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .map(role -> role.startsWith("ROLE_") ? role.substring(5) : role)
                .collect(Collectors.toList());
    }
}
