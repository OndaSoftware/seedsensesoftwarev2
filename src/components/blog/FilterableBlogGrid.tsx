"use client";

import { useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import type { PostCategory, PostMeta } from "@/lib/posts";

type Filter = "all" | PostCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All Topics" },
  { value: "business-insights", label: "Business Insights" },
  { value: "product-features", label: "Product Features" },
];

/** The "All Articles" filter bar + card grid from the blog index page. */
export default function FilterableBlogGrid({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<Filter>("all");

  const visible =
    active === "all" ? posts : posts.filter((post) => post.category === active);

  return (
    <>
      <div className="mb-9 flex flex-wrap justify-center gap-2.5">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActive(filter.value)}
            aria-pressed={active === filter.value}
            className={`cursor-pointer rounded-full border px-4.5 py-2 text-[0.78rem] font-semibold tracking-wide transition-all ${
              active === filter.value
                ? "border-primary bg-primary text-white"
                : "border-sage/55 bg-white text-[#4a5568] hover:border-primary hover:text-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
