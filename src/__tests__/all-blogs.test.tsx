import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AllBlogsPage from "@/app/(site)/all-blogs/page";
import { posts } from "@/lib/posts";

describe("AllBlogsPage", () => {
  it("renders the hero headline", () => {
    render(<AllBlogsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /insights.*updates/i }),
    ).toBeInTheDocument();
  });

  it("renders the featured article and a card for every post", () => {
    render(<AllBlogsPage />);
    posts.forEach((post) => {
      const links = screen.getAllByRole("link", {
        name: new RegExp(post.title.slice(0, 30).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      });
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link).toHaveAttribute("href", `/${post.slug}`);
      });
    });
  });

  it("filters posts by category", async () => {
    const user = userEvent.setup();
    render(<AllBlogsPage />);

    await user.click(
      screen.getByRole("button", { name: "Product Features" }),
    );

    const productPosts = posts.filter((p) => p.category === "product-features");
    const businessPosts = posts.filter((p) => p.category === "business-insights");

    productPosts.forEach((post) => {
      expect(
        screen.getByRole("heading", { level: 3, name: post.title }),
      ).toBeInTheDocument();
    });
    businessPosts.forEach((post) => {
      expect(
        screen.queryByRole("heading", { level: 3, name: post.title }),
      ).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "All Topics" }));
    posts.forEach((post) => {
      expect(
        screen.getByRole("heading", { level: 3, name: post.title }),
      ).toBeInTheDocument();
    });
  });
});
