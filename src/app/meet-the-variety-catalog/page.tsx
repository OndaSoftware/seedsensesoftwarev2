import type { Metadata } from "next";
import {
  ArticleH2,
  ArticleItem,
  ArticleList,
  ArticleP,
} from "@/components/blog/Article";
import ArticleCta from "@/components/blog/ArticleCta";
import ArticleFigure from "@/components/blog/ArticleFigure";
import ArticleVideo from "@/components/blog/ArticleVideo";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { Feature, FeatureGrid } from "@/components/blog/FeatureGrid";

export const metadata: Metadata = {
  title:
    "Meet the Variety Catalog: Find Your Next Winning Variety in Your Trial Data | SeedSense",
  description:
    "The new SeedSense Variety Catalog turns seasons of trial data into clear answers about which varieties to sell, with powerful filters and side by side comparisons.",
};

export default function MeetTheVarietyCatalogPage() {
  return (
    <BlogPostLayout slug="meet-the-variety-catalog">
      <ArticleFigure
        src="/images/seed-trial-meeting-room.jpg"
        alt="Seed company team reviewing variety trial results in a meeting room"
        width={1536}
        height={1024}
        priority
        caption="Public image from an example previous ASTA conference."
      />

      <ArticleP>
        Most teams come to SeedSense for one reason: they are tired of losing
        trial data to notebooks, spreadsheets, and camera rolls. Collecting
        clean data in the field is where the journey starts. But collection
        alone is only half the value.
      </ArticleP>

      <ArticleP>
        The real payoff comes when that data starts answering the question
        every seed company asks at the end of a season:{" "}
        <strong>which varieties should we sell next?</strong>
      </ArticleP>

      <ArticleP>
        That is exactly what the new <strong>Variety Catalog</strong> was built
        for. It takes every trial and evaluation your team has ever recorded
        and turns it into a living catalog of variety performance, ready to
        guide your next commercial decision and arm your sales team with proof.
      </ArticleP>

      <ArticleH2>Your Trial Data Should Tell You What to Sell</ArticleH2>

      <ArticleP>
        Every variety you have ever trialed appears in the catalog with its
        full track record aggregated automatically. At a glance, each variety
        card shows total trials, completed evaluations, average score, and
        average days to maturity, along with its crop, classification, and
        commercial status.
      </ArticleP>

      <ArticleFigure
        src="/images/variety-catalog-grid.png"
        alt="SeedSense Variety Catalog showing variety cards with total trials, completed evaluations, average score, and average maturity"
        width={1024}
        height={548}
        caption="The Variety Catalog, with aggregated stats for every variety your team has trialed."
      />

      <ArticleP>
        No more digging through folders to remember how a numbered line
        performed two seasons ago. The catalog remembers for you, and a single
        click on Show History opens the complete story of any variety.
      </ArticleP>

      <ArticleH2>Find Your Next Product in Seconds, Not Spreadsheets</ArticleH2>

      <ArticleP>
        A catalog is only useful if you can slice it. Filters let you narrow
        hundreds of varieties down to the handful that matter for the decision
        in front of you:
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          <strong>Crop and classification</strong> to focus on a single market,
          like red bell peppers
        </ArticleItem>
        <ArticleItem>
          <strong>Variety type</strong> to separate commercial lines from
          experimental and screening material
        </ArticleItem>
        <ArticleItem>
          <strong>Minimum trials and completed evaluations</strong> to only
          consider varieties with enough data behind them
        </ArticleItem>
      </ArticleList>

      <ArticleP>Here is a quick tour of the catalog in action:</ArticleP>

      <ArticleVideo
        src="/videos/variety-catalog-tour.mov"
        caption="Browsing and filtering the Variety Catalog to shortlist candidates."
      />

      <ArticleH2>Compare Trialed Varieties Side by Side</ArticleH2>

      <ArticleP>
        Shortlisting is step one. Choosing a winner requires a head to head
        look. Select any two varieties in the catalog and hit Compare Selected.
      </ArticleP>

      <ArticleFigure
        src="/images/variety-catalog-compare-select.png"
        alt="Selecting two varieties in the Variety Catalog for comparison"
        width={1600}
        height={854}
        caption="Selecting two candidates in the catalog for a head to head comparison."
      />

      <ArticleP>
        The comparison view lines up both varieties on a single screen: average
        days to maturity, number of evaluations, and overall score, computed
        from the same trials your team ran in the field.
      </ArticleP>

      <ArticleFigure
        src="/images/variety-compare-overview.png"
        alt="Side by side comparison of two pepper varieties with days to maturity, evaluations, and average score"
        width={1600}
        height={861}
        caption="Two varieties side by side with average days to maturity, evaluations, and overall score."
      />

      <ArticleP>
        Below the summary, Performance vs Check charts show how each variety
        scored against the check at every trial location, with a toggle for
        overall score or days to maturity. In the example below, one candidate
        beat the check at every site while the other consistently fell short.
        That is a commercial decision made in seconds, backed by data.
      </ArticleP>

      <ArticleFigure
        src="/images/variety-compare-charts.png"
        alt="Performance versus check charts comparing overall scores of two varieties by trial location"
        width={1600}
        height={859}
        caption="Performance vs Check charts showing how each variety scored at every trial location."
      />

      <ArticleP>
        And because growing conditions matter, the same filters apply to the
        whole comparison. Narrow both columns by region, area, zone, grower, or
        planting and harvest windows to answer very specific questions, like
        how two lines stack up for a spring desert slot with one particular
        grower.
      </ArticleP>

      <ArticleH2>Evidence Your Sales Team Can Show</ArticleH2>

      <ArticleP>
        Numbers close the analysis. Photos and maps close the deal. Every
        comparison includes the field evaluation photos your team captured
        during trials, so a buyer can see fruit quality and plant habit from
        real fields rather than a studio.
      </ArticleP>

      <ArticleFigure
        src="/images/variety-compare-photos.png"
        alt="Field evaluation photos of two pepper varieties shown side by side"
        width={1800}
        height={969}
        caption="Field evaluation photos captured by your team during trials, shown for both varieties."
      />

      <ArticleP>
        Trial location maps show exactly where each variety was grown, which
        makes it easy to prove local performance to a customer who wants
        results from their own region.
      </ArticleP>

      <ArticleFigure
        src="/images/variety-compare-maps.png"
        alt="Trial location maps for two varieties shown side by side"
        width={1800}
        height={967}
        caption="Trial location maps showing exactly where each variety was grown."
      />

      <ArticleP>Watch the full comparison flow here:</ArticleP>

      <ArticleVideo
        src="/videos/variety-comparison-tour.mov"
        caption="Comparing two varieties from summary stats to charts, photos, and trial locations."
      />

      <ArticleH2>The Full Story Behind Every Variety</ArticleH2>

      <ArticleP>
        Charts, photos, and maps are only part of what the catalog keeps for
        each variety. Open any variety and you also get:
      </ArticleP>

      <ArticleList>
        <ArticleItem>
          <strong>Variety notes:</strong> document important remarks on each
          variety and mention teammates, so observations stay attached to the
          line instead of scattered across emails and notebooks
        </ArticleItem>
        <ArticleItem>
          <strong>Trial history summary:</strong> a year by year record of
          every trial, with planting and harvest dates, scores, and the pros,
          cons, and conclusions your team recorded
        </ArticleItem>
        <ArticleItem>
          <strong>Trait results:</strong> the distribution of evaluation
          responses for every trait, shown as pie or bar charts, covering both
          rating scales and open text answers
        </ArticleItem>
        <ArticleItem>
          <strong>PDF export:</strong> share a complete variety summary,
          including score charts, trait results, photos, remarks, trial
          history, and locations, with anyone in one click
        </ArticleItem>
      </ArticleList>

      <ArticleH2>What This Means for Your Team</ArticleH2>

      <FeatureGrid>
        <Feature title="Faster Commercial Decisions">
          Aggregated scores, maturity, and trial counts surface your strongest
          candidates without a single spreadsheet
        </Feature>
        <Feature title="Answers for Specific Slots">
          Filter by region, grower, and planting or harvest windows to match
          varieties to the exact program a customer needs
        </Feature>
        <Feature title="Proof in the Pitch">
          Walk into a sales meeting with charts against the check, field
          photos, and local trial maps instead of claims
        </Feature>
        <Feature title="One Source of Truth">
          Every number traces back to trials and evaluations your own team
          recorded in the field with SeedSense
        </Feature>
      </FeatureGrid>

      <ArticleP>
        Data collection gets your trial results out of the field. The Variety
        Catalog puts them to work, helping you pick the right products and
        giving your sales team the evidence to sell them. That is the
        difference between software that stores data and software that grows
        revenue.
      </ArticleP>

      <ArticleCta
        text="Ready to turn your trial data into your next sale?"
        buttonLabel="See How It Works"
      />
    </BlogPostLayout>
  );
}
