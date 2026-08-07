import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/config";

function detectLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }
  const accept = req.headers.get("accept-language")?.toLowerCase() || "";
  if (accept.includes("es")) return "es";
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/lead-flow") ||
    pathname.startsWith("/monitoring") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) {
    const locale = pathname.split("/")[1] as Locale;
    const res = NextResponse.next();
    res.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
