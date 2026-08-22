import { AlertTriangle, Info, Lightbulb, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/resources/utils";

type CalloutVariant = "note" | "tip" | "warning";

const VARIANTS: Record<
  CalloutVariant,
  { icon: LucideIcon; label: string; className: string; iconClassName: string }
> = {
  note: {
    icon: Info,
    label: "Note",
    className: "border-l-muted-foreground/40 bg-muted/60",
    iconClassName: "text-muted-foreground",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    className: "border-l-primary bg-accent/60 dark:bg-accent/40",
    iconClassName: "text-brand-link",
  },
  warning: {
    icon: AlertTriangle,
    label: "Careful",
    className: "border-l-[#F0B429] bg-[#F0B429]/8 dark:bg-[#F0B429]/12",
    iconClassName: "text-[#8A6100] dark:text-[#F0B429]",
  },
};

/** Used inside MDX as `<Callout variant="tip">…</Callout>`. */
export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, className, iconClassName } = VARIANTS[variant];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-r-xl border-l-[3px] py-4 pr-4 pl-3.5 text-[0.9375rem] [&>div>p:last-child]:mb-0",
        className,
      )}
    >
      <Icon className={cn("mt-0.5 size-4.5 shrink-0", iconClassName)} aria-hidden />
      <div className="min-w-0">
        <p className="mb-1 text-[0.8125rem] font-semibold tracking-wide uppercase">
          {title ?? label}
        </p>
        {children}
      </div>
    </div>
  );
}
