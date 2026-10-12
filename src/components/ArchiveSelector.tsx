"use client";

import { Box, Tab, Tabs, TextField } from "@mui/material";
import type { ReactNode } from "react";

export interface ArchiveOption {
  value: string;
  label: string;
}

export function ArchiveSelector({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: ArchiveOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  // Small collections remain visible on desktop. Long collections and touch
  // layouts use a named native picker instead of a clipped horizontal strip.
  const tabbed = options.length <= 7;
  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      <TextField
        select
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        slotProps={{
          select: { native: true },
          htmlInput: { "aria-controls": `${id}-panel-${value}` },
        }}
        sx={{
          display: tabbed ? { xs: "inline-flex", md: "none" } : "inline-flex",
          width: "100%",
          maxWidth: 360,
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      {tabbed && (
        <Tabs
          value={value || false}
          onChange={(_, next: string) => onChange(next)}
          aria-label={label}
          sx={{
            display: { xs: "none", md: "flex" },
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {options.map((option) => (
            <Tab
              key={option.value}
              value={option.value}
              label={option.label}
              id={`${id}-tab-${option.value}`}
              aria-controls={`${id}-panel-${option.value}`}
            />
          ))}
        </Tabs>
      )}
    </Box>
  );
}

export function ArchivePanel({
  id,
  value,
  label,
  selected,
  tabbed,
  children,
}: {
  id: string;
  value: string;
  label: string;
  selected: boolean;
  tabbed: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      role={tabbed ? "tabpanel" : "region"}
      id={`${id}-panel-${value}`}
      aria-labelledby={tabbed ? `${id}-tab-${value}` : undefined}
      aria-label={tabbed ? undefined : label}
      hidden={!selected}
      tabIndex={0}
    >
      {children}
    </Box>
  );
}
