# Editorial Refinement

Current direction: September 7, 2026.

This document is the implementation authority for the refinement. The original brief remains useful for identity and inspiration; its five-hero exploration and the older roadmap are historical context, not current acceptance criteria.

## Decisions

The user selected **editorial artifact**, with **work and thinking first**. The problems to solve were competing decoration, awkward spacing/composition, inconsistent pages, and insufficient personal expression.

The response is not another palette change. Retain warm ink, bone, Space Grotesk, IBM Plex Sans, IBM Plex Mono, and the personal geometric vocabulary. Concentrate visual expression in composition, the portrait, real work, and personal content rather than many ambient effects.

The typographic cover is the implemented direction. A large name, direct statement, and framed circular portrait replace the manifesto over a moving lattice. The source portrait is already circular; the crop intentionally respects that asset instead of exposing its black corners in a rectangle. Mobile uses a compact name-and-portrait row, not a scaled desktop layout or a large image stacked below the introduction.

## Visual Rules

| Element   | Rule                                                                                                                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frame     | 1200px maximum, 20px mobile and 32px desktop gutters. Fractional grid tracks account for gaps.                                                                                                                 |
| Prose     | Approximately 720px maximum. Body copy generally 1rem; article copy scales to 1.17rem with generous line height.                                                                                               |
| Hierarchy | One H1 per page. Display size and semantic heading level are independent. Content titles use a readable sans; mono is metadata, not a universal heading style.                                                 |
| Color     | Ink/bone lead. Brass accents work and identity; readable light moss accents the personal archive. Color is never the only navigation cue.                                                                      |
| Geometry  | The masthead mark and portrait frame are identity moments. Do not put a watermark, ruler, crosshair, or diagram on every section. Experimental motifs remain available in the development specimen.            |
| Material  | One subtle static grain layer and a restrained background wash. No moving global texture or grid.                                                                                                              |
| Surfaces  | Prefer editorial rules, lists, figures, and open space. Bordered panels have a content purpose, not a default role as wrappers for every paragraph.                                                            |
| Images    | Preserve natural color. Optimize local and allowlisted remote sources, reserve aspect ratio, and render a useful failure state.                                                                                |
| Motion    | Small interaction feedback. Home works entirely still. Reveals enhance visible content instead of hiding HTML until JavaScript runs. SVG/pointer animation in the legacy hex specimen respects reduced motion. |
| Focus     | Visible keyboard outlines, named controls, focusable fragment targets, labeled tabs/panels, and a shared skip link.                                                                                            |
| Voice     | Direct, factual, and personal. No invented observations, fresh activity, research output, or project results.                                                                                                  |

## Page Composition

### Home

1. Shared masthead with Projects, Writing, About, and Index.
2. Compact personal cover: name, portrait, current work, and clear entry links.
3. Instant Perler Pattern as a selected project, with an original bead illustration rather than a fabricated product screenshot.
4. Professional and teaching context, followed by the latest real article.
5. Personal interests connected through readable prose and links.
6. Full Professional / Education / Hobbies directory, followed by the shared footer.

The index remains the complete directory, but is no longer the primary homepage experience. Its mobile content remains visible without an accordion or client-side reveal gate.

### Work And Writing

- Projects uses a single case study because there is one published project. Show the product/code links early, explain the problem and workflow, and retain the concrete capabilities.
- About uses a concise factual biography with a personal side rail. Do not promise an extensive essay that the supplied content does not contain.
- Writing keeps Aberrant Quiddity as its publication name while using plain "Writing" in navigation.
- Articles have a quiet centered reading column, consistent typography, useful metadata, and restrained links. No mandatory drop caps, generated section counters, or repeated background diagrams.

### Personal Archive

- Reading: compact book lists, real dates, optional actual reviews, no implied live progress.
- Study: dated course progress and descriptions; the historic streak remains explicitly historic.
- Hikes: trail log with distance, elevation, difficulty, and recorded duration.
- Travel: shareable country selection, visit history, favorite places, and an accessible non-interactive state map. DC is counted separately from states.
- Festivals: year-based experiences with existing memories and imagery.
- Comedy: comedian/show history with recorded venues, dates, and tickets.
- Art: individual artwork presentation, not an empty multi-item gallery template.

Filter state lives in the URL and supports reload and Back/Forward. Existing travel and comedy text is retained in server-rendered panels; lazy image loading avoids eagerly downloading those inactive panels' images.

## Shared Behavior

`ClientRootLayout` owns the header and site footer outside each page's `main`. Public pages expose `main-content`. `PageHeader`, `SectionFrame`, `ContentImage`, and `ImageLightbox` centralize the parts where inconsistency previously accumulated.

Newsletter signup is explicitly requested in the footer. There is no timed popup or localStorage-dependent prompt. Validation is inline, and focus returns to the trigger after closing. Tests mock both successful and failed API responses; they never submit real subscribers.

Calendar dates use `formatCalendarDate`, with explicit UTC formatting. Ongoing visits use an explicit flag, not a generated "today" end date at module load. Blog loading accepts only known slugs.

The generated social image, canonical URLs, route metadata, sitemap, robots rules, and custom not-found page are part of the same experience. `/preview` is noindex and returns 404 in production.

## Verification

The site has a production build and a Playwright suite covering:

- All 12 public pages at 320, 390, 768, 1024, and 1440px without document overflow.
- Automated WCAG A/AA checks on each page and the image dialog.
- One H1, one main landmark, and one site footer per page.
- Keyboard navigation, fragment-target focus, tab relationships, gallery focus restoration, and URL history.
- Opt-in newsletter behavior, invalid input, mocked success/error responses, and restored focus.
- No-JavaScript homepage navigation, reduced motion, and broken-image fallbacks.
- Calendar dates, blog metadata/slugs, public assets, and travel totals.
- Six screenshot baselines: home, project, and article at mobile and desktop sizes.

Representative screenshots are stored under `tests/site.spec.ts-snapshots/`. Browser screenshots were also used to compare the previous homepage and inspect the archive layouts. Static checks and automated accessibility tests supplement human inspection; they do not claim exhaustive accessibility certification or cross-browser coverage.

## Content And Maintenance

The implementation does not depend on filling empty sections with invented content. New project screenshots/case studies, personal trip photographs, reading notes, and more writing would deepen the site as authentic material becomes available. Those are editorial additions, not unfinished placeholder components.

Do not reintroduce a work-first hiring funnel that erases the personal archive, or an archive metaphor so elaborate that visitors cannot find the work. Keep the original resume/tattoo references as a source of authorship, not a requirement to repeat every motif.

Deployment is separate from implementation. No commit, push, or deployment is implicit in this refinement.
