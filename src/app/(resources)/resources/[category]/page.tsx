import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/resources/article-card";
import { CategoryIcon } from "@/components/resources/category-icon";
import { Breadcrumbs } from "@/components/resources/breadcrumbs";
import { categories, getArticlesInCategory, getCategory } from "@/lib/resources/content";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata(
  props: PageProps<"/resources/[category]">,
): Promise<Metadata> {
  const { category: categorySlug } = await props.params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  return { title: category.title, description: category.description };
}

export default async function CategoryPage(props: PageProps<"/resources/[category]">) {
  const { category: categorySlug } = await props.params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const articles = getArticlesInCategory(categorySlug);

  return (
    <article>
      <Breadcrumbs items={[{ label: category.title }]} />

      <header className="mt-5">
        <span className="flex items-center gap-2 text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
          <CategoryIcon
            name={category.icon}
            className="size-3.5 text-brand-link"
          />
          Topic
        </span>
        <h1 className="mt-2.5 text-[2rem] leading-tight font-semibold tracking-[-0.02em]">
          {category.title}
        </h1>
        <p className="mt-2.5 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-muted-foreground">
          {category.description}
        </p>
        <p className="tabular mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
          {articles.length} {articles.length === 1 ? "guide" : "guides"}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border bg-muted/60 p-6 text-sm text-muted-foreground">
          No guides in this topic yet.
        </p>
      ) : (
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.href} article={article} />
          ))}
        </div>
      )}
    </article>
  );
}
