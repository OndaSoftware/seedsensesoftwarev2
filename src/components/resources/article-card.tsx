import { ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";

import type { Article } from "@/lib/resources/content";
import { cn } from "@/lib/resources/utils";

/**
 * Quiet by default. The border is the only chrome; everything else is type and
 * space, and the arrow is the single moving part on hover.
 */
export function ArticleCard({
  article,
  eyebrow,
  className,
}: {
  article: Article;
  /** Topic name, so a card lifted out of its section still says where it lives. */
  eyebrow?: string;
  className?: string;
}) {
  return (
    <Link
      href={article.href}
      className={cn(
        "group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 transition-colors duration-150 hover:border-foreground/20 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-[0.6875rem] font-medium tracking-wide text-muted-foreground/80 uppercase">
          {eyebrow}
        </span>
      ) : null}

      <span className="flex items-start justify-between gap-3">
        <span className="font-heading text-[0.9375rem] leading-snug font-medium text-balance">
          {article.title}
        </span>
        {article.youtubeId ? (
          <PlayCircle
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-label="Includes a video"
          />
        ) : (
          <ArrowUpRight
            className="mt-0.5 size-4 shrink-0 -translate-x-0.5 translate-y-0.5 text-muted-foreground opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            aria-hidden
          />
        )}
      </span>

      <span className="text-[0.8125rem] leading-relaxed text-pretty text-muted-foreground">
        {article.description}
      </span>
    </Link>
  );
}

/**
 * Ranked row for "Most read". The numeral does the scanning work a bullet
 * cannot, and tabular figures keep the titles on one left edge.
 */
export function ArticleRow({
  article,
  rank,
}: {
  article: Article;
  rank: number;
}) {
  return (
    <Link
      href={article.href}
      className="touch-target group flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span
        aria-hidden
        className="tabular w-5 shrink-0 text-sm text-muted-foreground/50 transition-colors group-hover:text-foreground"
      >
        {String(rank).padStart(2, "0")}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm">{article.title}</span>

      {article.youtubeId ? (
        <PlayCircle
          className="size-4 shrink-0 text-muted-foreground"
          aria-label="Includes a video"
        />
      ) : null}
    </Link>
  );
}
