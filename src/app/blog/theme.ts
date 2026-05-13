/**
 * Blog-local theme tokens.
 *
 * Originally a lime/teal palette that diverged from the rest of the site;
 * unified with the redesign tokens during phase 4. The exported names are
 * preserved so the page + slug components don't need to rename imports.
 *
 * Will be removed in phase 7 once the blog migrates fully to direct
 * theme.zr / section-accent consumption.
 *
 * @deprecated Use `theme.zr.*` directly.
 */

// Blog inherits the Professional family accent (brass).
export const BLOG_BACKGROUND = "transparent";
export const BLOG_GRADIENT = ["#b49a63", "#c9ad71"]; // brass → brassLight, retained for any consumer still expecting an array
export const BLOG_SURFACE = "rgba(238, 229, 210, 0.045)";
export const BLOG_TEXT = "#eee5d2";
export const BLOG_MUTED = "rgba(222, 213, 195, 0.7)";
export const BLOG_HOVER = "rgba(238, 229, 210, 0.06)";
export const BLOG_SHADOW = "none";
