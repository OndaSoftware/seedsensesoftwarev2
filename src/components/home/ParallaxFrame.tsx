"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle scroll-linked vertical drift used by the homepage screenshot
 * frames (port of the original `.parallax-frame` script).
 */
export default function ParallaxFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number | null = null;

    const update = () => {
      const viewportHeight = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      el.style.transform = `translateY(${(clamped - 0.5) * -55}px)`;
    };

    const onScroll = () => {
      if (raf === null) {
        raf = requestAnimationFrame(() => {
          update();
          raf = null;
        });
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
}
