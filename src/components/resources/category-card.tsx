import Link from "next/link";

import { CategoryIcon } from "@/components/resources/category-icon";
import type { CategoryWithArticles } from "@/lib/resources/content";

/**
 * One bordered surface split by hairlines, rather than eight separate cards.
 *
 * Individually bordered cards with coloured headers and tinted icon tiles read
 * as chrome; a single divided plane reads as structure. Colour is the app's one
 * brand green, and it only appears on hover — a reward for pointing at
 * something, never permanent decoration.
 *
 * The 1px lines are the container's own background showing through a `gap-px`
 * grid, so they stay perfectly even and never double up at the edges.
 */
export function CategoryGrid({
  categories,
}: {
  categories: CategoryWithArticles[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/resources/${category.slug}`}
          className="group flex flex-col gap-2 bg-card p-6 transition-colors duration-150 hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:-outline-offset-2"
        >
          <span className="flex items-center gap-2.5">
            <CategoryIcon
              name={category.icon}
              className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-brand-link"
            />
            <span className="font-heading font-medium tracking-tight">{category.title}</span>
          </span>

          <span className="text-[0.8125rem] leading-relaxed text-pretty text-muted-foreground">
            {category.description}
          </span>

          <span className="tabular mt-1 text-xs text-muted-foreground/70">
            {category.articleCount} guides
          </span>
        </Link>
      ))}
    </div>
  );
}
