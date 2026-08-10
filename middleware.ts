import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get("admin_token")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!adminToken && request.nextUrl.pathname.startsWith("/admin") && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (adminToken && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};