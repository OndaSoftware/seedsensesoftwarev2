import Image from "next/image";
import type { ReactNode } from "react";
import BrowserFrame from "@/components/BrowserFrame";
import ParallaxFrame from "@/components/home/ParallaxFrame";
import Reveal from "@/components/Reveal";

interface ScrollFeatureProps {
  eyebrow: string;
  title: ReactNode;
  text: string;
  bullets: string[];
  image: { src: string; alt: string; width: number; height: number };
  /** Image on the left, text on the right (desktop only). */
  reversed?: boolean;
  background: "white" | "cream";
  parallax?: boolean;
  /** Phone mockups stay portrait; website screenshots use a browser chrome. */
  variant?: "phone" | "browser";
}

/** One of the alternating text + screenshot sections on the homepage. */
export default function ScrollFeature({
  eyebrow,
  title,
  text,
  bullets,
  image,
  reversed = false,
  background,
  parallax = false,
  variant = "phone",
}: ScrollFeatureProps) {
  const bg = background === "cream" ? "bg-cream" : "bg-white";
  const isBrowser = variant === "browser";

  const screenshot = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={isBrowser ? "(max-width: 768px) 90vw, 42vw" : "280px"}
      className={
        isBrowser
          ? "block h-auto w-full"
          : "block h-[420px] w-auto sm:h-[480px]"
      }
    />
  );

  const frame = isBrowser ? (
    <BrowserFrame>{screenshot}</BrowserFrame>
  ) : (
    <div className="overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(10,26,16,0.14),0_4px_16px_rgba(10,26,16,0.07)]">
      {screenshot}
    </div>
  );

  return (
    <section className={`grid min-h-[380px] grid-cols-1 items-stretch overflow-hidden md:grid-cols-2 ${bg}`}>
      <div className={`flex flex-col justify-center px-8 py-16 md:py-14 ${reversed ? "md:order-2 md:pr-[7%] md:pl-14" : "md:pr-14 md:pl-[7%]"}`}>
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-2.5 text-[0.66rem] font-bold tracking-[0.22em] text-primary uppercase before:inline-block before:h-px before:w-6 before:bg-primary before:content-['']">
            {eyebrow}
          </span>
          <h2 className="heading-section mb-5 text-ink">
            {title}
          </h2>
          <p className="mb-7 text-[1.04rem] leading-[1.8] text-fern">{text}</p>
          <ul>
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-3 border-b border-sage/30 py-2.5 text-[0.93rem] text-moss last:border-b-0 before:inline-block before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent before:content-['']"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div
        className={`flex items-center justify-center px-8 py-10 ${
          isBrowser ? "md:px-10" : ""
        } ${reversed ? "md:order-1" : ""}`}
      >
        <Reveal delay={1}>
          {parallax ? <ParallaxFrame>{frame}</ParallaxFrame> : frame}
        </Reveal>
      </div>
    </section>
  );
}
