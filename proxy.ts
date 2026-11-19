import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE_NAME,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/locale";

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const normalizedPathname = request.nextUrl.pathname.replace(/^\/+/, "/");

  const hasLocalePrefix = SUPPORTED_LOCALES.some(
    (locale) =>
      normalizedPathname === `/${locale}` ||
      normalizedPathname.startsWith(`/${locale}/`),
  );

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const locale = resolveLocale(request);
  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname =
    normalizedPathname === "/"
      ? `/${locale}`
      : `/${locale}${normalizedPathname}`;

  const response = NextResponse.redirect(targetUrl, 307);
  response.headers.set("Vary", "Cookie");
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|favicon\\.ico|icon|apple-icon|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|webmanifest)$).*)",
  ],
};
