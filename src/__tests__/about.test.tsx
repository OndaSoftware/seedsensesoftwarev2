import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/(site)/about/page";
import { site } from "@/lib/site";

describe("AboutPage", () => {
  it("renders the hero headline", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Who We Are" }),
    ).toBeInTheDocument();
  });

  it("renders the mission statement", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", {
        name: /simplifying seed trialing for smarter business decisions/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the founders story with both backgrounds", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", {
        name: /seed industry know-how\. software craft/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/one founder comes from the software industry/i)).toBeInTheDocument();
    expect(
      screen.getByText(/product development and sales at seed companies/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Industry Focused")).toBeInTheDocument();
    expect(screen.getByAltText("Onda Software Team")).toBeInTheDocument();
  });

  it("links to the Onda Software website", () => {
    render(<AboutPage />);
    const ondaLinks = screen.getAllByRole("link", { name: "Onda Software" });
    expect(ondaLinks.length).toBeGreaterThan(0);
    ondaLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", site.ondaUrl);
    });
  });

  it("renders the contact section", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { name: /leave the spreadsheets behind/i }),
    ).toBeInTheDocument();
  });
});
