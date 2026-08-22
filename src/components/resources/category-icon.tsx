import {
  ClipboardCheck,
  FlaskConical,
  LifeBuoy,
  ListChecks,
  RefreshCw,
  Rocket,
  Settings,
  Sprout,
  type LucideIcon,
} from "lucide-react";

import type { CategoryIcon as CategoryIconName } from "@content/categories";

/**
 * Icon names live in `categories.ts` as plain strings so the content file stays
 * free of React imports. This map is the single place they become components.
 */
const ICONS: Record<CategoryIconName, LucideIcon> = {
  rocket: Rocket,
  flask: FlaskConical,
  sprout: Sprout,
  tasks: ListChecks,
  clipboard: ClipboardCheck,
  sync: RefreshCw,
  settings: Settings,
  lifebuoy: LifeBuoy,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: CategoryIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden />;
}
