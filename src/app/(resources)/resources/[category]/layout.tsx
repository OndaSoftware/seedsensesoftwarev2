import { SidebarNav } from "@/components/resources/sidebar-nav";
import { getCategoriesWithArticles } from "@/lib/resources/content";

/**
 * Adds the persistent topic sidebar to every category and article page. The
 * homepage and /contact sit outside this layout so they can run full width.
 */
export default function CategoryLayout({ children }: LayoutProps<"/resources/[category]">) {
  const categories = getCategoriesWithArticles();

  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <SidebarNav categories={categories} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
