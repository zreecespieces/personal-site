"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ArchiveAccordion,
  Glyph,
  IndexRow,
  Overline,
  PageHeader,
  type GlyphName,
} from "@/components/primitives";
import { linkCategories, type LinkCategory } from "@/app/_data/links";
import type { SectionKey } from "@/theme/tokens";

const SECTION_GLYPH: Record<SectionKey, GlyphName> = {
  professional: "bracket",
  education: "page",
  hobbies: "mountain",
  about: "node",
};

const SECTION_END_GLYPH: Record<SectionKey, GlyphName> = {
  professional: "node",
  education: "page",
  hobbies: "compass",
  about: "node",
};

function ArrowRight() {
  return (
    <Box
      component="svg"
      viewBox="0 0 16 16"
      sx={{ width: 14, height: 14, display: "block" }}
      aria-hidden="true"
    >
      <line x1="2" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth={1.2} />
      <polyline points="9,4 13,8 9,12" fill="none" stroke="currentColor" strokeWidth={1.2} />
    </Box>
  );
}

function CategorySection({ category, n }: { category: LinkCategory; n: number }) {
  const theme = useTheme();
  const accent = theme.zr.sectionAccent[category.section];

  return (
    <Box
      data-section={category.section}
      sx={{ "--zr-section-accent": accent } as React.CSSProperties}
    >
      <ArchiveAccordion
        label={category.title}
        index={n}
        glyph={<Glyph name={SECTION_GLYPH[category.section]} size={18} />}
        count={category.links.length}
        defaultOpen
        accent={accent}
      >
        <Box sx={{ mt: 1 }}>
          {category.links.map((link, i) => (
            <IndexRow
              key={link.url}
              index={i + 1}
              title={link.title}
              description={link.description}
              category={link.subtitle}
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              endGlyph={
                link.external ? (
                  <Box
                    component="svg"
                    viewBox="0 0 16 16"
                    sx={{ width: 14, height: 14 }}
                    aria-hidden="true"
                  >
                    <polyline
                      points="6,2 14,2 14,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                    />
                    <line x1="14" y1="2" x2="6" y2="10" stroke="currentColor" strokeWidth={1.2} />
                    <polyline
                      points="11,8 11,13 3,13 3,5 8,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                    />
                  </Box>
                ) : (
                  <ArrowRight />
                )
              }
            />
          ))}
        </Box>
      </ArchiveAccordion>
    </Box>
  );
}

/**
 * The home index — three archive accordions, one per top-level category.
 * Each carries its own section accent and renders its items as numbered
 * IndexRows. The section glyphs reinforce family identity without
 * relying on color alone.
 */
export function IndexSections() {
  return (
    <Box sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 } }}>
      <Stack gap={2} sx={{ mb: 5 }}>
        <PageHeader
          overline="Index"
          index="01"
          title="An index of systems, disciplines, and things under construction."
          subtitle="A loose catalog of work, study, and practice. Each section opens into its own field."
          size="md"
          withMark={false}
          withRule
        />
      </Stack>

      <Box>
        {linkCategories.map((category, i) => (
          <CategorySection key={category.title} category={category} n={i + 1} />
        ))}
      </Box>

      <Stack direction="row" alignItems="center" gap={1.5} sx={{ mt: 5, opacity: 0.6 }}>
        <Overline>End of Index</Overline>
        <Box sx={{ flex: 1, height: 1, backgroundColor: "var(--zr-line-muted)" }} />
      </Stack>

      {/* Type guard — silences "unused" lint on SECTION_END_GLYPH when
          we restrict the per-row end glyph above. Kept for reference and
          possible future use. */}
      <span hidden aria-hidden>
        {Object.keys(SECTION_END_GLYPH).length}
      </span>
    </Box>
  );
}

export default IndexSections;
