import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleFeedback } from "@/components/resources/article-feedback";
import { Breadcrumbs } from "@/components/resources/breadcrumbs";
import { MdxContent } from "@/components/resources/mdx/mdx-content";
import { TableOfContents } from "@/components/resources/table-of-contents";
import { VideoEmbed } from "@/components/resources/video-embed";
import { VideoPlaceholder } from "@/components/resources/video-placeholder";
import {
  getAdjacentArticles,
  getAllArticleParams,
  getArticle,
  getCategory,
} from "@/lib/resources/content";

export function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata(
  props: PageProps<"/resources/[category]/[slug]">,
): Promise<Metadata> {
  const { category, slug } = await props.params;
  const article = getArticle(category, slug);
  if (!article) return {};

  return { title: article.title, description: article.description };
}

export default async function ArticlePage(
  props: PageProps<"/resources/[category]/[slug]">,
) {
  const { category: categorySlug, slug } = await props.params;

  const article = getArticle(categorySlug, slug);
  const category = getCategory(categorySlug);
  if (!article || !category) notFound();

  const { previous, next } = getAdjacentArticles(categorySlug, slug);

  return (
    <div className="flex gap-10">
      <article className="min-w-0 max-w-2xl flex-1">
        <Breadcrumbs
          items={[
            { label: category.title, href: `/resources/${category.slug}` },
            { label: article.title },
          ]}
        />

        <header className="mt-5">
          <p className="mb-2.5 text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
            {category.title}
          </p>
          <h1 className="text-[2.125rem] leading-[1.12] font-semibold tracking-[-0.025em] text-balance">
            {article.title}
          </h1>
          <p className="mt-3.5 text-[1.125rem] leading-relaxed text-pretty text-muted-foreground">
            {article.description}
          </p>
          <p className="tabular mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {article.readingTimeMinutes} min read
            </span>
            <span aria-hidden>·</span>
            <span>
              Updated{" "}
              <time dateTime={article.updated}>
                {new Date(`${article.updated}T00:00:00Z`).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
                )}
              </time>
            </span>
          </p>
        </header>

        {article.youtubeId ? (
          <VideoEmbed
            youtubeId={article.youtubeId}
            title={article.title}
            duration={article.videoDuration}
          />
        ) : article.videoPending ? (
          <VideoPlaceholder title={article.title} />
        ) : null}

        <div className="prose-article mt-8">
          <MdxContent source={article.body} />
        </div>

        <div className="mt-12">
          <ArticleFeedback articleTitle={article.title} />
        </div>

        {(previous || next) && (
          <nav
            aria-label="More in this topic"
            className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={previous.href}
                className="group flex flex-col gap-1 rounded-xl border border-border p-4 transition-colors duration-150 hover:border-foreground/20 hover:bg-muted/50"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowLeft className="size-3.5" aria-hidden />
                  Previous
                </span>
                <span className="font-medium text-balance group-hover:text-brand-link">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={next.href}
                className="group flex flex-col gap-1 rounded-xl border border-border p-4 text-right transition-colors duration-150 hover:border-foreground/20 hover:bg-muted/50"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                  Next
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
                <span className="font-medium text-balance group-hover:text-brand-link">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        )}
      </article>

      <aside className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <TableOfContents headings={article.headings} />
        </div>
      </aside>
    </div>
  );
}
