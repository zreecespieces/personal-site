import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface WorkflowStage {
  label: string;
  illustration: ReactNode;
}

export default function WorkflowFigure({
  id,
  stages,
  label,
  caption = "Illustrated workflow, not a product screenshot.",
}: {
  id: string;
  stages: WorkflowStage[];
  label?: string;
  caption?: string | null;
}) {
  return (
    <Box
      component="figure"
      aria-labelledby={caption ? `${id}-caption` : undefined}
      aria-label={caption ? undefined : (label ?? "Project workflow")}
      sx={{
        m: 0,
        px: { xs: 2.5, md: 5 },
        py: { xs: 3, md: 4 },
        border: "1px solid var(--zr-line-muted)",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 4, sm: 3 },
        }}
      >
        {stages.map(({ label, illustration }) => (
          <Stack key={label} gap={2} alignItems="center">
            <Box
              component="svg"
              viewBox="0 0 160 120"
              aria-hidden="true"
              focusable="false"
              sx={{ width: "100%", maxWidth: 200, color: "var(--zr-section-accent)" }}
            >
              {illustration}
            </Box>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {label}
            </Typography>
          </Stack>
        ))}
      </Box>
      {caption && (
        <Typography
          component="figcaption"
          id={`${id}-caption`}
          variant="caption"
          sx={{
            display: "block",
            mt: 4,
            maxWidth: "75ch",
            color: "text.secondary",
            lineHeight: 1.7,
          }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}
