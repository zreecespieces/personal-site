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

Playwright defaults to installed Google Chrome and starts or reuses a server on port 3100. The suite covers all 16 public pages, five viewport widths, mobile/desktop WCAG A/AA automated checks, keyboard navigation, homepage project order, Hobbies cards/navigation, shared project/article lists, project list/detail journeys, course release order/images/links, recorded hike measurements/links/photos, archive history/deep links/resize, image failures, reduced motion, metadata, and newsletter interaction. Newsletter API responses are mocked; tests never create subscriptions.

Screenshots cover every public page, 404, representative archive selections, and image/newsletter dialogs at 390px and 1440px. All new screenshots, baselines, traces, reports, profiles, and temporary browser files are NVME-only. The config verifies real paths/devices and does not fall back when `/Volumes/NVME` is unavailable. By default artifacts live in `/Volumes/NVME/personal-site-qa`; select a review directory explicitly:

```bash
PLAYWRIGHT_ARTIFACT_DIR=/Volumes/NVME/personal-site-qa/cohesion-20261011 npm run test:e2e
PLAYWRIGHT_ARTIFACT_DIR=/Volumes/NVME/personal-site-qa/cohesion-20261011 npm run test:visual -- --update-snapshots
```

Inspect baseline changes before accepting them. Reports/results have a unique directory per run; snapshots persist in the selected review directory. Earlier snapshots under `tests/site.spec.ts-snapshots/` are historical. Rendering can differ across operating systems and browser versions.

For a Playwright-managed Chromium instead of Chrome:

```bash
npx playwright install chromium
PLAYWRIGHT_CHANNEL=chromium npm run test:e2e
```

To verify the production build, run `npm run build`, start it with `npm run start -- --port 3100`, then run the tests in a second terminal. Do not run development and production builds against the same `.next` directory simultaneously.

Alternatively let Playwright start the production server after the build:

```bash
PLAYWRIGHT_PRODUCTION=1 PLAYWRIGHT_SERVER_COMMAND='npm run start -- --hostname 127.0.0.1 --port 3100' npm run test:e2e
```

The optimizer's `.next/cache/images` must also resolve to NVME. QA creates a link to its external image-cache directory on a fresh checkout; if an internal cache already exists, it refuses to proceed. Preserve and verify that cache's contents on NVME before replacing the directory with a link. Other builds and code caches are not moved by QA.

## Structure

| Location                              | Purpose                                                             |
| ------------------------------------- | ------------------------------------------------------------------- |
| `src/app/_components/home/`           | Editorial cover, selected projects, latest writing, complete index  |
| `src/app/_data/site.ts`               | Shared identity and primary/social navigation                       |
| `src/app/_data/hobbies.ts`            | Shared hobby destinations, glyphs, and card descriptions            |
| `src/app/_data/teaching.ts`           | Udemy courses, release months, artwork, and combined reach          |
| `src/app/projects/`                   | Project list, slug-based detail pages, and published project data   |
| `src/app/hobbies/`                    | Six icon-link cards for the personal archive                        |
| `src/components/SiteHeader.tsx`       | Shared navigation and skip link                                     |
| `src/components/ClientRootLayout.tsx` | Global theme, header, footer, newsletter, analytics                 |
| `src/components/primitives/`          | Frames, headings, links, labels, and development geometry specimens |
| `src/components/ContentImage.tsx`     | Responsive optimized images with graceful failures                  |
| `src/components/ImageLightbox.tsx`    | Accessible shared gallery dialog                                    |
| `src/components/ArchiveSelector.tsx`  | Responsive collection picker/tabs and accessible panels             |
| `src/components/DialogFrame.tsx`      | Shared image/newsletter modal surface and controls                  |
| `src/theme/`                          | Tokens, self-hosted fonts, MUI theme                                |
| `src/content/blog/`                   | MDX writing                                                         |
| `src/lib/`                            | Blog loader, calendar dates, URL-backed archive tabs                |
| `src/app/*/`                          | Page content and colocated archive data                             |
| `src/app/opengraph-image.tsx`         | Generated social-sharing image                                      |
| `tests/`                              | Browser, content integrity, and visual regression checks            |

## Content

Add posts to `src/content/blog/` with title, ISO calendar date, description, and optional tags. The homepage features the latest post automatically. Personal logs are maintained in the corresponding route's TypeScript data file; do not present a historic record as a live status.

Add published projects to `src/app/projects/projects.ts` with a unique lowercase hyphenated `slug`. `/projects` lists them newest-first; each row opens `/projects/[slug]`. Detail routes and sitemap entries are generated from that same data. Keep product/code links and full capabilities on the detail page rather than turning the list into a case study.

The homepage's Projects section sits between the hero and writing and reuses `ProjectList` without technology metadata. Perler remains off the homepage by editorial choice, while the complete project overview still includes it. Hobbies in the masthead opens `/hobbies`; its cards and the homepage hobby directory share `src/app/_data/hobbies.ts`.

Project details can include an optional `banner` (source URL, alt text, original dimensions, and caption) and `workflow` illustration. Both workflows use `src/app/projects/_components/WorkflowFigure.tsx` for consistent framing; `ProjectWorkflow.tsx` owns the project-specific SVG drawings. Keep schematic graphics distinct from measured results or product screenshots.

Udemy Courses uses `src/app/_data/teaching.ts` for its three courses and combined reach (22,500+ students, 150 countries, over 3,000 reviews), also consumed by About and project metadata. Course release dates are user-supplied months, not Udemy last-updated dates. `ProjectCourses.tsx` presents official artwork and curriculum details in release order. Keep changes to teaching figures in that shared data file; the résumé PDF is intentionally out of scope.

Use `ContentImage` for gallery imagery. Local and approved remote images use Next's optimizer. New external image hosts or path families must be added explicitly to `images.remotePatterns` in `next.config.mjs`. Keep alt text, dimensions, and useful captions with the content. `sizes` can be overridden for unusual layouts; small book covers derive a suitable value from their width.

Archive filters are shareable: `/travel?country=mexico`, `/hikes?location=colorado`, `/comedy?comedian=adam-ray`, and `/music-festivals?year=2025`. Browser history restores selections. Hikes and festivals use named native pickers on touch layouts and visible desktop tabs for short collections. Travel and Comedy use the shared `ArchiveCarousel` for scrollable visual tabs at every width, with named scroll buttons, keyboard navigation, and reduced-motion scrolling. `CountryCarousel` restores the historical flag-and-name switcher in the current editorial styling. `ComedianCarousel` orders portraits by each comedian's latest attended show (newest first), with the most recently attended comedian selected by default. Explicit URLs override the defaults. Comedy's permanent Comedy Works portrait URLs are allowlisted by filename; do not store their expiring redirect destinations. Travel and comedy text remain in the server HTML even when their panels are inactive.

Travel's ongoing Colorado home-history entry shows a current calendar-day duration, refreshed after hydration and while the page remains open. Pass an explicit ISO `asOfDate` to `calculateDaysSpent` only for this live display; the default calculation keeps ongoing visits out of completed-trip totals and days abroad. Arizona and Minnesota are included in the visited-state data; DC remains separate from the state count.

Comedy records optionally include a venue-local `startTime` in `HH:mm` format and an `address`, rendered alongside each show's date/location. Seven attended 2026 shows are transcribed from the two supplied screenshots, including the updated Duncan Trussell start time and Adam Ray tour name; the missed April 25 Ari Matti show is excluded. Aggregate totals remain computed from the data (22 shows, 17 comedians/live series).

Hikes can include an AllTrails `trailUrl` and recorded `activity` measurements with seconds-level moving/total times, average pace, estimated calories, and an optional actual personal rating. Preserve screenshot measurements rather than replacing them with public route estimates. The six 2026 entries retain illustrative AllTrails photo provenance in the data, without visible attribution labels or an access-warning note. Don't invent missing ratings or descriptions.

Use `PageLayout` for public page framing, `MetaLine` for dates/quantities, `RecordList` for editorial records, and `LinkedRecordList` for fully clickable project/article entries. Give each fact a primary home on a page. Navigation can repeat a destination without repeating its pitch; image dialogs can preserve orientation without copying an entire entry. Study omits the historic streak and start-date lines; historical study/reading records must not imply live progress. New reading records use verified Goodreads links and book covers without invented completion dates or ratings.

## Environment And Dependencies

The newsletter's `/api/subscribe` route requires the Firebase Admin variables documented in `.env.local.example`. Credentials stay in local environment files or the deployment environment, never in source. Signup opens only from an explicit user action.

The dependency refinement eliminated reported high and critical advisories. Eight moderate production findings remain in Firebase/Google Cloud's UUID dependency chain; fixing them requires a separately verified Firebase Admin major upgrade. Two low development findings remain in the pinned ESLint toolchain. `next lint` is still supported in Next 15 but requires migration before a future Next 16 upgrade.
