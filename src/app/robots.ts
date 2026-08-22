import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Layer 1 of 3 keeping the help center out of search results. Those
      // guides are shared directly with paying customers, so nothing under
      // /resources should surface in a search engine. The marketing site
      // above it stays fully indexable. See src/lib/resources/no-index.ts.
      disallow: "/resources/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
