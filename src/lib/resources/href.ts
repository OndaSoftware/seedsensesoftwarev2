/**
 * Article bodies are written root-relative — `/trials/create-a-trial` — because
 * the content tree is shared verbatim with the standalone help center, where
 * that IS the URL. Mounted under /resources the same link needs a prefix, and
 * adding it at render time rather than baking it into the MDX keeps the content
 * portable: a link edited in either tree works in both.
 */
export function toResourcesHref(href: string): string {
  return href === "/resources" || href.startsWith("/resources/")
    ? href
    : `/resources${href === "/" ? "" : href}`;
}
