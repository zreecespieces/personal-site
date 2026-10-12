"use client";

import { Box, Link, Rating, Stack, Typography } from "@mui/material";
import { PageHeader, SectionFrame } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { formatCalendarDate } from "@/lib/dates";
import { completedBooks, currentlyReading } from "./books";

export default function Reading() {
  const latestEntry = [
    ...currentlyReading.map((book) => book.startedDate),
    ...completedBooks.map((book) => book.completedDate ?? ""),
  ]
    .sort()
    .at(-1);
  return (
    <Box component="main" id="main-content">
      <SectionFrame section="education" spacing="regular">
        <PageHeader
          overline="Personal logs"
          title="Reading"
          subtitle="Books read, books started, and any notes along the way."
          size="md"
          meta={
            <Typography color="text.secondary">{completedBooks.length} completed books</Typography>
          }
        />
      </SectionFrame>

      <SectionFrame section="education" spacing="none" sx={{ pb: 8 }}>
        <Box component="section" aria-labelledby="reading-started" sx={{ mb: 6 }}>
          <Typography id="reading-started" component="h2" variant="h4" sx={{ mb: 1 }}>
            Started
          </Typography>
          {latestEntry && (
            <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>
              Latest dated entry: {formatCalendarDate(latestEntry)}.
            </Typography>
          )}
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {currentlyReading.map((book) => (
              <Box
                component="li"
                key={book.title}
                sx={{
                  display: "flex",
                  gap: { xs: 2, sm: 3 },
                  py: 3,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                {book.coverImage && (
                  <ContentImage
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    width={100}
                    height={150}
                    sx={{
                      width: { xs: 72, sm: 100 },
                      flexShrink: 0,
                      alignSelf: "start",
                      objectFit: "contain",
                    }}
                  />
                )}
                <Stack gap={0.75} sx={{ minWidth: 0 }}>
                  <Typography component="h3" variant="h5">
                    {book.url ? (
                      <Link href={book.url} target="_blank" rel="noreferrer" color="inherit">
                        {book.title}
                      </Link>
                    ) : (
                      book.title
                    )}
                  </Typography>
                  <Typography color="text.secondary">{book.author}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Started{" "}
                    <time dateTime={book.startedDate}>{formatCalendarDate(book.startedDate)}</time>
                  </Typography>
                  {book.progress > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Last noted progress: {book.progress}%.
                    </Typography>
                  )}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="section" aria-labelledby="reading-completed">
          <Typography id="reading-completed" component="h2" variant="h4" sx={{ mb: 3 }}>
            Completed
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
              display: "grid",
              columnGap: 5,
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            }}
          >
            {completedBooks.map((book) => (
              <Box
                component="li"
                key={book.title}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  py: 2.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  minWidth: 0,
                }}
              >
                {book.coverImage && (
                  <ContentImage
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    width={72}
                    height={108}
                    sx={{ width: 64, flexShrink: 0, objectFit: "contain" }}
                  />
                )}
                <Stack gap={0.5} sx={{ minWidth: 0 }}>
                  <Typography component="h3" variant="h6">
                    {book.url ? (
                      <Link href={book.url} target="_blank" rel="noreferrer" color="inherit">
                        {book.title}
                      </Link>
                    ) : (
                      book.title
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  {book.completedDate && (
                    <Typography variant="caption" color="text.secondary">
                      Completed{" "}
                      <time dateTime={book.completedDate}>
                        {formatCalendarDate(book.completedDate)}
                      </time>
                    </Typography>
                  )}
                  {book.rating !== undefined && (
                    <Rating value={book.rating} readOnly size="small" />
                  )}
                  {book.review && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {book.review}
                    </Typography>
                  )}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </SectionFrame>
    </Box>
  );
}
