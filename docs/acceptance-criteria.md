# Acceptance Criteria

## Functional
- All planned routes exist and render.
- Content collections load from local MDX with schema validation.
- Projects page supports category/status filtering.
- Writing page supports tags and links to tag archives.
- RSS, sitemap, and robots are generated.

## Content
- At least 3 projects, 2 writing posts, 1 now entry, and web resume content exist at launch.

## UX and Design
- Distinct visual system is consistent across pages.
- Dark mode defaults, light mode toggle persists.
- Site is responsive at mobile/tablet/laptop/desktop breakpoints.

## Quality
- `npm run lint` passes.
- `npm run typecheck` passes.
- Unit tests pass.
- Playwright smoke tests pass locally.

## Accessibility
- Keyboard focus states are visible and functional.
- Reduced motion preference is respected.
- Major routes have no critical automated accessibility violations in smoke checks.

## Privacy and Security
- Contact email is not emitted as plain text in static HTML.
- Privacy page states analytics posture.
- Baseline security headers are configured in Next.js config.
