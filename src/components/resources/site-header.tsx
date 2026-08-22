import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/resources/mobile-nav";
import { SearchTrigger } from "@/components/resources/search/search-provider";
import { ThemeToggle } from "@/components/resources/theme-toggle";
import type { CategoryWithArticles } from "@/lib/resources/content";
import { SessionCta } from "@/components/resources/session-cta";
import { OPEN_APP_URL } from "@/lib/resources/site";

export function SiteHeader({
  categories,
}: {
  categories: CategoryWithArticles[];
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-15 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <MobileNav categories={categories} />

        <Link
          href="/resources"
          className="touch-target -mx-2 flex shrink-0 items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Image
            src="/seedsense-icon.png"
            alt=""
            width={28}
            height={28}
            className="size-7"
            priority
          />
          <span className="text-[0.9375rem] tracking-tight whitespace-nowrap">
            <span className="font-semibold">SeedSense</span>{" "}
            <span className="font-normal text-muted-foreground">Help Center</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <div className="mr-2 hidden sm:block">
            <SearchTrigger />
          </div>

          <Link
            href="/resources/contact"
            className="hidden items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:inline-flex"
          >
            Contact
          </Link>

          {/*
            Same 1050px device split as the marketing chrome. Expressed as a
            single md..app range rather than `md:inline-flex app:hidden` —
            Tailwind sorts the custom `app` breakpoint ahead of `md`, so the
            two-rule form loses the cascade above 1050px and shows both CTAs.
          */}
          <a
            href={OPEN_APP_URL}
            className="hidden items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:max-app:inline-flex"
          >
            Open app
          </a>
          <SessionCta className="hidden items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none app:inline-flex" />

          <ThemeToggle />
        </div>
      </div>

      {/* The header search collapses on narrow screens; keep it reachable. */}
      <div className="border-t border-border px-4 py-2.5 sm:hidden">
        <SearchTrigger />
      </div>
    </header>
  );
}
