"use client";

import type FuseType from "fuse.js";
import { FileText, PlayCircle, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/resources/ui/command";
import type { SearchDocument } from "@/lib/resources/search-index";

type SearchContextValue = {
  open: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used inside <SearchProvider>");
  }
  return context;
}

/** How many results to show before the list gets unhelpful. */
const MAX_RESULTS = 8;
/** Shown before the visitor types anything. */
const SUGGESTION_COUNT = 6;

export function SearchProvider({
  documents,
  children,
}: {
  documents: SearchDocument[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [fuse, setFuse] = useState<FuseType<SearchDocument> | null>(null);

  const open = useCallback(() => setIsOpen(true), []);

  // Cmd/Ctrl+K from anywhere.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((previous) => !previous);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Fuse is only needed once someone actually searches, so it stays out of the
  // initial bundle and loads on first open.
  useEffect(() => {
    if (!isOpen || fuse) return;
    let cancelled = false;

    void import("fuse.js").then(({ default: Fuse }) => {
      if (cancelled) return;
      setFuse(
        new Fuse(documents, {
          includeScore: true,
          threshold: 0.38,
          ignoreLocation: true,
          minMatchCharLength: 2,
          keys: [
            { name: "title", weight: 0.5 },
            { name: "description", weight: 0.2 },
            { name: "headings", weight: 0.12 },
            { name: "keywords", weight: 0.1 },
            { name: "excerpt", weight: 0.08 },
          ],
        }),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, fuse, documents]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return documents.slice(0, SUGGESTION_COUNT);
    if (!fuse) return [];
    return fuse
      .search(trimmed, { limit: MAX_RESULTS })
      .map((result) => result.item);
  }, [query, fuse, documents]);

  const goTo = useCallback(
    (href: string) => {
      setIsOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  const value = useMemo(() => ({ open }), [open]);

  return (
    <SearchContext.Provider value={value}>
      {children}

      <CommandDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Search the help center"
        description="Find a guide by title, topic, or keyword."
        className="top-[15%]"
      >
        {/* shouldFilter is off because Fuse ranks the list, not cmdk. */}
        <Command shouldFilter={false} className="[&_[data-slot=command-input-wrapper]]:p-2">
          <CommandInput
            placeholder="Search guides…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[60vh]">
            <CommandEmpty>
              {fuse ? (
                <span>
                  No guides match “{query.trim()}”. Try a different word, or{" "}
                  <Link className="underline" href="/resources/contact" onClick={() => setIsOpen(false)}>
                    contact support
                  </Link>
                  .
                </span>
              ) : (
                <span>Loading search…</span>
              )}
            </CommandEmpty>

            {results.length > 0 && (
              <CommandGroup heading={query.trim() ? "Results" : "Popular guides"}>
                {results.map((document) => (
                  <CommandItem
                    key={document.href}
                    value={document.href}
                    onSelect={() => goTo(document.href)}
                    className="flex items-start gap-3 py-2.5"
                  >
                    {document.hasVideo ? (
                      <PlayCircle className="mt-0.5 size-4 shrink-0 text-brand-link" />
                    ) : (
                      <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate font-medium">{document.title}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {document.categoryTitle} · {document.description}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </SearchContext.Provider>
  );
}

/** Compact trigger for the header. */
export function SearchTrigger() {
  const { open } = useSearch();
  return (
    <button
      type="button"
      onClick={open}
      className="touch-target flex h-9 w-full max-w-64 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <span className="truncate">Search guides…</span>
      <kbd className="ml-auto hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}

/** Full-width trigger for the homepage hero. */
export function HeroSearch() {
  const { open } = useSearch();
  return (
    <button
      type="button"
      onClick={open}
      className="flex h-13 w-full items-center gap-3 rounded-xl border border-border bg-background px-4 text-left text-base text-muted-foreground transition-colors duration-150 hover:border-foreground/25 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Search className="size-5 shrink-0" aria-hidden />
      <span className="truncate">Search for a guide…</span>
      <kbd className="ml-auto hidden shrink-0 rounded border border-border px-2 py-1 font-mono text-xs sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}
