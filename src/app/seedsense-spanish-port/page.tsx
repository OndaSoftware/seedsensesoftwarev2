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
  title: "SeedSense in English, Spanish, and Portuguese | SeedSense",
  description:
    "Learn how SeedSense's multilingual support empowers product development teams to manage trials seamlessly in their native language.",
};

export default function SeedsenseSpanishPortPage() {
  return (
    <BlogPostLayout slug="seedsense-spanish-port">
      <ArticleFigure
        src="/images/pic03new.jpg"
        alt="Global seed trial teams in the field"
        width={612}
        height={408}
        priority
      />

      <ArticleP>
        Product development teams at vegetable seed companies drive trial
        innovation — but language barriers can disrupt global workflows. When
        your field evaluators in Mexico, Brazil, or Spain are working in
        English-only software, small misunderstandings become costly errors.
        SeedSense was built to solve this.
      </ArticleP>

      <ArticleH2>The Challenge: English-Only Software Slows Teams</ArticleH2>

      <ArticleP>
        For teams where English isn&apos;t the primary language, navigating an
        English-only platform creates constant friction. Translating field
        terminology on the fly, misreading evaluation options, or incorrectly
        entering data all introduce risk into your trial program. The result:
        unreliable data and frustrated teams.
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          Field evaluators second-guess terminology instead of focusing on the
          crop
        </ArticleItem>
        <ArticleItem>
          Data entry errors increase when working in a non-native language
        </ArticleItem>
        <ArticleItem>
          Onboarding new team members takes longer when the interface
          isn&apos;t intuitive
        </ArticleItem>
        <ArticleItem>
          Collaboration across language-diverse regions becomes fragmented
        </ArticleItem>
      </ArticleList>

      <ArticleH2>SeedSense: Built for Product Development in Any Language</ArticleH2>

      <ArticleP>
        SeedSense is fully available in English, Spanish, and Portuguese — so
        every member of your product development team can work confidently in
        the language they know best.
      </ArticleP>

      <FeatureGrid>
        <Feature title="Tasks">
          Assign and track planting, evaluation, and harvest tasks with field
          names and instructions in your team&apos;s native language
        </Feature>
        <Feature title="Trial Input">
          Enter trial details with fully translated fields — no guessing what a
          label means in the field
        </Feature>
        <Feature title="Evaluations">
          Log trait scores and field observations using familiar, translated
          terminology for your region
        </Feature>
        <Feature title="Reports">
          Generate automated reports in the user&apos;s preferred language —
          ready to share with local stakeholders
        </Feature>
      </FeatureGrid>

      <ArticleH2>The Impact: Efficient, Unified Teams</ArticleH2>

      <ArticleP>
        When your software speaks your team&apos;s language, everything moves
        faster and with greater accuracy. Multilingual support isn&apos;t just
        a convenience — it&apos;s a competitive advantage for seed companies
        operating across borders.
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          <strong>Fewer Data Errors</strong> — Teams working in their native
          language make fewer input mistakes.
        </ArticleItem>
        <ArticleItem>
          <strong>Faster Onboarding</strong> — New team members get up to speed
          quickly when the platform feels natural to them.
        </ArticleItem>
        <ArticleItem>
          <strong>Better Collaboration</strong> — Regional teams share data on
          a common platform while each working in their preferred language.
        </ArticleItem>
        <ArticleItem>
          <strong>Global Reach</strong> — Scale your trial program across Latin
          America, Europe, and beyond without language as a barrier.
        </ArticleItem>
      </ArticleList>

      <ArticleCta
        text="See SeedSense in your language."
        buttonLabel="Request a Demo"
      />
    </BlogPostLayout>
  );
}
