"use client";

import { ExternalLink, Menu, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { SidebarNav } from "@/components/resources/sidebar-nav";
import { Button } from "@/components/resources/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/resources/ui/sheet";
import type { CategoryWithArticles } from "@/lib/resources/content";
import { OPEN_APP_URL } from "@/lib/resources/site";

export function MobileNav({
  categories,
}: {
  categories: CategoryWithArticles[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open help topics"
          className="touch-target-icon lg:hidden"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 overflow-y-auto p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Help topics</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <SidebarNav
            categories={categories}
            onNavigate={() => setIsOpen(false)}
          />
        </div>

        {/*
          The header hides these below the md breakpoint to keep the bar from
          crowding, so without them here "Open app" would be unreachable on a
          phone.
        */}
        <div className="mt-auto flex flex-col gap-1 border-t border-border p-4 text-sm">
          <Link
            href="/resources/contact"
            onClick={() => setIsOpen(false)}
            className="touch-target flex items-center gap-2.5 rounded-lg px-2 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            Contact support
          </Link>
          <a
            href={OPEN_APP_URL}
            className="touch-target flex items-center gap-2.5 rounded-lg px-2 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden />
            Open app
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
