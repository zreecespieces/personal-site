"use client";

import React from "react";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import {
  ArtifactCard,
  LabelChip,
  MakersMarkFooter,
  Overline,
  PageHeader,
  SectionFrame,
} from "@/components/primitives";
import { calculateCourseStats, courses, khanAcademyStreak } from "./courses";
import LaunchIcon from "@mui/icons-material/Launch";

const formatDate = (dateString: string) => {
  const dateTimeString = `${dateString}T00:00:00`;
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export default function Study() {
  const theme = useTheme();
  const stats = calculateCourseStats();

  return (
    <Box component="main">
      <SectionFrame section="education" spacing="loose">
        <PageHeader
          overline="Learning · Studying"
          index="02"
          title="Threads in progress — what I'm learning right now."
          subtitle="Long-running self-study, mostly Khan Academy, with a weekly streak as the metronome."
          size="md"
          meta={
            <Stack direction="row" gap={1}>
              <LabelChip>{stats.totalCourses} Courses</LabelChip>
              <LabelChip>{khanAcademyStreak.currentStreak} Week Streak</LabelChip>
            </Stack>
          }
        />
      </SectionFrame>

      <SectionFrame section="education" spacing="none">
        <Stack gap={3}>
          {courses.map((course) => (
            <ArtifactCard key={course.id} padding="loose" hoverable={false}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                gap={{ xs: 2, md: 4 }}
                alignItems={{ md: "flex-start" }}
              >
                {course.imageUrl && (
                  <Box
                    sx={{
                      width: { xs: 80, md: 96 },
                      height: { xs: 80, md: 96 },
                      flexShrink: 0,
                      border: `1px solid ${theme.zr.lines.muted}`,
                      backgroundColor: "rgba(15, 15, 13, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={course.imageUrl}
                      alt={course.provider}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        p: 1,
                        filter: "saturate(0.85)",
                      }}
                    />
                  </Box>
                )}

                <Stack gap={1.5} sx={{ flex: 1, minWidth: 0 }}>
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap={2}
                    flexWrap="wrap"
                  >
                    <Stack gap={0.5}>
                      <Overline>{course.provider}</Overline>
                      <Typography variant="h5" component="h3">
                        {course.title}
                      </Typography>
                    </Stack>
                    <LabelChip>
                      {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                    </LabelChip>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    Started {formatDate(course.startDate)}
                    {course.endDate && ` · Completed ${formatDate(course.endDate)}`}
                  </Typography>

                  <Stack gap={0.75} sx={{ mt: 1 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Overline>Mastery</Overline>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: `var(${theme.zr.cssVars.fontMono})`,
                          color: theme.zr.bone[200],
                        }}
                      >
                        {course.mastery}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={course.mastery}
                      sx={{
                        height: 4,
                        borderRadius: 0,
                        backgroundColor: theme.zr.lines.muted,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.zr.accent.brass,
                          borderRadius: 0,
                        },
                      }}
                    />
                  </Stack>

                  {course.courseUrl && (
                    <Box sx={{ mt: 1 }}>
                      <Button
                        variant="outlined"
                        href={course.courseUrl}
                        target="_blank"
                        rel="noreferrer"
                        endIcon={<LaunchIcon fontSize="small" />}
                        size="small"
                      >
                        View Course
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Stack>
            </ArtifactCard>
          ))}
        </Stack>

        <Box sx={{ mt: 6 }}>
          <Typography
            component={NextLink}
            href="/"
            variant="overline"
            sx={{
              color: "text.secondary",
              textDecorationColor: "var(--zr-section-accent)",
              "&:hover": { color: "text.primary" },
            }}
          >
            ← Back to index
          </Typography>
        </Box>
      </SectionFrame>

      <MakersMarkFooter />
    </Box>
  );
}
