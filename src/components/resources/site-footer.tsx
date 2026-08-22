import Link from "next/link";

import { SUPPORT_EMAIL } from "@/lib/resources/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-brand-canvas">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} SeedSense. Guides for trial teams in the
          field.
        </p>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/resources" className="touch-target hover:text-foreground">
            All topics
          </Link>
          <Link href="/resources/contact" className="touch-target hover:text-foreground">
            Contact support
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="touch-target hover:text-foreground">
            {SUPPORT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  );
}
