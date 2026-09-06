# iomancer — Distance

A personal site built around Voyager 1's Pale Blue Dot. The homepage holds About, Reading, and Music, with an unobstructed photograph view. Reading and Music open into dedicated pages with shareable URLs and room for long notes.

Built with Next.js App Router, TypeScript, IBM Plex Sans/Mono, and local MDX content. The original project, writing, and other URLs remain available under a separate route layout; the earlier design experiments live in `studies/`.

## Working locally

- `npm run dev` starts the main app.
- `npm run lint` checks source.
- `npm run typecheck` checks types (run the build first after changing routes).
- `npm run test:unit` checks content loading and utilities.
- `npm run test:e2e` checks navigation, phone layouts, and accessibility on port 3101. Override with `PLAYWRIGHT_PORT` if needed.
- `npm run build` creates the production app.

The experiments use port 3100, independently: `npm --prefix studies run dev`.

## Book notes

Edit a file in `content/reading/`. The three selected books are already listed there. Write Markdown below the frontmatter, then set `notesPublished: true` when the note is ready. Until then, the book stays on the shelf with a "notes to come" message and its draft body is excluded from rendered output.

```yaml
---
slug: finite-and-infinite-games
title: Finite and Infinite Games
author: James P. Carse
order: 1
notesPublished: false
updatedAt: "2026-09-05"
---
```

`updatedAt` is optional. Keep the slug stable to preserve shared links. Published notes must contain text. Headings, paragraphs, quotes, lists, links, images, tables, and code blocks are supported. A reading time is calculated automatically.

## Music

Add an MDX file in `content/music/`. See its README for frontmatter. An entry can be a song link, a playlist, an essay, or a link accompanied by notes. Music drafts stay out of the index, sitemap, and public routes until `notesPublished` is true. No songs or personal reflections have been invented to fill this section.

## Deployment

The repository is linked to the Vercel `personal-site` project. Its production deployment follows GitHub `main` and serves `iomancer.dev`. Content is built into the site: edit, validate, commit, and push to update it. Set `NEXT_PUBLIC_SITE_URL` to override the canonical host.

The photograph and source credit are in `public/images/ATTRIBUTION.md`. The old routes retain their existing presentation; the Distance homepage and reading pages do not load their command menu or animation shell.
