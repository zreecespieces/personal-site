"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";

/** One quiet, wrapping treatment for dates, quantities, and record context. */
export function MetaLine({ items }: { items: ReactNode[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: 2.5,
        rowGap: 0.75,
        typography: "caption",
        color: "text.secondary",
        fontVariantNumeric: "tabular-nums",
        "& > span": { minWidth: 0, overflowWrap: "anywhere" },
      }}
    >
      {items
        .filter((item) => item !== null && item !== undefined && item !== false)
        .map((item, index) => (
          <Box component="span" key={index}>
            {item}
          </Box>
        ))}
    </Box>
  );
}
