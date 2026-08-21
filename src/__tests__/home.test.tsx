import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { site } from "@/lib/site";

describe("HomePage", () => {
  it("renders the hero headline and demo CTA", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /reinvent your seed trials/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Request a Demo" }).length,
    ).toBeGreaterThan(0);
  });

  it("renders the Seedway trusted-by section", () => {
    render(<HomePage />);
    const seedwayLink = screen.getByRole("link", { name: /seedway/i });
    expect(seedwayLink).toHaveAttribute("href", site.seedwayUrl);
    expect(
      screen.getByText(/one of the US's leading full-line seed companies/i),
    ).toBeInTheDocument();
  });

  it("renders all five feature sections", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /works everywhere\..*even without signal/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /see every trial,.*precisely located/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /grade with precision/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /from field data.*to boardroom report/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /find the next best variety/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/comparing two varieties side by side/i),
    ).toBeInTheDocument();
  });

  it("renders the four How It Works steps", () => {
    render(<HomePage />);
    ["Plant Your Trial", "Manage Tasks", "Evaluate Your Trial", "Report & Share"].forEach(
      (step) => {
        expect(screen.getByRole("heading", { name: step })).toBeInTheDocument();
      },
    );
  });

  it("renders the contact section", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /leave the spreadsheets behind/i }),
    ).toBeInTheDocument();
  });
});
