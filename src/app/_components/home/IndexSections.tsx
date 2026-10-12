"use client";

import { Box, Typography } from "@mui/material";
import { IndexRow } from "@/components/primitives";
import { linkCategories } from "@/app/_data/links";

export default function IndexSections() {
  return (
    <Box id="index" tabIndex={-1} sx={{ pt: { xs: 5, md: 7 }, scrollMarginTop: 32 }}>
      <Box
        sx={{
          borderTop: "1px solid var(--zr-line-strong)",
          pt: 3,
          mb: 4,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography component="h2" variant="h4">
          Explore
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 4, md: 5 },
        }}
      >
        {linkCategories.map((category) => (
          <Box
            key={category.section}
            component="section"
            aria-labelledby={`index-${category.section}`}
            sx={(theme) => ({ "--zr-section-accent": theme.zr.sectionAccent[category.section] })}
          >
            <Typography component="h3" variant="h6" id={`index-${category.section}`} sx={{ mb: 2 }}>
              {category.title}
            </Typography>
            {category.links.map((link) => (
              <IndexRow
                key={link.url}
                title={link.title}
                density="compact"
                href={link.url}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                endGlyph={
                  <Box component="span" aria-hidden="true">
                    →
                  </Box>
                }
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
