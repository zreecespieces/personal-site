import { Box, Button, Stack, Typography } from "@mui/material";
import { ContentImage } from "@/components/ContentImage";
import { MetaLine, Overline, RecordList } from "@/components/primitives";
import {
  formatReleaseMonth,
  teachingImpact,
  udemyProfileUrl,
  type TeachingCourse,
} from "@/app/_data/teaching";

export default function ProjectCourses({ courses }: { courses: TeachingCourse[] }) {
  return (
    <Box component="section" aria-labelledby="project-courses-heading">
      <Box
        component="dl"
        aria-label="Combined course reach"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 3, sm: 5 },
          m: 0,
          mb: { xs: 5, md: 7 },
          pt: 3,
          borderTop: "1px solid var(--zr-line-muted)",
        }}
      >
        {[
          ["Students", teachingImpact.students],
          ["Countries", teachingImpact.countries],
          ["Reviews", teachingImpact.reviews],
        ].map(([label, value]) => (
          <Box key={label}>
            <Box component="dt" sx={{ mb: 1 }}>
              <Overline>{label}</Overline>
            </Box>
            <Typography component="dd" variant="h4" sx={{ m: 0 }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography id="project-courses-heading" component="h2" variant="h4" sx={{ mb: 3 }}>
        The courses
      </Typography>
      <RecordList sx={{ "& > li": { py: { xs: 4, md: 5 } } }}>
        {[...courses]
          .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
          .map((course) => (
            <Box
              component="li"
              key={course.slug}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "300px minmax(0, 1fr)" },
                gap: { xs: 3, md: 5 },
                alignItems: "start",
              }}
            >
              <ContentImage
                src={course.image}
                alt={`${course.title} course cover`}
                width={480}
                height={270}
                sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 64px), 300px"
                sx={{
                  objectFit: "contain",
                  border: "1px solid var(--zr-line-muted)",
                  maxWidth: 480,
                }}
              />
              <Stack gap={2} alignItems="flex-start" sx={{ minWidth: 0 }}>
                <MetaLine
                  items={[
                    <time key="released" dateTime={course.releaseDate}>
                      Released {formatReleaseMonth(course.releaseDate)}
                    </time>,
                    `${course.duration} of video`,
                    `${course.lectures} lectures`,
                  ]}
                />
                <Typography component="h3" variant="h5">
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: "65ch", lineHeight: 1.8 }}
                >
                  {course.description}
                </Typography>
                <Box
                  component="ul"
                  sx={{ m: 0, pl: 2.5, color: "text.secondary", "& li + li": { mt: 0.75 } }}
                >
                  {course.topics.map((topic) => (
                    <Typography component="li" variant="body2" key={topic}>
                      {topic}
                    </Typography>
                  ))}
                </Box>
                <Button
                  component="a"
                  href={course.url}
                  variant="outlined"
                  aria-label={`View ${course.title} on Udemy`}
                >
                  View course on Udemy
                </Button>
              </Stack>
            </Box>
          ))}
      </RecordList>
      <Typography variant="body2" sx={{ mt: 3 }}>
        <Box
          component="a"
          href={udemyProfileUrl}
          sx={{ color: "text.primary", textUnderlineOffset: "0.25em" }}
        >
          My Udemy instructor profile →
        </Box>
      </Typography>
    </Box>
  );
}
