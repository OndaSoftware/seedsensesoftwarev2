import { getCategory } from "@content/categories";

import { getAllArticles, toPlainText } from "./content";

/**
 * A flat, serialisable projection of every article, built once at build time
 * and handed to the client search dialog.
 *
 * At roughly forty articles this is a few kilobytes gzipped, which is far
 * cheaper than standing up a search service or an API route.
 */
export type SearchDocument = {
  href: string;
  title: string;
  description: string;
  categorySlug: string;
  categoryTitle: string;
  headings: string;
  keywords: string;
  excerpt: string;
  hasVideo: boolean;
};

/** Enough body text to match on, without shipping whole articles. */
const EXCERPT_LENGTH = 320;

export function buildSearchIndex(): SearchDocument[] {
  return getAllArticles().map((article) => ({
    href: article.href,
    title: article.title,
    description: article.description,
    categorySlug: article.categorySlug,
    categoryTitle: getCategory(article.categorySlug)?.title ?? article.categorySlug,
    headings: article.headings.map((heading) => heading.text).join(" · "),
    keywords: article.keywords.join(" "),
    excerpt: toPlainText(article.body).slice(0, EXCERPT_LENGTH),
    hasVideo: Boolean(article.youtubeId),
  }));
}
