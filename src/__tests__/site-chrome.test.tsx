import { render, screen } from "@testing-library/react";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";

describe("SiteHeader", () => {
  it("renders the main navigation links", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Why SeedSense?" })).toHaveAttribute(
      "href",
      "/benefits",
    );
    expect(screen.getByRole("link", { name: "Who We Are" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Blogs" })).toHaveAttribute(
      "href",
      "/all-blogs",
    );
  });

  it("links Login to the SeedSense portal", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      site.portalUrl,
    );
  });

  it("renders the Request a Demo call to action", () => {
    render(<SiteHeader />);
    expect(
      screen.getByRole("link", { name: "Request a Demo" }),
    ).toHaveAttribute("href", "#contact");
  });
});

describe("SiteFooter", () => {
  it("renders contact details and external links", () => {
    render(<SiteFooter />);
    expect(
      screen.getByRole("link", { name: site.phoneDisplay }),
    ).toHaveAttribute("href", `tel:${site.phone}`);
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
    expect(
      screen.getByRole("link", { name: "Login to SeedSense" }),
    ).toHaveAttribute("href", site.portalUrl);
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toHaveAttribute("href", site.policyUrl);
  });

  it("shows the current year in the copyright line", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()}`)),
    ).toBeInTheDocument();
  });
});

describe("ContactCta", () => {
  it("renders the shared contact section with call and email actions", () => {
    render(<ContactCta />);
    expect(
      screen.getByRole("heading", { name: /leave the spreadsheets behind/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /call us/i })).toHaveAttribute(
      "href",
      `tel:${site.phone}`,
    );
    expect(screen.getByRole("link", { name: /email us/i })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });
});
