import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/benefits`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/all-blogs`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
