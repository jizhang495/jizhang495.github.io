# AGENTS.md — Blog Site Maintenance Guide

This repo hosts a minimal Astro-based personal blog intended to be Markdown-first, fast, and long-lived.

## Goals
- Minimalist homepage: nickname left, social links (YouTube, GitHub, LinkedIn, Google Scholar) right.
- Home page lists blog posts by **Last updated** descending.
- Each post has: title, published date, updated date, and Markdown body.
- Home list shows a **2-line description** for each post.
- Pagination for older posts.
- Post pages include:
  - Title + published/updated
  - Prev/Next navigation (ordered by updated date)
  - GitHub-login comments via Giscus
- RSS feed for updates.

## Content model
Posts live in `src/content/blog/*.md` with frontmatter:

- title: string
- description: string (<= 180 chars; shown on lists; 2-line clamp)
- published: YYYY-MM-DD
- updated: YYYY-MM-DD
- draft: boolean (optional, default false)
- tags: string[] (optional)

## Key files
- `src/content/config.ts` — content collection schema
- `src/pages/index.astro` — homepage list (page 1)
- `src/pages/blog/[page].astro` — pagination (page 2..N)
- `src/pages/blog/[...slug].astro` — post renderer + prev/next
- `src/layouts/PostLayout.astro` — post page layout + comments
- `src/components/Giscus.astro` — comments embed
- `src/pages/rss.xml.ts` — RSS feed
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow

## URL scheme
- Homepage: `/`
- Posts: `/blog/<slug>/`
- Pagination: `/blog/2/`, `/blog/3/`, ...
Stable slugs are important; avoid changing slugs after publishing.

## Comments (Giscus)
Giscus uses GitHub Discussions. No custom rate limiting is implemented.
Rationale:
- GitHub already has abuse/spam protections.
- Site owner can moderate/lock threads via GitHub Discussions.
- Rate limiting in a fully static site adds complexity and usually isn’t needed.

If spam becomes a problem:
- Lock a discussion thread
- Restrict who can comment in repo settings
- Disable comments site-wide by removing `Giscus` from `PostLayout.astro`

## Deployment
- GitHub Actions builds `dist/` and deploys to GitHub Pages on pushes to `main`.
- If deploying to a custom domain, update `astro.config.mjs` `site` and configure DNS.

## Bot integration (future)
Preferred integration points:
- RSS (`/rss.xml`) for incremental polling
- GitHub webhook / Actions-based diff summaries for Telegram notifications
No hosting platform dependency: the repo remains the source of truth.