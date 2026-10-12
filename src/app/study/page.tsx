"use client";

import { Box, Link, LinearProgress, Stack, Typography } from "@mui/material";
import { MetaLine, PageLayout, RecordList } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { formatCalendarDate } from "@/lib/dates";
import { courses } from "./courses";

const commonProvider =
  new Set(courses.map((course) => course.provider)).size === 1 ? courses[0]?.provider : undefined;

export default function Study() {
  return (
    <PageLayout
      section="education"
      title="Study"
      subtitle="Independent study in mathematics."
      meta={<MetaLine items={[commonProvider]} />}
    >
      <RecordList>
        {courses.map((course) => (
          <Box
            component="li"
            key={course.id}
            sx={{
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
                {!commonProvider && <MetaLine items={[course.provider, course.category]} />}
                <Typography variant="h5" component="h2">
                  {course.courseUrl ? (
                    <Link href={course.courseUrl} target="_blank" rel="noreferrer" color="inherit">
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
                {course.endDate && (
                  <MetaLine
                    items={[
                      <time key="end" dateTime={course.endDate}>
                        Completed {formatCalendarDate(course.endDate)}
                      </time>,
                    ]}
                  />
                )}
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
      </RecordList>
    </PageLayout>
  );
}
