import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";
  let shouldRedirect = false;

  if (host === "www.formula-chistoty.ck.ua") {
    url.hostname = "formula-chistoty.ck.ua";
    shouldRedirect = true;
  }

  if (url.pathname === "/index.html") {
    url.pathname = "/";
    shouldRedirect = true;
  }

  if (url.pathname === "/ru" || url.pathname.startsWith("/ru/")) {
    url.pathname = url.pathname.replace(/^\/ru/, "") || "/";
    shouldRedirect = true;
  }

  return shouldRedirect ? NextResponse.redirect(url) : NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/index.html"]
};
