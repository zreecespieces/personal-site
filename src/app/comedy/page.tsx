"use client";

import { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { MetaLine, PageLayout, RecordList } from "@/components/primitives";
import { ArchivePanel } from "@/components/ArchiveSelector";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox, type ImageLightboxProps } from "@/components/ImageLightbox";
import { formatCalendarDate } from "@/lib/dates";
import { useArchiveTab } from "@/lib/useArchiveTab";
import {
  getComediansByLatestSeen,
  getMostRecentlySeenComedian,
  getTotalComediansSeen,
  getTotalShows,
  formatShowTime,
} from "./comedians";
import ComedianCarousel from "./ComedianCarousel";

const comedians = getComediansByLatestSeen();
const comedianId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const comedianIds = comedians.map((comedian) => comedianId(comedian.name));
const defaultComedian = comedianId(getMostRecentlySeenComedian()?.name ?? "");

export default function Comedy() {
  const [selectedComedian, setSelectedComedian] = useArchiveTab(
    "comedian",
    comedianIds,
    defaultComedian
  );
  const [image, setImage] = useState<ImageLightboxProps["image"]>(null);

  return (
    <PageLayout
      section="hobbies"
      title="Comedy"
      meta={
        <MetaLine
          items={[
            `${getTotalShows()} shows`,
            `${getTotalComediansSeen()} comedians and live series`,
          ]}
        />
      }
    >
      <ComedianCarousel
        comedians={comedians}
        comedianIds={comedianIds}
        value={selectedComedian}
        onChange={setSelectedComedian}
      />
      {comedians.map((comedian, index) => (
        <ArchivePanel
          key={comedian.name}
          id="comedy"
          value={comedianIds[index]}
          label={comedian.name}
          selected={selectedComedian === comedianIds[index]}
          tabbed
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
              <Typography component="h2" variant="h4">
                {comedian.name}
              </Typography>
              {comedian.shows.length > 1 && (
                <Box sx={{ mt: 1.5, mb: 3 }}>
                  <MetaLine
                    items={[
                      `${comedian.shows.length} ${comedian.shows.length === 1 ? "show" : "shows"}`,
                    ]}
                  />
                </Box>
              )}
              <RecordList sx={{ mt: comedian.shows.length > 1 ? 0 : 3 }}>
                {[...comedian.shows]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((show) => (
                    <Box component="li" key={`${show.date}-${show.venue}`}>
                      <MetaLine
                        items={[
                          <time key="date" dateTime={show.date}>
                            {formatCalendarDate(show.date)}
                          </time>,
                          ...(show.startTime
                            ? [
                                <time key="start-time" dateTime={show.startTime}>
                                  {formatShowTime(show.startTime)}
                                </time>,
                              ]
                            : []),
                        ]}
                      />
                      <Typography component="h3" variant="h6" sx={{ mt: 1 }}>
                        {show.tourName ?? show.venue}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {show.tourName ? `${show.venue} / ` : ""}
                        {show.address ? `${show.address} / ` : ""}
                        {show.city}
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
                              caption: `${formatCalendarDate(show.date)} / ${show.venue}, ${show.city}`,
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
              </RecordList>
            </Box>
          </Box>
        </ArchivePanel>
      ))}
      <ImageLightbox open={image !== null} onClose={() => setImage(null)} image={image} />
    </PageLayout>
  );
}
