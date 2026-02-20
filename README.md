# iomancer | Personal Signal Interface

A high-performance, industrial-themed personal engineering portfolio. Built with Next.js App Router, TypeScript, Tailwind CSS, and local MDX content.

Designed to emulate a tactical aerospace or mission-control dashboard, featuring fluid micro-interactions, a stark functional color palette, and a keyboard-first global command menu.

## Architecture & Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (spring-physics based layout transitions)
- **Content:** Local MDX validated rigorously by Zod
- **UX Tooling:** `cmdk` (Global Command Palette), Radix UI (Accessibility), Lucide React (Icons)
- **Deployment:** Vercel Web Analytics

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

## Content Authoring (MDX)

All content is statically managed in the `content/` directory:
- `content/projects/*.mdx` - Project dossiers and case studies.
- `content/writing/*.mdx` - Technical essays and telemetry logs.
- `content/now/*.mdx` - Monthly "Now Dashboard" system status updates.
- `content/pages/resume.mdx` - Professional history.

Frontmatter is strictly typed and validated with Zod at runtime (`src/lib/content/schemas.ts`).

### Custom MDX Components
- `<Callout type="info|warning|error">` - Renders a tactical system alert box inside articles.
- Code blocks (`<pre>`) are styled as stark terminal output panels.

## UI Design Language

The site employs a **High-Tech Brutalism / Aerospace** aesthetic:
- **Typography:** `Inter` for highly readable body prose, `JetBrains Mono` for all data, telemetry, and structural UI elements.
- **Grids & Borders:** Heavy reliance on 1px functional borders, removing all soft shadows and glassmorphism.
- **Micro-interactions:**
  - `<TextScramble />` - Hardware decryption effect on primary headers.
  - Hover states trigger tactical 90-degree crosshair rotations.
  - A global, subtle CSS CRT scanline overlay (`.scanlines`).
  - Native-app style page transitions (`layoutId` navigation underlines, `Template` sliding page mounts).

## Domain

Recommended launch domain: `iomancer.dev`.
Set canonical host via `NEXT_PUBLIC_SITE_URL`.
