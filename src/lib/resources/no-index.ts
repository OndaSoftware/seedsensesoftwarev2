import type { Metadata } from "next";

/**
 * Single source of truth for keeping the /resources help center out of search
 * engines, while the marketing site around it stays fully indexable.
 *
 * The links are shared directly with paying customers. Three independent layers
 * enforce that, so no single mistake exposes the section:
 *
 *   1. src/app/robots.ts              → `Disallow: /resources/`
 *   2. src/app/(resources)/layout.tsx → NOINDEX_METADATA below, inherited by
 *                                        every route under /resources
 *   3. src/app/sitemap.ts             → resources routes are never listed
 *
 * There used to be a fourth layer — an `X-Robots-Tag` response header set by
 * Next middleware (`src/proxy.ts` in the standalone help-center repo). It did
 * not survive the merge into this site: the marketing site builds with
 * `output: "export"` and deploys to GitHub Pages, which serves static files and
 * runs no middleware, so no response header can be set. See NOINDEX_HEADER.
 *
 * This is obscurity, not access control: anyone holding a URL can read any
 * article. Nothing published here may contain customer data or credentials.
 */

/**
 * Value the `X-Robots-Tag` response header should carry.
 *
 * NOT CURRENTLY APPLIED. GitHub Pages cannot set response headers and a static
 * export has no middleware to set them from. It is kept as the one place to
 * read the intended directives from if this site ever moves to a host that can
 * serve headers (Netlify `_headers`, Cloudflare Pages, Vercel, nginx).
 *
 * Its advantage over the meta tag is that it also covers non-HTML responses —
 * images, JSON, the search index — which a robots meta tag cannot reach.
 */
export const NOINDEX_HEADER =
  "noindex, nofollow, noarchive, nosnippet, noimageindex";

/** Resources-layout robots metadata, inherited by every page under /resources. */
export const NOINDEX_METADATA: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-snippet": -1,
    "max-image-preview": "none",
  },
};
