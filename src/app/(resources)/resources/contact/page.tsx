import { Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/resources/breadcrumbs";
import { Button } from "@/components/resources/ui/button";
import {
  SUPPORT_EMAIL,
  SUPPORT_RESPONSE_TIME,
} from "@/lib/resources/site";

export const metadata: Metadata = {
  title: "Contact support",
  description:
    "Reach the SeedSense team when a guide does not answer your question.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs items={[{ label: "Contact support" }]} />

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        Contact support
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        If a guide did not answer your question, write to us. We reply within{" "}
        {SUPPORT_RESPONSE_TIME}.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Mail className="size-4.5 text-brand-link" aria-hidden />
          Email us
        </h2>
        <p className="mt-2 text-muted-foreground">
          <a
            className="text-brand-link underline underline-offset-2"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
        <Button asChild size="lg" className="touch-target mt-5">
          <a href={`mailto:${SUPPORT_EMAIL}`}>Open your mail app</a>
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-brand-canvas p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MessageSquare className="size-4.5 text-brand-link" aria-hidden />
          What to include
        </h2>
        <p className="mt-2 text-muted-foreground">
          These four things let us reproduce almost any problem on the first
          reply:
        </p>
        <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
          <li>The trial or variety name you were working on.</li>
          <li>What you expected to happen, and what happened instead.</li>
          <li>
            Whether the device was online or offline at the time, and whether the
            trial shows as synced.
          </li>
          <li>The device and app version, from Settings.</li>
        </ul>
      </div>
    </div>
  );
}
