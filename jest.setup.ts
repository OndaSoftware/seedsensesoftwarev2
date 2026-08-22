import "@testing-library/jest-dom";

import { TextDecoder as NodeTextDecoder } from "node:util";

/* jsdom ships no TextDecoder, which src/lib/session.ts uses to turn the
   base64url session cookie back into UTF-8. Every browser has it; only the
   test environment needs the shim. */
if (typeof globalThis.TextDecoder === "undefined") {
  globalThis.TextDecoder = NodeTextDecoder as typeof globalThis.TextDecoder;
}

/* jsdom does not implement IntersectionObserver, which the Reveal and
   ParallaxFrame components rely on. */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

/* The help-center content suites run under `@jest-environment node`, where
   there is no window to patch — this shim only applies to jsdom suites. */
if (typeof window !== "undefined") {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
}
