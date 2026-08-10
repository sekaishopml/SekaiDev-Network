import { describe, expect, it } from "vitest";
import { en } from "@/content/dictionaries/en";
import { faqPageJsonLd, organizationJsonLd } from "./jsonLd";

describe("jsonLd", () => {
  it("builds Organization structured data", () => {
    const jsonLd = organizationJsonLd("en");

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SekaiDev",
      url: expect.stringMatching(/^https:\/\//),
      address: {
        "@type": "PostalAddress",
        addressCountry: "EC",
      },
    });
    expect(jsonLd.areaServed).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Ecuador" })])
    );
  });

  it("builds FAQPage structured data from dictionary items", () => {
    const jsonLd = faqPageJsonLd(en);

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "FAQPage",
    });
    expect(jsonLd.mainEntity).toHaveLength(en.FAQ_ITEMS.length);
    expect(jsonLd.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: en.FAQ_ITEMS[0].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: en.FAQ_ITEMS[0].answer,
      },
    });
  });
});
