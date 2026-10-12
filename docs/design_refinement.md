# Editorial Refinement

Current direction: October 12, 2026.

This document is the implementation authority for the refinement. The original brief remains useful for identity and inspiration; its five-hero exploration and the older roadmap are historical context, not current acceptance criteria.

## Decisions

The user selected **editorial artifact**, with **work and thinking first**. The problems to solve were competing decoration, awkward spacing/composition, inconsistent pages, and insufficient personal expression.

The response is not another palette change. Retain warm ink, bone, Space Grotesk, IBM Plex Sans, IBM Plex Mono, and the personal geometric vocabulary. Concentrate visual expression in composition, the portrait, real work, and personal content rather than many ambient effects.

The typographic cover is the implemented direction. A large name, direct statement, and framed circular portrait replace the manifesto over a moving lattice. The source portrait is already circular; the crop intentionally respects that asset instead of exposing its black corners in a rectangle. Mobile uses a compact name-and-portrait row, not a scaled desktop layout or a large image stacked below the introduction.

The October refinement is a system-wide simplification, not another identity change. Each section must contribute distinct information. Navigation may repeat a destination, but must not repeat its promotional description. Record headers and image dialogs retain only the context needed to orient the visitor. Common layouts, metadata, record edges, selectors, and dialog framing belong to shared components rather than local styling conventions.

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
| Images    | Preserve natural color, including the portrait. Optimize local and allowlisted remote sources, reserve aspect ratio, and render a useful failure state.                                                        |
| Motion    | Small interaction feedback. Home works entirely still. Reveals enhance visible content instead of hiding HTML until JavaScript runs. SVG/pointer animation in the legacy hex specimen respects reduced motion. |
| Focus     | Visible keyboard outlines, named controls, focusable fragment targets, labeled tabs/panels, and a shared skip link.                                                                                            |
| Voice     | Direct, factual, and personal. No invented observations, fresh activity, research output, or project results.                                                                                                  |

## Page Composition

### Home

1. Shared masthead with Projects, Writing, About, and Hobbies.
2. Compact personal cover: name, portrait, current work, and clear entry links.
3. Compact Projects section with Kokoro Pi and Udemy Courses, followed by a link to all projects.
4. Latest real article and a link to all writing.
5. Compact Professional / Education / Hobbies directory, followed by the shared footer.

Instant Perler Pattern remains on the Projects page, not on the homepage. The primary cover action opens the complete index rather than a featured-project section. The homepage and project overview share `ProjectList` and its equal-weight linked rows; homepage descriptions omit the overview's technology metadata and use H3s beneath the Projects H2. Home keeps the section-wide divider and separators between projects, without a redundant border above the first project.

Visitor-facing labels use "Explore", "Take a look around", and "Explore more" rather than the technical term "index". The existing `#index` fragment remains stable for saved links.

The cover identifies Zach as "Software Engineer" and leads with "Reimagining education." Explore rows keep 16px horizontal and 12px vertical inset in every state, with a flat right arrow for both internal and external destinations. External links still open in a new tab.

Flint belongs in the introduction. The biography gives a short teaching history linked to the full Udemy project; both use the shared reach figures. The index is a complete navigation directory, not another round of project, work, teaching, and interest introductions. It keeps all 14 destinations, including teaching and grappling, without duplicating feature descriptions. Teaching on Udemy now opens `/projects/udemy-courses`. Labels match their destinations: Writing, Study, Hikes, Music festivals, and AI art.

The index remains the complete directory, but is no longer the primary homepage experience. Its mobile content remains visible without an accordion or client-side reveal gate.

### Work And Writing

- `/projects` is a newest-first project list: Kokoro Pi, Instant Perler Pattern, then Udemy Courses (dated by its first release). `/projects` and `/blog` use one `LinkedRecordList` treatment: date, title, short description, quiet metadata, padded hover/focus areas, and a flat right arrow. All articles use equal rows rather than a separate oversized feature. Keep case-study sections and product/code actions out of the overview; do not add empty filters.
- `/projects/[slug]` owns the project detail. Instant Perler Pattern lives at `/projects/instant-perler-pattern`, with an "All projects" return link, product/code actions, the craft explanation, the labeled schematic workflow, and all eight capabilities grouped into Create / Refine / Finish. Each published project has its own metadata, canonical URL, and sitemap entry; unknown slugs return 404.
- Kokoro Pi lives at `/projects/kokoro-pi`, with the published listening samples and repository links. Its overview and six capabilities describe CPU-only streaming speech, native ARM optimization, existing-client integrations, and local setup/validation. Content comes from the repository README; benchmark numbers are explicitly scoped to its Raspberry Pi 5 measurement, not independently verified here. Its published date is the public repository creation date (September 17, 2026).
- Kokoro Pi also includes the original 1280×420 README banner without cropping or recoloring, with accessible benchmark text and a source/context caption. Only that exact GitHub image path is allowlisted. A three-stage brass illustration shows Text input → Speech on the Pi → Streaming audio. This schematic panel has an accessible name but no visible caption. `WorkflowFigure` owns the shared panel, SVG scale, labels, and responsive stacking for both project illustrations; Perler's existing drawings and caption stay unchanged.
- Udemy Courses lives at `/projects/udemy-courses`. Its three courses appear oldest-first: high-fidelity Material-UI designs (January 2020), JAMstack e-commerce (July 2021), and MUI component customization (February 2024). Each has the original Udemy course cover, curriculum summary, key topics, verified video length and lecture count, and a course link. Release dates retain month precision and are supplied by Zach, not taken from Udemy's last-updated metadata. Shared data in `src/app/_data/teaching.ts` owns the courses and combined reach: 22,500+ students, 150 countries, over 3,000 reviews. These are user-supplied aggregate figures, not live per-course counts. Course artwork is allowlisted by exact path and uses the shared unavailable-image fallback. The résumé PDF is intentionally unchanged.
- About uses a concise factual biography with a personal side rail. Personal links are embedded in its short interests paragraph, not restated as a second list. Contact and résumé links live in the shared footer.
- Writing keeps Aberrant Quiddity as its publication name while using plain "Writing" in navigation.
- Articles have one aligned 720px reading column for the title and body, consistent typography, date/read-time metadata, and restrained links. Long-form return navigation is intentional; index links target `/#index`, not the top of the home page. No mandatory drop caps, generated section counters, or repeated background diagrams.

### Personal Archive

- Hobbies: `/hobbies` is the masthead destination, with six icon-link cards for Hikes, Travel, BJJ & Judo, Music festivals, Comedy, and AI art. The page and homepage directory share destinations from `src/app/_data/hobbies.ts`. The grappling card uses a simple tied martial-arts belt glyph and keeps its external link without a visible new-tab label; hobby pages keep Hobbies selected in the masthead.
- Reading: compact book lists, real dates, optional actual reviews, no implied live progress. The Staff Engineer's Path, Brain Food, The Body Keeps the Score, and Software Engineering at Google join the completed collection with verified Goodreads destinations and Amazon edition covers; no completion dates or ratings are invented.
- Study: course progress and descriptions; omit the historic streak and each course's Started date. Existing source dates remain archival data, not visible activity claims.
- Hikes: trail log with distance, elevation, difficulty, and recorded duration. Six 2026 activities transcribed from Zach's AllTrails screenshots include exact date, location, distance, elevation gain, moving/total time, average pace, and estimated calories. Only Decalibron includes a personal rating (5/5) and recorded difficulty; other difficulties come from the verified trail pages. Titles link to matching AllTrails routes. Illustrative trail photo sources remain in the data, without visible attribution labels or the Decalibron access note. Overall/location totals include each activity once; location lists remain newest-first.
- Travel: restore the flag-and-name country carousel from git history (`73864f4` and `eb0416e`) at every width, adapted to the current moss-accented editorial styling. `CountryCarousel` and Comedy share `ArchiveCarousel` for named scroll buttons, arrow/Home/End keyboard navigation, and reduced-motion scrolling. Preserve shareable country selection, URL history, visit history, favorite places, and the accessible non-interactive state map. Arizona and Minnesota are visited states; DC is counted separately. Ongoing home history shows a live UTC calendar-day duration beneath its date range, refreshed after hydration so a static production build cannot freeze it; aggregate travel durations remain completed-only and exclude home residence.
- Festivals: year-based experiences with existing memories and imagery.
- Comedy: restore the old site's horizontally scrollable row of circular comedian portraits and names at every viewport width. Clicking a portrait opens that comedian's show history underneath. Order comedians by their latest attended show, newest first, and default to the first comedian (currently Mark Normand, October 3, 2026); explicit `?comedian=` links take precedence. Selected portrait framing and an underline reinforce the active tab, with named scroll buttons and normal arrow/Home/End keyboard support. Keep URL/history state, the selected portrait's image dialog, recorded venues/dates/tickets, and newest-first shows. Seven attended 2026 shows from Zach's two screenshots bring the totals to 22 shows and 17 comedians/live series; exclude the missed April 25 Ari Matti show and retain his February 7, 2025 attendance. Preserve local start times, provided venue addresses, Adam Ray's WHO IS ME Tour title, and Duncan Trussell's rescheduled 9:45 PM start. Bryan Callen, James McCann, Jeremiah Watkins, and Timmy No Brakes join the carousel with verified Comedy Works portraits. TJ Miller and Ari Shaffir use replacement portraits from the same source, with narrowly allowlisted permanent blob URLs rather than expiring redirect destinations. Reduced-motion preference also reduces MUI's JavaScript carousel scrolling.
- Art: individual artwork presentation, not an empty multi-item gallery template.

Filter state lives in the URL and supports reload and Back/Forward. Existing travel and comedy text is retained in server-rendered panels; lazy image loading avoids eagerly downloading those inactive panels' images.

`ArchiveSelector` uses a named native picker at narrow widths. Collections with more than seven options also use a picker on desktop; small desktop collections use visible tabs. Comedy intentionally uses `ComedianCarousel` portrait tabs at every width instead. Controls preserve the selection on resize. Overall totals and selected-collection metadata have distinct scopes. Omit repeated locations within a location group, and use venue names for comedy entries without a named tour rather than repeating the comedian's name.

Image dialogs are for enlargement. Keep a useful image title, concise date/place/tool context, and image navigation where appropriate. Descriptions, provenance, and official-site links have a primary home on the page instead of being copied into a second detail view. The map's state list is an essential accessible alternative, not redundant decoration.

## Shared Behavior

`ClientRootLayout` owns the header and site footer outside each page's `main`. Public pages expose focusable `main-content`. `PageLayout` owns title-to-content spacing, `PageHeader` owns title/introduction/metadata order, `MetaLine` owns wrapping dates and quantities, and `RecordList` owns record edges and rhythm. `LinkedRecordList` owns browsable project/article row layout and interactions; `ProjectList` owns project-to-row mapping for home and the project overview. `SectionFrame`, `ContentImage`, and `ImageLightbox` remain shared. `DialogFrame` and the theme own modal surfaces, headings, padding, and close controls. `src/app/_data/site.ts` owns shared identity and primary/social navigation.

The compact footer owns email, social/résumé links, and the explicit newsletter trigger. There is no separate site-wide contact pitch. Newsletter signup asks only for email; optional names were unnecessary friction. Validation and request failures are inline, the email survives a failed request, and success remains visible until dismissed. Busy controls preserve keyboard focus and Escape; duplicate submission is blocked. Focus moves to Done on success and returns to the trigger after closing. Closing cancels an in-flight client request (it does not promise to undo any server-side subscription already received). Tests mock both successful and failed API responses; they never submit real subscribers.

Calendar dates use `formatCalendarDate`, with explicit UTC formatting. Ongoing visits use an explicit flag, not a generated "today" end date at module load. Blog loading accepts only known slugs.

The generated social image, canonical URLs, route metadata, sitemap, robots rules, and custom not-found page are part of the same experience. `/preview` is noindex and returns 404 in production.

## Verification

The Playwright suite covers:

- All 16 public pages at 320, 390, 768, 1024, and 1440px without document overflow.
- Automated WCAG A/AA checks on each page at mobile and desktop widths, selected archives, and image/newsletter dialogs.
- One H1, one main landmark, and one site footer per page.
- Keyboard navigation, fragment-target focus, tab relationships, gallery focus restoration, and URL history.
- Opt-in email-only newsletter behavior, invalid input, mocked inline error/success responses, and restored focus.
- No-JavaScript home → project list → detail → list navigation, reduced motion, and broken-image fallbacks.
- Calendar dates, blog/project metadata and slugs, public assets, and travel totals.
- Screenshot coverage for all public pages, 404, non-default travel/hike/comedy/festival selections, and image/newsletter states at mobile and desktop sizes.
- Regression checks for a compact complete home index, single About contact/résumé placement, project list/detail separation, project keyboard navigation/history/deep links/404, all eight project capabilities, and archive selection through resize, history, reload, and invalid URLs.
- Project graphics retain their labeled three-stage workflows; the original README banner loads with its aspect ratio intact and has a useful image-unavailable fallback. The speech workflow has mobile/desktop screenshots and no ambient animation.
- Shared project/article list geometry and keyboard navigation; Udemy release ordering, covers, outbound links, reach and About references; removed Study activity labels; new reading destinations and loaded cover thumbnails.
- Homepage hero → Projects → writing order and selected project links; Hobbies icon cards, metadata, sitemap, active navigation, history, and no-JavaScript navigation; exact screenshot hike transcription, totals, canonical trail links, photo loading, omitted labels/access note, and gallery focus restoration.
- Comedy portrait tabs at 320/390/768/1440px, selected-portrait visibility, recent-show default, newest-first latest-show ordering, loaded portraits, unavailable-image recovery, keyboard and scroll controls, resize, URL history, exact dates/times/venue details for the seven attended screenshot shows, and removal of the missed Ari Matti show.
- Travel flag tabs at 320/390/768/1440px, selected-country visibility, original country order, keyboard and scroll controls, resize, deep links/history, Arizona and Minnesota map/list membership, separate DC counting, and live Colorado residence days across a UTC date change.

All newly generated browser profiles, screenshots, traces, reports, optimizer image downloads, and browser temporary files live on mounted NVME. `playwright.config.ts` checks real paths and filesystem devices and refuses an internal-disk fallback. The optimizer's `.next/cache/images` also resolves to an external directory; existing internal cache contents were copied and hash-verified before replacing the directory with a link. `PLAYWRIGHT_ARTIFACT_DIR` selects an NVME directory; snapshots are kept beneath it and each test run gets a distinct report/results directory. Earlier repository snapshots remain historical evidence, not the current baselines. Static checks and automated accessibility tests supplement human inspection; they do not claim exhaustive accessibility certification or cross-browser coverage.

## Content And Maintenance

The implementation does not depend on filling empty sections with invented content. New project screenshots/case studies, personal trip photographs, reading notes, and more writing would deepen the site as authentic material becomes available. Those are editorial additions, not unfinished placeholder components.

Do not reintroduce a work-first hiring funnel that erases the personal archive, or an archive metaphor so elaborate that visitors cannot find the work. Keep the original resume/tattoo references as a source of authorship, not a requirement to repeat every motif.

Deployment is separate from implementation. No commit, push, or deployment is implicit in this refinement.
