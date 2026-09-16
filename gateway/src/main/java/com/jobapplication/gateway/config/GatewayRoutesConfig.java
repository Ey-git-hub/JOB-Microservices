package com.jobapplication.gateway.config;

import org.springframework.cloud.gateway.server.mvc.filter.FilterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class GatewayRoutesConfig {

    private final GatewayProperties gatewayProperties;

    @Bean
    public RouterFunction<ServerResponse> companyServiceRoute() {
        String targetUri = gatewayProperties.getServices().getCompanyUrl();
        log.info("Configuring Company Service Route: /api/v1/companies/** -> {}", targetUri);

        return GatewayRouterFunctions.route("company_service")
                .route(RequestPredicates.path("/api/v1/companies")
                                .or(RequestPredicates.path("/api/v1/companies/**")),
                        HandlerFunctions.http())
                .filter(FilterFunctions.uri(targetUri))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> jobServiceRoute() {
        String targetUri = gatewayProperties.getServices().getJobUrl();
        log.info("Configuring Job Service Route: /api/v1/jobs/** -> {}", targetUri);

        return GatewayRouterFunctions.route("job_service")
                .route(RequestPredicates.path("/api/v1/jobs")
                                .or(RequestPredicates.path("/api/v1/jobs/**")),
                        HandlerFunctions.http())
                .filter(FilterFunctions.uri(targetUri))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> reviewServiceRoute() {
        String targetUri = gatewayProperties.getServices().getReviewUrl();
        log.info("Configuring Review Service Route: /api/v1/reviews/** -> {}", targetUri);

        return GatewayRouterFunctions.route("review_service")
                .route(RequestPredicates.path("/api/v1/reviews")
                                .or(RequestPredicates.path("/api/v1/reviews/**")),
                        HandlerFunctions.http())
                .filter(FilterFunctions.uri(targetUri))
                .build();
    }
}
