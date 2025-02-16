// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  // Add paths that should be protected
  const PUBLIC_PATHS = ["/signin", "/signup", "/forgot-password"];
  const isPublicPath = PUBLIC_PATHS.includes(request.nextUrl.pathname);

  if (!session && !isPublicPath) {
    // Redirect to signin if trying to access protected route without session
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (session && isPublicPath) {
    // Redirect to home if trying to access auth pages while logged in
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Add paths that should be protected by the middleware
export const config = {
  matcher: [
    "/",
    "/profile",
    "/signin",
    "/signup",
    "/forgot-password",
    // Add other protected routes here
  ],
};
