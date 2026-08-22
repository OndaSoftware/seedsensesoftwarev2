import {
  SESSION_COOKIE,
  parseSession,
  readCookie,
  readSession,
} from "@/lib/session";

/** Mirrors what the Flutter app writes: base64url of the JSON payload. */
function encode(payload: unknown): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

const NOW = 1_700_000_000_000; // fixed clock, ms
const FUTURE = NOW / 1000 + 3600; // seconds
const PAST = NOW / 1000 - 3600;

describe("parseSession", () => {
  it("accepts a current session and returns the display name", () => {
    const cookie = encode({ v: 1, name: "Faseeh Hyder", exp: FUTURE });
    expect(parseSession(cookie, NOW)).toEqual({ name: "Faseeh Hyder" });
  });

  it("treats a session with no name as signed in but anonymous", () => {
    expect(parseSession(encode({ v: 1, exp: FUTURE }), NOW)).toEqual({
      name: null,
    });
  });

  it("trims a whitespace-only name down to null", () => {
    expect(parseSession(encode({ v: 1, name: "   ", exp: FUTURE }), NOW)).toEqual(
      { name: null },
    );
  });

  it("rejects an expired session even if the cookie outlived its Max-Age", () => {
    expect(parseSession(encode({ v: 1, name: "F", exp: PAST }), NOW)).toBeNull();
  });

  it("rejects a session expiring exactly now", () => {
    expect(parseSession(encode({ v: 1, exp: NOW / 1000 }), NOW)).toBeNull();
  });

  it("rejects a contract version it does not understand", () => {
    expect(parseSession(encode({ v: 2, name: "F", exp: FUTURE }), NOW)).toBeNull();
  });

  it("rejects a payload with a missing or non-numeric exp", () => {
    expect(parseSession(encode({ v: 1, name: "F" }), NOW)).toBeNull();
    expect(
      parseSession(encode({ v: 1, name: "F", exp: "soon" }), NOW),
    ).toBeNull();
  });

  it("rejects malformed and empty values without throwing", () => {
    expect(parseSession("not-base64url!!", NOW)).toBeNull();
    expect(parseSession(encode("a string, not an object"), NOW)).toBeNull();
    expect(parseSession("", NOW)).toBeNull();
    expect(parseSession(null, NOW)).toBeNull();
    expect(parseSession(undefined, NOW)).toBeNull();
  });

  it("round-trips a non-ASCII name", () => {
    const cookie = encode({ v: 1, name: "José Álvarez", exp: FUTURE });
    expect(parseSession(cookie, NOW)).toEqual({ name: "José Álvarez" });
  });
});

describe("readCookie", () => {
  it("finds the named cookie among others", () => {
    const jar = `_ga=GA1.1.x; ${SESSION_COOKIE}=abc123; theme=dark`;
    expect(readCookie(SESSION_COOKIE, jar)).toBe("abc123");
  });

  it("does not match a cookie whose name merely ends with the target", () => {
    expect(readCookie(SESSION_COOKIE, `not_${SESSION_COOKIE}=nope`)).toBeNull();
  });

  it("returns null when the jar is empty or the cookie is absent", () => {
    expect(readCookie(SESSION_COOKIE, "")).toBeNull();
    expect(readCookie(SESSION_COOKIE, "theme=dark")).toBeNull();
  });
});

describe("readSession", () => {
  afterEach(() => {
    document.cookie = `${SESSION_COOKIE}=; Max-Age=0; path=/`;
  });

  it("reads a live session out of document.cookie", () => {
    document.cookie = `${SESSION_COOKIE}=${encode({ v: 1, name: "Faseeh", exp: FUTURE })}; path=/`;
    expect(readSession(NOW)).toEqual({ name: "Faseeh" });
  });

  it("returns null when no session cookie is present", () => {
    expect(readSession(NOW)).toBeNull();
  });
});

/*
 * Cross-language contract.
 *
 * The value below was produced by SessionCookie.encodePayload in the Flutter
 * app (seedsense/lib/src/core/utils/session_cookie/session_cookie.dart) and
 * pasted here verbatim. It is the only test that proves the writer and the
 * reader actually agree — everything else in this file exercises the reader
 * against its own encoder. If a change to the Dart side breaks this, the
 * marketing site would silently stop recognising real sessions.
 *
 * Regenerate with the same call if the payload shape ever changes, and bump
 * SESSION_CONTRACT_VERSION on both sides.
 */
describe("contract with the Flutter writer", () => {
  const GOLDEN =
    "eyJ2IjoxLCJuYW1lIjoiSm9zw6kgw4FsdmFyZXoiLCJleHAiOjQwNzA5MDg4MDB9";
  const GOLDEN_EXP_MS = 4_070_908_800 * 1000;

  it("parses a cookie value written by the app", () => {
    expect(parseSession(GOLDEN, GOLDEN_EXP_MS - 1000)).toEqual({
      name: "José Álvarez",
    });
  });

  it("survives the app's stripped base64url padding", () => {
    expect(GOLDEN).not.toContain("=");
    expect(GOLDEN).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("expires that same value once its exp has passed", () => {
    expect(parseSession(GOLDEN, GOLDEN_EXP_MS + 1000)).toBeNull();
  });
});
