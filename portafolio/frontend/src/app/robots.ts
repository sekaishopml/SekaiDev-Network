import type { MetadataRoute } from "next";
import { STUDIO } from "@/content/studio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${STUDIO.siteUrl}/sitemap.xml`,
  };
}
