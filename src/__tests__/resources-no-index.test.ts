/**
 * @jest-environment node
 */
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { NOINDEX_HEADER, NOINDEX_METADATA } from "@/lib/resources/no-index";
import { buildSearchIndex } from "@/lib/resources/search-index";

/**
 * The customer-facing requirement is that the /resources help center never
 * shows up in a search engine, while the marketing site around it stays fully
 * indexable. These tests exist so neither half of that can regress unnoticed —
 * for example by someone widening robots.txt, or adding the help center to the
 * sitemap because a tool suggested it.
 *
 * See src/lib/resources/no-index.ts for the three layers asserted here.
 */
describe("keeping the help center out of search engines", () => {
  it("disallows /resources/ while leaving the marketing site crawlable", () => {
    expect(robots().rules).toEqual({
      userAgent: "*",
      allow: "/",
      disallow: "/resources/",
    });
  });

  it("still advertises the marketing sitemap", () => {
    expect(robots().sitemap).toBe("https://seedsensesoftware.com/sitemap.xml");
  });

  it("lists no help-center URL in the sitemap", () => {
    const resourceUrls = sitemap()
      .map((entry) => entry.url)
      .filter((url) => url.includes("/resources"));

    expect(resourceUrls).toEqual([]);
  });

  it("sets noindex and nofollow in the resources layout metadata", () => {
    expect(NOINDEX_METADATA).toMatchObject({ index: false, follow: false });
  });

  it("tells Googlebot specifically not to index, follow, or preview", () => {
    expect(NOINDEX_METADATA).toMatchObject({
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-image-preview": "none",
      },
    });
  });

  /**
   * Not applied on GitHub Pages — a static export serves no middleware and can
   * set no headers. Asserted anyway so the directives stay correct for whenever
   * the site moves to a host that can serve them.
   */
  it("keeps an X-Robots-Tag value covering indexing, archiving, and snippets", () => {
    for (const directive of [
      "noindex",
      "nofollow",
      "noarchive",
      "nosnippet",
      "noimageindex",
    ]) {
      expect(NOINDEX_HEADER).toContain(directive);
    }
  });
});

describe("the search index", () => {
  it("carries one entry per article with the fields the dialog renders", () => {
    const documents = buildSearchIndex();

    expect(documents.length).toBeGreaterThan(0);
    for (const document of documents) {
      expect(document.href).toMatch(/^\/resources\/[a-z0-9-]+\/[a-z0-9-]+$/);
      expect(document.title).not.toHaveLength(0);
      expect(document.categoryTitle).not.toHaveLength(0);
    }
  });

  it("keeps every article link inside the help center", () => {
    const stray = buildSearchIndex()
      .map((document) => document.href)
      .filter((href) => !href.startsWith("/resources/"));

    expect(stray).toEqual([]);
  });
});
