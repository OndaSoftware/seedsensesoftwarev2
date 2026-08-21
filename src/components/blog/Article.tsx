import type { ReactNode } from "react";

/**
 * Typographic primitives shared by every blog article, ported from the
 * `.blog-article-content` styles of the original stylesheet.
 */

export function ArticleP({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-[1.06rem] leading-[1.8] text-[#2d3748]">{children}</p>
  );
}

export function ArticleH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="heading-subsection mt-10 mb-4 text-ink">
      {children}
    </h2>
  );
}

export function ArticleH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="heading-card mt-8 mb-4 text-ink">
      {children}
    </h3>
  );
}

export function ArticleList({ children }: { children: ReactNode }) {
  return <ul className="mb-6">{children}</ul>;
}

export function ArticleItem({ children }: { children: ReactNode }) {
  return (
    <li className="mb-2.5 block rounded-lg border-l-[3px] border-accent bg-white py-2.5 pr-3.5 pl-5 text-base leading-[1.65] text-[#2d3748] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      {children}
    </li>
  );
}

export function Testimonial({
  children,
  author,
}: {
  children: ReactNode;
  author: string;
}) {
  return (
    <blockquote className="my-8 rounded-r-[10px] border-l-4 border-primary bg-white px-7 py-6 text-[1.05rem] leading-[1.75] text-[#4a5568] italic shadow-[0_2px_12px_rgba(40,89,59,0.07)]">
      {children}
      <span className="mt-3.5 block text-[0.88rem] font-semibold text-primary not-italic">
        {author}
      </span>
    </blockquote>
  );
}
