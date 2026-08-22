export const site = {
  name: "SeedSense by Onda",
  url: "https://seedsensesoftware.com",
  description:
    "SeedSense by Onda - A modern software platform to streamline seed trialing data for large and small seed companies.",
  portalUrl: "https://app.seedsensesoftware.com/",

  /**
   * Universal / App Link target for phones and tablets. Claimed by the native
   * app in web/.well-known/apple-app-site-association and the AndroidManifest
   * intent-filter (seedsense repo), so an installed app intercepts this before
   * the browser ever loads it.
   *
   * When the app is *not* installed the request falls through to a small
   * static page served ahead of the Flutter bundle, which forwards to the
   * correct store. The trailing slash addresses that file directly and avoids
   * a redirect hop.
   */
  openAppUrl: "https://app.seedsensesoftware.com/open/",

  appStoreUrl: "https://apps.apple.com/us/app/seedsense/id6738993976",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.ondasoftware.seedsense",

  phone: "+17605500255",
  phoneDisplay: "+1 (760) 550-0255",
  email: "sales@ondasoftware.com",
  ondaUrl: "https://ondasoftware.com",
  policyUrl: "https://ondasoftware.com/seedsensepolicy",
  seedwayUrl: "https://www.seedway.com/",
  gaId: "G-HVG3W650FB",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Why SeedSense?" },
  { href: "/about", label: "Who We Are" },
  { href: "/all-blogs", label: "Blogs" },
] as const;
