/** Non-localized studio config — safe to import anywhere */

export const SITE = {
  brand: "SEKAIDEV",
  email: "hello@sekaidevec.com",
  siteUrl: "https://portafolio.sekaidevec.com",
} as const;

/** Socials: only verified URLs. Empty = hidden. */
export const SOCIALS: { label: string; href: string }[] = [];

/**
 * WhatsApp — only when NEXT_PUBLIC_WHATSAPP is set (E.164 digits).
 * Empty = hidden. Never invent a number.
 */
export const WHATSAPP = (() => {
  const raw = (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, "");
  if (raw.length < 8 || raw.length > 15)
    return null as null | { href: string; digits: string; prefill: (text: string) => string };
  return {
    digits: raw,
    href: `https://wa.me/${raw}`,
    prefill: (text: string) =>
      `https://wa.me/${raw}?text=${encodeURIComponent(text)}`,
  };
})();

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
