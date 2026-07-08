import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const canonicalHost = "www.formula-chistoty.ck.ua";
const productionHosts = new Set(["formula-chistoty.ck.ua", canonicalHost]);

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
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(":", "");

  if (productionHosts.has(host) && (host !== canonicalHost || protocol !== "https")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = canonicalHost;
    return NextResponse.redirect(url, 301);
  }

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
  matcher: ["/((?!_next/static|_next/image|images|brand).*)"]
};
