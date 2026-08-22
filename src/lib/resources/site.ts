/** Single place for the details that appear across the help center. */

export const SITE_NAME = "SeedSense Help Center";
export const SITE_TAGLINE =
  "Guides and video walkthroughs for running seed trials with SeedSense.";

export const SUPPORT_EMAIL = "support@seedsensesoftware.com";
export const SUPPORT_RESPONSE_TIME = "one business day";

/** The main marketing/app site, linked from the header. */
export const APP_URL = "https://app.seedsensesoftware.com";

/**
 * Universal / App Link used on phones and tablets. Claimed by the native app,
 * and falls through to a store-dispatch page when it is not installed. Kept in
 * step with `site.openAppUrl` in src/lib/site.ts — the help center keeps its
 * own constants module so it stays independent of the marketing chrome.
 */
export const OPEN_APP_URL = "https://app.seedsensesoftware.com/open/";
