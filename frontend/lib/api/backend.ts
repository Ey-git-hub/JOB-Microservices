import "server-only";

import { auth } from "@/lib/auth/auth";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8090";

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

export async function backendFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new BackendError("Authentication required", 401);
  }

  const response = await fetch(`${backendUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...options.headers,
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new BackendError(
      `Backend request failed with status ${response.status}`,
      response.status,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getCompanies<T>() {
  return backendFetch<T>("/api/v1/companies");
}

export function getJobs<T>() {
  return backendFetch<T>("/api/v1/jobs");
}

export function getReviews<T>() {
  return backendFetch<T>("/api/v1/reviews");
}