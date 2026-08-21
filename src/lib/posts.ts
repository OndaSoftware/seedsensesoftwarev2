export type PostCategory = "business-insights" | "product-features";

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
}

export const categoryLabels: Record<PostCategory, string> = {
  "business-insights": "Business Insights",
  "product-features": "Product Features",
};

/** Ordered newest-first, mirroring the original all-blogs.html grid. */
export const posts: PostMeta[] = [
  {
    slug: "meet-the-variety-catalog",
    title:
      "Meet the Variety Catalog: Find Your Next Winning Variety in Your Trial Data",
    excerpt:
      "The new Variety Catalog turns your trial data into a decision tool. Find your next product, compare trialed varieties side by side, and give your sales team proof.",
    category: "business-insights",
    readTime: "5 min read",
    date: "August 2026",
    image: "/images/seed-trial-meeting-room.jpg",
    imageAlt:
      "Seed company team reviewing variety trial results in a meeting room",
  },
  {
    slug: "field-trial-to-sales-pitch",
    title:
      "From Field Trial to Sales Pitch: How to Turn Performance Data into Deals",
    excerpt:
      "Your best salespeople aren't closing deals with brochures — they're closing them with proof. Here's how to turn your trial data into your strongest sales tool.",
    category: "business-insights",
    readTime: "5 min read",
    date: "April 2026",
    image: "/images/girl-farmer-tablet-field.jpg",
    imageAlt: "Agronomist reviewing seed trial data on a tablet in the field",
  },
  {
    slug: "dealer-supplier-communication-b2",
    title:
      "Bridging the Communication Gap Between Seed Suppliers & Distributors",
    excerpt:
      "Discover how SeedSense facilitates real-time data sharing between distributors and breeding companies to improve variety selection decisions.",
    category: "business-insights",
    readTime: "4 min read",
    date: "April 2025",
    image: "/images/smallplots3.jpg",
    imageAlt: "Seed trial plots in the field",
  },
  {
    slug: "software-value-b1",
    title: "How SeedSense Helps Seed Companies Boost Their Bottom Line",
    excerpt:
      "By improving data collection, streamlining collaboration, and delivering real-time insights, SeedSense enables seed companies to move faster and make smarter decisions.",
    category: "business-insights",
    readTime: "5 min read",
    date: "March 2025",
    image: "/images/mixedlettuce.jpg",
    imageAlt: "Mixed lettuce varieties in trial",
  },
  {
    slug: "automated-reports",
    title: "Automated Reports: Simplify Your Seed Trials with SeedSense",
    excerpt:
      "Generate trial maps and evaluation reports instantly. Share tailored PDFs with suppliers, farmers, and teams via email links — no spreadsheets, no hassle.",
    category: "product-features",
    readTime: "4 min read",
    date: "2025",
    image: "/images/pic01new.jpg",
    imageAlt: "Seed trial automated reporting",
  },
  {
    slug: "wheres-your-trial-data",
    title: "Where's Your Trial Data? How to Keep It All in One Place",
    excerpt:
      "Discover how centralizing your trial data prevents lost insights and drives smarter decisions for your seed company.",
    category: "product-features",
    readTime: "5 min read",
    date: "2025",
    image: "/images/pic02new.jpg",
    imageAlt: "Centralized seed trial data",
  },
  {
    slug: "seedsense-spanish-port",
    title: "SeedSense in English, Spanish, and Portuguese: Trial Anywhere",
    excerpt:
      "Learn how SeedSense's multilingual support empowers product development teams to manage trials seamlessly in their native language.",
    category: "product-features",
    readTime: "3 min read",
    date: "2025",
    image: "/images/pic03new.jpg",
    imageAlt: "Global seed trial teams",
  },
];

export const featuredPost = posts[0];

export function getPost(slug: string): PostMeta {
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Unknown blog post slug: ${slug}`);
  }
  return post;
}
