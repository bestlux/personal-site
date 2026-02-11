# Tech Stack and Hosting Plan

## Application
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Local MDX content with frontmatter validation via Zod

## Rendering Strategy
- Static generation for content-heavy routes
- Dynamic metadata generation for project and post detail pages

## Tooling
- ESLint
- Vitest + Testing Library
- Playwright for smoke e2e

## Hosting
- Vercel deployment with preview environments
- Custom domain at launch (recommended candidate: `iomancer.dev`)

## Analytics
- Privacy-first analytics platform (Plausible preferred)

## CI
- GitHub Actions workflow running lint, typecheck, unit tests, build, and e2e smoke
