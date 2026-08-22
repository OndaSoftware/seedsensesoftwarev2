"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/resources/ui/button";
import { SUPPORT_EMAIL } from "@/lib/resources/site";

/**
 * Deliberately stores nothing. There is no backend on this site, so a vote is
 * acknowledged in the UI and, when unhelpful, routed to a human. If aggregate
 * feedback data is ever wanted, that needs a store and its own design.
 */
export function ArticleFeedback({ articleTitle }: { articleTitle: string }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  if (vote === "up") {
    return (
      <div className="rounded-xl border border-border bg-muted/60 p-4 text-sm">
        Glad it helped.
      </div>
    );
  }

  if (vote === "down") {
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/60 p-4 text-sm">
        <p className="font-medium">Sorry this one missed the mark.</p>
        <p className="text-muted-foreground">
          Tell us what you were trying to do and we will fix the guide.{" "}
          <Link
            className="text-brand-link underline underline-offset-2"
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
              `Help center feedback: ${articleTitle}`,
            )}`}
          >
            Email support
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-muted/60 p-4">
      <span className="text-sm font-medium">Was this helpful?</span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="touch-target"
          onClick={() => setVote("up")}
        >
          <ThumbsUp className="size-3.5" aria-hidden />
          Yes
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="touch-target"
          onClick={() => setVote("down")}
        >
          <ThumbsDown className="size-3.5" aria-hidden />
          No
        </Button>
      </div>
    </div>
  );
}
