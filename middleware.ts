import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { NextRequest, NextResponse } from "next/server";

const { rewrite: rewriteLLM } = rewritePath("/docs/*path", "/llms.mdx/*path");

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Handle AI agent content negotiation for all /docs paths
  if (pathname.startsWith("/docs") && isMarkdownPreferred(request)) {
    const result = rewriteLLM(pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  // Early return for non-API docs paths (performance optimization)
  if (!pathname.startsWith("/docs/api")) {
    return NextResponse.next();
  }

  // Environment checks
  const isProduction = process.env.NODE_ENV === "production";
  const enableApiDocs = process.env.ENABLE_API_DOCS === "true";

  // Block access in production unless explicitly enabled
  if (isProduction && !enableApiDocs) {
    // Return 404 to hide the existence of the endpoint
    return new NextResponse(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return NextResponse.next();
}

export const config = {
  // More specific matcher for better performance
  matcher: ["/docs/:path*"],
};
