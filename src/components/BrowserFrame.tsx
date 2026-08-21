import type { ReactNode } from "react";
import { site } from "@/lib/site";

/**
 * A light browser-chrome wrapper for desktop product screenshots,
 * so website UI is visually distinct from the phone mockups.
 */
export default function BrowserFrame({
  children,
  url = site.portalUrl.replace(/\/$/, ""),
}: {
  children: ReactNode;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-sage/40 bg-white shadow-[0_24px_56px_rgba(10,26,16,0.14),0_4px_16px_rgba(10,26,16,0.06)]">
      <div className="flex items-center gap-2 border-b border-sage/30 bg-[#eef4ef] px-3.5 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#c9b8a8]" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#d4c89a]" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#9cc4a4]" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-[0.68rem] tracking-wide text-fern">
          {url.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
