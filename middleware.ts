import type { NextRequest } from "next/server";

const noindexExactPaths = new Set([
  "/uk/feed",
  "/ru/feed",
  "/uk/services/feed",
  "/ru/services/feed"
]);

const noindexPaginationPattern = /^\/(?:uk|ru)\/services\/page\/\d+$/;

function normalizePath(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function isNoindexLegacyPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return noindexExactPaths.has(normalized) || noindexPaginationPattern.test(normalized);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!isNoindexLegacyPath(pathname)) return;

  return new Response(
    "<!doctype html><html lang=\"uk\"><head><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex, nofollow\"><title>Службова сторінка</title></head><body>Службова сторінка не призначена для індексації.</body></html>",
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=3600"
      }
    }
  );
}

export const config = {
  matcher: ["/uk/:path*", "/ru/:path*"]
};
