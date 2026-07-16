import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const canonicalHost = "www.formula-chistoty.ck.ua";
const productionHosts = new Set(["formula-chistoty.ck.ua", canonicalHost]);
const carCleaningCanonicalPath = "/himchystka-avto-cherkasy";
const carCleaningLegacySlugs = [
  "himchystka-avto",
  "himchystka-avto-cherkasy",
  "himchistka-avto",
  "himchistka-avto-cherkasy",
  "khimchystka-avto",
  "khimchystka-avto-cherkasy",
  "khimchistka-avto",
  "khimchistka-avto-cherkasy",
  "himchystka-salonu-avto",
  "himchystka-salonu-avto-cherkasy",
  "himchistka-salona-avto",
  "himchistka-salona-avto-cherkasy",
  "himchystka-avtomobilya",
  "himchystka-avtomobilya-cherkasy",
  "himchistka-avtomobilya",
  "himchistka-avtomobilya-cherkasy"
];
const carCleaningLegacyPrefixes = ["", "/services", "/uk", "/ru", "/uk/services", "/ru/services"];
const carCleaningLegacyPaths = new Set([
  carCleaningCanonicalPath,
  ...carCleaningLegacyPrefixes.flatMap((prefix) => carCleaningLegacySlugs.map((slug) => `${prefix}/${slug}`))
]);

const noindexExactPaths = new Set([
  "/uk/feed",
  "/ru/feed",
  "/uk/services/feed",
  "/ru/services/feed"
]);

const noindexPaginationPattern = /^\/(?:uk|ru)\/services\/page\/\d+$/;

const exactLegacyRedirects = new Map([
  ["/about", "/pro-nas"],
  ["/works", "/nashi-roboty"],
  ["/reviews", "/vidguky"],
  ["/vidhuky", "/vidguky"],
  ["/services", "/poslugy"],
  ["/prybyrannya-kotedzhiv-cherkasy", "/prybyrannya-budynkiv-cherkasy"]
]);

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
  const normalizedPath = normalizePath(pathname);
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(":", "");
  const legacyDestination = exactLegacyRedirects.get(normalizedPath);

  if (legacyDestination) {
    const url = request.nextUrl.clone();
    url.protocol = productionHosts.has(host) ? "https:" : request.nextUrl.protocol;
    url.host = productionHosts.has(host) ? canonicalHost : request.nextUrl.host;
    url.pathname = legacyDestination;
    return NextResponse.redirect(url, 301);
  }

  if (
    carCleaningLegacyPaths.has(normalizedPath) &&
    (normalizedPath !== carCleaningCanonicalPath || host !== canonicalHost || protocol !== "https")
  ) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = canonicalHost;
    url.pathname = carCleaningCanonicalPath;
    return NextResponse.redirect(url, 301);
  }

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
  matcher: ["/((?!_next/static|_next/image).*)"]
};
