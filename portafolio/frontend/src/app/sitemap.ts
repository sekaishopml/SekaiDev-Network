import type { MetadataRoute } from "next";
import { STUDIO } from "@/content/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: STUDIO.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
