"use client";

import USAMap from "react-usa-map";
import { Box, Typography, useTheme } from "@mui/material";

interface USAMapProps {
  visitedStates: string[];
}

// Map full state names to abbreviations
const stateAbbreviations: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  "Washington DC": "DC",
};

export function USAMapComponent({ visitedStates }: USAMapProps) {
  const theme = useTheme();
  const visitedFill = theme.zr.accent.moss;
  const config: Record<string, { fill: string }> = {};
  const sortedStates = [...new Set(visitedStates)].sort((a, b) => a.localeCompare(b, "en-US"));
  const hasDC = sortedStates.includes("Washington DC");
  sortedStates.forEach((state) => {
    const abbreviation = stateAbbreviations[state];
    if (abbreviation) config[abbreviation] = { fill: visitedFill };
  });
  // The library draws DC as a path and a circle with independent fill keys.
  if (hasDC) {
    config.DC1 = { fill: visitedFill };
    config.DC2 = { fill: visitedFill };
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {sortedStates.length - Number(hasDC)} of 50 states{hasDC ? ", plus Washington DC" : ""}.{" "}
        Visited places are shaded green and listed below.
      </Typography>

      <Box
        aria-hidden="true"
        sx={{
          width: "100%",
          pointerEvents: "none",
          "& svg": {
            width: "100%",
            height: "auto",
            maxHeight: 440,
          },
          "& path": {
            stroke: theme.palette.background.default,
            strokeWidth: "0.6px",
          },
        }}
      >
        <USAMap
          customize={config}
          defaultFill={theme.palette.action.disabledBackground}
          title="United States Travel Map"
        />
      </Box>

      <Box
        component="ul"
        aria-label="Visited states and district"
        sx={{
          columns: { xs: 2, sm: 3, md: 4 },
          pl: 2.5,
          mt: 3,
          "& li": { typography: "body2", py: 0.5, breakInside: "avoid" },
        }}
      >
        {sortedStates.map((state) => (
          <li key={state}>{state}</li>
        ))}
      </Box>
    </Box>
  );
}

export default USAMapComponent;
