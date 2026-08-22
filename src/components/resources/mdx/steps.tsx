import { cn } from "@/lib/resources/utils";

/**
 * Numbered walkthrough used inside MDX:
 *
 *   <Steps>
 *     <Step title="Open the trial">…</Step>
 *   </Steps>
 */
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex flex-col gap-0 [counter-reset:step]">{children}</div>
  );
}

export function Step({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative border-l border-border pb-6 pl-8 last:border-l-transparent last:pb-0 [counter-increment:step]",
        className,
      )}
    >
      <span
        aria-hidden
        className="tabular absolute top-0 -left-[13px] flex size-6.5 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-brand-link before:content-[counter(step)]"
      />
      <p className="mb-1.5 font-semibold tracking-tight text-balance">{title}</p>
      <div className="text-[0.9375rem] leading-relaxed text-pretty text-muted-foreground [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
