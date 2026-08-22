"use client";

import { useSyncExternalStore } from "react";
import {
  getServerSessionSnapshot,
  getSessionSnapshot,
  subscribeToSession,
} from "@/lib/session";
import { site } from "@/lib/site";

/**
 * Desktop call to action: the signed-in label when the visitor has a live
 * session on app.seedsensesoftware.com, the signed-out label otherwise.
 *
 * The site is a static export, so every page is prerendered with no request
 * context and the cookie can only be read in the browser. useSyncExternalStore
 * models that directly: its server snapshot is "signed out" — correct for
 * nearly every visitor and stable enough that hydration never mismatches — and
 * React re-reads the client snapshot afterwards, which is what swaps the
 * label for anyone already signed in.
 *
 * Both states point at the same URL. The app decides what to render there; the
 * session only changes the label.
 */
export default function SessionCta({
  className = "",
  signedInLabel = "Dashboard",
  signedOutLabel = "Login",
}: {
  className?: string;
  signedInLabel?: string;
  signedOutLabel?: string;
}) {
  const session = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );

  return (
    <a
      href={site.portalUrl}
      aria-label={
        session?.name ? `${signedInLabel} — signed in as ${session.name}` : undefined
      }
      className={`whitespace-nowrap ${className}`}
    >
      {session ? signedInLabel : signedOutLabel}
    </a>
  );
}
