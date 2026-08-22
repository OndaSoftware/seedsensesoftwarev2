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
 */
export function VideoEmbed({
  youtubeId,
  title,
  duration,
}: {
  youtubeId: string;
  title: string;
  duration?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  // maxresdefault is missing for lower-resolution uploads; hqdefault always
  // exists, and object-cover crops its 4:3 letterboxing back to 16:9.
  const [posterUrl, setPosterUrl] = useState(
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
  );

  if (isPlaying) {
    return (
      <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={`${title} — video walkthrough`}
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
      aria-label={`Play video walkthrough: ${title}`}
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

      <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
        Watch the walkthrough
        {duration ? <span className="opacity-75">{duration}</span> : null}
      </span>
    </button>
  );
}
