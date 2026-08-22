import { site } from "@/lib/site";

/**
 * Phone / tablet call to action, shown below the 1050px breakpoint the Flutter
 * app itself uses to refuse the web experience.
 *
 * Deliberately a plain anchor with no JavaScript. The usual "did the app
 * open?" timer heuristic cannot work here: a same-tab navigation fires
 * pagehide whether the native app took over or the browser simply followed the
 * link, so the two outcomes are indistinguishable from script.
 *
 * Instead the fallback lives at the destination. site.openAppUrl is claimed by
 * the native app via Universal Links / App Links, so an installed app
 * intercepts it and this page never loads. If the app is not installed, a
 * small static page (web/open/index.html in the seedsense repo, served by
 * Firebase Hosting ahead of the Flutter bundle) forwards to the right store.
 * No guessing, and it degrades correctly with JavaScript disabled.
 */
export default function OpenAppButton({
  className = "",
  label = "Open App",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a href={site.openAppUrl} className={`whitespace-nowrap ${className}`}>
      {label}
    </a>
  );
}
