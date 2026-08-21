import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowLeft, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import ContactCta from "@/components/ContactCta";
import { categoryLabels, getPost } from "@/lib/posts";

interface BlogPostLayoutProps {
  slug: string;
  children: ReactNode;
}

/**
 * The shared shell of every blog post: back link, category tag, title,
 * lead, meta bar, and the light article background, followed by the
 * global contact CTA.
 */
export default function BlogPostLayout({ slug, children }: BlogPostLayoutProps) {
  const post = getPost(slug);

  return (
    <>
      <section className="border-b border-sage/35 bg-white px-5 pt-14 pb-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/all-blogs"
            className="mb-8 inline-flex items-center gap-2 text-[0.84rem] text-[#718096] transition-colors hover:text-primary"
          >
            <FaArrowLeft aria-hidden /> Back to Insights
          </Link>
          <div className="mx-auto max-w-[760px]">
            <span className="mb-5 inline-block rounded bg-mint px-3.5 py-1.5 text-[0.68rem] font-bold tracking-[0.13em] text-primary uppercase">
              {categoryLabels[post.category]}
            </span>
            <h1 className="heading-section mb-5 text-ink">
              {post.title}
            </h1>
            <p className="mb-7 text-[1.12rem] leading-[1.78] text-[#4a5568]">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5 border-t border-sage/45 pt-5 text-[0.85rem] text-[#718096]">
              <span className="inline-flex items-center gap-1.5">
                <FaRegClock aria-hidden className="text-[0.78rem]" /> {post.readTime}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <FaRegCalendarAlt aria-hidden className="text-[0.78rem]" /> {post.date}
              </span>
              <span>·</span>
              <span>SeedSense Team</span>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-surface py-16">
        <article className="mx-auto max-w-[720px] px-6">{children}</article>
      </div>

      <ContactCta />
    </>
  );
}
