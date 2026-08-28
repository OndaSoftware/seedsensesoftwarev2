"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/**
 * A facade in front of the YouTube player.
 *
 * Rendering the real iframe on every article would pull in roughly a megabyte
 * of YouTube JavaScript and set YouTube cookies for readers who never press
 * play. Instead we show the poster frame and swap in the iframe on activation,
 * pointed at youtube-nocookie.com.
 *
 * Videos themselves are set to Unlisted in YouTube Studio — the site cannot
 * enforce that, it is an operator step.
 *
 * One recording often covers several articles. When it is not this article's
 * own walkthrough, `related` labels it as such and `videoTitle` names what the
 * reader is actually about to watch — otherwise the play button would promise
 * a walkthrough of a page the video never opens.
 */
export function VideoEmbed({
  youtubeId,
  title,
  duration,
  videoTitle,
  related = false,
}: {
  youtubeId: string;
  /** The article the player sits on, used when the video has no title of its own. */
  title: string;
  duration?: string;
  /** The recording's own title on YouTube. */
  videoTitle?: string;
  related?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  // maxresdefault is missing for lower-resolution uploads; hqdefault always
  // exists, and object-cover crops its 4:3 letterboxing back to 16:9.
  const [posterUrl, setPosterUrl] = useState(
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
  );

  const label = videoTitle ?? title;
  const accessibleName = related
    ? `Play related walkthrough: ${label}`
    : `Play video walkthrough: ${label}`;

  if (isPlaying) {
    return (
      <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={`${label} — video walkthrough`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={accessibleName}
      className="group relative my-6 block aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Image
        src={posterUrl}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 720px"
        className="media-edge object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        onError={() =>
          setPosterUrl(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)
        }
      />

      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-white transition-transform duration-200 group-hover:scale-105">
          <Play className="ml-1 size-7 fill-[#0d5e00] text-[#0d5e00]" aria-hidden />
        </span>
      </span>

      <span className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-left">
        <span className="rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
          {related ? "Related walkthrough" : "Watch the walkthrough"}
          {duration ? <span className="ml-2 opacity-75">{duration}</span> : null}
        </span>
        {related && videoTitle ? (
          <span className="min-w-0 truncate rounded-md bg-black/70 px-2.5 py-1 text-xs text-white/90">
            {videoTitle}
          </span>
        ) : null}
      </span>
    </button>
  );
}
