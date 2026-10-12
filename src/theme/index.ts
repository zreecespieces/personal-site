/**
 * `zacharyTheme` — the MUI theme for the Philosophical Systems Brutalism
 * redesign. Drop-in replacement for the previous Material You dark theme.
 *
 * This file does three things:
 *   1. Composes the raw tokens from `./tokens.ts` into MUI's palette and
 *      typography scale.
 *   2. Defines component-level overrides that strip every MUI default that
 *      reads as "SaaS" (rounded pills, neon focus rings, contained buttons
 *      with elevation, etc.) and substitutes the editorial / artifact
 *      vocabulary spec'd in the design doc.
 *   3. Installs a CSS-variable-driven body texture stack via `MuiCssBaseline`
 *      so the global background (warm ink + brass/ember vignettes +
 *      construction grid + stipple noise) is one place to tune and one
 *      place to repoint at real assets later (Phase 8).
 *
 * The theme is also extended (via module augmentation below) with a `zr`
 * namespace exposing the raw token bundle so components don't have to
 * import the tokens file directly.
 */

import { createTheme, alpha } from "@mui/material/styles";
import {
  accent,
  bone,
  cssVars,
  duration,
  easing,
  graphite,
  ink,
  layout,
  lines,
  stone,
  surfaces,
  zrTokens,
  type ZrTokens,
} from "./tokens";

// ─────────────────────────────────────────────────────────────────────────
// Theme augmentation — let TypeScript know about the `zr` namespace
// ─────────────────────────────────────────────────────────────────────────

declare module "@mui/material/styles" {
  interface Theme {
    zr: ZrTokens;
  }
  interface ThemeOptions {
    zr?: ZrTokens;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Font stacks — fall back through the CSS variables wired in `./fonts.ts`
// to system fonts so SSR doesn't FOUT into Times New Roman.
// ─────────────────────────────────────────────────────────────────────────

const headingStack = [
  `var(${cssVars.fontHeading})`,
  '"Space Grotesk"',
  '"IBM Plex Sans"',
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "sans-serif",
].join(",");

const bodyStack = [
  `var(${cssVars.fontBody})`,
  '"IBM Plex Sans"',
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "sans-serif",
].join(",");

const monoStack = [
  `var(${cssVars.fontMono})`,
  '"IBM Plex Mono"',
  '"JetBrains Mono"',
  "ui-monospace",
  "SFMono-Regular",
  "Menlo",
  "Monaco",
  "Consolas",
  "monospace",
].join(",");

// ─────────────────────────────────────────────────────────────────────────
// The theme
// ─────────────────────────────────────────────────────────────────────────

export const zacharyTheme = createTheme({
  zr: zrTokens,
  palette: {
    mode: "dark",
    background: {
      default: ink[950],
      paper: ink[850],
    },
    primary: {
      main: accent.brass,
      light: accent.brassLight,
      dark: accent.brassDark,
      contrastText: ink[950],
    },
    secondary: {
      main: accent.ember,
      light: accent.emberLight,
      dark: accent.oxide,
      contrastText: bone[100],
    },
    success: {
      main: accent.moss,
      light: accent.mossLight,
      dark: accent.mossDark,
      contrastText: bone[100],
    },
    info: {
      main: accent.teal,
      light: accent.tealLight,
      dark: accent.tealDark,
      contrastText: bone[100],
    },
    warning: {
      main: accent.brassLight,
      light: "#d8bf86",
      dark: "#8f7745",
      contrastText: ink[950],
    },
    error: {
      main: accent.oxide,
      light: "#a95547",
      dark: accent.oxideDark,
      contrastText: bone[100],
    },
    text: {
      primary: bone[100],
      secondary: alpha(bone[200], 0.72),
      disabled: alpha(bone[200], 0.36),
    },
    divider: lines.muted,
    action: {
      active: bone[200],
      hover: alpha(bone[100], 0.06),
      selected: alpha(accent.brass, 0.14),
      disabled: alpha(bone[100], 0.28),
      disabledBackground: alpha(bone[100], 0.08),
      focus: alpha(accent.brass, 0.24),
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  typography: {
    fontFamily: bodyStack,
    h1: {
      fontFamily: headingStack,
      fontWeight: 500,
      letterSpacing: "-0.055em",
      lineHeight: 0.94,
      fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
    },
    h2: {
      fontFamily: headingStack,
      fontWeight: 500,
      letterSpacing: "-0.045em",
      lineHeight: 1,
      fontSize: "clamp(2.4rem, 5.4vw, 5rem)",
    },
    h3: {
      fontFamily: headingStack,
      fontWeight: 500,
      letterSpacing: "-0.035em",
      lineHeight: 1.05,
      fontSize: "clamp(1.9rem, 3.4vw, 3.25rem)",
    },
    h4: {
      fontFamily: headingStack,
      fontWeight: 500,
      letterSpacing: "-0.026em",
      lineHeight: 1.12,
      fontSize: "clamp(1.45rem, 2.2vw, 2.25rem)",
    },
    h5: {
      fontFamily: headingStack,
      fontWeight: 600,
      letterSpacing: "-0.018em",
      lineHeight: 1.2,
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: headingStack,
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 1.4,
      fontSize: "1.1rem",
    },
    subtitle1: {
      color: alpha(bone[200], 0.82),
      lineHeight: 1.55,
      fontSize: "1.05rem",
    },
    subtitle2: {
      fontFamily: monoStack,
      color: alpha(bone[200], 0.68),
      lineHeight: 1.45,
      fontSize: "0.78rem",
      letterSpacing: "0.035em",
    },
    body1: {
      lineHeight: 1.72,
      fontSize: "1rem",
      color: alpha(bone[100], 0.9),
    },
    body2: {
      lineHeight: 1.65,
      fontSize: "0.9rem",
      color: alpha(bone[200], 0.72),
    },
    button: {
      fontFamily: monoStack,
      fontWeight: 600,
      letterSpacing: "0.075em",
      textTransform: "uppercase",
      fontSize: "0.72rem",
    },
    caption: {
      fontFamily: monoStack,
      color: bone[300],
      letterSpacing: "0.055em",
      lineHeight: 1.45,
      fontSize: "0.78rem",
    },
    overline: {
      fontFamily: monoStack,
      color: accent.brass,
      letterSpacing: "0.14em",
      lineHeight: 1.5,
      fontSize: "0.7rem",
      fontWeight: 600,
    },
  },
  shadows: [
    "none",
    "0 1px 0 rgba(238, 229, 210, 0.06)",
    "0 10px 30px rgba(0, 0, 0, 0.22)",
    "0 14px 42px rgba(0, 0, 0, 0.26)",
    "0 18px 58px rgba(0, 0, 0, 0.30)",
    // MUI requires exactly 25 shadows (0..24). Repeat the deepest for the rest.
    ...(Array(20).fill("0 18px 58px rgba(0, 0, 0, 0.30)") as string[]),
  ] as unknown as ReturnType<typeof createTheme>["shadows"],
  components: {
    // ─────────────────────────────────────────────────────────────────
    // Global CSS — body texture stack, focus ring, reduced-motion
    // ─────────────────────────────────────────────────────────────────
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          // Background layers — swappable via these variables
          [cssVars.bgBase]: ink[950],
          [cssVars.bgVignette]: `radial-gradient(ellipse at 80% 0%, ${alpha(accent.brass, 0.055)}, transparent 55rem)`,
          [cssVars.bgGrid]: [
            `linear-gradient(${alpha(bone[100], 0.035)} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${alpha(bone[100], 0.035)} 1px, transparent 1px)`,
          ].join(","),
          // Paper-grain layer — SVG fractal-noise filter, encoded as a
          // data URL so it ships with the bundle and tiles natively.
          // Repointable at a real asset in Phase 8 by swapping this value.
          [cssVars.bgTexture]:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'><filter id='zrn'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch' seed='7'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.91 0 0 0 0 0.82 0 0 0 0.78 0'/></filter><rect width='100%' height='100%' filter='url(%23zrn)'/></svg>\")",

          // Line / surface tokens for consumption in sx blocks
          [cssVars.lineMuted]: lines.muted,
          [cssVars.lineStrong]: lines.strong,
          [cssVars.surfaceWash]: surfaces.wash,
          [cssVars.surfaceRaised]: surfaces.raised,
        },
        html: {
          backgroundColor: ink[950],
          scrollBehavior: "smooth",
        },
        body: {
          isolation: "isolate",
          position: "relative",
          minHeight: "100vh",
          backgroundColor: `var(${cssVars.bgBase})`,
          backgroundImage: `var(${cssVars.bgVignette})`,
          color: bone[100],
          textRendering: "geometricPrecision",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        // A single static material layer, behind the content but above the body paint.
        "body::after": {
          content: '""',
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          opacity: 0.045,
          backgroundImage: `var(${cssVars.bgTexture})`,
          backgroundSize: "220px 220px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        },
        "#main-content": { scrollMarginTop: 24, outline: "none", flex: 1, minWidth: 0 },
        ".skip-link": {
          position: "fixed",
          top: 8,
          left: 16,
          transform: "translateY(-180%)",
          zIndex: 1500,
          padding: "12px 20px",
          color: ink[950],
          backgroundColor: bone[100],
          textDecoration: "none",
        },
        ".skip-link:focus": { transform: "translateY(0)" },
        "::selection": {
          backgroundColor: alpha(accent.brass, 0.35),
          color: bone[100],
        },
        a: {
          color: "inherit",
          textDecorationColor: alpha(accent.brass, 0.65),
          textUnderlineOffset: "0.22em",
          transition: `color ${duration.fast}ms ${easing}, text-decoration-color ${duration.fast}ms ${easing}, text-underline-offset ${duration.fast}ms ${easing}`,
        },
        "a:hover": {
          color: bone[100],
          textDecorationColor: accent.emberLight,
          textUnderlineOffset: "0.32em",
        },
        // Brass keyboard focus ring everywhere; respects accessibility
        "*:focus-visible": {
          outline: `2px solid ${accent.brassLight}`,
          outlineOffset: 3,
        },
        // Reduced motion: collapse all animation/transition durations
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            scrollBehavior: "auto !important",
            transitionDuration: "0.01ms !important",
          },
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
      styleOverrides: {
        root: {
          paddingLeft: layout.gutterMobile,
          paddingRight: layout.gutterMobile,
          "@media (min-width:600px)": {
            paddingLeft: layout.gutterDesktop,
            paddingRight: layout.gutterDesktop,
          },
          "@media (min-width:1200px)": { maxWidth: layout.contentMaxWidth },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          color: bone[100],
          backgroundImage: "none",
          backgroundColor: alpha(ink[800], 0.76),
          border: `1px solid ${alpha(bone[100], 0.14)}`,
          boxShadow: "0 18px 58px rgba(0, 0, 0, 0.24)",
        },
        rounded: {
          borderRadius: 4,
        },
        elevation1: {
          boxShadow: "0 1px 0 rgba(238, 229, 210, 0.06)",
        },
        elevation2: {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.22)",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: ink[850],
          border: `1px solid ${lines.strong}`,
          borderRadius: 4,
          boxShadow: "0 18px 58px rgba(0, 0, 0, 0.30)",
          margin: 20,
          width: "calc(100% - 40px)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          overflow: "hidden",
          backgroundColor: alpha(bone[100], 0.045),
          border: `1px solid ${lines.muted}`,
          borderRadius: 4,
          boxShadow: "none",
          transition: `transform ${duration.fast}ms ${easing}, border-color ${duration.fast}ms ${easing}, background-color ${duration.fast}ms ${easing}`,
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "18px 20px 8px",
        },
        title: {
          fontFamily: headingStack,
          fontWeight: 600,
          letterSpacing: "-0.018em",
        },
        subheader: {
          fontFamily: monoStack,
          color: alpha(bone[200], 0.58),
          fontSize: "0.72rem",
          letterSpacing: "0.055em",
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "18px 20px",
          "&:last-child": {
            paddingBottom: 20,
          },
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: "9px 14px",
          minHeight: 44,
          transition: `border-color ${duration.micro}ms ${easing}, background-color ${duration.micro}ms ${easing}, color ${duration.micro}ms ${easing}`,
          "&[aria-disabled='true']": { opacity: 0.6, cursor: "default" },
        },
        contained: {
          color: ink[950],
          backgroundColor: accent.brass,
          border: `1px solid ${accent.brassLight}`,
          "&:hover": {
            backgroundColor: accent.brassLight,
          },
        },
        outlined: {
          color: bone[100],
          borderColor: alpha(accent.brass, 0.52),
          backgroundColor: alpha(bone[100], 0.03),
          "&:hover": {
            borderColor: accent.brassLight,
            backgroundColor: alpha(accent.brass, 0.09),
          },
        },
        text: {
          color: bone[100],
          "&:hover": {
            backgroundColor: alpha(bone[100], 0.06),
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          height: 26,
          borderRadius: 2,
          fontFamily: monoStack,
          fontSize: "0.66rem",
          fontWeight: 600,
          letterSpacing: "0.075em",
          textTransform: "uppercase",
          color: alpha(bone[100], 0.86),
          backgroundColor: alpha(bone[100], 0.045),
          border: `1px solid ${lines.muted}`,
        },
        outlined: {
          backgroundColor: "transparent",
          borderColor: alpha(accent.brass, 0.42),
        },
        colorPrimary: {
          color: bone[100],
          backgroundColor: alpha(accent.brass, 0.13),
          borderColor: alpha(accent.brassLight, 0.42),
        },
        colorSecondary: {
          color: bone[100],
          backgroundColor: alpha(accent.ember, 0.13),
          borderColor: alpha(accent.emberLight, 0.42),
        },
        label: {
          paddingLeft: 9,
          paddingRight: 9,
        },
      },
    },

    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderTop: `1px solid ${lines.muted}`,
          borderBottom: `1px solid ${lines.faint}`,
          "&::before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 54,
          padding: "0 4px",
          transition: `background-color ${duration.fast}ms ${easing}`,
          "&:hover": {
            backgroundColor: alpha(bone[100], 0.04),
          },
          "&.Mui-expanded": {
            minHeight: 54,
          },
        },
        content: {
          margin: "12px 0",
          "&.Mui-expanded": {
            margin: "12px 0",
          },
        },
        expandIconWrapper: {
          color: accent.brass,
        },
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "8px 0 22px",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lines.muted,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: alpha(bone[100], 0.82),
          borderRadius: 2,
          minWidth: 44,
          minHeight: 44,
          transition: `background-color ${duration.micro}ms ${easing}, color ${duration.micro}ms ${easing}, transform ${duration.micro}ms ${easing}`,
          "&:hover": {
            color: bone[100],
            backgroundColor: alpha(bone[100], 0.07),
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(bone[100], 0.08),
          color: bone[100],
          border: `1px solid ${alpha(bone[100], 0.18)}`,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: ink[800],
          color: bone[100],
          border: `1px solid ${lines.muted}`,
          borderRadius: 2,
          fontFamily: monoStack,
          fontSize: "0.68rem",
          letterSpacing: "0.04em",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: alpha(ink[850], 0.96),
          border: `1px solid ${lines.muted}`,
          borderRadius: 4,
          boxShadow: "0 18px 58px rgba(0, 0, 0, 0.36)",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: alpha(bone[100], 0.86),
          fontSize: "0.88rem",
          "&:hover": {
            backgroundColor: alpha(accent.brass, 0.08),
          },
          "&.Mui-selected": {
            backgroundColor: alpha(accent.brass, 0.14),
            "&:hover": {
              backgroundColor: alpha(accent.brass, 0.18),
            },
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          backgroundColor: alpha(bone[100], 0.035),
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(bone[100], 0.18),
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(accent.brass, 0.42),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: accent.brass,
          },
        },
        input: {
          color: bone[100],
          "& option": { backgroundColor: ink[850], color: bone[100] },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: alpha(bone[200], 0.66),
          "&.Mui-focused": {
            color: accent.brass,
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: alpha(ink[950], 0.78),
          color: bone[100],
          borderBottom: `1px solid ${alpha(bone[100], 0.12)}`,
          boxShadow: "none",
          backdropFilter: "blur(12px)",
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: accent.brass,
          height: 1,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: monoStack,
          fontSize: "0.72rem",
          letterSpacing: "0.075em",
          textTransform: "uppercase",
          color: alpha(bone[200], 0.62),
          "&.Mui-selected": {
            color: bone[100],
          },
        },
      },
    },
  },
});

// Re-export the underlying tokens for convenience.
export { zrTokens, ink, graphite, stone, bone, accent, surfaces, lines, easing, duration, layout };
export type { ZrTokens };

export default zacharyTheme;
