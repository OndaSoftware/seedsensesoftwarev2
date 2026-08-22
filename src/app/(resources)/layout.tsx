import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { SearchProvider } from "@/components/resources/search/search-provider";
import { SiteFooter } from "@/components/resources/site-footer";
import { SiteHeader } from "@/components/resources/site-header";
import { ThemeProvider } from "@/components/resources/theme-provider";
import { getCategoriesWithArticles } from "@/lib/resources/content";
import { NOINDEX_METADATA } from "@/lib/resources/no-index";
import { buildSearchIndex } from "@/lib/resources/search-index";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/resources/site";

import "./resources.css";

/**
 * Second root layout, owning everything under /resources.
 *
 * The help center is a *separate document* from the marketing site, not a
 * nested section of it. That is deliberate and load-bearing: both are Tailwind
 * v4 apps that define the same theme token names — `--color-primary`,
 * `--color-secondary`, `--color-accent`, `--font-sans` — with different values.
 * Sharing one document would mean one palette silently overwriting the other.
 *
 * Next.js route groups let each group carry its own <html>/<body>, so
 * `resources.css` is only ever loaded here and `src/app/globals.css` is only
 * ever loaded by `(site)`. The trade-off is that crossing between the two
 * triggers a full page load rather than a client-side transition, which is the
 * right behaviour for what are effectively two sites sharing one domain.
 */

/**
 * The same pairing the marketing site uses in `(site)/layout.tsx` — Inter for
 * text, Fraunces for headings. The two route groups are separate documents, so
 * the fonts have to be declared twice; they must not drift apart, or crossing
 * from a landing page into the help center visibly changes typeface.
 *
 * Fraunces carries the same axes as `(site)` so `resources.css` can apply the
 * identical opsz 18 / WONK 0 lock.
 */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "WONK"],
});

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_TAGLINE,

  /**
   * Layer 2 of 3 keeping this help center out of search results, inherited by
   * every route below it. See src/lib/resources/no-index.ts for the policy.
   */
  robots: NOINDEX_METADATA,
};

export default function ResourcesRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = getCategoriesWithArticles();
  const searchDocuments = buildSearchIndex();

  return (
    <html
      lang="en"
      // next-themes writes the class on <html> before paint; without this React
      // warns about the server/client mismatch it deliberately creates.
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider documents={searchDocuments}>
            <SiteHeader categories={categories} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
