# ============================================================================
# Enterprise API Gateway — Multi-stage Dockerfile
# ============================================================================
# Stage 1: Build the application with Maven
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /build
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
# Cache dependencies in a separate layer for faster rebuilds
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

COPY src/ src/
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Production-optimised runtime image
FROM eclipse-temurin:21-jre-alpine AS runtime

# Security: run as a non-root user
RUN addgroup -S gateway && adduser -S gateway -G gateway

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

# JVM tuning for container environments
ENV JAVA_OPTS="-XX:+UseContainerSupport \
               -XX:MaxRAMPercentage=75.0 \
               -XX:InitialRAMPercentage=50.0 \
               -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8090

USER gateway

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:8090/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]
