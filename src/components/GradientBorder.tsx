import React, { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface GradientBorderProps {
  children: ReactNode;
  gradientColors: string[];
  borderWidth?: number;
  borderRadius?: number;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

/**
 * A component that creates a gradient border around its children
 * Uses a nested box approach to ensure border-radius works correctly
 */
export default function GradientBorder({
  children,
  gradientColors = ['#FF00FF', '#00FFFF'],
  borderWidth = 0.25,
  borderRadius = 3,
  sx = {},
  contentSx = {},
}: GradientBorderProps) {
  const [color1, color2] = gradientColors;
  
  return (
    <Box
      sx={{
        position: 'relative',
        padding: borderWidth,
        borderRadius: borderRadius + (borderWidth / 8),
        background: `linear-gradient(45deg, ${color1}, ${color2})`,
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: borderRadius,
          backgroundColor: (theme) => theme.palette.background.default,
          overflow: 'hidden',
          height: '100%',
          ...contentSx
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
