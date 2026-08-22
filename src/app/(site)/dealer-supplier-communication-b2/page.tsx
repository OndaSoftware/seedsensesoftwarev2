import type { Metadata } from "next";
import {
  ArticleH2,
  ArticleItem,
  ArticleList,
  ArticleP,
  Testimonial,
} from "@/components/blog/Article";
import ArticleCta from "@/components/blog/ArticleCta";
import ArticleFigure from "@/components/blog/ArticleFigure";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { Feature, FeatureGrid } from "@/components/blog/FeatureGrid";

export const metadata: Metadata = {
  title: "Bridging the Seed Trial Communication Gap | SeedSense",
  description:
    "Discover how SeedSense helps distributors and suppliers collaborate effectively through automated trial reporting and real-time data sharing.",
};

export default function DealerSupplierCommunicationPage() {
  return (
    <BlogPostLayout slug="dealer-supplier-communication-b2">
      <ArticleFigure
        src="/images/smallplots3.jpg"
        alt="Seed trial plots viewed from above"
        width={800}
        height={500}
        priority
      />

      <ArticleP>
        In our conversations with seed supplier companies — from solo breeders
        to global producers — one frustration keeps surfacing:{" "}
        <strong>
          &quot;We never get the trial data from our dealer&apos;s product
          development teams.&quot;
        </strong>
      </ArticleP>

      <ArticleP>
        But here&apos;s the twist: it&apos;s not that seed dealers are
        withholding information. As one product manager told us:{" "}
        <em>
          &quot;Our distributors want to share results, but they&apos;re stuck
          using spreadsheets and emails. By the time we get any data, it&apos;s
          outdated or incomplete.&quot;
        </em>
      </ArticleP>

      <ArticleH2>Why Traditional Methods Fail</ArticleH2>

      <ArticleP>The current process often looks like this:</ArticleP>
      <ArticleList>
        <ArticleItem>
          Dealer PD teams snap phone photos (if they remember)
        </ArticleItem>
        <ArticleItem>
          Trial notes are taken on paper or in spreadsheets
        </ArticleItem>
        <ArticleItem>
          Suppliers piece together Excel sheets from multiple sources
        </ArticleItem>
        <ArticleItem>Weeks pass before anyone sees the full picture</ArticleItem>
      </ArticleList>

      <ArticleP>
        This fragmented workflow means valuable performance data gets trapped
        in silos — or lost entirely before it reaches the people who need it
        most.
      </ArticleP>

      <ArticleH2>How SeedSense Changes the Game</ArticleH2>

      <ArticleP>
        We built SeedSense to solve these exact pain points. Here&apos;s what
        the platform enables across the supplier-dealer relationship:
      </ArticleP>

      <FeatureGrid>
        <Feature title="Field-Ready Data Capture">
          Distributors can record trial evaluations directly in the field from
          any device
        </Feature>
        <Feature title="Instant Trial Updates">
          Automatically share GPS-mapped trial locations with suppliers the
          moment planting is complete
        </Feature>
        <Feature title="Real-Time Evaluation Sharing">
          Suppliers receive standardized PDF reports with one click immediately
          after field assessments
        </Feature>
        <Feature title="Auto-Generated Reports">
          Standardized reports eliminate manual compilation and reduce errors
        </Feature>
        <Feature title="Real-Time Monitoring">
          Track trial progress across multiple locations from any device
        </Feature>
        <Feature
          title={
            <>
              Custom Data Exports{" "}
              <span className="ml-1 text-[0.75rem] font-normal opacity-70">
                (Coming Soon)
              </span>
            </>
          }
        >
          Filter and share specific variety performance data across regions
          directly with breeding teams
        </Feature>
      </FeatureGrid>

      <Testimonial author="— Donavin Buck, Sales and Product Development, Seedway">
        &quot;With SeedSense, our suppliers get trial updates as fast as we do.
        No more asking for photos or deciphering handwritten notes months after
        we wrapped up the season.&quot;
      </Testimonial>

      <ArticleH2>What This Means for Your Team</ArticleH2>

      <ArticleList>
        <ArticleItem>
          Reclaim 10–15 hours/week previously spent compiling reports
        </ArticleItem>
        <ArticleItem>
          Compare variety performance across regions in real-time
        </ArticleItem>
        <ArticleItem>
          Strengthen relationships through transparent data sharing
        </ArticleItem>
        <ArticleItem>
          Identify winning varieties weeks or months faster than competitors
        </ArticleItem>
      </ArticleList>

      <ArticleCta
        text="Ready to turn trial chaos into clear insights?"
        buttonLabel="See How It Works"
      />
    </BlogPostLayout>
  );
}
