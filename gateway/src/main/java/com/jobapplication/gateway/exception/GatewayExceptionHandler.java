package com.jobapplication.gateway.exception;

import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.time.Instant;

import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GatewayExceptionHandler {

    private static final String CORRELATION_ID_KEY = "correlationId";

    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<GlobalErrorResponse> handleResourceAccessException(
            ResourceAccessException ex, HttpServletRequest request) {
        log.error("Downstream service connection error on {}: {}", request.getRequestURI(), ex.getMessage());
        return buildResponse(
                HttpStatus.SERVICE_UNAVAILABLE,
                "Downstream Service Unavailable",
                "The requested downstream service is currently unreachable. Please try again later.",
                request.getRequestURI()
        );
    }

    @ExceptionHandler(ConnectException.class)
    public ResponseEntity<GlobalErrorResponse> handleConnectException(
            ConnectException ex, HttpServletRequest request) {
        log.error("Failed to connect to downstream service on {}: {}", request.getRequestURI(), ex.getMessage());
        return buildResponse(
                HttpStatus.SERVICE_UNAVAILABLE,
                "Connection Refused",
                "Unable to establish a connection to the downstream microservice.",
                request.getRequestURI()
        );
    }

    @ExceptionHandler(SocketTimeoutException.class)
    public ResponseEntity<GlobalErrorResponse> handleSocketTimeoutException(
            SocketTimeoutException ex, HttpServletRequest request) {
        log.error("Downstream timeout on {}: {}", request.getRequestURI(), ex.getMessage());
        return buildResponse(
                HttpStatus.GATEWAY_TIMEOUT,
                "Gateway Timeout",
                "The downstream service took too long to respond.",
                request.getRequestURI()
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<GlobalErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex, HttpServletRequest request) {
        log.warn("Access denied for request {} : {}", request.getRequestURI(), ex.getMessage());
        return buildResponse(
                HttpStatus.FORBIDDEN,
                "Forbidden",
                "You do not possess sufficient permissions to perform this action.",
                request.getRequestURI()
        );
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<GlobalErrorResponse> handleAuthenticationException(
            AuthenticationException ex, HttpServletRequest request) {
        log.warn("Authentication failed for request {} : {}", request.getRequestURI(), ex.getMessage());
        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Unauthorized",
                "Authentication is required or provided credentials are invalid.",
                request.getRequestURI()
        );
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<GlobalErrorResponse> handleResponseStatusException(
            ResponseStatusException ex, HttpServletRequest request) {
        return buildResponse(
                HttpStatus.valueOf(ex.getStatusCode().value()),
                ex.getStatusCode().toString(),
                ex.getReason() != null ? ex.getReason() : ex.getMessage(),
                request.getRequestURI()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GlobalErrorResponse> handleGenericException(
            Exception ex, HttpServletRequest request) {
        log.error("Unhandled error encountered at {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal Gateway Error",
                "An unexpected error occurred while processing the request through the gateway.",
                request.getRequestURI()
        );
    }

    private ResponseEntity<GlobalErrorResponse> buildResponse(
            HttpStatus status, String error, String message, String path) {
        String correlationId = MDC.get(CORRELATION_ID_KEY);
        GlobalErrorResponse errorResponse = GlobalErrorResponse.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .error(error)
                .message(message)
                .path(path)
                .correlationId(correlationId)
                .build();
        return ResponseEntity.status(status).body(errorResponse);
    }
}
