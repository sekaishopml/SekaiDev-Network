import { SITE, type Locale } from "@/content/config";
import type { StudioDictionary } from "@/content/dictionaries/types";

/** Organization / LocalBusiness-ish schema for the studio. */
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SekaiDev",
    alternateName: SITE.brand,
    url: SITE.siteUrl,
    email: SITE.email,
    description:
      locale === "es"
        ? "Estudio de software en Ecuador: apps, webs y sistemas a medida."
        : "Software studio in Ecuador: custom apps, sites, and systems.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EC",
      addressRegion: "Ecuador",
    },
    areaServed: [
      { "@type": "Country", name: "Ecuador" },
      { "@type": "Place", name: "Latin America" },
      { "@type": "Country", name: "United States" },
    ],
  };
}

/** FAQPage schema from dictionary FAQ items (server-safe). */
export function faqPageJsonLd(t: StudioDictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
