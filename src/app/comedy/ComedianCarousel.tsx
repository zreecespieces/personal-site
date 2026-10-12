"use client";

import { Box, Tab } from "@mui/material";
import { ArchiveCarousel } from "@/components/ArchiveCarousel";
import { ContentImage } from "@/components/ContentImage";
import type { Comedian } from "./comedians";

export default function ComedianCarousel({
  comedians,
  comedianIds,
  value,
  onChange,
}: {
  comedians: Comedian[];
  comedianIds: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ArchiveCarousel
      label="Comedians and live series"
      scrollLabel="comedians"
      value={value}
      onChange={onChange}
    >
      {comedians.map((comedian, index) => (
        <Tab
          key={comedianIds[index]}
          value={comedianIds[index]}
          label={comedian.name}
          id={`comedy-tab-${comedianIds[index]}`}
          aria-controls={`comedy-panel-${comedianIds[index]}`}
          icon={
            <Box
              aria-hidden="true"
              className="zr-comedian-portrait"
              sx={{
                width: { xs: 56, md: 64 },
                border: "2px solid transparent",
                borderRadius: "50%",
                p: 0.5,
                mb: 1.5,
              }}
            >
              <ContentImage
                src={comedian.image}
                alt=""
                width={128}
                height={128}
                sizes="64px"
                sx={{ borderRadius: "50%" }}
              />
            </Box>
          }
          sx={{
            minWidth: { xs: 112, md: 132 },
            maxWidth: 160,
            px: 1.5,
            py: 2,
            fontFamily: "inherit",
            fontSize: "0.875rem",
            letterSpacing: 0,
            textTransform: "none",
            "&:hover": { bgcolor: "action.hover" },
            "&.Mui-selected .zr-comedian-portrait": { borderColor: "var(--zr-section-accent)" },
            "&:focus-visible": { outlineOffset: -3 },
          }}
        />
      ))}
    </ArchiveCarousel>
  );
}
