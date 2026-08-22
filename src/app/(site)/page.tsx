import Image from "next/image";
import type { Metadata } from "next";
import { FaEdit, FaSeedling, FaShareAlt, FaTasks } from "react-icons/fa";
import ContactCta from "@/components/ContactCta";
import Reveal from "@/components/Reveal";
import ScrollFeature from "@/components/home/ScrollFeature";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SeedSense by Onda",
  description: site.description,
};

const howItWorksSteps = [
  {
    num: "01",
    icon: FaSeedling,
    title: "Plant Your Trial",
    text: "Log trial details: location, grower, crop variety, layout, and initial tasks to get started.",
  },
  {
    num: "02",
    icon: FaTasks,
    title: "Manage Tasks",
    text: "Assign thinning, monitoring, and field tasks with full team visibility and accountability.",
  },
  {
    num: "03",
    icon: FaEdit,
    title: "Evaluate Your Trial",
    text: "Collect scores, custom traits, and field photos on any device—even offline in the field.",
  },
  {
    num: "04",
    icon: FaShareAlt,
    title: "Report & Share",
    text: "Generate and distribute trial maps and PDF reports to farmers, suppliers, and sales teams.",
  },
];

function fadeUp(delaySeconds: number) {
  return {
    animationDelay: `${delaySeconds}s`,
    animationDuration: "1s",
  } as const;
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-cream px-6 pt-20 pb-12 text-center sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[35%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(40,89,59,0.06)_0%,transparent_65%)]"
        />
        <div className="relative z-10 w-full max-w-[940px]">
          <div
            className="mb-8 inline-flex animate-fade-up items-center gap-3 text-[0.68rem] font-bold tracking-[0.24em] text-primary uppercase opacity-0 before:inline-block before:h-px before:w-7 before:bg-primary/40 before:content-[''] after:inline-block after:h-px after:w-7 after:bg-primary/40 after:content-['']"
            style={fadeUp(0.2)}
          >
            SeedSense by Onda Software
          </div>
          <h1
            className="heading-display mb-7 animate-fade-up text-ink opacity-0"
            style={fadeUp(0.4)}
          >
            Reinvent Your
            <br />
            <span className="text-primary">Seed Trials.</span>
          </h1>
          <p
            className="mx-auto mb-11 max-w-[540px] animate-fade-up text-[clamp(1rem,2vw,1.22rem)] leading-[1.75] font-light text-fern opacity-0"
            style={fadeUp(0.6)}
          >
            Track field trials, manage product entries, and get real-time
            insights— all in a single platform built for seed companies.
          </p>
          <div
            className="mb-18 flex animate-fade-up flex-wrap justify-center gap-4 opacity-0"
            style={fadeUp(0.8)}
          >
            <a
              href="#contact"
              className="inline-block rounded-full bg-primary px-10 py-4 text-[0.97rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_12px_32px_rgba(40,89,59,0.3)]"
            >
              Request a Demo
            </a>
          </div>
        </div>
        <div
          className="absolute right-0 bottom-9 left-0 z-10 flex animate-fade-up flex-col items-center justify-center gap-2 opacity-0"
          style={{ animationDelay: "1.6s", animationDuration: "0.8s" }}
        >
          <div className="h-11 w-px animate-pulse bg-gradient-to-b from-primary/50 to-transparent" />
          <span className="text-[0.6rem] tracking-[0.2em] text-primary/40 uppercase">
            Scroll
          </span>
        </div>
      </section>

      {/* Trusted by */}
      <div className="border-y border-sage/40 bg-white px-6 py-14 sm:px-8">
        <div className="mx-auto max-w-[1000px]">
          <span className="mb-8 block text-center text-[0.68rem] font-bold tracking-[0.22em] text-[#9aab9a] uppercase">
            Trusted by
          </span>
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-14">
            <a
              href={site.seedwayUrl}
              target="_blank"
              rel="noopener"
              className="block shrink-0 transition-opacity hover:opacity-75"
            >
              <Image
                src="/images/seedway-logo.svg"
                alt="Seedway"
                width={258}
                height={160}
                className="block h-40 w-auto object-contain"
              />
            </a>
            <div className="border-t-[1.5px] border-sage/45 pt-6 sm:border-t-0 sm:border-l-[1.5px] sm:pt-0 sm:pl-12">
              <p className="mb-3 text-base leading-[1.75] text-moss">
                Seedway — one of the US&apos;s leading full-line seed companies
                — needed one place to centralize trial data, share results with
                growers and suppliers, and keep field teams productive without
                internet. SeedSense delivered all three.
              </p>
              <p className="text-[0.88rem] leading-[1.7] text-fern italic">
                Standardized evaluations across the entire organization.
                Automated trial maps and reports sent directly to growers,
                suppliers, and internal teams. Stronger supplier relationships
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature sections */}
      <ScrollFeature
        eyebrow="Mobile & Field-Ready"
        title={
          <>
            Works everywhere.
            <br />
            Even without signal.
          </>
        }
        text="SeedSense's offline-first mobile app means your team records trial data deep in the field, with or without connectivity. Everything syncs the moment you're back online."
        bullets={[
          "Full offline functionality on iOS & Android",
          "Automatic background sync on reconnect",
          "Photo capture and field annotations",
        ]}
        image={{
          src: "/images/offline.jpeg",
          alt: "Field work with SeedSense",
          width: 770,
          height: 1449,
        }}
        background="white"
      />
      <ScrollFeature
        eyebrow="GPS & Mapping"
        title={
          <>
            See every trial,
            <br />
            precisely located.
          </>
        }
        text="Visualize all your trial locations on an interactive map. Share with your team, navigate to remote field sites, and coordinate across geographies with confidence."
        bullets={[
          "Precise GPS trial location tracking",
          "Shareable maps for field teams",
          "Navigate to any trial site instantly",
        ]}
        image={{
          src: "/images/ssmap.png",
          alt: "GPS Map View in SeedSense",
          width: 369,
          height: 800,
        }}
        background="cream"
        reversed
        parallax
      />
      <ScrollFeature
        eyebrow="Evaluations & Scoring"
        title={
          <>
            Grade with precision.
            <br />
            Decide with confidence.
          </>
        }
        text="Log crop scores, custom trait observations, and photos in real time from any device. Customizable scoring templates mean you track exactly what matters for your program."
        bullets={[
          "Customizable crop trait templates",
          "Photo-attached field evaluations",
          "Side-by-side performance comparisons",
        ]}
        image={{
          src: "/images/sseval.png",
          alt: "Evaluation screen in SeedSense",
          width: 369,
          height: 800,
        }}
        background="white"
        parallax
      />
      <ScrollFeature
        eyebrow="Reports & Sharing"
        title={
          <>
            From field data
            <br />
            to boardroom report.
          </>
        }
        text="Generate professional trial maps and evaluation reports at the click of a button. Share with farmers, suppliers, and sales teams via PDF or email—no formatting required."
        bullets={[
          "Auto-generated PDF trial reports",
          "Email sharing to any stakeholder",
          "Cloud-accessible evaluation catalog",
        ]}
        image={{
          src: "/images/email.jpeg",
          alt: "Report sharing with SeedSense",
          width: 828,
          height: 1792,
        }}
        background="cream"
        reversed
      />
      <ScrollFeature
        eyebrow="Variety Catalog"
        title={
          <>
            Find the next best variety.
            <br />
            Compare with proof.
          </>
        }
        text="Every trial and evaluation your team records rolls up in the web app. See which varieties actually work across sites, then compare them side by side before you decide what to sell next."
        bullets={[
          "Aggregated trials, evaluations, and scores per variety",
          "Side-by-side comparison with maps, charts, and photos",
          "A living catalog of what to promote, sell, and drop",
        ]}
        image={{
          src: "/images/variety-compare-overview.png",
          alt: "SeedSense web app comparing two varieties side by side",
          width: 1600,
          height: 861,
        }}
        background="white"
        variant="browser"
      />

      {/* How it works */}
      <section className="relative overflow-hidden bg-forest px-6 py-22 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(102,187,106,0.055)_0%,transparent_68%)]"
        />
        <div className="relative z-10 mx-auto max-w-[1100px]">
          <div className="mb-18 grid grid-cols-1 items-end gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <span className="mb-4 block text-[0.68rem] font-bold tracking-[0.22em] text-accent uppercase">
                How It Works
              </span>
              <h2 className="heading-section text-white">
                From planting to
                <br />
                report in four steps.
              </h2>
            </div>
            <p className="pb-1 text-base leading-[1.72] text-white/45">
              SeedSense keeps every stage of your seed trials organized—from
              the first seed in the ground to the final report in the inbox.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, index) => (
              <Reveal key={step.num} delay={index as 0 | 1 | 2 | 3} className="h-full">
                <div
                  className={`h-full border border-white/6 bg-white/3 p-8 transition-colors hover:bg-white/[0.058] ${
                    index === 0 ? "rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" : ""
                  } ${
                    index === howItWorksSteps.length - 1
                      ? "rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none"
                      : ""
                  }`}
                >
                  <span className="mb-6 block font-serif text-[2.8rem] leading-none font-light text-accent/30">
                    {step.num}
                  </span>
                  <div className="mb-5 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-accent/10">
                    <step.icon aria-hidden className="text-[0.95rem] text-accent" />
                  </div>
                  <h3 className="mb-2.5 text-base font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-[0.86rem] leading-[1.65] text-white/40">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
