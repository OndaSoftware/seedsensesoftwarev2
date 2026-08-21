interface ArticleVideoProps {
  src: string;
  caption?: string;
}

/** An embedded article video with the shared rounded/shadow treatment. */
export default function ArticleVideo({ src, caption }: ArticleVideoProps) {
  return (
    <figure className="my-8">
      <video
        controls
        muted
        playsInline
        preload="metadata"
        className="w-full rounded-xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
      >
        <source src={src} type="video/mp4" data-testid="article-video-source" />
        Your browser does not support embedded videos.
      </video>
      {caption && (
        <figcaption className="mt-3 text-center text-[0.85rem] text-[#718096]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
