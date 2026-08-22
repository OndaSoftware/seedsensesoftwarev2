import { Video } from "lucide-react";

/**
 * Stands in for an article's walkthrough until the video is recorded.
 *
 * Deliberately a slim bar rather than an empty 16:9 frame — a full-height
 * placeholder pushes the actual guide below the fold to advertise something
 * that does not exist yet.
 *
 * Rendered when frontmatter sets `videoPending: true` and no `youtubeId` is
 * present. Adding the real id replaces this with the player; nothing else in
 * the article changes.
 */
export function VideoPlaceholder({ title }: { title: string }) {
  return (
    <div
      role="note"
      aria-label={`Video walkthrough for ${title} is not available yet`}
      className="my-6 flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-3"
    >
      <Video className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          Video walkthrough coming soon.
        </span>{" "}
        The written steps below cover everything in the meantime.
      </p>
    </div>
  );
}
