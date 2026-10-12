"use client";

import { Box, Tab } from "@mui/material";
import { ArchiveCarousel } from "@/components/ArchiveCarousel";
import type { Country } from "./countries";

export default function CountryCarousel({
  countries,
  countryIds,
  value,
  onChange,
}: {
  countries: Country[];
  countryIds: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ArchiveCarousel
      label="Countries visited"
      scrollLabel="countries"
      value={value}
      onChange={onChange}
    >
      {countries.map((country, index) => (
        <Tab
          key={countryIds[index]}
          value={countryIds[index]}
          disableRipple
          label={
            <Box
              component="span"
              sx={{ height: 40, display: "grid", placeItems: "center", lineHeight: "20px" }}
            >
              {country.name}
            </Box>
          }
          id={`travel-tab-${countryIds[index]}`}
          aria-controls={`travel-panel-${countryIds[index]}`}
          icon={
            <Box
              component="span"
              aria-hidden="true"
              className="zr-country-flag"
              sx={{
                display: "grid",
                placeItems: "center",
                width: 48,
                height: 48,
                border: "2px solid transparent",
                borderRadius: "50%",
                fontSize: "1.6rem",
                lineHeight: 1,
                mb: 1.5,
              }}
            >
              {country.flag}
            </Box>
          }
          sx={{
            minWidth: { xs: 128, md: 152 },
            maxWidth: { xs: 128, md: 152 },
            minHeight: 132,
            px: 1.5,
            py: 2,
            fontFamily: "inherit",
            fontSize: "0.875rem",
            letterSpacing: 0,
            textTransform: "none",
            "&:hover": { bgcolor: "action.hover" },
            "&.Mui-selected .zr-country-flag": { borderColor: "var(--zr-section-accent)" },
            "&:focus-visible, &.Mui-focusVisible": {
              outline: "2px solid",
              outlineColor: "primary.light",
              outlineOffset: -3,
            },
          }}
        />
      ))}
    </ArchiveCarousel>
  );
}
