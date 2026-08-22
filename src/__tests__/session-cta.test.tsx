import { render, screen } from "@testing-library/react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SESSION_COOKIE } from "@/lib/session";
import { site } from "@/lib/site";

function signIn(name?: string, secondsFromNow = 3600) {
  const payload = {
    v: 1,
    ...(name === undefined ? {} : { name }),
    exp: Math.floor(Date.now() / 1000) + secondsFromNow,
  };
  const value = Buffer.from(JSON.stringify(payload)).toString("base64url");
  document.cookie = `${SESSION_COOKIE}=${value}; path=/`;
}

beforeEach(() => {
  document.cookie = `${SESSION_COOKIE}=; Max-Age=0; path=/`;
});

/*
 * The device split is pure CSS (the `app:` variant at 1050px), so BOTH the
 * "Open App" anchor and the session CTA are always in the DOM — only one is
 * visible at any width. These assertions check the markup contract; which of
 * the two is shown is a stylesheet concern, not a React one.
 */
describe("SiteHeader", () => {
  it("always offers an Open App link pointing at the universal link", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Open App" })).toHaveAttribute(
      "href",
      site.openAppUrl,
    );
  });

  it("shows Login when there is no session", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      site.portalUrl,
    );
    expect(screen.queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
  });

  it("swaps Login for Dashboard once a session cookie is present", () => {
    signIn("Faseeh Hyder");
    render(<SiteHeader />);
    expect(
      screen.getByRole("link", { name: /^Dashboard/ }),
    ).toHaveAttribute("href", site.portalUrl);
    expect(screen.queryByRole("link", { name: "Login" })).not.toBeInTheDocument();
  });

  it("names the signed-in user in the accessible label", () => {
    signIn("Faseeh Hyder");
    render(<SiteHeader />);
    expect(
      screen.getByRole("link", { name: "Dashboard — signed in as Faseeh Hyder" }),
    ).toBeInTheDocument();
  });

  it("still shows Dashboard when the session carries no name", () => {
    signIn(undefined);
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("falls back to Login when the session has expired", () => {
    signIn("Faseeh Hyder", -60);
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("uses the footer wording when signed out", () => {
    render(<SiteFooter />);
    expect(
      screen.getByRole("link", { name: "Login to SeedSense" }),
    ).toHaveAttribute("href", site.portalUrl);
    expect(screen.getByRole("link", { name: "Open App" })).toHaveAttribute(
      "href",
      site.openAppUrl,
    );
  });

  it("uses the footer wording when signed in", () => {
    signIn("Faseeh Hyder");
    render(<SiteFooter />);
    expect(
      screen.getByRole("link", { name: /^Go to Dashboard/ }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Login to SeedSense" })).not.toBeInTheDocument();
  });
});
