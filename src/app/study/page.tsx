"use client";

import { Box, Link, LinearProgress, Stack, Typography } from "@mui/material";
import { PageHeader, SectionFrame } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { formatCalendarDate } from "@/lib/dates";
import { courses, khanAcademyStreak } from "./courses";

export default function Study() {
  return (
    <Box component="main" id="main-content">
      <SectionFrame section="education" spacing="regular">
        <PageHeader
          overline="Personal logs"
          title="Study"
          subtitle="Self-study in mathematics, from calculus prerequisites to multivariable calculus."
          size="md"
          meta={<Typography color="text.secondary">{courses.length} courses</Typography>}
        />
      </SectionFrame>

      <SectionFrame section="education" spacing="none" sx={{ pb: 8 }}>
        <Box
          sx={{
            borderLeft: "2px solid",
            borderColor: "primary.main",
            pl: 2.5,
            mb: 5,
            maxWidth: 760,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            A {khanAcademyStreak.currentStreak}-{khanAcademyStreak.unit} streak as of{" "}
            <time dateTime={khanAcademyStreak.lastActivity}>
              {formatCalendarDate(khanAcademyStreak.lastActivity)}
            </time>
            .
          </Typography>
        </Box>

        <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
          {courses.map((course) => (
            <Box
              component="li"
              key={course.id}
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                py: 4,
                display: "grid",
                gap: { xs: 2, md: 5 },
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 220px" },
              }}
            >
              <Stack direction="row" gap={{ xs: 2, sm: 3 }} alignItems="flex-start">
                {course.imageUrl && (
                  <ContentImage
                    src={course.imageUrl}
                    alt=""
                    width={64}
                    height={64}
                    sx={{ width: { xs: 48, sm: 64 }, flexShrink: 0, objectFit: "contain" }}
                  />
                )}
                <Stack gap={1} sx={{ minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary">
                    {course.provider} / {course.category}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {course.courseUrl ? (
                      <Link
                        href={course.courseUrl}
                        target="_blank"
                        rel="noreferrer"
                        color="inherit"
                      >
                        {course.title}
                      </Link>
                    ) : (
                      course.title
                    )}
                  </Typography>
                  {course.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 680 }}>
                      {course.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    Started{" "}
                    <time dateTime={course.startDate}>{formatCalendarDate(course.startDate)}</time>
                    {course.endDate && ` / Completed ${formatCalendarDate(course.endDate)}`}
                  </Typography>
                  {course.skills && (
                    <Typography variant="body2">{course.skills.join(", ")}</Typography>
                  )}
                  {course.certificateUrl && (
                    <Link href={course.certificateUrl} target="_blank" rel="noreferrer">
                      View certificate
                    </Link>
                  )}
                </Stack>
              </Stack>
              <Stack gap={1} sx={{ alignSelf: "start" }}>
                <Typography variant="body2" color="text.secondary">
                  Last noted mastery: {course.mastery}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={course.mastery}
                  aria-label={`${course.title}: last noted mastery`}
                  sx={{ height: 3 }}
                />
                {course.modules?.map((module) => (
                  <Typography key={module.title} variant="caption" color="text.secondary">
                    {module.title}: {module.mastery}% mastery
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </SectionFrame>
    </Box>
  );
}
