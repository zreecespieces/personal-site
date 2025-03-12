"use client"

import React, { useState, useEffect } from 'react';
import USAMap from "react-usa-map";
import { Box, Typography, Tooltip, Paper, Chip, useMediaQuery, useTheme } from "@mui/material";

// Types for state customization
interface MapCustomizations {
  [key: string]: {
    fill: string;
  };
}

interface USAMapProps {
  visitedStates: string[];
}

// Constants for colors
const ELECTRIC_BLUE = "#0072FF";

// Map full state names to abbreviations
const stateAbbreviations: Record<string, string> = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY",
  "Washington DC": "DC"
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Direct customization approach following the example
  const statesCustomConfig = () => {
    const config: Record<string, { fill: string }> = {};
    
    // Add each visited state to the config with the electric blue color
    visitedStates.forEach(state => {
      const stateAbbr = stateAbbreviations[state];
      if (stateAbbr) {
        config[stateAbbr] = {
          fill: ELECTRIC_BLUE // Electric blue to match the site's gradient
        };
      }
    });
    
    // Initialize all states with default color
    Object.keys(stateAbbreviations).forEach(state => {
      const abbr = stateAbbreviations[state];
      if (!config[abbr]) {
        config[abbr] = { fill: "#2A2A2A" }; // Default non-visited state color (dark gray)
      }
    });
    
    console.log('States config:', config);
    return config;
  };

  const handleMouseOver = (event: React.MouseEvent, stateCode: string) => {
    const upperStateCode = stateCode.toUpperCase();
    const stateName = stateFullNames[upperStateCode] || upperStateCode;
    const isVisited = visitedStates.includes(stateName);
    setTooltipContent(`${stateName} ${isVisited ? '- Visited ✓' : ''}`);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  const mapHandler = (event: React.MouseEvent): void => {
    // This method is required by the package but we don't need to do anything here
  };

  return (
    <Box sx={{ position: 'relative', mt: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        U.S. States Visited: {visitedStates.length}/50 + Washington DC
      </Typography>
      
      <Box sx={{ 
        position: 'relative',
        width: '100%',
        '& svg': {
          width: '100% !important',
          height: 'auto !important',
          maxHeight: isMobile ? '300px' : '500px',
        },
        '& path': {
          transition: 'fill 0.3s ease',
          stroke: '#333',
          strokeWidth: '0.5px',
        },
        '& path:hover': {
          opacity: 0.8,
          cursor: 'pointer',
        }
      }}>
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
            position: 'fixed',
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            p: 1,
            borderRadius: 1,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          {tooltipContent}
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mt: 3 }}>
        {visitedStates.sort().map((state, index) => (
          <Chip 
            key={index}
            label={state}
            size="small"
            sx={{ 
              bgcolor: 'rgba(0, 114, 255, 0.1)', 
              color: ELECTRIC_BLUE,
              fontWeight: 500,
              m: 0.5
            }} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default USAMapComponent;
