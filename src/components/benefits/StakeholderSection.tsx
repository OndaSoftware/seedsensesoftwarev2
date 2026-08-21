import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export interface StakeholderBenefit {
  title: string;
  text: string;
}

interface StakeholderSectionProps {
  id: string;
  number: string;
  role: string;
  title: ReactNode;
  text: string;
  benefits: StakeholderBenefit[];
  visual: ReactNode;
  reversed?: boolean;
  background: "white" | "cream";
}

/** A two-column stakeholder story: role, benefits, and a matching visual. */
export default function StakeholderSection({
  id,
  number,
  role,
  title,
  text,
  benefits,
  visual,
  reversed = false,
  background,
}: StakeholderSectionProps) {
  const bg = background === "cream" ? "bg-cream" : "bg-white";

  return (
    <section id={id} className={`${bg} scroll-mt-24 px-6 py-20 sm:px-8 sm:py-28`}>
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={reversed ? "lg:order-2" : ""}>
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-3 text-[0.68rem] font-bold tracking-[0.22em] text-primary uppercase">
              <span className="text-accent">{number}</span>
              {role}
            </span>
            <h2 className="heading-section mb-5 text-ink">{title}</h2>
            <p className="mb-8 text-[1.05rem] leading-[1.8] text-fern">{text}</p>
            <ul className="space-y-5">
              {benefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="border-l-[3px] border-accent pl-5"
                >
                  <h3 className="mb-1 text-[1.02rem] font-semibold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="text-[0.95rem] leading-[1.7] text-moss">
                    {benefit.text}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className={reversed ? "lg:order-1" : ""}>
          <Reveal delay={1}>{visual}</Reveal>
        </div>
      </div>
    </section>
  );
}

export function PhotoFrame({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 1024px) 90vw, 520px"
        className="w-full rounded-[22px] object-cover shadow-[0_28px_60px_rgba(10,26,16,0.16)]"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-[0.82rem] text-fern">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function PhoneFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="flex justify-center">
      <div className="overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(10,26,16,0.14),0_4px_16px_rgba(10,26,16,0.07)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="280px"
          className="block h-[420px] w-auto sm:h-[480px]"
        />
      </div>
    </div>
  );
}
