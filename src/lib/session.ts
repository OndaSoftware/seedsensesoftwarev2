/**
 * Cross-subdomain session signal.
 *
 * The marketing site (seedsensesoftware.com) and the web app
 * (app.seedsensesoftware.com) are different *origins*, so the site can never
 * read the app's localStorage. They are, however, the same *site*, so a cookie
 * scoped to the parent domain is shared by both and is unaffected by browser
 * storage partitioning. That cookie is the only channel between them.
 *
 * It deliberately carries no credential — just enough to swap "Login" for
 * "Dashboard". The cookie is readable by JavaScript on every marketing page,
 * so putting the JWT here would turn any XSS in the MDX-rendered help centre
 * into an account takeover. The app keeps the token in its own origin.
 *
 * The writer is SharedPrefs in the Flutter app; see
 * lib/src/core/utils/session_cookie/ over in the seedsense repo. Both sides
 * must agree on SESSION_CONTRACT_VERSION.
 */

export const SESSION_COOKIE = "ss_session";
export const SESSION_CONTRACT_VERSION = 1;

export type Session = {
  /** Display name, when the app knew one. Never required. */
  name: string | null;
};

/**
 * Decode base64url -> UTF-8. The payload is base64url'd rather than raw JSON
 * because cookie values cannot safely carry `;` or `,`.
 */
function fromBase64Url(input: string): string | null {
  try {
    const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

/**
 * Parse a raw cookie value into a session, or null if it is absent, malformed,
 * from a contract version we do not understand, or expired.
 *
 * Expiry is checked here as well as being enforced by the cookie's own
 * Max-Age. The cookie should self-destruct when the JWT does, but a clock skew
 * or a browser that kept it around must not produce a "Dashboard" button that
 * leads to a login screen.
 */
export function parseSession(
  raw: string | null | undefined,
  nowMs: number = Date.now(),
): Session | null {
  if (!raw) return null;

  const json = fromBase64Url(raw);
  if (json === null) return null;

  let payload: unknown;
  try {
    payload = JSON.parse(json);
  } catch {
    return null;
  }

  if (typeof payload !== "object" || payload === null) return null;
  const { v, name, exp } = payload as Record<string, unknown>;

  if (v !== SESSION_CONTRACT_VERSION) return null;
  if (typeof exp !== "number" || !Number.isFinite(exp)) return null;
  if (exp * 1000 <= nowMs) return null;

  const trimmed = typeof name === "string" ? name.trim() : "";
  return { name: trimmed.length > 0 ? trimmed : null };
}

/** Pull one cookie out of a `document.cookie` string. */
export function readCookie(name: string, cookieString: string): string | null {
  for (const part of cookieString.split(";")) {
    const trimmed = part.trim();
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    if (trimmed.slice(0, separator) !== name) continue;
    try {
      return decodeURIComponent(trimmed.slice(separator + 1));
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Read the current session. Returns null during server rendering — the site is
 * a static export, so every page is prerendered with no request context and
 * the session can only be resolved after mount.
 */
export function readSession(nowMs: number = Date.now()): Session | null {
  if (typeof document === "undefined") return null;
  return parseSession(readCookie(SESSION_COOKIE, document.cookie), nowMs);
}

/*
 * useSyncExternalStore plumbing.
 *
 * React requires getSnapshot to return a stable reference while the underlying
 * store is unchanged — a fresh object each call re-renders forever. The parsed
 * session is therefore memoised against the raw cookie string it came from.
 */
let cachedRaw: string | null = null;
let cachedSession: Session | null = null;
let cachePrimed = false;

/** Client snapshot: the session as of the current document.cookie. */
export function getSessionSnapshot(): Session | null {
  if (typeof document === "undefined") return null;
  const raw = readCookie(SESSION_COOKIE, document.cookie);
  if (!cachePrimed || raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSession = parseSession(raw);
    cachePrimed = true;
  }
  return cachedSession;
}

/**
 * Server snapshot: always signed out. The site is a static export, so pages
 * are prerendered with no request and no cookie. React re-reads the client
 * snapshot after hydration, which is what swaps the label.
 */
export function getServerSessionSnapshot(): Session | null {
  return null;
}

/** Cookies emit no change events, so there is nothing to subscribe to. */
export function subscribeToSession(): () => void {
  return () => {};
}
