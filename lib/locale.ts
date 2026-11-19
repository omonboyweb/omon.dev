import type { Locale } from "./portfolio/types";

export type { Locale };

export const SUPPORTED_LOCALES = ["en", "ru", "uz"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "omon-locale";

export const LOCALES: ReadonlyArray<{
  code: Locale;
  label: string;
  nativeName: string;
}> = [
  { code: "en", label: "EN", nativeName: "English" },
  { code: "ru", label: "RU", nativeName: "Русский" },
  { code: "uz", label: "UZ", nativeName: "Oʻzbekcha" },
];

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ru" || value === "uz";
}

export function getLocaleFromPathname(
  pathname: string | null | undefined,
): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  const firstSegment = pathname.split("/")[1];
  return isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function stripLocalePrefix(
  pathname: string | null | undefined,
): string {
  if (!pathname) return "";
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    const rest = `/${segments.slice(2).join("/")}`;
    return rest === "/" ? "" : rest;
  }
  return pathname === "/" ? "" : pathname;
}

export function localizePath(locale: Locale, path = ""): string {
  if (!path || path === "/") {
    return `/${locale}`;
  }
  if (path.startsWith("#")) {
    return `/${locale}${path}`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function persistLocalePreference(next: Locale): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCALE_COOKIE_NAME, next);
  } catch {
    // Ignore storage write errors in restricted contexts
  }
  try {
    const secureFlag =
      window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${LOCALE_COOKIE_NAME}=${next}; path=/; max-age=31536000; samesite=lax${secureFlag}`;
  } catch {
    // Ignore cookie write errors in restricted contexts
  }
  document.documentElement.lang = next;
}
