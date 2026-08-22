"use client";

import { useSyncExternalStore } from "react";

import {
  getServerSessionSnapshot,
  getSessionSnapshot,
  subscribeToSession,
} from "@/lib/session";
import { APP_URL } from "@/lib/resources/site";

/**
 * Help-center twin of src/components/SessionCta.tsx.
 *
 * The session *logic* is shared (src/lib/session.ts is plain TypeScript), but
 * the component is not: resources.css excludes `../../components/*.tsx` from
 * its Tailwind sources, so classes on the marketing components are never
 * compiled into the help-center stylesheet. The two chromes are deliberately
 * separate documents; only the cookie contract is common.
 */
export function SessionCta({ className = "" }: { className?: string }) {
  const session = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );

  return (
    <a
      href={APP_URL}
      aria-label={
        session?.name ? `Dashboard — signed in as ${session.name}` : undefined
      }
      className={className}
    >
      {session ? "Dashboard" : "Login"}
    </a>
  );
}
