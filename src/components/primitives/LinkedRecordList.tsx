"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { duration, easing } from "@/theme/tokens";
import { MetaLine } from "./MetaLine";
import { RecordList } from "./RecordList";

export interface LinkedRecord {
  id: string;
  href: string;
  title: string;
  description: string;
  date: { value: string; label: string };
  metadata?: string[];
}

/** One browsable editorial treatment for projects and writing. */
export function LinkedRecordList({
  records,
  headingLevel = 2,
  withTopBorder = true,
}: {
  records: LinkedRecord[];
  headingLevel?: 2 | 3;
  withTopBorder?: boolean;
}) {
  return (
    <RecordList
      sx={{
        "& > li": { py: 0 },
        ...(!withTopBorder && { "& > li:first-of-type": { borderTop: 0 } }),
      }}
    >
      {records.map((record) => (
        <Box component="li" key={record.id}>
          <Box
            component={Link}
            href={record.href}
            aria-labelledby={`record-${record.id}-title`}
            aria-describedby={`record-${record.id}-description`}
            className="zr-linked-record"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr) auto",
                md: "140px minmax(0, 1fr) auto",
              },
              columnGap: { xs: 2, md: 4 },
              rowGap: 1,
              px: 2,
              py: { xs: 3, md: 4 },
              color: "text.primary",
              textDecoration: "none",
              transition: `background-color ${duration.fast}ms ${easing}`,
              "&:hover, &:focus-visible": { bgcolor: "action.hover" },
              "&:hover .zr-record-title, &:focus-visible .zr-record-title": {
                color: "primary.light",
              },
            }}
          >
            <Typography
              component="time"
              dateTime={record.date.value}
              variant="caption"
              color="text.secondary"
              sx={{ pt: { xs: 0, md: 0.5 } }}
            >
              {record.date.label}
            </Typography>
            <Box sx={{ gridColumn: { xs: "1", md: "auto" }, minWidth: 0 }}>
              <Typography
                id={`record-${record.id}-title`}
                component={headingLevel === 2 ? "h2" : "h3"}
                className="zr-record-title"
                variant="h5"
              >
                {record.title}
              </Typography>
              <Typography
                id={`record-${record.id}-description`}
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, maxWidth: "60ch" }}
              >
                {record.description}
              </Typography>
              {!!record.metadata?.length && (
                <Box sx={{ mt: 2 }}>
                  <MetaLine items={record.metadata} />
                </Box>
              )}
            </Box>
            <Typography
              component="span"
              aria-hidden="true"
              className="zr-end-glyph"
              sx={{
                gridColumn: { xs: "2", md: "3" },
                gridRow: { xs: "1 / span 2", md: "1" },
                alignSelf: "center",
                color: "primary.main",
                fontSize: "1.5rem",
              }}
            >
              →
            </Typography>
          </Box>
        </Box>
      ))}
    </RecordList>
  );
}
