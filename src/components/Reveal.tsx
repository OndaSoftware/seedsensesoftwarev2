"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in tenths of a second (matches original rd1/rd2/rd3 classes). */
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
}

/**
 * Fades content up into view once it enters the viewport.
 * Port of the IntersectionObserver `.reveal` pattern shared by every
 * page of the original site.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={delay ? { transitionDelay: `${delay * 0.1}s` } : undefined}
    >
      {children}
    </div>
  );
}
