import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

// Map each dashboard path prefix to the required Keycloak realm role
const roleRouteMap: Record<string, string> = {
  "/dashboard/admin": "admin",
  "/dashboard/user": "user",
  "/dashboard/Company-manager": "company-manager",
};

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 1. If not authenticated, redirect to sign-in
  if (!req.auth) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Find the matching role requirement for this route
  const requiredRole = Object.entries(roleRouteMap).find(([prefix]) =>
    pathname.startsWith(prefix)
  )?.[1];

  if (requiredRole) {
    const userRoles: string[] = req.auth.user?.roles ?? [];

    if (!userRoles.includes(requiredRole)) {
      // User is authenticated but lacks the required role
      return NextResponse.redirect(
        new URL("/unauthorized", req.nextUrl.origin)
      );
    }
  }

  // 3. Authorized — continue
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};

