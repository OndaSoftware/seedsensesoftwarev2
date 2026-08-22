import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import { FeaturedBlogCard } from "@/components/blog/BlogCard";
import FilterableBlogGrid from "@/components/blog/FilterableBlogGrid";
import { featuredPost, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights & Updates - SeedSense",
  description:
    "Explore our latest blog posts on SeedSense, providing insights and updates on seed trial management.",
};

const featuredExcerpt =
  "Collecting clean trial data is only the first step. The new Variety Catalog turns seasons of evaluations into clear answers about which varieties to promote, sell, and drop.";

export default function AllBlogsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sage/40 bg-cream px-5 pt-20 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[35%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(40,89,59,0.07)_0%,transparent_65%)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-6 flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.18em] text-primary uppercase after:inline-block after:h-0.5 after:w-8 after:rounded-sm after:bg-primary after:content-['']">
            Knowledge Hub
          </p>
          <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2 md:gap-12">
            <h1 className="heading-display text-ink">
              Insights &<br />
              Updates
            </h1>
            <p className="max-w-[400px] self-end pb-1.5 text-[1.05rem] leading-[1.75] text-[#4a5568]">
              Perspectives on seed trial management, industry trends, and how
              modern software is transforming the way seed companies work.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <main className="bg-surface px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <FeaturedBlogCard post={featuredPost} excerpt={featuredExcerpt} />
          </div>

          <div className="mb-9 flex items-center gap-5 before:h-px before:flex-1 before:bg-sage/55 before:content-[''] after:h-px after:flex-1 after:bg-sage/55 after:content-['']">
            <span className="text-[0.7rem] font-bold tracking-[0.16em] whitespace-nowrap text-[#a0aec0] uppercase">
              All Articles
            </span>
          </div>

          <FilterableBlogGrid posts={posts} />
        </div>
      </main>

      <ContactCta />
    </>
  );
}
