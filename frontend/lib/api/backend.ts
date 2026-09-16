import "server-only";

import { auth } from "@/lib/auth/auth";

/**
 * Enterprise Architecture:
 * The frontend exclusively communicates with the API Gateway (Single Entry Point / Reverse Proxy).
 * Internal microservices (e.g. companyms:8084, jobms:8081, reviewms:8082) are not directly
 * accessible from or called by the client layer.
 */
export const API_GATEWAY_URL =
  process.env.API_GATEWAY_URL ??
  process.env.BACKEND_URL ??
  "http://localhost:8090";

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

export interface BackendFetchOptions extends RequestInit {
  gatewayUrl?: string;
  requireAuth?: boolean;
}

function buildUrl(baseUrl: string, path: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Core API Gateway communication client.
 * Enforces enterprise standards:
 * - All frontend traffic routes strictly through the API Gateway
 * - Injects OAuth access token as Bearer authorization
 * - Manages Content-Type: application/json for payload requests
 * - Formats and sanitizes API Gateway endpoints
 * - Extracts detailed error diagnostics from backend responses
 * - Handles 204 No Content, JSON, and text responses
 */
export async function backendFetch<T>(
  path: string,
  options: BackendFetchOptions = {},
): Promise<T> {
  const { gatewayUrl = API_GATEWAY_URL, requireAuth = true, ...fetchOptions } = options;

  let accessToken: string | undefined;

  if (requireAuth) {
    const session = await auth();
    accessToken = session?.accessToken;

    if (!accessToken) {
      throw new BackendError("Authentication required", 401);
    }
  } else {
    try {
      const session = await auth();
      accessToken = session?.accessToken;
    } catch {
      // Session retrieval is optional
    }
  }

  const headers = new Headers(fetchOptions.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (
    fetchOptions.body &&
    !(fetchOptions.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const targetUrl = buildUrl(gatewayUrl, path);

  const response = await fetch(targetUrl, {
    ...fetchOptions,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    let errorMessage = `API Gateway request failed with status ${response.status}`;
    let errorDetails: unknown = undefined;

    try {
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const json = await response.json();
        errorDetails = json;
        if (typeof json === "object" && json !== null) {
          if ("message" in json && typeof json.message === "string") {
            errorMessage = json.message;
          } else if ("error" in json && typeof json.error === "string") {
            errorMessage = json.error;
          }
        }
      } else {
        const text = await response.text();
        if (text && text.trim()) {
          errorMessage = text.trim();
          errorDetails = text;
        }
      }
    } catch {
      // Retain the default status-based error message if parsing fails
    }

    throw new BackendError(errorMessage, response.status, errorDetails);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return (await response.text()) as T;
}

// ---------------------------------------------------------------------------
// Companies API (routed exclusively via API Gateway: /api/v1/companies)
// ---------------------------------------------------------------------------

export function getCompanies<T>() {
  return backendFetch<T>("/api/v1/companies");
}

/**
 * Backwards-compatible alias routing through API Gateway.
 */
export function getCompaniesDirect<T>() {
  return getCompanies<T>();
}

export function getCompanyById<T>(id: number | string) {
  return backendFetch<T>(`/api/v1/companies/${id}`);
}

export function createCompany<T = { message: string }>(body: unknown) {
  return backendFetch<T>("/api/v1/companies/create", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateCompany<T = { message: string }>(
  id: number | string,
  body: unknown,
) {
  return backendFetch<T>(`/api/v1/companies/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteCompany(id: number | string) {
  return backendFetch<void>(`/api/v1/companies/delete/${id}`, {
    method: "DELETE",
  });
}

// ---------------------------------------------------------------------------
// Jobs API (routed exclusively via API Gateway: /api/v1/jobs)
// ---------------------------------------------------------------------------

export function getJobs<T>() {
  return backendFetch<T>("/api/v1/jobs");
}

export function getJobById<T>(id: number | string) {
  return backendFetch<T>(`/api/v1/jobs/${id}`);
}

export function createJob<T>(body: unknown) {
  return backendFetch<T>("/api/v1/jobs", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateJob<T>(id: number | string, body: unknown) {
  return backendFetch<T>(`/api/v1/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteJob(id: number | string) {
  return backendFetch<void>(`/api/v1/jobs/${id}`, {
    method: "DELETE",
  });
}

// ---------------------------------------------------------------------------
// Reviews API (routed exclusively via API Gateway: /api/v1/reviews)
// ---------------------------------------------------------------------------

export function getReviews<T>(companyId?: number | string) {
  const path = companyId !== undefined
    ? `/api/v1/reviews?companyId=${encodeURIComponent(companyId)}`
    : "/api/v1/reviews";
  return backendFetch<T>(path);
}

export function getReviewById<T>(reviewId: number | string) {
  return backendFetch<T>(`/api/v1/reviews/${encodeURIComponent(reviewId)}`);
}

export function createReview<T = string>(
  companyId: number | string,
  body: unknown,
) {
  return backendFetch<T>(
    `/api/v1/reviews?companyId=${encodeURIComponent(companyId)}`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
}

export function updateReview<T = string>(
  reviewId: number | string,
  body: unknown,
) {
  return backendFetch<T>(
    `/api/v1/reviews/${encodeURIComponent(reviewId)}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
    },
  );
}

export function deleteReview(reviewId: number | string) {
  return backendFetch<void>(
    `/api/v1/reviews/${encodeURIComponent(reviewId)}`,
    {
      method: "DELETE",
    },
  );
}