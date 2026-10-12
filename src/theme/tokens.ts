/**
 * Raw design tokens for the Philosophical Systems Brutalism redesign.
 *
 * These are framework-agnostic constants. The MUI theme in `./index.ts`
 * composes them; CSS custom properties are derived from them in the global
 * `CssBaseline` overrides. Components should prefer reading values via the
 * MUI theme (`theme.palette.*`, `theme.zr.*`) or the CSS variables exposed
 * on `:root`, not import these directly — keeping a single source of truth.
 *
 * See `docs/personal_website_design_doc.md` and `docs/redesign_roadmap.md`
 * for the design rationale.
 */

// ─────────────────────────────────────────────────────────────────────────
// Core palette — warm ink to bone, with industrial-natural accents
// ─────────────────────────────────────────────────────────────────────────

export const ink = {
  950: "#0f0f0d",
  900: "#151512",
  850: "#1b1a17",
  800: "#22211d",
} as const;

export const graphite = {
  700: "#34332e",
} as const;

export const stone = {
  600: "#555249",
  500: "#746f63",
  400: "#9a9384",
} as const;

export const bone = {
  300: "#c9c0ad",
  200: "#ded5c3",
  100: "#eee5d2",
} as const;

export const accent = {
  ember: "#b85f3f",
  emberLight: "#d07951",
  emberDark: "#7f3d27",
  brass: "#b49a63",
  brassLight: "#c9ad71",
  brassDark: "#7f6b43",
  moss: "#77815f",
  mossLight: "#929b73",
  mossDark: "#545b43",
  oxide: "#8d3f32",
  oxideDark: "#642d25",
  clay: "#a86f53",
  teal: "#4f8f8b",
  tealLight: "#77aaa7",
  tealDark: "#355f5c",
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Section-accent map — per resolved decision in roadmap §1.2
// Top-level categories get a single restrained accent; sub-pages inherit.
// ─────────────────────────────────────────────────────────────────────────

export type SectionKey = "professional" | "education" | "hobbies" | "about";

export const sectionAccent: Record<SectionKey, string> = {
  professional: accent.brass,
  education: bone[100],
  hobbies: accent.mossLight,
  about: accent.brass, // /about inherits Professional family
};

/**
 * Sub-page → top-level category mapping. Lets per-page components resolve
 * their accent without hard-coding it. Pages outside this map fall back to
 * brass (the warm default).
 */
export const pageToSection: Record<string, SectionKey> = {
  // Professional family — brass
  projects: "professional",
  blog: "professional",
  about: "about",

  // Education family — bone
  study: "education",
  reading: "education",

  // Hobbies family — moss
  hobbies: "hobbies",
  hikes: "hobbies",
  travel: "hobbies",
  comedy: "hobbies",
  "music-festivals": "hobbies",
  art: "hobbies",
};

// ─────────────────────────────────────────────────────────────────────────
// Surface and line tokens — translucent over ink for layered depth
// ─────────────────────────────────────────────────────────────────────────

export const surfaces = {
  wash: "rgba(238, 229, 210, 0.045)",
  raised: "rgba(238, 229, 210, 0.075)",
  recessed: "rgba(0, 0, 0, 0.18)",
} as const;

export const lines = {
  muted: "rgba(238, 229, 210, 0.16)",
  strong: "rgba(238, 229, 210, 0.32)",
  faint: "rgba(238, 229, 210, 0.08)",
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Motion
// ─────────────────────────────────────────────────────────────────────────

export const easing = "cubic-bezier(0.2, 0, 0, 1)" as const;

export const duration = {
  micro: 120, // hover / focus
  fast: 180, // interactive toggle
  medium: 320, // section reveal
  slow: 500, // long reveal
  ambient: 20000, // background diagram motion (>20s per design doc)
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────

export const layout = {
  contentMaxWidth: 1200, // 1120–1240 range per design doc
  proseMaxWidth: 720, // 680–760 range
  gutterDesktop: 32,
  gutterMobile: 20,
  pageGap: { mobile: 32, desktop: 40 },
  sectionGap: { mobile: 40, desktop: 56 },
  gridStep: 72, // construction grid pitch (matches body::before)
} as const;

// ─────────────────────────────────────────────────────────────────────────
// CSS custom property names — single source of truth for the variable names
// referenced in the global texture stack. Keep these in sync with the
// CssBaseline override in `./index.ts`.
// ─────────────────────────────────────────────────────────────────────────

export const cssVars = {
  // Background layers — all swappable without touching components
  bgBase: "--zr-bg-base",
  bgVignette: "--zr-bg-vignette",
  bgGrid: "--zr-bg-grid",
  bgTexture: "--zr-bg-texture",

  // Line / surface tokens for use in component sx blocks
  lineMuted: "--zr-line-muted",
  lineStrong: "--zr-line-strong",
  surfaceWash: "--zr-surface-wash",
  surfaceRaised: "--zr-surface-raised",

  // Font family variables (populated by next/font in `./fonts.ts`)
  fontHeading: "--font-space-grotesk",
  fontBody: "--font-plex-sans",
  fontMono: "--font-plex-mono",
} as const;

// ─────────────────────────────────────────────────────────────────────────
// Convenience aggregate — the `zr.*` namespace attached to the MUI theme
// for components that want one import to reach everything redesign-specific
// without polluting `theme.palette`.
// ─────────────────────────────────────────────────────────────────────────

export const zrTokens = {
  ink,
  graphite,
  stone,
  bone,
  accent,
  surfaces,
  lines,
  easing,
  duration,
  layout,
  sectionAccent,
  pageToSection,
  cssVars,
} as const;

export type ZrTokens = typeof zrTokens;
