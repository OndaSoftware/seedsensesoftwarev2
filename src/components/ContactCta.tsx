import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

/**
 * The dark "Leave the spreadsheets behind" contact section shared by
 * every page of the original site (section.home-cta#contact).
 */
export default function ContactCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-forest px-6 py-22 text-center sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(102,187,106,0.065)_0%,transparent_68%)]"
      />
      <div className="relative z-10 mx-auto max-w-[660px]">
        <Reveal>
          <span className="mb-6 block text-[0.68rem] font-bold tracking-[0.22em] text-accent uppercase">
            Get Started
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="heading-section mb-6 text-white">
            Leave the spreadsheets behind.
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mb-12 text-[1.08rem] leading-relaxed text-white/50">
            Join seed companies using SeedSense to run faster, more accurate
            trials—starting today.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${site.phone}`}
              className="group inline-flex w-full max-w-[300px] min-w-[158px] flex-col items-center rounded-[14px] bg-primary px-9 py-4 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:-translate-y-[3px] hover:bg-primary-dark hover:shadow-[0_16px_40px_rgba(40,89,59,0.38)] sm:w-auto"
            >
              <span>Call Us</span>
              <span className="max-h-0 overflow-hidden text-[0.76rem] font-normal text-white/60 opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-6 group-hover:opacity-100">
                {site.phoneDisplay}
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex w-full max-w-[300px] min-w-[158px] flex-col items-center rounded-[14px] border border-white/12 bg-white/6 px-9 py-4 text-[0.95rem] font-semibold text-white/80 transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/10 sm:w-auto"
            >
              <span>Email Us</span>
              <span className="max-h-0 overflow-hidden text-[0.76rem] font-normal text-white/60 opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-6 group-hover:opacity-100">
                {site.email}
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
