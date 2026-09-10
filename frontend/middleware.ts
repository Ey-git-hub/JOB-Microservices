import { auth } from "@/lib/auth/auth"
import { NextResponse } from "next/server"

const roleRoutes: Record<string, string> = {
  "/dashboard/admin": "admin",
  "/dashboard/company-manager": "company_manager",
  "/dashboard/user": "user",
}

export default auth((req) => {
  const path = req.nextUrl.pathname
  const requiredRole = Object.entries(roleRoutes).find(([prefix]) =>
    path.startsWith(prefix)
  )?.[1]

  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (requiredRole && !req.auth.user.roles?.includes(requiredRole)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}