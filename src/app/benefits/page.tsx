import Image from "next/image";
import type { Metadata } from "next";
import { FaChartBar, FaEnvelopeOpenText, FaSeedling } from "react-icons/fa";
import BrowserFrame from "@/components/BrowserFrame";
import ContactCta from "@/components/ContactCta";
import StakeholderSection, {
  PhoneFrame,
  PhotoFrame,
} from "@/components/benefits/StakeholderSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Why SeedSense? - SeedSense",
  description:
    "See how SeedSense helps product developers, partner companies and growers, and sales managers run better seed trials.",
};

const roles = [
  {
    href: "#product-developers",
    icon: FaSeedling,
    number: "01",
    title: "Product Developers",
    text: "Capture trials in the field, then share them across the company.",
  },
  {
    href: "#partners-growers",
    icon: FaEnvelopeOpenText,
    number: "02",
    title: "Partners & Growers",
    text: "Receive trial maps and evaluation reports automatically.",
  },
  {
    href: "#sales-managers",
    icon: FaChartBar,
    number: "03",
    title: "Sales Managers",
    text: "See which varieties work — and compare what to sell next.",
  },
] as const;

export default function BenefitsPage() {
  return (
    <>
      <section className="relative flex min-h-[48vh] items-center justify-center overflow-hidden bg-cream px-6 pt-24 pb-16 text-center sm:min-h-[52vh] sm:px-8 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[35%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(40,89,59,0.07)_0%,transparent_65%)]"
        />
        <div className="relative z-10 max-w-[760px]">
          <div className="mb-8 inline-flex items-center gap-3 text-[0.68rem] font-bold tracking-[0.24em] text-primary uppercase before:inline-block before:h-px before:w-7 before:bg-primary/40 before:content-[''] after:inline-block after:h-px after:w-7 after:bg-primary/40 after:content-['']">
            Why SeedSense
          </div>
          <h1 className="heading-display mb-6 text-ink">
            Built for everyone
            <br />
            in the trial.
          </h1>
          <p className="mx-auto max-w-[560px] text-[clamp(1rem,2vw,1.18rem)] leading-[1.75] font-light text-fern">
            Product developers capture the data. Partners, dealers, and growers
            receive the reports. Sales managers decide what to sell next.
          </p>
        </div>
      </section>

      <nav
        aria-label="Who SeedSense is for"
        className="border-b border-sage/35 bg-white px-6 py-12 sm:px-8"
      >
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 md:grid-cols-3">
          {roles.map((role, index) => (
            <Reveal key={role.href} delay={index as 0 | 1 | 2}>
              <a
                href={role.href}
                className="group flex h-full flex-col rounded-[18px] border border-sage/30 bg-cream/60 px-7 py-8 transition-all hover:-translate-y-1 hover:border-primary/25 hover:bg-cream hover:shadow-[0_18px_40px_rgba(40,89,59,0.1)]"
              >
                <span className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-primary">
                    <role.icon aria-hidden className="text-base" />
                  </span>
                  <span className="font-serif text-2xl font-light text-accent/50">
                    {role.number}
                  </span>
                </span>
                <h2 className="heading-card mb-2 text-ink">{role.title}</h2>
                <p className="text-[0.95rem] leading-[1.65] text-fern">
                  {role.text}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </nav>

      <StakeholderSection
        id="product-developers"
        number="01"
        role="Product Developers"
        title={
          <>
            Capture the trial in the field.
            <br />
            Share it once you&apos;re back.
          </>
        }
        text="Product developers log trials on a phone or tablet—online or fully offline. When the device reconnects, results sync to the cloud so the rest of the company can work from the same data."
        benefits={[
          {
            title: "Input field data online or offline",
            text: "Record locations, layouts, scores, photos, and notes in the app, even with no signal.",
          },
          {
            title: "Sync once, share across the company",
            text: "The moment you reconnect, trial data lands in the cloud for research, sales, and leadership.",
          },
          {
            title: "Task management that stays visible",
            text: "Assign thinning, monitoring, and evaluation work so nothing slips between visits.",
          },
        ]}
        visual={
          <PhotoFrame
            src="/images/girl-farmer-tablet-field.jpg"
            alt="Product developer entering trial data on a tablet in the field"
            width={1800}
            height={1201}
            caption="Log trials on any device, then sync to the rest of the team."
          />
        }
        background="white"
      />

      <StakeholderSection
        id="partners-growers"
        number="02"
        role="Partners, Dealers & Growers"
        title={
          <>
            Reports arrive on their own.
            <br />
            No chasing PDFs.
          </>
        }
        text="Partner seed suppliers, dealer companies, and growers do not need to live in the app. SeedSense emails them trial maps and evaluation reports automatically, so everyone sees the same result without extra work."
        benefits={[
          {
            title: "Automated trial map emails",
            text: "Send maps to farmers, supplier reps, and dealer contacts in one step.",
          },
          {
            title: "Evaluation reports, delivered",
            text: "Scores, photos, and notes go out as professional reports—not spreadsheet dumps.",
          },
          {
            title: "The right people, every time",
            text: "Choose who receives which report so partners and growers stay in the loop without inbox noise.",
          },
        ]}
        visual={
          <PhoneFrame
            src="/images/email.jpeg"
            alt="SeedSense email settings for sending trial maps to farmers and supplier reps"
            width={828}
            height={1792}
          />
        }
        reversed
        background="cream"
      />

      <StakeholderSection
        id="sales-managers"
        number="03"
        role="Sales Managers"
        title={
          <>
            See what actually works.
            <br />
            Decide what to sell next.
          </>
        }
        text="Sales managers get the payoff of every trial in one catalog. Aggregated evaluations and variety records make it obvious which lines perform—and side-by-side comparison shows what belongs in the next offering."
        benefits={[
          {
            title: "Aggregation of trials, evals, and varieties",
            text: "Every recorded trial rolls up to the variety: total trials, completed evaluations, average score, and maturity.",
          },
          {
            title: "Find working varieties fast",
            text: "Filter the catalog by crop, region, and performance instead of hunting through old spreadsheets.",
          },
          {
            title: "Compare varieties before you sell",
            text: "Put two lines next to each other—scores, maps, charts, and photos—and pick what to promote next.",
          },
        ]}
        visual={
          <BrowserFrame>
            <Image
              src="/images/variety-compare-overview.png"
              alt="SeedSense web app comparing two varieties side by side with aggregated scores"
              width={1600}
              height={861}
              sizes="(max-width: 1024px) 90vw, 520px"
              className="block h-auto w-full"
            />
          </BrowserFrame>
        }
        background="white"
      />

      <ContactCta />
    </>
  );
}
