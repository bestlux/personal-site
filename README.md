# iomancer personal site

A full-scope personal website built with Next.js App Router, TypeScript, Tailwind CSS, and local MDX content.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

## Content Authoring

MDX content lives under `content/`:
- `content/projects/*.mdx`
- `content/writing/*.mdx`
- `content/now/*.mdx`
- `content/pages/resume.mdx`

Frontmatter is validated with Zod at runtime.

## Docs

Planning and product artifacts:
- `docs/product-spec.md`
- `docs/decision-log.md`
- `docs/acceptance-criteria.md`
- `docs/non-goals.md`
- `docs/tech-stack-hosting.md`
- `docs/domain-shortlist.md`

## Domain

Recommended launch domain: `iomancer.dev`.
Set canonical host via `NEXT_PUBLIC_SITE_URL`.

## Optional Env Vars

- `NEXT_PUBLIC_SITE_URL` canonical site URL (for metadata/sitemap)

Analytics is provided by Vercel Web Analytics and does not require app env variables.
