package com.jobapplication.gateway.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final GatewayProperties gatewayProperties;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationConverter jwtAuthenticationConverter) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> {
                    // Actuator health and metrics
                    auth.requestMatchers("/actuator/**").permitAll();
                    // CORS preflight requests
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();

                    // Public read endpoints if enabled
                    if (gatewayProperties.getSecurity().isPublicReadsEnabled()) {
                        auth.requestMatchers(HttpMethod.GET, "/api/v1/jobs", "/api/v1/jobs/**").permitAll();
                        auth.requestMatchers(HttpMethod.GET, "/api/v1/companies", "/api/v1/companies/**").permitAll();
                        auth.requestMatchers(HttpMethod.GET, "/api/v1/reviews", "/api/v1/reviews/**").permitAll();
                    }

                    // Company management endpoints
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/companies/**").hasAnyRole("admin", "company-manager");
                    auth.requestMatchers(HttpMethod.PUT, "/api/v1/companies/**").hasAnyRole("admin", "company-manager");
                    auth.requestMatchers(HttpMethod.DELETE, "/api/v1/companies/**").hasAnyRole("admin", "company-manager");

                    // Job management endpoints
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/jobs/**").hasAnyRole("admin", "company-manager");
                    auth.requestMatchers(HttpMethod.PUT, "/api/v1/jobs/**").hasAnyRole("admin", "company-manager");
                    auth.requestMatchers(HttpMethod.DELETE, "/api/v1/jobs/**").hasAnyRole("admin", "company-manager");

                    // Review submission and modifications require authentication
                    auth.requestMatchers(HttpMethod.POST, "/api/v1/reviews/**").authenticated();
                    auth.requestMatchers(HttpMethod.PUT, "/api/v1/reviews/**").authenticated();
                    auth.requestMatchers(HttpMethod.DELETE, "/api/v1/reviews/**").authenticated();

                    // All other API endpoints require authentication
                    auth.anyRequest().authenticated();
                })
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter)));

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        Converter<Jwt, Collection<GrantedAuthority>> realmRoleConverter = jwt -> {
            List<GrantedAuthority> authorities = new ArrayList<>();

            // 1. Extract realm-level roles (Keycloak standard claim)
            Object realmAccessClaim = jwt.getClaims().get("realm_access");
            if (realmAccessClaim instanceof Map<?, ?> realmAccess) {
                Object rolesClaim = realmAccess.get("roles");
                if (rolesClaim instanceof Collection<?> roles) {
                    roles.stream()
                            .filter(String.class::isInstance)
                            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                            .forEach(authorities::add);
                }
            }

            // 2. Extract client-level roles if available
            Object resourceAccessClaim = jwt.getClaims().get("resource_access");
            if (resourceAccessClaim instanceof Map<?, ?> resourceAccess) {
                for (Object clientObj : resourceAccess.values()) {
                    if (clientObj instanceof Map<?, ?> clientMap) {
                        Object clientRoles = clientMap.get("roles");
                        if (clientRoles instanceof Collection<?> roles) {
                            roles.stream()
                                    .filter(String.class::isInstance)
                                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                                    .forEach(authorities::add);
                        }
                    }
                }
            }

            // 3. Extract standard scopes
            Object scopeClaim = jwt.getClaims().get("scope");
            if (scopeClaim instanceof String scopes) {
                for (String scope : scopes.split(" ")) {
                    if (!scope.isBlank()) {
                        authorities.add(new SimpleGrantedAuthority("SCOPE_" + scope));
                    }
                }
            }

            return authorities;
        };

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(realmRoleConverter);
        return converter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(gatewayProperties.getCors().getAllowedOrigins());
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"));
        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "X-Requested-With",
                "X-Correlation-ID",
                "X-Request-ID"
        ));
        configuration.setExposedHeaders(List.of(
                "X-Correlation-ID",
                "X-RateLimit-Limit",
                "X-RateLimit-Remaining",
                "Retry-After",
                "Content-Disposition"
        ));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
