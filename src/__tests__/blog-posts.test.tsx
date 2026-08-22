import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import AutomatedReportsPage from "@/app/(site)/automated-reports/page";
import DealerSupplierCommunicationPage from "@/app/(site)/dealer-supplier-communication-b2/page";
import FieldTrialToSalesPitchPage from "@/app/(site)/field-trial-to-sales-pitch/page";
import MeetTheVarietyCatalogPage from "@/app/(site)/meet-the-variety-catalog/page";
import SeedsenseSpanishPortPage from "@/app/(site)/seedsense-spanish-port/page";
import SoftwareValuePage from "@/app/(site)/software-value-b1/page";
import WheresYourTrialDataPage from "@/app/(site)/wheres-your-trial-data/page";
import { categoryLabels, getPost } from "@/lib/posts";

const pages: [slug: string, Page: ComponentType][] = [
  ["meet-the-variety-catalog", MeetTheVarietyCatalogPage],
  ["field-trial-to-sales-pitch", FieldTrialToSalesPitchPage],
  ["dealer-supplier-communication-b2", DealerSupplierCommunicationPage],
  ["software-value-b1", SoftwareValuePage],
  ["automated-reports", AutomatedReportsPage],
  ["wheres-your-trial-data", WheresYourTrialDataPage],
  ["seedsense-spanish-port", SeedsenseSpanishPortPage],
];

describe.each(pages)("blog post page: %s", (slug, Page) => {
  const post = getPost(slug);

  it("renders the post title as the page heading", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: post.title }),
    ).toBeInTheDocument();
  });

  it("renders the category tag, read time, and author", () => {
    render(<Page />);
    expect(
      screen.getAllByText(categoryLabels[post.category]).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(post.readTime)).toBeInTheDocument();
    expect(screen.getByText("SeedSense Team")).toBeInTheDocument();
  });

  it("links back to the blog index", () => {
    render(<Page />);
    expect(
      screen.getByRole("link", { name: /back to insights/i }),
    ).toHaveAttribute("href", "/all-blogs");
  });

  it("ends with the shared contact section", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { name: /leave the spreadsheets behind/i }),
    ).toBeInTheDocument();
  });
});

describe("blog post specifics", () => {
  it("meet-the-variety-catalog embeds both product tour videos", () => {
    render(<MeetTheVarietyCatalogPage />);
    const sources = screen.getAllByTestId("article-video-source");
    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("src", "/videos/variety-catalog-tour.mov");
    expect(sources[1]).toHaveAttribute("src", "/videos/variety-comparison-tour.mov");
  });

  it("dealer-supplier post renders the Seedway testimonial", () => {
    render(<DealerSupplierCommunicationPage />);
    expect(
      screen.getByText(/Donavin Buck, Sales and Product Development, Seedway/),
    ).toBeInTheDocument();
  });
});
