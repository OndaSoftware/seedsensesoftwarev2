"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CategoryIcon } from "@/components/resources/category-icon";
import type { CategoryWithArticles } from "@/lib/resources/content";
import { cn } from "@/lib/resources/utils";

/**
 * The persistent left-hand topic navigation.
 *
 * Every category is listed; only the one you are reading is expanded by
 * default. Expanding others is sticky for the session so a reader comparing two
 * topics does not have to keep re-opening them.
 */
export function SidebarNav({
  categories,
  onNavigate,
}: {
  categories: CategoryWithArticles[];
  /** Lets the mobile sheet close itself when a link is followed. */
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const activeCategory = pathname.split("/")[1] ?? "";
  // Only categories the reader has explicitly opened or closed are stored.
  // Everything untouched follows the active category, so navigating expands the
  // topic you land in without an effect syncing state back to the URL.
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  function isExpanded(slug: string) {
    return overrides[slug] ?? slug === activeCategory;
  }

  function toggle(slug: string) {
    setOverrides((previous) => ({ ...previous, [slug]: !isExpanded(slug) }));
  }

  return (
    <nav aria-label="Help topics" className="flex flex-col gap-0.5 text-sm">
      {categories.map((category) => {
        const expanded = isExpanded(category.slug);
        const isActiveCategory = activeCategory === category.slug;

        return (
          <div key={category.slug}>
            <div className="flex items-center">
              <Link
                href={`/resources/${category.slug}`}
                onClick={onNavigate}
                className={cn(
                  "touch-target flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-2 font-medium transition-colors duration-150 hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  isActiveCategory && "text-foreground",
                )}
              >
                <CategoryIcon
                  name={category.icon}
                  className={cn(
                    "size-4 shrink-0 transition-colors duration-200",
                    isActiveCategory
                      ? "text-brand-link"
                      : "text-muted-foreground",
                  )}
                />
                <span className="truncate">{category.title}</span>
              </Link>

              <button
                type="button"
                onClick={() => toggle(category.slug)}
                aria-expanded={expanded}
                aria-label={`${expanded ? "Collapse" : "Expand"} ${category.title}`}
                className="touch-target-icon flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <ChevronRight
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    expanded && "rotate-90",
                  )}
                  aria-hidden
                />
              </button>
            </div>

            {expanded && (
              <ul className="mt-0.5 mb-1 ml-4 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                {category.articles.map((article) => {
                  const isActive = pathname === article.href;
                  return (
                    <li key={article.href}>
                      <Link
                        href={article.href}
                        onClick={onNavigate}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "touch-target block rounded-lg px-2.5 py-1.5 leading-snug text-pretty transition-colors duration-150 hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                          isActive
                            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {article.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
