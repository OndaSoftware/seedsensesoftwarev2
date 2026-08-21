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
  title: "Where's Your Trial Data? How to Keep It All in One Place | SeedSense",
  description:
    "Discover how centralizing your trial data prevents lost insights and drives smarter decisions for your seed company.",
};

export default function WheresYourTrialDataPage() {
  return (
    <BlogPostLayout slug="wheres-your-trial-data">
      <ArticleFigure
        src="/images/pic02new.jpg"
        alt="Seed trial field data collection"
        width={612}
        height={408}
        priority
      />

      <ArticleP>
        Seed companies invest enormous resources in trials — labor, land,
        inputs, and expertise. But too often, the insights from those trials
        never fully reach the teams that need them. Data ends up scattered
        across personal spreadsheets, email threads, and field notebooks,
        making it nearly impossible to see the complete picture.
      </ArticleP>

      <ArticleH2>The Problem: Trial Data That&apos;s Out of Sight and Out of Mind</ArticleH2>

      <ArticleP>
        Picture a spinach trial running across three locations with separate
        regional teams. Team A has their evaluations in a local spreadsheet.
        Team B emailed results to a product manager who&apos;s traveling. Team
        C posted photos in a group chat. When it&apos;s time to make a variety
        decision, no one has the full story — and a promising variety could
        slip through the cracks.
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          <strong>Missed Opportunities</strong> — A promising variety&apos;s
          traits go unnoticed because the trial wasn&apos;t tracked or shared
          properly.
        </ArticleItem>
        <ArticleItem>
          <strong>Wasted Resources</strong> — Time, money, and effort go into
          trials that end up as unused data on a spreadsheet, never informing
          decisions.
        </ArticleItem>
        <ArticleItem>
          <strong>Slow Decisions</strong> — Without a clear view of all trial
          data, selecting top varieties drags on, delaying commercialization.
        </ArticleItem>
      </ArticleList>

      <ArticleH2>SeedSense: Your Single Source of Truth</ArticleH2>

      <ArticleP>
        SeedSense gives your entire organization one place where all trial data
        lives — updated in real time, accessible from any device, and organized
        for action.
      </ArticleP>

      <FeatureGrid>
        <Feature title="Centralized Storage">
          All trial records, evaluations, GPS data, and photos stored in one
          platform — no more hunting across folders and inboxes
        </Feature>
        <Feature title="Real-Time Updates">
          Field teams log data directly from their device and it&apos;s
          instantly visible to the entire organization
        </Feature>
        <Feature title="Organized for Action">
          Filter by variety, location, season, or team to find exactly what you
          need when you need it
        </Feature>
        <Feature title="Cloud Access">
          Access your complete trial history from any device — office, field,
          or on the road
        </Feature>
      </FeatureGrid>

      <ArticleH2>Teamwork Without the Headaches</ArticleH2>

      <ArticleP>
        Centralized data isn&apos;t just about storage — it&apos;s about
        enabling your team to work together effectively, even across locations
        and time zones.
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          <strong>Task Assignments</strong> — Assign planting, evaluation, and
          harvest tasks to team members and track completion in one place.
        </ArticleItem>
        <ArticleItem>
          <strong>Shareable Reports</strong> — Generate and share trial
          summaries instantly with suppliers, internal teams, or growers.
        </ArticleItem>
        <ArticleItem>
          <strong>Cloud Access</strong> — Everyone on the team sees the same
          data, eliminating version conflicts and missed updates.
        </ArticleItem>
      </ArticleList>

      <ArticleH2>The Payoff: Faster Decisions, Better Varieties</ArticleH2>

      <ArticleList>
        <ArticleItem>
          <strong>Speed</strong> — Make variety decisions weeks faster when all
          data is visible in one place.
        </ArticleItem>
        <ArticleItem>
          <strong>Accuracy</strong> — Reduce errors from manual data transfer
          and ensure every evaluation gets recorded.
        </ArticleItem>
        <ArticleItem>
          <strong>Impact</strong> — Get more value from every trial dollar
          invested by ensuring insights actually reach decision-makers.
        </ArticleItem>
      </ArticleList>

      <ArticleH2>Stop Chasing Data. Start Using It.</ArticleH2>

      <ArticleP>
        The best trial programs aren&apos;t the ones with the most data —
        they&apos;re the ones that can actually find and use it. SeedSense
        makes sure every piece of field intelligence gets captured, organized,
        and put to work.
      </ArticleP>

      <ArticleCta
        text="Ready to centralize your trial data?"
        buttonLabel="Request a Demo"
      />
    </BlogPostLayout>
  );
}
