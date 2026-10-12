"use client";

import { useState } from "react";
import { Box, Button, ButtonBase, Stack, Tab, Tabs, Typography } from "@mui/material";
import { PageHeader, SectionFrame } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox } from "@/components/ImageLightbox";
import { formatCalendarDate } from "@/lib/dates";
import { useArchiveTab } from "@/lib/useArchiveTab";
import { calculateHikeStats, groupHikesByLocation, type Hike } from "./hikes";

const locations = groupHikesByLocation();
const locationIds = locations.map((location) => location.id);
const stats = calculateHikeStats();

export default function Hikes() {
  const [locationId, setLocationId] = useArchiveTab("location", locationIds);
  const [gallery, setGallery] = useState<{ hike: Hike; index: number } | null>(null);

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="hobbies" spacing="regular">
        <PageHeader
          overline="Personal logs"
          title="Hikes"
          subtitle="A trail log with distance, elevation gain, and time on foot."
          size="md"
          meta={
            <Stack direction="row" flexWrap="wrap" columnGap={3} rowGap={0.5}>
              <Typography color="text.secondary">{stats.totalHikes} hikes</Typography>
              <Typography color="text.secondary">{stats.totalDistance.toFixed(1)} miles</Typography>
              <Typography color="text.secondary">
                {stats.totalElevation.toLocaleString("en-US")} ft recorded gain
              </Typography>
            </Stack>
          }
        />
      </SectionFrame>
      <SectionFrame section="hobbies" spacing="none" sx={{ pb: 8 }}>
        <Tabs
          value={locationId || false}
          onChange={(_, value: string) => setLocationId(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Hike locations"
          sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 4 }}
        >
          {locations.map((location) => (
            <Tab
              key={location.id}
              value={location.id}
              label={location.name}
              id={`hike-tab-${location.id}`}
              aria-controls={`hike-panel-${location.id}`}
            />
          ))}
        </Tabs>
        {locations.map((location) => (
          <Box
            key={location.id}
            role="tabpanel"
            id={`hike-panel-${location.id}`}
            aria-labelledby={`hike-tab-${location.id}`}
            hidden={locationId !== location.id}
            tabIndex={0}
          >
            {locationId === location.id && (
              <>
                <Typography variant="h4" component="h2">
                  {location.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                  {location.type === "domestic" ? "United States" : "International"} /{" "}
                  {location.totalHikes} hikes / {location.totalDistance.toFixed(1)} miles /{" "}
                  {location.totalElevation.toLocaleString("en-US")} ft recorded gain
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
                  {location.hikes.map((hike) => (
                    <Box
                      component="li"
                      key={`${hike.name}-${hike.date}`}
                      sx={{
                        py: 3,
                        borderTop: "1px solid",
                        borderColor: "divider",
                        display: "grid",
                        gap: { xs: 2, sm: 3 },
                        gridTemplateColumns: { xs: "1fr", sm: "160px minmax(0, 1fr)" },
                      }}
                    >
                      {hike.images[0] && (
                        <ButtonBase
                          aria-label={`View images of ${hike.name}`}
                          onClick={() => setGallery({ hike, index: 0 })}
                          sx={{ width: "100%", alignSelf: "start", display: "block" }}
                        >
                          <ContentImage
                            src={hike.images[0]}
                            alt={hike.name}
                            width={480}
                            height={320}
                          />
                        </ButtonBase>
                      )}
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary">
                          <time dateTime={hike.date}>{formatCalendarDate(hike.date)}</time>
                        </Typography>
                        <Typography variant="h6" component="h3" sx={{ mt: 0.5 }}>
                          {hike.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {hike.location}
                        </Typography>
                        <Box
                          component="dl"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: {
                              xs: "repeat(2, minmax(0, 1fr))",
                              md: "repeat(4, minmax(0, 1fr))",
                            },
                            gap: 2,
                            mb: 0,
                            "& dt": { typography: "caption", color: "text.secondary" },
                            "& dd": { m: 0, typography: "body2" },
                          }}
                        >
                          <Box>
                            <Typography component="dt">Distance</Typography>
                            <Typography component="dd">{hike.distance} mi</Typography>
                          </Box>
                          {hike.elevation !== undefined && (
                            <Box>
                              <Typography component="dt">Elevation gain</Typography>
                              <Typography component="dd">
                                {hike.elevation.toLocaleString("en-US")} ft
                              </Typography>
                            </Box>
                          )}
                          <Box>
                            <Typography component="dt">Difficulty</Typography>
                            <Typography component="dd">{hike.difficulty}</Typography>
                          </Box>
                          {hike.time && (
                            <Box>
                              <Typography component="dt">Duration</Typography>
                              <Typography component="dd">
                                {hike.time[0] > 0 ? `${hike.time[0]} hr ` : ""}
                                {hike.time[1]} min
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        {hike.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            {hike.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        ))}
      </SectionFrame>
      <ImageLightbox
        open={gallery !== null}
        onClose={() => setGallery(null)}
        image={
          gallery
            ? {
                src: gallery.hike.images[gallery.index],
                alt: gallery.hike.name,
                title: gallery.hike.name,
                caption: `${gallery.hike.location} / ${formatCalendarDate(gallery.hike.date)}${gallery.hike.description ? ` / ${gallery.hike.description}` : ""}`,
              }
            : null
        }
      >
        {gallery && gallery.hike.images.length > 1 && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            flexWrap="wrap"
          >
            <Button
              onClick={() =>
                setGallery(
                  (current) =>
                    current && {
                      ...current,
                      index:
                        (current.index - 1 + current.hike.images.length) %
                        current.hike.images.length,
                    }
                )
              }
            >
              Previous image
            </Button>
            <Typography variant="body2" aria-live="polite">
              {gallery.index + 1} / {gallery.hike.images.length}
            </Typography>
            <Button
              onClick={() =>
                setGallery(
                  (current) =>
                    current && {
                      ...current,
                      index: (current.index + 1) % current.hike.images.length,
                    }
                )
              }
            >
              Next image
            </Button>
          </Stack>
        )}
      </ImageLightbox>
    </Box>
  );
}
