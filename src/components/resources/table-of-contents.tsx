"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/resources/content";
import { cn } from "@/lib/resources/utils";

/**
 * On-page navigation for an article's h2/h3 headings, with the current section
 * highlighted as you scroll.
 *
 * Ids come from `extractHeadings`, which uses the same github-slugger that
 * rehype-slug uses when rendering the MDX — so the anchors always line up.
 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost heading currently in the upper part of the
        // viewport; falling back keeps a section highlighted while scrolling
        // through long prose with no heading on screen.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-semibold">On this page</p>
      <ul className="flex flex-col gap-1 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={() => setActiveId(heading.id)}
              className={cn(
                "-ml-px block border-l-2 py-1 leading-snug transition-colors",
                heading.level === 3 ? "pl-6" : "pl-3",
                activeId === heading.id
                  ? "border-primary font-medium text-brand-link"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
