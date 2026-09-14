import "server-only";

import { auth } from "@/lib/auth/auth";

const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8090";
const companyServiceUrl = process.env.COMPANY_SERVICE_URL ?? "http://localhost:8084";

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

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return (await response.text()) as T;
}

export function getCompanies<T>() {
  return backendFetch<T>("/api/v1/companies");
}

export function getCompaniesDirect<T>() {
  return backendFetchFrom<T>(companyServiceUrl, "/api/v1/companies");
}

export function createCompany(body: unknown) {
  return companyMutation("/api/v1/companies/create", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateCompany(id: number, body: unknown) {
  return companyMutation(`/api/v1/companies/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteCompany(id: number) {
  return companyMutation(`/api/v1/companies/delete/${id}`, {
    method: "DELETE",
  });
}

export function getJobs<T>() {
  return backendFetch<T>("/api/v1/jobs");
}

export function getReviews<T>() {
  return backendFetch<T>("/api/v1/reviews");
}

async function backendFetchFrom<T>(
  baseUrl: string,
  path: string,
  options: RequestInit = {},
) {
  const session = await auth();

  if (!session?.accessToken) {
    throw new BackendError("Authentication required", 401);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return (await response.text()) as T;
}

async function companyMutation(path: string, options: RequestInit): Promise<void> {
  await backendFetchFrom<string>(companyServiceUrl, path, options);
}