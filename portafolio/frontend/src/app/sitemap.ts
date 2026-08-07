import type { MetadataRoute } from "next";
import { SITE } from "@/content/config";
import { LOCALES } from "@/content/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.map((locale) => ({
    url: `${SITE.siteUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE.siteUrl}/${l}`])
      ),
    },
  }));
}
