"use client";

import { useState } from "react";
import { Box, ButtonBase, Stack, Tab, Tabs, Typography } from "@mui/material";
import { PageHeader, SectionFrame } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox, type ImageLightboxProps } from "@/components/ImageLightbox";
import { formatCalendarDate } from "@/lib/dates";
import { useArchiveTab } from "@/lib/useArchiveTab";
import { getComediansByEarliestSeen, getTotalComediansSeen, getTotalShows } from "./comedians";

const comedians = getComediansByEarliestSeen();
const comedianIds = comedians.map((comedian) =>
  comedian.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
);

export default function Comedy() {
  const [selectedComedian, setSelectedComedian] = useArchiveTab("comedian", comedianIds);
  const [image, setImage] = useState<ImageLightboxProps["image"]>(null);

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="hobbies" spacing="regular">
        <PageHeader
          overline="Personal logs"
          title="Comedy"
          subtitle="Live stand-up, from the first show onward."
          size="md"
          meta={
            <Stack direction="row" flexWrap="wrap" columnGap={3} rowGap={0.5}>
              <Typography color="text.secondary">{getTotalShows()} shows</Typography>
              <Typography color="text.secondary">
                {getTotalComediansSeen()} comedians and live series
              </Typography>
            </Stack>
          }
        />
      </SectionFrame>
      <SectionFrame section="hobbies" spacing="none" sx={{ pb: 8 }}>
        <Tabs
          value={selectedComedian}
          onChange={(_, value: string) => setSelectedComedian(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Comedians and live series"
          sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 4 }}
        >
          {comedians.map((comedian, index) => (
            <Tab
              key={comedian.name}
              value={comedianIds[index]}
              label={comedian.name}
              id={`comedy-tab-${index}`}
              aria-controls={`comedy-panel-${index}`}
            />
          ))}
        </Tabs>
        {comedians.map((comedian, index) => (
          <Box
            key={comedian.name}
            role="tabpanel"
            id={`comedy-panel-${index}`}
            aria-labelledby={`comedy-tab-${index}`}
            hidden={selectedComedian !== comedianIds[index]}
            tabIndex={0}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "220px minmax(0, 1fr)" },
                gap: { xs: 3, md: 5 },
                alignItems: "start",
              }}
            >
              <ButtonBase
                aria-label={`Enlarge ${comedian.name} portrait`}
                onClick={() =>
                  setImage({ src: comedian.image, alt: comedian.name, title: comedian.name })
                }
                sx={{ display: "block", width: { xs: 160, md: "100%" }, maxWidth: "100%" }}
              >
                <ContentImage src={comedian.image} alt={comedian.name} width={440} height={550} />
              </ButtonBase>
              <Box sx={{ minWidth: 0 }}>
                <Typography component="h2" variant="h3">
                  {comedian.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                  {comedian.shows.length} {comedian.shows.length === 1 ? "show" : "shows"}
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {[...comedian.shows]
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((show) => (
                      <Box
                        component="li"
                        key={`${show.date}-${show.venue}`}
                        sx={{ py: 3, borderTop: "1px solid", borderColor: "divider" }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          <time dateTime={show.date}>{formatCalendarDate(show.date)}</time>
                        </Typography>
                        <Typography component="h3" variant="h6" sx={{ mt: 1 }}>
                          {show.tourName ?? comedian.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {show.venue} / {show.city}
                        </Typography>
                        {show.notes && (
                          <Typography variant="body2" sx={{ mt: 2, maxWidth: 680 }}>
                            {show.notes}
                          </Typography>
                        )}
                        {show.ticketImage && (
                          <ButtonBase
                            aria-label={`View ticket for ${comedian.name} on ${formatCalendarDate(show.date)}`}
                            onClick={() =>
                              setImage({
                                src: show.ticketImage!,
                                alt: `Ticket for ${comedian.name} at ${show.venue}, ${formatCalendarDate(show.date)}`,
                                title: show.tourName ?? comedian.name,
                                caption: `${formatCalendarDate(show.date)} / ${show.venue}, ${show.city}${show.notes ? ` / ${show.notes}` : ""}`,
                              })
                            }
                            sx={{ display: "block", width: 220, maxWidth: "100%", mt: 2 }}
                          >
                            <ContentImage
                              src={show.ticketImage}
                              alt={`Ticket for ${comedian.name} at ${show.venue}`}
                              width={440}
                              height={240}
                              sx={{ objectFit: "contain" }}
                            />
                          </ButtonBase>
                        )}
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </SectionFrame>
      <ImageLightbox open={image !== null} onClose={() => setImage(null)} image={image} />
    </Box>
  );
}
