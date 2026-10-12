/**
 * Barrel export for the redesign primitives layer.
 *
 * Consumers can import everything via `@/components/primitives` and avoid
 * deep-pathing into individual files.
 */

export { Overline } from "./Overline";
export type { OverlineProps } from "./Overline";

export { Crosshair } from "./Crosshair";
export type { CrosshairProps } from "./Crosshair";

export { Glyph } from "./Glyphs";
export type { GlyphName, GlyphProps } from "./Glyphs";

export { LabelChip } from "./LabelChip";
export type { LabelChipProps } from "./LabelChip";

export { SectionFrame } from "./SectionFrame";
export type { SectionFrameProps } from "./SectionFrame";

export { PageHeader } from "./PageHeader";
export type { PageHeaderProps } from "./PageHeader";

export { ArtifactCard } from "./ArtifactCard";
export type { ArtifactCardProps } from "./ArtifactCard";

export { IndexRow } from "./IndexRow";
export type { IndexRowProps } from "./IndexRow";

export { ArchiveAccordion } from "./ArchiveAccordion";
export type { ArchiveAccordionProps } from "./ArchiveAccordion";

export { PortraitFrame } from "./PortraitFrame";
export type { PortraitFrameProps } from "./PortraitFrame";

export { MakersMarkFooter } from "./MakersMarkFooter";

export { Reveal } from "./Reveal";
export type { RevealProps } from "./Reveal";

// Patterns
export { Honeycomb } from "./patterns/Honeycomb";
export type { HoneycombProps } from "./patterns/Honeycomb";
export { ContourField } from "./patterns/ContourField";
export type { ContourFieldProps } from "./patterns/ContourField";
export { SacredGeometry } from "./patterns/SacredGeometry";
export type { SacredGeometryProps, SacredGeometryShape } from "./patterns/SacredGeometry";
export { Suminagashi } from "./patterns/Suminagashi";
export type { SuminagashiProps } from "./patterns/Suminagashi";

// Heroes — client components from ./heroes/index.tsx
export {
  HeroDiagram,
  HeroContouredMandala,
  HeroTopographicNodeGraph,
  HeroSacredHexLattice,
  HeroConcentricOrbital,
  HeroLayeredContourSigil,
} from "./heroes";
// Hero constants + the server-safe `resolveHeroVariant` helper, re-exported
// directly from the non-client module so server components (e.g. the
// home page reading searchParams) can call them.
export { HERO_VARIANTS, HERO_VARIANT_LABELS, resolveHeroVariant } from "./heroes/types";
export type { HeroDiagramProps, HeroVariant } from "./heroes/types";
