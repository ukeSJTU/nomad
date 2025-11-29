import { getSessionCookie } from "better-auth/cookies";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { NextRequest, NextResponse } from "next/server";

import { logger } from "@/infra/logging";

const { rewrite: rewriteLLM } = rewritePath("/docs/*path", "/llms.mdx/*path");

// Routes that require authentication
const PROTECTED_ROUTES = [
  "/home", // User dashboard and profile
  "/booking/passengers", // Passenger selection
  "/booking/payment", // Payment page
  "/booking/confirmation", // Order confirmation
  "/booking/ancillary", // Ancillary services
  "/orders", // Order details page
];

// Routes that authenticated users should not access
const AUTH_ROUTES = ["/auth/sign-in", "/auth/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Handle AI agent content negotiation for all /docs paths
  if (pathname.startsWith("/docs") && isMarkdownPreferred(request)) {
    const result = rewriteLLM(pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  // 2. Check for session cookie existence
  // Note: This only checks if the cookie exists, not if it's valid
  // Deeper validation happens in server-side handlers/components when required
  const sessionCookie = getSessionCookie(request);

  // 3. Protect routes that require authentication
  // Use exact match or sub-path match to avoid false positives
  // e.g., /home or /home/settings matches, but /hometown does not
  const isProtectedRoute = PROTECTED_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !sessionCookie) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    // Add redirect parameter to return to original page after login
    signInUrl.searchParams.set("redirect", pathname);

    logger.info(
      `[Middleware] Redirecting unauthenticated user to sign-in: ${pathname}`
    );

    return NextResponse.redirect(signInUrl);
  }

  // 4. Redirect authenticated users away from auth pages
  // Use exact match or sub-path match to avoid false positives
  // e.g., /auth/sign-in or /auth/sign-in/callback matches, but /auth/sign-in-help does not
  const isAuthRoute = AUTH_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute && sessionCookie) {
    logger.info(
      "[Middleware] Authenticated user accessing auth page, redirecting to home"
    );

    return NextResponse.redirect(new URL("/", request.url));
  }

  // 5. Log all requests in development environment
  if (process.env.NODE_ENV === "development") {
    logger.info(`[Middleware] ${request.method} ${pathname}`);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  // Match all routes except static files and API routes
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
