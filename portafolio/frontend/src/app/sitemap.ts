import type { MetadataRoute } from "next";
import { SITE } from "@/content/config";
import { LOCALES } from "@/content/i18n";

/**
 * Stable content date — do not use `new Date()` (that fakes freshness on every request).
 * Bump when substantive portfolio copy/routes change.
 */
const CONTENT_LAST_MODIFIED = new Date("2026-08-10");

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE.siteUrl}/${locale}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE.siteUrl}/${l}`])
      ),
    },
  }));
}
