/**
 * The help center's top-level topics, in the order they appear in the sidebar
 * and in the "Browse by topic" grid on the homepage.
 *
 * A folder under `content/articles/` MUST match one of these slugs. An article
 * in an unregistered folder fails the build rather than disappearing silently
 * from navigation — see `src/lib/content.ts`.
 */

export type CategoryIcon =
  | "rocket"
  | "flask"
  | "sprout"
  | "tasks"
  | "clipboard"
  | "sync"
  | "settings"
  | "lifebuoy";

export type Category = {
  slug: string;
  title: string;
  /** Shown on category cards and at the top of the category page. */
  description: string;
  icon: CategoryIcon;
};

export const categories: Category[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    description:
      "Sign in, find your way around, and get SeedSense running on the device you take into the field.",
    icon: "rocket",
  },
  {
    slug: "trials",
    title: "Trials",
    description:
      "Create trials, work the trial catalog, lay out plots, and record what you see in the field.",
    icon: "flask",
  },
  {
    slug: "varieties",
    title: "Varieties",
    description:
      "Add varieties one at a time or in bulk, and keep the variety catalog accurate.",
    icon: "sprout",
  },
  {
    slug: "tasks",
    title: "Tasks & field work",
    description:
      "Schedule field work, assign it to evaluators, and keep track of what is due today.",
    icon: "tasks",
  },
  {
    slug: "evaluations",
    title: "Evaluations & grading",
    description:
      "Score varieties against traits, manage the evaluation catalog, and read the grades.",
    icon: "clipboard",
  },
  {
    slug: "data-and-sync",
    title: "Data, sync & offline",
    description:
      "How offline work reaches the server, and how to manage crops, regions, farmers, and suppliers.",
    icon: "sync",
  },
  {
    slug: "account-and-settings",
    title: "Account & settings",
    description:
      "Your profile, your team, your organization, and where notifications are sent.",
    icon: "settings",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description:
      "Fixes for sign-in trouble, sync that will not finish, and data that looks wrong.",
    icon: "lifebuoy",
  },
];

export const categorySlugs = categories.map((category) => category.slug);

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
