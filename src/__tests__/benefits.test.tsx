import { render, screen } from "@testing-library/react";
import BenefitsPage from "@/app/(site)/benefits/page";

describe("BenefitsPage", () => {
  it("renders the hero headline", () => {
    render(<BenefitsPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /built for everyone.*in the trial/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders all three stakeholder roles", () => {
    render(<BenefitsPage />);
    expect(screen.getAllByRole("heading", { name: "Product Developers" }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { name: "Partners & Growers" }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { name: "Sales Managers" }).length).toBeGreaterThan(0);
  });

  it("renders the core benefit for each stakeholder", () => {
    render(<BenefitsPage />);
    expect(
      screen.getByRole("heading", { name: /input field data online or offline/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /sync once, share across the company/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /task management that stays visible/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /automated trial map emails/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /compare varieties before you sell/i }),
    ).toBeInTheDocument();
  });

  it("renders stakeholder images", () => {
    render(<BenefitsPage />);
    expect(
      screen.getByAltText(/entering trial data on a tablet in the field/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/email settings for sending trial maps/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/comparing two varieties side by side/i),
    ).toBeInTheDocument();
  });

  it("renders the contact section", () => {
    render(<BenefitsPage />);
    expect(
      screen.getByRole("heading", { name: /leave the spreadsheets behind/i }),
    ).toBeInTheDocument();
  });
});
