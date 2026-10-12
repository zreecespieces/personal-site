"use client";

import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

/** Editorial records share edges and rhythm, not their domain-specific contents. */
export function RecordList({ children, sx = [] }: { children: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box
      component="ul"
      sx={[
        {
          listStyle: "none",
          p: 0,
          m: 0,
          "& > li": {
            minWidth: 0,
            py: { xs: 2.5, md: 3 },
            borderTop: "1px solid",
            borderColor: "divider",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
