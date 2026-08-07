import type { Locale } from "@/content/config";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/content/config";
import { en } from "@/content/dictionaries/en";
import { es } from "@/content/dictionaries/es";
import type { StudioDictionary } from "@/content/dictionaries/types";

const dictionaries: Record<Locale, StudioDictionary> = {
  en: en as unknown as StudioDictionary,
  es: es as unknown as StudioDictionary,
};

export function getDictionary(locale: string): StudioDictionary {
  if (isLocale(locale)) return dictionaries[locale];
  return dictionaries[DEFAULT_LOCALE];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && isLocale(seg)) return seg;
  return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/");
  if (parts[1] && isLocale(parts[1])) {
    const rest = parts.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function withLocale(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export { LOCALES, DEFAULT_LOCALE, isLocale };
export type { Locale, StudioDictionary };
