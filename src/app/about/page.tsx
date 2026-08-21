import Image from "next/image";
import type { Metadata } from "next";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who We Are - SeedSense",
  description:
    "SeedSense is part of Onda Software. Our mission is simplifying seed trialing for smarter business decisions.",
};

function SectionLabel({
  children,
  dark = false,
}: {
  children: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`block text-[0.68rem] font-bold tracking-[0.22em] uppercase ${
        dark ? "text-accent" : "text-primary"
      }`}
    >
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream px-6 pt-24 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[40%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(40,89,59,0.06)_0%,transparent_65%)]"
        />
        <div className="relative z-10 mx-auto max-w-[720px]">
          <div className="mb-8 inline-flex items-center gap-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-primary uppercase before:inline-block before:h-px before:w-8 before:bg-primary/40 before:content-[''] after:inline-block after:h-px after:w-8 after:bg-primary/40 after:content-['']">
            Onda Software
          </div>
          <h1 className="heading-display mb-6 text-ink">Who We Are</h1>
          <p className="mx-auto max-w-[540px] text-[clamp(1.05rem,2vw,1.2rem)] leading-[1.75] font-light text-fern">
            SeedSense is part of{" "}
            <a
              href={site.ondaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              Onda Software
            </a>
            , built to solve a problem seed companies have lived with for
            decades.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night px-6 py-16 text-center sm:px-8 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(102,187,106,0.06)_0%,transparent_70%)]"
        />
        <Reveal className="relative z-10 mx-auto max-w-[820px]">
          <SectionLabel dark>Our Mission</SectionLabel>
          <h2 className="heading-section mt-6 text-white">
            Simplifying seed trialing for smarter business decisions.
          </h2>
        </Reveal>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <Reveal>
              <SectionLabel>The Founders</SectionLabel>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="heading-section mt-3 mb-6 text-forest">
                Seed industry know-how. Software craft.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mb-5 text-[1.05rem] leading-[1.82] text-[#5e6e60]">
                SeedSense was founded by two friends who kept hearing the same
                frustration from seed companies: trial data scattered across
                spreadsheets, emails, and notebooks, with no single source of
                truth.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="mb-5 text-[1.05rem] leading-[1.82] text-[#5e6e60]">
                One founder comes from the software industry. The other spent
                years in product development and sales at seed companies. That
                mix is the point — the product is built by people who know both
                the code and the field.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <p className="text-[1.05rem] leading-[1.82] text-[#5e6e60]">
                SeedSense is part of{" "}
                <a
                  href={site.ondaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  Onda Software
                </a>
                , a company focused on solving niche problems with practical
                tools — not generic software that asks the industry to change
                how it works.
              </p>
            </Reveal>
          </div>
          <Reveal delay={2} className="-order-1 md:order-none">
            <div className="relative">
              <Image
                src="/images/pic02new.jpg"
                alt="Onda Software Team"
                width={612}
                height={408}
                className="w-full rounded-[22px] shadow-[0_40px_80px_rgba(8,15,10,0.2)]"
              />
              <div className="absolute bottom-[-1.25rem] left-4 rounded-2xl bg-night px-8 py-6 shadow-[0_20px_48px_rgba(8,15,10,0.3)] md:bottom-[-1.75rem] md:left-[-1.75rem]">
                <span className="block font-serif text-[2.8rem] leading-none font-semibold text-accent">
                  100%
                </span>
                <span className="mt-1.5 block text-[0.72rem] tracking-[0.12em] text-white/50 uppercase">
                  Industry Focused
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
