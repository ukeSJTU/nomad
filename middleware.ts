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

  // Environment checks
  const _isProduction = process.env.NODE_ENV === "production";

  return NextResponse.next();
}

export const config = {
  // More specific matcher for better performance
  matcher: ["/docs/:path*"],
};
