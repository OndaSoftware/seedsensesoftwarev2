# SeedSense Landing

The marketing site for [SeedSense by Onda](https://seedsensesoftware.com), rebuilt as a modern Next.js application from the original static HTML site.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, static prerendering)
- [Tailwind CSS v4](https://tailwindcss.com) with a custom theme matching the original design tokens
- `next/font` for Inter + Fraunces, `next/image` for optimized images
- Jest + React Testing Library for tests, ESLint (Next + Testing Library rules) for linting

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

## Scripts

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Start the dev server              |
| `npm run build`      | Static export to `out/`           |
| `npm run lint`       | Run ESLint                        |
| `npm test`           | Run the Jest + RTL test suite     |
| `npm run test:watch` | Run tests in watch mode           |

## Structure

- `src/app/` — one route per page: home, `benefits`, `about`, `all-blogs`, and one route per blog post (slugs match the original site's URLs). `sitemap.ts` and `robots.ts` generate SEO files.
- `src/components/` — shared UI: `SiteHeader`, `SiteFooter`, `ContactCta` (the dark contact section repeated on every page), `Reveal` (scroll-reveal animation), homepage sections, and blog building blocks (`Article*` primitives, `FeatureGrid`, `BlogCard`, `FilterableBlogGrid`, `BlogPostLayout`).
- `src/lib/` — site constants (`site.ts`) and blog post metadata (`posts.ts`).
- `public/images`, `public/videos` — optimized assets carried over from the original site.

## Adding a blog post

1. Add its metadata to `src/lib/posts.ts` (newest first).
2. Create `src/app/<slug>/page.tsx` composing `BlogPostLayout` with the article primitives (`ArticleP`, `ArticleH2`, `ArticleList`, `ArticleFigure`, `ArticleVideo`, `FeatureGrid`, `ArticleCta`).
3. It automatically appears on `/all-blogs` and in the sitemap.

## Deploy (GitHub Pages)

This repo publishes **https://seedsensesoftware.com**. Next.js is exported as static HTML (`output: "export"`). Every push to `main` runs `.github/workflows/deploy.yml`, which builds `out/` and deploys it with GitHub Actions.

The custom domain and HTTPS certificate stay on this repository. DNS for the apex already points at GitHub Pages (`185.199.108–111.153`); `www` is a CNAME to `ondasoftware.github.io`.
