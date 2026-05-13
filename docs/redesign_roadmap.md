# Redesign Roadmap — Philosophical Systems Brutalism

> **Companion to** [`docs/personal_website_design_doc.md`](./personal_website_design_doc.md)
> **Working title**: Philosophical Systems Brutalism
> **Goal**: Refactor the personal site from a generic neon-gradient developer-portfolio aesthetic into a warm, editorial, geometric, brutalist personal artifact that visually aligns with the new resume.
> **Status legend**: `[ ]` pending · `[~]` in progress · `[x]` done · `[-]` deferred / out of scope

This is the running task tracker. Update statuses inline as work proceeds. Keep notes/decisions under each phase so the doc accumulates context.

---

## 0. Orientation — Current State Snapshot

A baseline of what exists today so we know what we're replacing. Every item below is sourced from the codebase exploration; references include `file_path:line_number` for navigation.

### 0.1 Framework & Tooling
- **Next.js 15.0.7** App Router · **React 19** · **TypeScript** (`tsconfig.json` `target: es5` — flag for modernization)
- **MUI v6/v7-beta** (`@mui/material@next`, `@mui/icons-material@next`, `@mui/material-nextjs@next`)
- **Emotion** runtime, no `styled-components`, no Tailwind (one stray className in `src/app/comedy/layout.tsx:20` — silent no-op)
- **No global CSS** file, no CSS modules, no `next/font` for the global font (Inter is a CSS string only — `src/components/ClientRootLayout.tsx:29`)
- **No tests**, no `.eslintrc`, no `.prettierrc`
- **MDX** for blog (`next-mdx-remote`, `gray-matter`)
- **Firebase** used only for newsletter (`/api/subscribe` writes to Firestore via `firebase-admin`)
- **No animation libs** — only CSS transitions + two inline `@keyframes fadeIn`

### 0.2 Theming Surface (the high-leverage targets)
| File | Role | Impact |
|---|---|---|
| `src/components/ClientRootLayout.tsx:10-44` | The **only** global MUI theme (palette · typography · body gradient · `CssBaseline`) | Rewriting this propagates everywhere |
| `src/components/GradientBorder.tsx` | The ubiquitous gradient-border wrapper, used in **11 pages** | Replacing it cascades across all pages |
| `src/app/blog/theme.ts` | A blog-local lime/teal token set diverging from the rest of the site (already drifting toward the redesign direction) | Fold into the new system |
| `src/app/layout.tsx:13` | Hard-codes `<html style={{ backgroundColor: "#121212" }}>` | Replace with new warm ink token |
| `src/components/NewsletterDialog.tsx` | Two blurred gradient orbs + gradient title | Restyle with new palette |

### 0.3 Route Inventory
| Route | Page | Layout | Notes |
|---|---|---|---|
| `/` | `src/app/page.tsx` | root | 6-line re-export of `/linktree` |
| `/linktree` | `src/app/linktree/page.tsx` (276 LOC) | local | **Canonical home**: hero + portrait + tagline pill + bio + accordion nav + contact icons all inlined |
| `/blog` | `src/app/blog/page.tsx` | local | MDX list, uses divergent lime/teal palette |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | — | Custom MDX component overrides + Avenir Next body |
| `/projects` | `src/app/projects/page.tsx` | local | Tabs, only 1 project; clever XOR-mask outline button |
| `/travel` | `src/app/travel/page.tsx` | local | Tabs, USA map, country detail dialogs |
| `/hikes` | `src/app/hikes/page.tsx` | local | Grouped by location, difficulty chips |
| `/reading` | `src/app/reading/page.tsx` | local | Currently-reading + completed |
| `/study` | `src/app/study/page.tsx` | local | Khan Academy courses + streak |
| `/art` | `src/app/art/page.tsx` | — | Masonry gallery (1 piece) |
| `/comedy` | `src/app/comedy/page.tsx` | local | Tabs of comedians + show history |
| `/music-festivals` | `src/app/music-festivals/page.tsx` | — | Year-grouped festival cards |
| `/api/subscribe` | route handler | — | Firestore POST |
| `/instant-perler-pattern/*` | rewrite | — | Proxy to external app |

### 0.4 Content / Data Layer
All content is hard-coded TS constants per route (no CMS). The **section taxonomy** lives in **one file**:
- `src/app/linktree/links.tsx` — `professionalLinks`, `educationLinks`, `hobbyLinks`, `linkCategories`, `contactInfo`. The labels `Professional` / `Education` / `Hobbies` appear **only here** (6 occurrences, lines 27/52/86/108/113/118).

Other data files (unchanged for design refactor unless content reorg requires touching them):
`projects/projects.ts` · `travel/countries.ts` · `hikes/hikes.ts` · `study/courses.ts` · `reading/books.ts` · `comedy/comedians.ts` · `music-festivals/festivals.ts` · `art/pics.ts` · `content/blog/*.mdx`.

### 0.5 Per-Page Palette Inventory (everything below will be replaced/retokenized)
| Page | Current 2-color identity |
|---|---|
| Linktree / Home | `#00FFFF` / `#FF00FF` (cyan/magenta) |
| Projects | `#00FFFF` / `#FF00FF` |
| Art | `#00FFFF` / `#FF00FF` |
| Travel | `#0072FF` / `#92EFFD` |
| Hikes | `#66ff00` / `#228B22` |
| Reading | `#8B4513` / `#F5DEB3` (sepia — closest to new direction) |
| Study | `#6200EA` / `#03DAC6` |
| Comedy | `#FF0055` / `gold` |
| Music Festivals | `#FF7B00` / `#FFD000` |
| Blog | `#A3E635` / `#14B8A6` |
| Theme primary/secondary | `#BB86FC` / `#03DAC6` (Material You) |

### 0.6 Recurring Inline Patterns to Eliminate
1. **Gradient text headers** — `WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'` on every page title
2. **GradientBorder** wrapper around every titled section / card
3. **Decorative blurred orbs** — `filter: blur(60-90px)` (3× in linktree, 2× in NewsletterDialog)
4. **Glass cards** — `bgcolor: 'rgba(30,30,30,0.7-0.95)'` + `backdropFilter: blur(10px)`
5. **Lift-on-hover** — `translateY(-5px)` + `box-shadow: 0 15px 30px rgba(0,0,0,0.4)` (~6 places)
6. **Icon-disc neon glow** — `boxShadow: 0 0 20px rgba(..., 0.3)` in `linktree/linkItem.tsx:69`
7. **Avatar gradient ring** — `linktree/page.tsx:87-114`

### 0.7 Architectural Observations & Implications
- **No component library** — every page inlines its own sx blocks (hero, cards, chips, dialogs, tabs). The refactor is a good moment to extract a small set of reusable primitives (`PageHeader`, `IndexRow`, `LabelChip`, `ArtifactCard`, `SectionFrame`, etc.) rather than just re-skinning inline styles.
- **Root page is a re-export** — `src/app/page.tsx` just renders `<LinkTree />`. Either inline the home, or keep `/linktree` as a canonical alias.
- **No global font loading** — `next/font` is used only in `projects/layout.tsx:2` (inconsistent). The redesign requires three fonts (Space Grotesk + IBM Plex Sans + IBM Plex Mono) loaded properly.
- **Stray Tailwind class** in `comedy/layout.tsx:20` — dead, remove during cleanup.
- **Orphan assets** — `public/logo.svg` and `public/resume.pdf` are not referenced from any source. The resume should likely be linked from the new home (it's the design inspiration after all).
- **`.env`** with Firebase admin credentials is tracked in the repo — flag, but out of scope for visual refactor.
- **`InitColorSchemeScript`** is mounted but theme is hard-coded dark — dead code.
- **MDX blog** has its own font (`Avenir Next`) and color tokens — must be unified with the new system.

---

## 1. Refactor Strategy

### 1.1 Guiding Principles (compressed from the design doc)
- **Material over effects** — replace gradients/glows with warm ink, paper grain, fine line work
- **Typography is the identity** — Space Grotesk / IBM Plex Sans / IBM Plex Mono
- **Geometry means something** — nodes, edges, crosshairs, axis lines, not decorative blobs
- **Warm brutalism** — serious but not sterile; warm off-blacks, bone, brass, ember, moss
- **Designed artifact, not template** — asymmetric editorial composition, max-width frames, mono labels
- **Motion is mechanical** — 120–180ms interactions, fade + small translate, no bounce, respect `prefers-reduced-motion`

### 1.2 Architectural Decisions — RESOLVED
All decisions below have been locked in. See §4 Decisions Log for full discussion notes and rationale.

- [x] **Theme file location** — Split into three files: `src/theme/tokens.ts` (raw constants), `src/theme/fonts.ts` (`next/font` setup), `src/theme/index.ts` (the `createTheme()` call)
- [x] **Component primitives layer** — `src/components/primitives/` (using `primitives` not `ui`)
- [x] **Section taxonomy** — **Keep current taxonomy as-is**. `Professional` / `Education` / `Hobbies` and all current items stay. No `Field Notes` / `Research Threads` split. Blog stays under Professional as `Aberrant Quiddity`. Phase 5 reduces to a copy/content refresh only — no IA changes
- [x] **About page** — Add `/about` route with the longer narrative (Udemy/Cloudwell/Flint/judo/philosophy) extracted from the current homepage bio
- [x] **Research page** — **Not** adding `/research` for now
- [x] **Home route** — Inline the home into `src/app/page.tsx`; delete the `/linktree` route
- [x] **Texture assets** — Pure CSS noise/stipple for v1. Architectural note: the global background texture must be implemented as a single CSS custom property so a real asset (potentially tattoo-derived — see §1.4) can be swapped in later without touching components
- [x] **Resume linkage** — Subtle mention on `/about` + small line-icon in the footer alongside Instagram/LinkedIn/Email. **Not** featured in the hero
- [x] **Per-section accent identities** — Option β (single muted accent per section, not pairs). Map:
  - `Professional` → **brass** (warm default — work, systems, craft) — covers `/projects`, `/blog`
  - `Education` → **bone** (paper, transmission, learning) — covers `/study`, `/reading`
  - `Hobbies` → **moss** (embodied, grounded, alive) — covers `/hikes`, `/travel`, `/comedy`, `/music-festivals`, `/art`
  - **Sub-pages inherit the parent category's accent.**
  - `ember` and `teal` held in reserve for hero highlights, `/about` page accents, and future research surfaces
- [x] **Migration strategy** — Big-bang on a single redesign branch. Intermediate commits may be visually broken; converges by end of Phase 4
- [x] **Phase 0 hygiene bundling** — Phase 0 hygiene runs as the first commits on the redesign branch (no separate prep PR). Single branch, single eventual merge

### 1.4 Tattoo-Sourced Motifs & Hero Diagram

Zachary's geometric arm sleeve carries four motif families that map cleanly onto the design doc's principles. These will be **recreated in SVG/CSS** for v1 (no photo session needed); a Phase 7+ revisit may swap selected layers for photograph-derived textures if authenticity feels lacking.

| Tattoo motif | Design doc concept fulfilled | Planned site usage |
|---|---|---|
| **Honeycomb / hexagonal** | "Geometric anchors", "minimal coordinate-grid motifs" | Alt background grid; section glyphs; accordion indicators |
| **Abstract line work** | "Thin lines", "construction lines" | Hero diagram; section frame corner marks; portrait frame ornamentation |
| **Sacred geometry** | "Knowledge graphs", "orbitals", "nodes and edges", "systems thinking" | Hero anchor diagram; per-section glyphs |
| **Suminagashi / topographical** | "Topographic contours", "warm paper grain", **material over effects** | Background texture layer; section dividers; subtle parallax |

**Source policy for v1**: recreate patterns in code (SVG `<pattern>`, generated paths) or use permissively-licensed online SVG assets. Defer photograph-derived assets to Phase 7+.

**Hero diagram exploration** — Build all five options below as switchable previews on the home so Zachary can iterate on which lands. All share: thin line work (1–1.5px stroke), bone/brass color, ~400–600px wide, sits opposite the portrait in the asymmetric hero, animatable via SVG `stroke-dasharray`.

- **Option 1 — Contoured Mandala**: Circular sacred-geometry mandala (flower-of-life / metatron-style) with concentric topographic contour rings as its interior fill. Reads as "structured mind on shifting terrain." Meditative, most spiritual.
- **Option 2 — Topographic Node Graph** *(closest to the resume graphic)*: Horizontal node-and-edge structure with topographic contour curves flowing around each node as if each node were an island summit. Strongest resume↔site visual handshake. Cartographic, systems-thinker, most "field notebook."
- **Option 3 — Sacred Hex Lattice with Contour Bleed**: Honeycomb lattice where individual cells contain fragments of topographic contour lines (geological core-sample feel). Some cells empty, some recursive (nested hexes). Most "lab notebook," densest, most brutalist, tightest tattoo tie-in.
- **Option 4 — Concentric Orbital with Topographic Shadow**: Central node + concentric orbital rings (some smooth, some warped into contour curves), with labeled satellite nodes (`LEARNING`, `SYSTEMS`, `DISCIPLINE`, `INTELLIGENCE`). Doubles as a thesis diagram and potential nav anchor. Slow >20s rotation.
- **Option 5 — Layered Contour Sigil**: 3–4 stacked offset topographic contour ovals composing a personal sigil / maker's seal with crosshair registration and mono initials. Worth building regardless of hero pick — also functions as footer mark / favicon / OG image element.

All five will be prototyped in Phase 2 and made selectable in the home hero so the live site itself becomes the iteration surface.

### 1.5 Risks & Mitigations
| Risk | Mitigation |
|---|---|
| Theme swap will instantly break inline `sx` colors on every page until each page is migrated | Tackle pages in dependency order: theme → primitives → linktree (home) → high-traffic pages → tail pages |
| MUI v6/v7-beta API drift on component slot overrides | Verify each `components.*` override against installed version; budget time for slot-prop adjustments |
| Custom MDX blog typography (`Avenir Next`, lime/teal) must merge with new system | Replace `blog/theme.ts` with theme-derived tokens; update `mdxComponents` to consume the theme |
| `GradientBorder` removal cascades through 11 files at once | Create a deprecation shim that renders the new artifact frame so call sites can migrate incrementally |
| Inconsistent indentation (2/4 space mix) across pages will make diffs noisy | Add Prettier config + format pass in Phase 0.5 cleanup |
| Loss of visual differentiation between sections (everyone goes brass/bone) | Use restrained accent-per-section assignment + iconography for differentiation, not color |

---

## 2. Phased Task Roadmap

### Phase 0 — Pre-Refactor Hygiene & Plumbing ✅
First commits on the redesign branch. Clean shop before stylistic work begins.

- [x] Resolve all architectural decisions in §1.2 *(complete — see Decisions Log)*
- [x] Create the redesign git branch — `redesign/philosophical-systems-brutalism`
- [x] **Install Vercel Analytics** — `@vercel/analytics` added; `<Analytics />` mounted in `ClientRootLayout` inside the provider tree
- [x] Add `.prettierrc` + `.prettierignore`; one-pass format across `src/` normalized indentation, quote style, trailing commas
- [x] Add `.editorconfig` to match
- [x] Add `.eslintrc.json` extending `next/core-web-vitals`; `npm run lint` clean
- [x] Bump `tsconfig.json` `target` from `es5` to `es2022`
- [x] Delete dead code: `InitColorSchemeScript` mount removed, stray Tailwind className in `comedy/layout.tsx` removed, backward-compat flat `links` export removed, unused `Divider`/`useTheme`/`Rating` imports cleaned
- [x] `.env` confirmed already gitignored and not tracked (only `.env.local.example` template is tracked, as intended). No rotation needed.
- [x] `.DS_Store` files confirmed gitignored; none tracked in repo
- [x] Add `format` and `format:check` npm scripts; drop codesandbox `post-update` script artifact
- [x] Smoke test: `npm run lint`, `npm run format:check`, `npm run build` all green

### Phase 1 — Theme Foundation
Goal: stand up the new `zacharyTheme`, fonts, and global texture _without_ touching pages yet. After this phase, every page will look broken-but-warm; we fix them in subsequent phases.

- [ ] Create `src/theme/tokens.ts` exporting raw constants: `ink`, `stone`, `bone`, `accent` (ember, brass, moss, oxide, clay, teal), `easing`, line/surface tokens
- [ ] Define a **section-accent map** in `src/theme/tokens.ts`: `{ professional: brass, education: bone, hobbies: moss }` consumed by section components and sub-pages
- [ ] Create `src/theme/fonts.ts` using `next/font/google` for `Space_Grotesk`, `IBM_Plex_Sans`, `IBM_Plex_Mono` (CSS variables `--font-space-grotesk`, `--font-plex-sans`, `--font-plex-mono`)
- [ ] Create `src/theme/index.ts` implementing the full theme spec from the design doc (`zacharyTheme`) — palette, typography scale, shape, shadows array, component overrides (`MuiCssBaseline`, `MuiContainer`, `MuiPaper`, `MuiCard`, `MuiCardHeader`, `MuiCardContent`, `MuiButton`, `MuiChip`, `MuiAccordion`, `MuiAccordionSummary`, `MuiAccordionDetails`, `MuiDivider`, `MuiIconButton`, `MuiAvatar`, `MuiTooltip`, `MuiMenu`, `MuiMenuItem`, `MuiTextField`, `MuiOutlinedInput`, `MuiInputLabel`, `MuiAppBar`, `MuiTabs`, `MuiTab`)
- [ ] Wire the three font CSS variables onto `<html>` or `<body>` in `src/app/layout.tsx`
- [ ] Update `src/app/layout.tsx` hard-coded `backgroundColor` from `#121212` → `--zr-ink-950` / `#0f0f0d`
- [ ] Replace the theme in `src/components/ClientRootLayout.tsx` with `zacharyTheme` import; keep `AppRouterCacheProvider` + `CssBaseline`; remove dead `InitColorSchemeScript`
- [ ] Add `MuiCssBaseline` body texture layers per the design doc, **all driven by CSS custom properties** so layers can be swapped without touching components:
  - `--zr-bg-base` — warm ink base color
  - `--zr-bg-vignette` — radial brass/ember vignettes
  - `--zr-bg-grid` — construction grid (`body::before`)
  - `--zr-bg-texture` — noise/stipple/topographic layer (`body::after`) — initially CSS-only; designed to be repointable at a tattoo-derived asset later
- [ ] Add global `*:focus-visible` outline (brass) and `prefers-reduced-motion` overrides
- [ ] Update OG metadata in `src/app/layout.tsx` if any color references need refresh (favicon/icon background)
- [ ] Smoke-test build (`npm run build`) — expect visual regression on every page but no runtime errors

### Phase 2 — Primitive Component Layer
Goal: build the reusable artifact-style primitives once so pages stop inlining sx blocks. Primitives live in `src/components/primitives/`.

#### Core primitives
- [ ] `src/components/primitives/Overline.tsx` — mono small-caps label with `Index / 01` style
- [ ] `src/components/primitives/PageHeader.tsx` — overline + large heading + optional subtitle/manifesto, with a thin construction-line motif. Accepts a `accent` prop driven by the section-accent map
- [ ] `src/components/primitives/LabelChip.tsx` — mono uppercase chip with thin border, replaces every current `Chip`
- [ ] `src/components/primitives/ArtifactCard.tsx` — index-card / lab-drawer card with optional left rule line (accent-colored), hover translate, no glow
- [ ] `src/components/primitives/IndexRow.tsx` — numbered editorial link row (`01  PROJECTS / one-liner`) with right-side arrow or coordinate glyph
- [ ] `src/components/primitives/SectionFrame.tsx` — max-width content frame (1120–1240px) with asymmetric grid helpers; accepts `accent` prop
- [ ] `src/components/primitives/ArchiveAccordion.tsx` — accordion styled as an expandable archive drawer (thin top/bottom rules, glyph + chevron, no filled block)
- [ ] `src/components/primitives/PortraitFrame.tsx` — circular portrait with double brass/bone ring + crosshair registration mark
- [ ] `src/components/primitives/Crosshair.tsx` and `src/components/primitives/Glyphs.tsx` — small SVG markers (crosshair, compass, node, mountain polygon, archive drawer, bracket prompt)
- [ ] `src/components/primitives/MakersMarkFooter.tsx` — `ZACHARY REECE — SOFTWARE / LEARNING / SYSTEMS / DISCIPLINE` + Denver, CO + line-icon socials including a resume PDF link
- [ ] **Deprecate `GradientBorder`** — replace its implementation with the new `ArtifactCard` styling so existing 11 call sites visually update; mark file `@deprecated`; remove in Phase 7

#### Tattoo-motif SVG primitives *(see §1.4)*
- [ ] `src/components/primitives/patterns/Honeycomb.tsx` — reusable hexagonal SVG `<pattern>` (background fill or decorative)
- [ ] `src/components/primitives/patterns/ContourField.tsx` — generated topographic contour curves (parametric — node positions in, contours out)
- [ ] `src/components/primitives/patterns/SacredGeometry.tsx` — flower-of-life / metatron / orbital base shapes as composable SVG
- [ ] `src/components/primitives/patterns/Suminagashi.tsx` — flowing line texture (parametric, can be repurposed for dividers and section backgrounds)

#### Hero diagram options *(see §1.4 — all five built, switchable on home)*
- [ ] `src/components/primitives/heroes/HeroContouredMandala.tsx` — Option 1
- [ ] `src/components/primitives/heroes/HeroTopographicNodeGraph.tsx` — Option 2 (resume handshake)
- [ ] `src/components/primitives/heroes/HeroSacredHexLattice.tsx` — Option 3
- [ ] `src/components/primitives/heroes/HeroConcentricOrbital.tsx` — Option 4 (rotating)
- [ ] `src/components/primitives/heroes/HeroLayeredContourSigil.tsx` — Option 5 (also reusable as footer mark / favicon / OG)
- [ ] All hero options share a common `HeroDiagramProps` interface (size, accent, animate, reducedMotion)
- [ ] Hero variant switcher: home accepts a `?hero=1|2|3|4|5` query param (and/or a small unobtrusive toggle visible only on hover or in dev) so Zachary can A/B/C/D/E them on the live site without rebuilds

#### Dev preview
- [ ] Add a preview page (`src/app/_preview/page.tsx`, dev-only — gate by `NODE_ENV !== 'production'` or basic auth) rendering every primitive, every pattern, and all five hero options on one scroll for visual QA

### Phase 3 — Home Refactor + `/about` Route
Goal: turn the 276-line inline `/linktree` hero into an editorial composition built from primitives, **promote it to `/`**, and extract the longer narrative into `/about`.

#### Home (`src/app/page.tsx`)
- [ ] Move the home implementation from `src/app/linktree/page.tsx` into `src/app/page.tsx` (decomposed into components — see below)
- [ ] **Delete `src/app/linktree/` entirely** (route, layout, `page.tsx`, `linkItem.tsx`); move `links.tsx` to `src/app/_data/links.ts` (or similar) so it remains importable by the home and `/about`
- [ ] Decompose the home into components in `src/app/_components/home/`:
  - `Hero.tsx` — composes `Overline` + thesis heading + `PortraitFrame` + short manifesto + `LabelChip` row + the active `HeroDiagram` variant
  - `IndexSections.tsx` — the `Professional` / `Education` / `Hobbies` accordions rebuilt with `ArchiveAccordion` + `IndexRow`
  - `ContactFooter.tsx` — line-icon socials + resume PDF link via `MakersMarkFooter`
- [ ] Hero content:
  - Overline: `ZACHARY REECE / DENVER, CO`
  - Large editorial heading: thesis copy per the design doc recommendation
  - `PortraitFrame` replacing the gradient-ring Avatar
  - Short manifesto paragraph (replaces inline tagline pill + bio card)
  - Mono `LabelChip` row: `SOFTWARE ENGINEER / PRODUCT BUILDER / MARTIAL ARTIST / PHILOSOPHER`
  - Hero diagram variant chosen via `?hero=N` query param (defaults to a single canonical pick once iteration converges)
- [ ] Remove the three decorative blurred orbs (formerly `linktree/page.tsx:42-83`)
- [ ] Rebuild the link section using `ArchiveAccordion` containing `IndexRow` items, with each category styled in its assigned accent (brass / bone / moss)
- [ ] Rebuild contact row using line-icon `IconButton`s with brass hover, no glow

#### `/about` route
- [ ] Create `src/app/about/page.tsx` and `src/app/about/layout.tsx`
- [ ] Migrate the longer narrative copy from the current homepage bio (Udemy / 20K students / 145 countries / Cloudwell / Flint / judo / philosophy) into `/about`
- [ ] Use essay-with-side-annotations layout: main column for narrative, side rail for mono annotations (dates, places, key facts)
- [ ] Add the subtle resume PDF link/mention on this page
- [ ] Add `/about` to the home navigation/index section as an `IndexRow` entry under `Professional`

#### QA
- [ ] Verify mobile layout maintains artifact feel (mono labels, rules, hierarchy intact)
- [ ] Confirm `/linktree` returns a clean 404 (or add a permanent redirect to `/` if any inbound links exist)

### Phase 4 — Per-Page Migration
Goal: bring every other route into the new system. Each page follows the same recipe: replace `GradientBorder` → `SectionFrame` + `PageHeader`; replace inline cards → `ArtifactCard`; replace `Chip` → `LabelChip`; drop per-page palette; respect typography scale; apply the section's assigned accent (Professional/brass, Education/bone, Hobbies/moss).

Tackle in this order (highest visual leverage first):

- [ ] **Professional (brass)** — `src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx` — replace `blog/theme.ts` lime/teal tokens with theme-derived brass/bone; update `mdxComponents` typography (Space Grotesk headings, IBM Plex Sans body, IBM Plex Mono code/labels); drop `Avenir Next`
- [ ] **Professional (brass)** — `src/app/projects/page.tsx` — replace cyan/magenta `FancyChip` with `LabelChip`; restyle Tabs to mono uppercase brass underline (already partially configured in theme); decide whether to keep the XOR-mask outline button or replace with a standard outlined button per new theme
- [ ] **Professional (brass)** — `src/app/projects/layout.tsx` — remove the inconsistent inline `Inter` `next/font` import (font now comes from theme)
- [ ] **Hobbies (moss)** — `src/app/travel/page.tsx` — drop blue gradient identity; restyle country cover overlays from gradient → fine bone rules; convert favorite-spot top-stripe `::before` to moss rule
- [ ] **Hobbies (moss)** — `src/app/travel/USAMapComponent.tsx` — recolor visited `#0072FF` → moss, default `#2A2A2A` → ink-800, stroke `#333` → muted line; restyle tooltip to mono caps
- [ ] **Hobbies (moss)** — `src/app/hikes/page.tsx` — drop green gradient; difficulty chips → `LabelChip` with restrained moss/ember/oxide accents; image gallery dialog to brutalist frame
- [ ] **Education (bone)** — `src/app/reading/page.tsx` — drop sepia gradient; `LinearProgress` recolored to brass-on-stone
- [ ] **Education (bone)** — `src/app/study/page.tsx` — drop violet/teal; Khan Academy streak chip → mono `LabelChip`; courses → `ArtifactCard` grid
- [ ] **Hobbies (moss)** — `src/app/art/page.tsx` — masonry layout keeps `ImageList` but cards and chips swap; remove cyan/magenta chips
- [ ] **Hobbies (moss)** — `src/app/comedy/page.tsx` — drop red/gold; show cards → `ArtifactCard`; comedian avatars → `PortraitFrame`-derived
- [ ] **Hobbies (moss)** — `src/app/music-festivals/page.tsx` — drop orange/yellow; year tabs → mono brass underline; festival cards → `ArtifactCard`
- [ ] `src/components/NewsletterDialog.tsx` — remove gradient orbs and gradient title; restyle as a thin-line modal artifact; restyle Snackbar feedback

### Phase 5 — Copy & Content Refresh
Goal: refresh language to match the new visual identity. **No taxonomy/IA changes** (per resolved decision — categories remain `Professional` / `Education` / `Hobbies` with existing items).

- [ ] Rewrite homepage thesis copy per the design doc recommendation (one tight paragraph; longer narrative now lives on `/about`)
- [ ] Audit existing copy across all pages for "passionate about" / "welcome to my portfolio" / generic phrasing; rewrite in confident reflective voice
- [ ] Add one-sentence descriptions to each item in `links.ts` (schema additions — `description?: string`) so `IndexRow` has secondary content
- [ ] Consider adding small section glyphs to category headers (mountain polygon for Hobbies, archive drawer for Professional, book/page for Education, etc.) — sourced from `Glyphs.tsx`
- [ ] Audit `/about` narrative: confirm it tells the Udemy → Cloudwell → Flint → judo/BJJ → philosophy story in a confident editorial voice
- [ ] Update `og-image.jpg` to reflect new design (separate asset task — can use the `LayeredContourSigil` hero option rendered to PNG)

### Phase 6 — Motion & Diagrammatic Elements
Goal: add restrained mechanical motion + meaningful geometric anchors.

- [ ] Decide motion library: pure CSS (preferred — keeps bundle small and matches "restrained" ethos) vs. `framer-motion` (only if Phase 6 reveals true need)
- [ ] Implement fade + slight upward reveal on section enter (`IntersectionObserver` + CSS class, or `framer-motion` `whileInView`)
- [ ] Implement line-drawing animation on hero `Diagram` (SVG `stroke-dasharray` animation)
- [ ] Implement mechanical accordion expansion (already partly via MUI; verify duration 180–300ms and easing `cubic-bezier(0.2, 0, 0, 1)`)
- [ ] Hover translates standardized to 1–3px across primitives
- [ ] Verify `prefers-reduced-motion` disables all of the above
- [ ] Optional: very slow background parallax for grid/diagram (>20s cycle)

### Phase 7 — Refinement & Acceptance
Goal: tune until the site passes the "authored not templated" smell test.

- [ ] Walk every page on desktop/tablet/mobile; capture screenshots
- [ ] Side-by-side comparison with the new resume — does the site feel like the same person designed both?
- [ ] Desaturate any accent that still feels trendy by 10–20%
- [ ] Hunt for any remaining `linear-gradient` / `radial-gradient` / `WebkitBackgroundClip: 'text'` / `filter: blur` / glow `boxShadow` (target: zero in component code; only theme-controlled body texture remains)
- [ ] Accessibility pass: contrast ratios (WCAG AA), keyboard focus visible, screen-reader landmarks, alt text on portrait + festival/art images
- [ ] Performance pass: font preconnect / `display: swap`, image `priority` on hero portrait, lazy-load below-fold images
- [ ] Remove deprecated `GradientBorder.tsx`
- [ ] Remove `src/app/blog/theme.ts` (folded into main theme)
- [ ] Remove any unused per-page palette constants left behind in data files
- [ ] Update `README.md` to describe the project (currently stock boilerplate)

### Phase 8 — Stretch / Future
Things called out by the design doc or surfaced in planning but not required for v1 of the redesign.

- [ ] **Tattoo-derived photographic textures** — photo session capturing the honeycomb / line work / sacred geometry / suminagashi sections of the arm sleeve; process into `public/textures/*.png` (or `.webp`); swap into the `--zr-bg-texture` CSS variable to replace pure-CSS noise
- [ ] **`/research` page** — diagrammatic visual language for long-running threads (Multidimensional Computationalism, FAKT++, knowledge tracing, learning systems) — deferred per current decision
- [ ] Field-notebook style for individual blog posts (margin annotations, drop-cap, registration marks)
- [ ] Iterate on the chosen hero diagram option past v1 — additional motion, interactivity, or content (e.g. orbital nodes that label your sections and link to them)
- [ ] Site-wide search / index page styled as a card catalog
- [ ] Dark/light parity: a very subtle `light` mode using bone-on-ink inverted (currently theme is fixed dark — confirm if light mode is desired)

---

## 3. Acceptance Criteria (from design doc, restated here for at-a-glance check)

The redesign is **successful** when the site feels:
- [ ] Authored rather than templated
- [ ] Editorial rather than SaaS
- [ ] Warm rather than neon
- [ ] Geometric rather than decorative
- [ ] Serious but personal
- [ ] Technical but human
- [ ] Connected to the new resume design language
- [ ] Clearly representative of Zachary Reece specifically

The redesign **fails** if it still feels like:
- [ ] AI startup template
- [ ] Generic dark developer portfolio
- [ ] Blue/purple gradient website
- [ ] Dribbble dashboard
- [ ] Crypto / web3 landing page
- [ ] Overdesigned personal brand gimmick

---

## 4. Working Notes & Decisions Log

> Append dated notes here as work proceeds. Capture key decisions, deviations from the design doc, and any discoveries that affect the plan.

### 2026-05-13 — Initial roadmap drafted
Roadmap drafted from `docs/personal_website_design_doc.md` and full codebase exploration. No code changes yet.

### 2026-05-13 — Phase 0 complete
Redesign branch `redesign/philosophical-systems-brutalism` created off `main`. Phase 0 landed in five commits:

1. `add design doc and redesign roadmap` — docs only
2. `add prettier, eslint, and editorconfig` — tooling configs
3. `integrate vercel analytics, drop dead init-color-scheme script` — Analytics mount + Phase-1 prep for theme replacement
4. `phase 0 cleanup: remove dead code, bump tsconfig target` — comedy Tailwind no-op, dead `links` export, unused imports, `target: es2022`
5. `format codebase with prettier` — mechanical normalization (26 files, ~1300 insertions / 1000 deletions, all whitespace/quote/comma)

Findings during execution:
- `.env` was already correctly gitignored — the exploration report incorrectly flagged it as tracked. No credential rotation needed.
- `.DS_Store` files also correctly gitignored — none in the repo.
- `useTheme` in `art/page.tsx` is *actually* used (line 33); only `Divider` was dead there.
- ESLint 9 + `eslint-config-next@15` works via legacy `.eslintrc.json` (Next.js handles the compat layer internally — no FlatCompat needed).
- Build size and route output unchanged after Phase 0 — purely additive/cleanup work.

### 2026-05-13 — Architectural decisions resolved
Working through the 10 open questions from §1.2 plus two additions (Vercel Analytics, tattoo motif integration). Outcomes:

- **Theme file layout** — Confirmed three-file split: `tokens.ts` + `fonts.ts` + `index.ts` under `src/theme/`. Keeps the large theme spec maintainable and isolates raw constants from MUI wiring.
- **Primitives directory** — `src/components/primitives/` (chose `primitives` over `ui` for clarity that these are the foundational building blocks of the visual system, not generic UI components).
- **Texture strategy** — Pure CSS noise/stipple for v1. The global background is implemented via CSS custom properties (`--zr-bg-base`, `--zr-bg-vignette`, `--zr-bg-grid`, `--zr-bg-texture`) so texture layers can be swapped without touching component code. This sets up a clean path for the tattoo-texture integration in Phase 8.
- **Section taxonomy** — Decision: **keep the current `Professional` / `Education` / `Hobbies` taxonomy as-is**. The design doc's proposed rename (`Systems Built`, `Field Notes`, `Learning / Transmission`, `Disciplines`, `Research Threads`) is rejected for v1. The blog stays under Professional as `Aberrant Quiddity`. Phase 5 contracts substantially as a result — it becomes a pure copy/content refresh rather than an IA reorganization.
- **`/about` route** — Added. The long bio narrative (Udemy 20K students, Cloudwell, Flint, judo/BJJ, philosophy) moves off the homepage into `/about` with an essay-with-side-annotations layout. The homepage retains only the short thesis paragraph. `/about` is linked from the home `Professional` index as an `IndexRow`.
- **`/research` route** — **Not** adding for now. Aspirational content. Logged to Phase 8 stretch as deferred.
- **Home route** — Inline the home into `src/app/page.tsx`; **delete `src/app/linktree/` entirely**. The shared link data (`links.tsx`) relocates to `src/app/_data/links.ts` so the home and `/about` can both consume it.
- **Resume linkage** — Resume PDF surfaces in two places only: (a) a subtle mention/link on `/about`, (b) a small line-icon in the footer (`MakersMarkFooter`) alongside Instagram/LinkedIn/Email. **Not** featured in the hero. Keeps the hero focused on identity, not artifact distribution.
- **Per-section accent identities** — Selected **Option β**: single restrained accent per top-level category, sub-pages inherit parent:
  - `Professional` → **brass** — `/projects`, `/blog`, plus `/about` (inherits the category accent of its parent index)
  - `Education` → **bone** — `/study`, `/reading`
  - `Hobbies` → **moss** — `/hikes`, `/travel`, `/comedy`, `/music-festivals`, `/art`
  - `ember` and `teal` held in reserve for hero highlights, secondary accents on `/about`, and future surfaces. Sub-pages do not get individual micro-identities — they read as members of their category family.
- **Migration strategy** — Big-bang on a single redesign branch (e.g. `redesign/philosophical-systems-brutalism`). Intermediate commits may be visually broken; the site converges by end of Phase 4.
- **Phase 0 hygiene** — Bundled into the redesign branch as the first commits (not a separate prep PR). Single branch, single merge.
- **Vercel Analytics** — Added to the project. Folded into Phase 0 hygiene: `npm i @vercel/analytics` and mount `<Analytics />` from `@vercel/analytics/next` inside `src/components/ClientRootLayout.tsx` (so it sits inside the client provider tree, gets full SPA navigation coverage, and survives the upcoming refactor of the layout).
- **Tattoo motif integration** — New §1.4 section added. Four motif families (honeycomb, abstract line work, sacred geometry, suminagashi/topographic) will be **recreated in SVG/CSS** for v1 — no photo session needed. Phase 2 grows a `patterns/` subdirectory with `Honeycomb`, `ContourField`, `SacredGeometry`, `Suminagashi` SVG primitives. Photograph-derived textures deferred to Phase 8.
- **Hero diagram exploration** — Five hero diagram options will all be built and made switchable via `?hero=N` query param so Zachary can iterate on the live site:
  1. Contoured Mandala — sacred-geometry mandala with concentric topographic interior
  2. Topographic Node Graph — horizontal nodes with contour curves around each (closest to resume)
  3. Sacred Hex Lattice with Contour Bleed — honeycomb cells filled with contour fragments
  4. Concentric Orbital with Topographic Shadow — rotating system with labeled satellites; some orbits warped to contours
  5. Layered Contour Sigil — personal sigil / maker's seal (also reusable as footer mark, favicon, OG image)
  Final selection deferred until visual prototypes can be compared on the live site. Phase 2 adds all five under `src/components/primitives/heroes/`.
