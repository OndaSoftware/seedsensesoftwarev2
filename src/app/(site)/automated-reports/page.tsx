import type { Metadata } from "next";
import {
  ArticleH2,
  ArticleItem,
  ArticleList,
  ArticleP,
} from "@/components/blog/Article";
import ArticleCta from "@/components/blog/ArticleCta";
import ArticleFigure from "@/components/blog/ArticleFigure";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { Feature, FeatureGrid } from "@/components/blog/FeatureGrid";

export const metadata: Metadata = {
  title: "Automated Reports: Simplify Your Seed Trials with SeedSense",
  description:
    "Discover how SeedSense's automated report-building simplifies seed trials with instant trial maps and evaluation reports, emailed as PDF links.",
};

export default function AutomatedReportsPage() {
  return (
    <BlogPostLayout slug="automated-reports">
      <ArticleFigure
        src="/images/pic01new.jpg"
        alt="Seed trial evaluation and reporting"
        width={612}
        height={409}
        priority
      />

      <ArticleP>
        Seed trials drive innovation in the agricultural industry, but
        converting raw field data into shareable, meaningful reports consumes a
        significant amount of time. The typical manual workflow involves
        spreadsheets copied into Word documents, reformatted for different
        stakeholders, and stuffed into bulky email attachments — a process that
        slows everything down.
      </ArticleP>

      <ArticleH2>The Reporting Grind: Why It&apos;s Holding You Back</ArticleH2>

      <ArticleP>
        Consider a typical lettuce trial season: your team has collected weeks
        of evaluation data across multiple locations. Now you need to send
        performance summaries to suppliers, maps to your farmers, and detailed
        breakdowns to your internal team. With manual processes, that means
        hours of reformatting before anyone sees results.
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          <strong>Time Drain</strong> — Formatting and emailing reports steals
          hours from trial analysis or planning next season.
        </ArticleItem>
        <ArticleItem>
          <strong>Data Mishaps</strong> — Copy-pasting risks introducing errors
          or sending the wrong version to the wrong person.
        </ArticleItem>
        <ArticleItem>
          <strong>Slow Sharing</strong> — Delayed reports slow down stakeholder
          decisions and reduce the value of your trial data.
        </ArticleItem>
      </ArticleList>

      <ArticleH2>SeedSense: Automated Reports, One Click Away</ArticleH2>

      <ArticleP>
        SeedSense eliminates the reporting burden entirely. The moment your
        team finishes an evaluation, reports are ready to share — automatically
        formatted and tailored for each stakeholder.
      </ArticleP>

      <FeatureGrid>
        <Feature title="One-Click Report Generation">
          Turn trial evaluations into polished reports instantly, without any
          manual formatting
        </Feature>
        <Feature title="Tailored Stakeholder Reports">
          Customize report content for suppliers, farmers, and internal teams —
          each gets exactly what they need
        </Feature>
        <Feature title="Email as PDF Links">
          Share reports via clean email links instead of heavy attachments —
          always the latest version
        </Feature>
        <Feature title="Cloud-Based Access">
          Reports are stored in the cloud and accessible from any device, any
          time
        </Feature>
      </FeatureGrid>

      <ArticleH2>Empowering Your Stakeholders</ArticleH2>

      <ArticleP>
        The right report in the right hands at the right time creates better
        outcomes for everyone in the value chain.
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          <strong>Suppliers</strong> receive concise performance reports
          highlighting variety results across your trial network.
        </ArticleItem>
        <ArticleItem>
          <strong>Farmers</strong> get full trial maps and evaluation summaries
          tailored to their plots.
        </ArticleItem>
        <ArticleItem>
          <strong>Internal teams</strong> access detailed, cross-location
          reports instantly — no waiting on someone to compile them.
        </ArticleItem>
      </ArticleList>

      <ArticleH2>The Impact: Faster, Smarter Trials</ArticleH2>

      <ArticleList>
        <ArticleItem>
          <strong>Save Hours</strong> — Eliminate manual report compilation and
          reclaim time for higher-value work.
        </ArticleItem>
        <ArticleItem>
          <strong>Boost Accuracy</strong> — Automated reports eliminate the
          copy-paste errors that plague manual workflows.
        </ArticleItem>
        <ArticleItem>
          <strong>Speed Up Decisions</strong> — When stakeholders receive data
          faster, commercialization decisions happen sooner.
        </ArticleItem>
      </ArticleList>

      <ArticleCta
        text="See automated reporting in action."
        buttonLabel="Request a Demo"
      />
    </BlogPostLayout>
  );
}
