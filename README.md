# zacharyreece.dev

A personal home for Zachary Reece's software, writing, learning, and life away from the screen.

## Design

Warm ink and bone, editorial typography, and restrained geometry drawn from the resume and tattoo references. Work and thinking lead; the broader personal archive remains accessible through the full index.

The current implementation guide is [Design Refinement](docs/design_refinement.md). It supersedes conflicting composition, motion, and homepage instructions in the original [design brief](docs/personal_website_design_doc.md) and [historical roadmap](docs/redesign_roadmap.md).

## Development

Use Node 20.9 or newer (verified with Node 24). The lockfile pins the supported dependencies, including Next 15.5.25, React 19.2.8, and the existing MUI 7 beta.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run format:check
npm run build
```

The development server defaults to http://localhost:3000. `/preview` is a development-only specimen page; it returns 404 in production. The homepage has one fixed editorial composition, not a `?hero=` switcher.

## Verification

```bash
npm run test:e2e
npm run test:visual
```

Playwright defaults to installed Google Chrome and starts or reuses a server on port 3100. The suite covers all 12 public pages, five viewport widths, WCAG A/AA automated checks, keyboard navigation, archive history/deep links, image failures, reduced motion, metadata, and newsletter interaction. Newsletter API responses are mocked; tests never create subscriptions.

Six reviewed screenshots cover home, projects, and an article at 390px and 1440px. Baselines are in `tests/site.spec.ts-snapshots/`; traces and reports are ignored. Regenerate deliberately with `npm run test:visual -- --update-snapshots`, then inspect the changes. Rendering can differ across operating systems and browser versions.

For a Playwright-managed Chromium instead of Chrome:

```bash
npx playwright install chromium
PLAYWRIGHT_CHANNEL=chromium npm run test:e2e
```

To verify the production build, run `npm run build`, start it with `npm run start -- --port 3100`, then run the tests in a second terminal. Do not run development and production builds against the same `.next` directory simultaneously.

## Structure

| Location                              | Purpose                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------- |
| `src/app/_components/home/`           | Editorial cover, selected work/writing, personal introduction, full index |
| `src/components/SiteHeader.tsx`       | Shared navigation and skip link                                           |
| `src/components/ClientRootLayout.tsx` | Global theme, header, footer, newsletter, analytics                       |
| `src/components/primitives/`          | Frames, headings, links, labels, and development geometry specimens       |
| `src/components/ContentImage.tsx`     | Responsive optimized images with graceful failures                        |
| `src/components/ImageLightbox.tsx`    | Accessible shared gallery dialog                                          |
| `src/theme/`                          | Tokens, self-hosted fonts, MUI theme                                      |
| `src/content/blog/`                   | MDX writing                                                               |
| `src/lib/`                            | Blog loader, calendar dates, URL-backed archive tabs                      |
| `src/app/*/`                          | Page content and colocated archive data                                   |
| `src/app/opengraph-image.tsx`         | Generated social-sharing image                                            |
| `tests/`                              | Browser, content integrity, and visual regression checks                  |

## Content

Add posts to `src/content/blog/` with title, ISO calendar date, description, and optional tags. The homepage features the latest post automatically. Personal logs are maintained in the corresponding route's TypeScript data file; do not present a historic record as a live status.

Use `ContentImage` for gallery imagery. Local and approved remote images use Next's optimizer. New external image hosts or path families must be added explicitly to `images.remotePatterns` in `next.config.mjs`. Keep alt text, dimensions, and useful captions with the content. `sizes` can be overridden for unusual layouts; small book covers derive a suitable value from their width.

Archive filters are shareable: `/travel?country=mexico`, `/hikes?location=colorado`, `/comedy?comedian=adam-ray`, and `/music-festivals?year=2025`. Browser history restores selections. Travel and comedy text remain in the server HTML even when their panels are inactive.

## Environment And Dependencies

The newsletter's `/api/subscribe` route requires the Firebase Admin variables documented in `.env.local.example`. Credentials stay in local environment files or the deployment environment, never in source. Signup opens only from an explicit user action.

The dependency refinement eliminated reported high and critical advisories. Eight moderate production findings remain in Firebase/Google Cloud's UUID dependency chain; fixing them requires a separately verified Firebase Admin major upgrade. Two low development findings remain in the pinned ESLint toolchain. `next lint` is still supported in Next 15 but requires migration before a future Next 16 upgrade.
