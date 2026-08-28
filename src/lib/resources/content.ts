import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { z } from "zod";

import {
  categories,
  categorySlugs,
  getCategory,
  type Category,
} from "@content/categories";

/**
 * Reads `content/articles/<category>/<slug>.mdx` into a validated, ordered
 * registry.
 *
 * Design note: every problem found while loading is collected and thrown as a
 * single aggregated error. Failing on the first bad file means fixing content
 * one build at a time; failing with the whole list means fixing it once.
 */

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const ARTICLE_EXTENSIONS = [".mdx", ".md"];

/**
 * `strictObject` so an unknown key is an error. A typo like `feautred: true`
 * would otherwise parse fine and quietly drop the article off the homepage.
 */
const frontmatterSchema = z.strictObject({
  title: z.string().min(1, "title must not be empty"),
  description: z.string().min(1, "description must not be empty"),
  order: z.number().int().nonnegative(),
  /** YouTube IDs are exactly 11 characters of [A-Za-z0-9_-]. */
  youtubeId: z
    .string()
    .regex(
      /^[A-Za-z0-9_-]{11}$/,
      "youtubeId must be an 11-character YouTube video ID, not a full URL",
    )
    .optional(),
  /** Marks the video slot as intentionally empty, pending recording. */
  videoPending: z.boolean().default(false),
  videoDuration: z
    .string()
    .regex(/^\d{1,2}:\d{2}$/, "videoDuration must look like 4:05")
    .optional(),
  /**
   * The recording's own title on YouTube. One video often covers several
   * articles, and the player otherwise labels itself with the article's title —
   * which would promise a walkthrough of a page the video never opens.
   */
  videoTitle: z.string().min(1, "videoTitle must not be empty").optional(),
  /** The video covers this topic but was recorded for a different article. */
  videoRelated: z.boolean().default(false),
  featured: z.boolean().default(false),
  popular: z.boolean().default(false),
  updated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "updated must be an ISO date, e.g. 2026-08-19"),
  keywords: z.array(z.string()).default([]),
})
  /** A video label with no video behind it is a content mistake, not a no-op. */
  .superRefine((value, ctx) => {
    if (value.youtubeId) return;
    for (const field of ["videoTitle", "videoRelated"] as const) {
      if (value[field]) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: `${field} only applies when youtubeId is set`,
        });
      }
    }
  });

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type Heading = {
  /** 2 or 3 — h1 belongs to the page title, deeper levels are not linked. */
  level: 2 | 3;
  text: string;
  /** Matches the id rehype-slug generates, so anchors line up. */
  id: string;
};

export type Article = Frontmatter & {
  slug: string;
  categorySlug: string;
  href: string;
  /** Raw MDX body with frontmatter removed. */
  body: string;
  headings: Heading[];
  readingTimeMinutes: number;
};

export type CategoryWithArticles = Category & {
  articles: Article[];
  articleCount: number;
};

/* ── parsing helpers ─────────────────────────────────────────────────────── */

/** Fenced code can contain `## comments` that are not headings. */
function stripCodeFences(markdown: string): string {
  return markdown.replace(/^```[\s\S]*?^```/gm, "");
}

export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of stripCodeFences(markdown).split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    // Strip inline markdown so the sidebar shows words, not syntax.
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    if (!text) continue;

    headings.push({
      level: match[1].length as 2 | 3,
      text,
      id: slugger.slug(text),
    });
  }

  return headings;
}

/** Rough plain-text projection of MDX, for search and reading time. */
export function toPlainText(markdown: string): string {
  return stripCodeFences(markdown)
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readingTime(markdown: string): number {
  const words = toPlainText(markdown).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ── loading ─────────────────────────────────────────────────────────────── */

function articleFilesIn(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        ARTICLE_EXTENSIONS.includes(path.extname(entry.name)) &&
        !entry.name.startsWith("."),
    )
    .map((entry) => entry.name);
}

/** Exported so tests can point it at a fixture directory. */
export function loadArticlesFrom(articlesDir: string): Article[] {
  const problems: string[] = [];
  const articles: Article[] = [];

  if (!fs.existsSync(articlesDir)) {
    throw new Error(`Help center content directory not found: ${articlesDir}`);
  }

  const folders = fs
    .readdirSync(articlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const folder of folders) {
    if (!categorySlugs.includes(folder)) {
      problems.push(
        `articles/${folder}/ is not a registered category. ` +
          `Add it to content/categories.ts or move the articles.`,
      );
      continue;
    }

    const seenSlugs = new Map<string, string>();

    for (const file of articleFilesIn(path.join(articlesDir, folder))) {
      const relativePath = `articles/${folder}/${file}`;
      const slug = path.basename(file, path.extname(file));

      const previous = seenSlugs.get(slug);
      if (previous) {
        problems.push(
          `${relativePath} collides with ${previous}: both resolve to /${folder}/${slug}.`,
        );
        continue;
      }
      seenSlugs.set(slug, relativePath);

      const raw = fs.readFileSync(path.join(articlesDir, folder, file), "utf8");
      const { data, content } = matter(raw);

      const parsed = frontmatterSchema.safeParse(data);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path.join(".") || "(root)";
          problems.push(`${relativePath} → ${field}: ${issue.message}`);
        }
        continue;
      }

      articles.push({
        ...parsed.data,
        slug,
        categorySlug: folder,
        href: `/resources/${folder}/${slug}`,
        body: content,
        headings: extractHeadings(content),
        readingTimeMinutes: readingTime(content),
      });
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `Invalid help center content (${problems.length} problem${
        problems.length === 1 ? "" : "s"
      }):\n` + problems.map((problem) => `  • ${problem}`).join("\n"),
    );
  }

  return sortArticles(articles);
}

export function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title),
  );
}

/**
 * Cached in production only. In dev the registry is rebuilt each request so a
 * newly added .mdx file shows up without restarting the server.
 */
let cachedArticles: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (process.env.NODE_ENV === "production" && cachedArticles) {
    return cachedArticles;
  }
  cachedArticles = loadArticlesFrom(ARTICLES_DIR);
  return cachedArticles;
}

/* ── queries ─────────────────────────────────────────────────────────────── */

export function getArticlesInCategory(categorySlug: string): Article[] {
  return getAllArticles().filter(
    (article) => article.categorySlug === categorySlug,
  );
}

export function getArticle(
  categorySlug: string,
  slug: string,
): Article | undefined {
  return getAllArticles().find(
    (article) =>
      article.categorySlug === categorySlug && article.slug === slug,
  );
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((article) => article.featured);
}

export function getPopularArticles(): Article[] {
  return getAllArticles().filter((article) => article.popular);
}

export function getCategoriesWithArticles(): CategoryWithArticles[] {
  const all = getAllArticles();
  return categories.map((category) => {
    const inCategory = all.filter(
      (article) => article.categorySlug === category.slug,
    );
    return {
      ...category,
      articles: inCategory,
      articleCount: inCategory.length,
    };
  });
}

/** Previous/next within the same category, for the article footer. */
export function getAdjacentArticles(
  categorySlug: string,
  slug: string,
): { previous: Article | null; next: Article | null } {
  const inCategory = getArticlesInCategory(categorySlug);
  const index = inCategory.findIndex((article) => article.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: inCategory[index - 1] ?? null,
    next: inCategory[index + 1] ?? null,
  };
}

export function getAllArticleParams(): { category: string; slug: string }[] {
  return getAllArticles().map((article) => ({
    category: article.categorySlug,
    slug: article.slug,
  }));
}

export { categories, getCategory };
export type { Category };
