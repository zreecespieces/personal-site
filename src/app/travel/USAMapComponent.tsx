"use client";

import React, { useState } from "react";
import USAMap from "react-usa-map";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LabelChip } from "@/components/primitives";

// Types for state customization
interface MapCustomizations {
  [key: string]: {
    fill: string;
  };
}

interface USAMapProps {
  visitedStates: string[];
}

// Default colors — read from the redesign tokens via the theme rather than hardcoded.
// The visited fill is set per render from theme.zr.accent.moss (Hobbies family).

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

// Map abbreviations to full state names (reverse lookup)
const stateFullNames = Object.entries(stateAbbreviations).reduce(
  (acc, [fullName, abbr]) => {
    acc[abbr] = fullName;
    return acc;
  },
  {} as Record<string, string>
);

export const USAMapComponent: React.FC<USAMapProps> = ({ visitedStates }) => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const visitedFill = theme.zr.accent.moss;
  const defaultFill = theme.zr.ink[800];

  // Build the per-state fill config consumed by react-usa-map.
  const statesCustomConfig = () => {
    const config: Record<string, { fill: string }> = {};

    visitedStates.forEach((state) => {
      const stateAbbr = stateAbbreviations[state];
      if (stateAbbr) {
        config[stateAbbr] = { fill: visitedFill };
      }
    });

    Object.keys(stateAbbreviations).forEach((state) => {
      const abbr = stateAbbreviations[state];
      if (!config[abbr]) {
        config[abbr] = { fill: defaultFill };
      }
    });

    return config;
  };

  const handleMouseOver = (event: React.MouseEvent, stateCode: string) => {
    const upperStateCode = stateCode.toUpperCase();
    const stateName = stateFullNames[upperStateCode] || upperStateCode;
    const isVisited = visitedStates.includes(stateName);
    setTooltipContent(`${stateName} ${isVisited ? "- Visited ✓" : ""}`);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  // react-usa-map requires an onClick handler; we don't use clicks.
  const mapHandler = (): void => {};

  return (
    <Box sx={{ position: "relative", mt: 2, mb: 4 }}>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
        States visited: {visitedStates.length} of 50 + Washington DC
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          "& svg": {
            width: "100% !important",
            height: "auto !important",
            maxHeight: isMobile ? "300px" : "500px",
          },
          "& path": {
            transition: "fill 0.18s cubic-bezier(0.2, 0, 0, 1)",
            stroke: theme.zr.lines.muted,
            strokeWidth: "0.6px",
          },
          "& path:hover": {
            opacity: 0.85,
            cursor: "pointer",
          },
        }}
      >
        <USAMap
          customize={statesCustomConfig()}
          onClick={mapHandler}
          title="United States Travel Map"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseOut}
        />
      </Box>

      {showTooltip && (
        <Box
          sx={{
            position: "fixed",
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            backgroundColor: theme.zr.ink[850],
            border: `1px solid ${theme.zr.lines.muted}`,
            color: theme.zr.bone[100],
            fontFamily: `var(${theme.zr.cssVars.fontMono})`,
            fontSize: "0.7rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            px: 1.25,
            py: 0.75,
            borderRadius: 1,
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          {tooltipContent}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 0.75,
          mt: 4,
        }}
      >
        {visitedStates.sort().map((state, index) => (
          <LabelChip key={index} size="sm">
            {state}
          </LabelChip>
        ))}
      </Box>
    </Box>
  );
};

export default USAMapComponent;
