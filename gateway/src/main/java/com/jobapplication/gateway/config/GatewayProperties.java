package com.jobapplication.gateway.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "gateway")
@Getter
@Setter
public class GatewayProperties {

    private Services services = new Services();
    private Cors cors = new Cors();
    private RateLimit rateLimit = new RateLimit();
    private Security security = new Security();

    @Getter
    @Setter
    public static class Services {
        private String companyUrl = "http://localhost:8084";
        private String jobUrl = "http://localhost:8081";
        private String reviewUrl = "http://localhost:8082";
    }

    @Getter
    @Setter
    public static class Cors {
        private List<String> allowedOrigins = new ArrayList<>(List.of(
                "http://localhost:3000",
                "http://127.0.0.1:3000"
        ));
    }

    @Getter
    @Setter
    public static class RateLimit {
        private boolean enabled = true;
        private int replenishRate = 100;
        private int burstCapacity = 200;
    }

    @Getter
    @Setter
    public static class Security {
        private boolean publicReadsEnabled = true;
    }
}
