import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ArticleCard, ArticleRow } from "@/components/resources/article-card";
import { CategoryGrid } from "@/components/resources/category-card";
import { Hero } from "@/components/resources/hero";
import { Button } from "@/components/resources/ui/button";
import {
  getCategoriesWithArticles,
  getFeaturedArticles,
  getPopularArticles,
} from "@/lib/resources/content";
import { SUPPORT_EMAIL, SUPPORT_RESPONSE_TIME } from "@/lib/resources/site";

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="text-sm text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const categories = getCategoriesWithArticles();
  const featured = getFeaturedArticles();
  const popular = getPopularArticles();

  const topicTitleBySlug = new Map(
    categories.map((category) => [category.slug, category.title]),
  );

  return (
    <>
      <Hero />

      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pt-10 pb-16 sm:px-6">
        {featured.length > 0 && (
          <section>
            <SectionHeading
              title="Start here"
              description="The guides new trial teams read first."
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((article) => (
                <ArticleCard
                  key={article.href}
                  article={article}
                  eyebrow={topicTitleBySlug.get(article.categorySlug)}
                />
              ))}
            </div>
          </section>
        )}

        <section className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <SectionHeading
              title="Browse by topic"
              description="Every guide, grouped the way the app is."
            />
            <CategoryGrid categories={categories} />
          </div>

          <div className="flex flex-col gap-8">
            {popular.length > 0 && (
              <div>
                <SectionHeading title="Most read" />
                <div className="-mx-3 flex flex-col">
                  {popular.map((article, index) => (
                    <ArticleRow
                      key={article.href}
                      article={article}
                      rank={index + 1}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold tracking-tight">Still stuck?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                Send us the trial or variety you were working on. We reply within{" "}
                {SUPPORT_RESPONSE_TIME}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="lg" className="touch-target">
                  <Link href="/resources/contact">
                    Contact support
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="touch-target">
                  <a href={`mailto:${SUPPORT_EMAIL}`}>Email</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
