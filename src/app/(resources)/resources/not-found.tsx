import Link from "next/link";

import { Button } from "@/components/resources/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="text-sm font-medium text-brand-link">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        We could not find that guide
      </h1>
      <p className="text-muted-foreground">
        The link may be out of date, or the guide may have moved to a different
        topic. Searching usually finds it.
      </p>
      <div className="mt-2 flex gap-3">
        <Button asChild size="lg" className="touch-target">
          <Link href="/resources">Browse all topics</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="touch-target">
          <Link href="/resources/contact">Contact support</Link>
        </Button>
      </div>
    </div>
  );
}
