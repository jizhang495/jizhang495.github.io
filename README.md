# jz's Blog

Source for [jizhang495.github.io](https://jizhang495.github.io), built with [Astro](https://github.com/withastro/astro). Posts are Markdown-first and sorted by last updated date.

## Features
- Markdown content in `src/content/blog/*.md` with frontmatter for title, description (<=180 chars), published/updated dates, optional tags, and draft flag.
- Homepage lists latest posts with 2-line descriptions; archive pagination lives at `/blog/2/`, `/blog/3/`, etc.
- Post pages include published/updated dates, tags, prev/next navigation, and GitHub-login comments via Giscus.
- RSS feed at `/rss.xml`.
- GitHub Pages workflow in `.github/workflows/deploy.yml`.

## Development
```sh
npm install
npm run dev -- --host   # start dev server on 0.0.0.0:4321
npm run build           # build to dist/
npm run preview         # preview the production build
```

## Comments (Giscus)
Set these environment variables for comments to load:
- `PUBLIC_GISCUS_REPO`
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`
- (optional) `PUBLIC_GISCUS_MAPPING`, defaults to `pathname`

Without them, a placeholder notice appears and comments are disabled.

## Deployment
Push to `main` and GitHub Actions will build and deploy to GitHub Pages. Update `astro.config.mjs` `site` if the domain changes.

## License
All rights reserved. No reuse of contents without permission.
