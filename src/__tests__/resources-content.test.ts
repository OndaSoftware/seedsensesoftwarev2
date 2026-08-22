/**
 * @jest-environment node
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { toResourcesHref } from "@/lib/resources/href";

import {
  extractHeadings,
  getAllArticles,
  loadArticlesFrom,
  sortArticles,
  toPlainText,
  type Article,
} from "@/lib/resources/content";

/* ── fixture helpers ─────────────────────────────────────────────────────── */

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length > 0) {
    fs.rmSync(tempDirs.pop()!, { recursive: true, force: true });
  }
});

/** Builds a throwaway articles/ tree: { "trials/foo.mdx": "---\n…" }. */
function fixture(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "seedsense-help-"));
  tempDirs.push(root);

  for (const [relativePath, contents] of Object.entries(files)) {
    const fullPath = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, contents);
  }

  return root;
}

function article(frontmatter: string, body = "Body text."): string {
  return `---\n${frontmatter}\n---\n\n${body}\n`;
}

const VALID = `title: "Create a trial"
description: "How to create a trial."
order: 1
updated: "2026-08-19"`;

/* ── frontmatter validation ──────────────────────────────────────────────── */

describe("frontmatter validation", () => {
  it("parses a valid article and applies defaults", () => {
    const articles = loadArticlesFrom(
      fixture({ "trials/create-a-trial.mdx": article(VALID) }),
    );

    expect(articles).toHaveLength(1);
    expect(articles[0]).toMatchObject({
      title: "Create a trial",
      slug: "create-a-trial",
      categorySlug: "trials",
      href: "/resources/trials/create-a-trial",
      featured: false,
      popular: false,
      videoPending: false,
      keywords: [],
    });
    expect(articles[0].youtubeId).toBeUndefined();
  });

  it("rejects an unknown frontmatter key so typos cannot pass silently", () => {
    // `feautred` would otherwise parse fine and quietly drop the article off
    // the homepage — the exact failure the strict schema exists to prevent.
    const load = () =>
      loadArticlesFrom(
        fixture({ "trials/a.mdx": article(`${VALID}\nfeautred: true`) }),
      );

    expect(load).toThrow(/feautred/);
  });

  it.each([
    ["a full URL instead of an id", 'youtubeId: "https://youtu.be/abc12345678"'],
    ["an id of the wrong length", 'youtubeId: "tooshort"'],
  ])("rejects youtubeId given as %s", (_label, line) => {
    const load = () =>
      loadArticlesFrom(fixture({ "trials/a.mdx": article(`${VALID}\n${line}`) }));

    expect(load).toThrow(/youtubeId/);
  });

  it("accepts a well-formed 11-character youtubeId", () => {
    const articles = loadArticlesFrom(
      fixture({ "trials/a.mdx": article(`${VALID}\nyoutubeId: "dQw4w9WgXcQ"`) }),
    );

    expect(articles[0].youtubeId).toBe("dQw4w9WgXcQ");
  });

  it("rejects a non-ISO updated date", () => {
    const load = () =>
      loadArticlesFrom(
        fixture({
          "trials/a.mdx": article(
            `title: "T"\ndescription: "D"\norder: 1\nupdated: "19/08/2026"`,
          ),
        }),
      );

    expect(load).toThrow(/updated/);
  });

  it("rejects an empty title", () => {
    const load = () =>
      loadArticlesFrom(
        fixture({
          "trials/a.mdx": article(
            `title: ""\ndescription: "D"\norder: 1\nupdated: "2026-08-19"`,
          ),
        }),
      );

    expect(load).toThrow(/title/);
  });

  it("reports every problem at once rather than only the first", () => {
    const load = () =>
      loadArticlesFrom(
        fixture({
          "trials/a.mdx": article(`title: "A"\ndescription: "D"\norder: 1`),
          "trials/b.mdx": article(`title: "B"\ndescription: "D"\nupdated: "2026-08-19"`),
        }),
      );

    expect(load).toThrow(/2 problems/);
  });
});

/* ── structural rules ────────────────────────────────────────────────────── */

describe("structure", () => {
  it("fails when an article sits in an unregistered category folder", () => {
    const load = () =>
      loadArticlesFrom(fixture({ "not-a-category/a.mdx": article(VALID) }));

    expect(load).toThrow(/not a registered category/);
  });

  it("fails when two files resolve to the same URL", () => {
    const load = () =>
      loadArticlesFrom(
        fixture({
          "trials/duplicate.mdx": article(VALID),
          "trials/duplicate.md": article(VALID),
        }),
      );

    expect(load).toThrow(/collides/);
  });

  it("sorts by order, then alphabetically on ties", () => {
    const sorted = sortArticles([
      { order: 2, title: "Beta" },
      { order: 1, title: "Zulu" },
      { order: 2, title: "Alpha" },
    ] as Article[]);

    expect(sorted.map((item) => item.title)).toEqual(["Zulu", "Alpha", "Beta"]);
  });

  it("ignores dotfiles and non-article files", () => {
    const articles = loadArticlesFrom(
      fixture({
        "trials/real.mdx": article(VALID),
        "trials/.DS_Store": "junk",
        "trials/notes.txt": "junk",
      }),
    );

    expect(articles.map((item) => item.slug)).toEqual(["real"]);
  });
});

/* ── markdown parsing ────────────────────────────────────────────────────── */

describe("extractHeadings", () => {
  it("collects h2 and h3 with slugger ids, and skips h1 and h4", () => {
    const headings = extractHeadings(
      ["# Title", "## First section", "### A detail", "#### Too deep"].join("\n"),
    );

    expect(headings).toEqual([
      { level: 2, text: "First section", id: "first-section" },
      { level: 3, text: "A detail", id: "a-detail" },
    ]);
  });

  it("does not treat comments inside fenced code as headings", () => {
    const headings = extractHeadings(
      ["## Real heading", "", "```bash", "## not a heading", "```"].join("\n"),
    );

    expect(headings.map((heading) => heading.text)).toEqual(["Real heading"]);
  });

  it("de-duplicates ids the way github-slugger does", () => {
    const headings = extractHeadings(["## Setup", "## Setup"].join("\n"));

    expect(headings.map((heading) => heading.id)).toEqual(["setup", "setup-1"]);
  });

  it("strips inline markdown from heading text", () => {
    const headings = extractHeadings("## The **bold** [link](/x) part");

    expect(headings[0].text).toBe("The bold link part");
  });
});

describe("toPlainText", () => {
  it("drops JSX and code fences so search matches prose", () => {
    const text = toPlainText(
      ["<Callout variant=\"tip\">", "Sync **before** leaving.", "</Callout>"].join(
        "\n",
      ),
    );

    expect(text).toContain("Sync before leaving.");
    expect(text).not.toContain("Callout");
  });
});

/* ── the real content in this repo ───────────────────────────────────────── */

describe("shipped content", () => {
  const articles = getAllArticles();

  it("loads without validation errors", () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it("gives every article a unique URL", () => {
    const hrefs = articles.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("has articles flagged for both homepage sections", () => {
    expect(articles.some((item) => item.featured)).toBe(true);
    expect(articles.some((item) => item.popular)).toBe(true);
  });

  it("keeps descriptions short enough to fit a card", () => {
    const tooLong = articles
      .filter((item) => item.description.length > 160)
      .map((item) => `${item.href} (${item.description.length})`);

    expect(tooLong).toEqual([]);
  });
});

describe("in-article links", () => {
  /**
   * Article bodies are shared verbatim with the standalone help center, where
   * URLs have no /resources prefix. Mounted here they need one, or every
   * cross-reference in every article 404s.
   */
  it("prefixes a root-relative article link", () => {
    expect(toResourcesHref("/trials/create-a-trial")).toBe(
      "/resources/trials/create-a-trial",
    );
  });

  it("prefixes a category link", () => {
    expect(toResourcesHref("/varieties")).toBe("/resources/varieties");
  });

  it("maps the help center root to /resources, not /resources/", () => {
    expect(toResourcesHref("/")).toBe("/resources");
  });

  it("leaves an already-prefixed link alone", () => {
    expect(toResourcesHref("/resources/tasks/create-a-task")).toBe(
      "/resources/tasks/create-a-task",
    );
    expect(toResourcesHref("/resources")).toBe("/resources");
  });

  it("every in-article link resolves to a real page", () => {
    const hrefs = new Set(getAllArticles().map((item) => item.href));
    hrefs.add("/resources");
    hrefs.add("/resources/contact");
    for (const category of new Set(
      getAllArticles().map((item) => item.categorySlug),
    )) {
      hrefs.add(`/resources/${category}`);
    }

    const broken: string[] = [];
    const root = path.join(process.cwd(), "content", "articles");
    for (const folder of fs.readdirSync(root)) {
      for (const file of fs.readdirSync(path.join(root, folder))) {
        const body = fs.readFileSync(path.join(root, folder, file), "utf8");
        for (const match of body.matchAll(/\]\((\/[^)#\s]*)/g)) {
          const target = toResourcesHref(match[1].replace(/\/$/, ""));
          if (!hrefs.has(target)) broken.push(`${folder}/${file} → ${match[1]}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });
});
