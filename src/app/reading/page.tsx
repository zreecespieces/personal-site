"use client";

import { Box, Link, Rating, Stack, Typography } from "@mui/material";
import { MetaLine, PageLayout, RecordList } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { formatCalendarDate } from "@/lib/dates";
import { completedBooks, currentlyReading } from "./books";

export default function Reading() {
  return (
    <PageLayout
      section="education"
      title="Reading"
      meta={
        <MetaLine
          items={[`${currentlyReading.length} started`, `${completedBooks.length} completed`]}
        />
      }
    >
      <Stack
        sx={(theme) => ({
          gap: {
            xs: `${theme.zr.layout.sectionGap.mobile}px`,
            md: `${theme.zr.layout.sectionGap.desktop}px`,
          },
        })}
      >
        <Box component="section" aria-labelledby="reading-started">
          <Typography id="reading-started" component="h2" variant="h4" sx={{ mb: 1 }}>
            Started
          </Typography>
          <RecordList>
            {currentlyReading.map((book) => (
              <Box
                component="li"
                key={book.title}
                sx={{
                  display: "flex",
                  gap: { xs: 2, sm: 3 },
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
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <MetaLine
                    items={[
                      <time key="started" dateTime={book.startedDate}>
                        Started {formatCalendarDate(book.startedDate)}
                      </time>,
                      book.progress > 0 ? `Last noted: ${book.progress}%` : null,
                    ]}
                  />
                </Stack>
              </Box>
            ))}
          </RecordList>
        </Box>

        <Box component="section" aria-labelledby="reading-completed">
          <Typography id="reading-completed" component="h2" variant="h4" sx={{ mb: 3 }}>
            Completed
          </Typography>
          <RecordList
            sx={{
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
                  <Typography component="h3" variant="h5">
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
                    <MetaLine
                      items={[
                        <time key="completed" dateTime={book.completedDate}>
                          Completed {formatCalendarDate(book.completedDate)}
                        </time>,
                      ]}
                    />
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
          </RecordList>
        </Box>
      </Stack>
    </PageLayout>
  );
}
