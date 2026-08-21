import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { categoryLabels, type PostMeta } from "@/lib/posts";

function CategoryBadge({ post }: { post: PostMeta }) {
  const isBusinessInsights = post.category === "business-insights";
  return (
    <span
      className={`absolute top-5 left-5 z-10 rounded px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.13em] text-white uppercase ${
        isBusinessInsights ? "bg-navy" : "bg-primary"
      }`}
    >
      {categoryLabels[post.category]}
    </span>
  );
}

function PostMetaBar({ post }: { post: PostMeta }) {
  return (
    <div className="mb-3.5 flex items-center gap-2 text-[0.82rem] text-[#718096]">
      <FaRegClock aria-hidden className="text-[0.78rem]" />
      <span>{post.readTime}</span>
      <span className="opacity-40">·</span>
      <span>{post.date}</span>
    </div>
  );
}

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-sage/35 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(40,89,59,0.11)]"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <CategoryBadge post={post} />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <PostMetaBar post={post} />
        <h3 className="heading-card mt-2 mb-3 text-ink">
          {post.title}
        </h3>
        <p className="mb-5 flex-1 text-[0.93rem] leading-[1.68] text-[#4a5568]">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[0.83rem] font-semibold text-primary transition-all group-hover:gap-2.5">
          Read Article{" "}
          <FaArrowRight
            aria-hidden
            className="text-[0.75rem] transition-transform group-hover:translate-x-[3px]"
          />
        </span>
      </div>
    </Link>
  );
}

export function FeaturedBlogCard({
  post,
  excerpt,
}: {
  post: PostMeta;
  excerpt: string;
}) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-sage/40 bg-white transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(40,89,59,0.13)] md:grid-cols-2"
    >
      <div className="relative min-h-[240px] overflow-hidden md:min-h-[360px]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <CategoryBadge post={post} />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <PostMetaBar post={post} />
        <h2 className="heading-subsection mb-4 text-ink">
          {post.title}
        </h2>
        <p className="mb-7 text-[0.97rem] leading-[1.72] text-[#4a5568]">{excerpt}</p>
        <span className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-primary transition-all group-hover:gap-2.5">
          Read Article{" "}
          <FaArrowRight
            aria-hidden
            className="text-[0.78rem] transition-transform group-hover:translate-x-[3px]"
          />
        </span>
      </div>
    </Link>
  );
}
