"use client";

import { useState } from "react";
import { Box, Button, ButtonBase, Link, Stack, Typography } from "@mui/material";
import { MetaLine, PageLayout, RecordList } from "@/components/primitives";
import { ArchivePanel, ArchiveSelector } from "@/components/ArchiveSelector";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox } from "@/components/ImageLightbox";
import { formatCalendarDate } from "@/lib/dates";
import { useArchiveTab } from "@/lib/useArchiveTab";
import { calculateHikeStats, formatActivityTime, groupHikesByLocation, type Hike } from "./hikes";

const locations = groupHikesByLocation();
const locationIds = locations.map((location) => location.id);
const stats = calculateHikeStats();

export default function Hikes() {
  const [locationId, setLocationId] = useArchiveTab("location", locationIds);
  const [gallery, setGallery] = useState<{ hike: Hike; index: number } | null>(null);

  return (
    <PageLayout
      section="hobbies"
      title="Hikes"
      subtitle="A trail log, with recorded distances and times."
      meta={
        <MetaLine
          items={[
            `${stats.totalHikes} hikes`,
            `${stats.totalDistance.toFixed(1)} miles`,
            `${stats.totalElevation.toLocaleString("en-US")} ft recorded gain`,
          ]}
        />
      }
    >
      <ArchiveSelector
        id="hike"
        label="Hike locations"
        value={locationId}
        onChange={setLocationId}
        options={locations.map((location) => ({ value: location.id, label: location.name }))}
      />
      {locations.map((location) => (
        <ArchivePanel
          key={location.id}
          id="hike"
          value={location.id}
          label={location.name}
          selected={locationId === location.id}
          tabbed={locations.length <= 7}
        >
          {locationId === location.id && (
            <>
              <Typography variant="h4" component="h2">
                {location.name}
              </Typography>
              <Box sx={{ mt: 1.5, mb: 3 }}>
                <MetaLine
                  items={[
                    location.type === "domestic" ? "United States" : "International",
                    `${location.totalHikes} hikes in this location`,
                    `${location.totalDistance.toFixed(1)} miles`,
                  ]}
                />
              </Box>
              <RecordList>
                {location.hikes.map((hike) => (
                  <Box
                    component="li"
                    key={`${hike.name}-${hike.date}`}
                    sx={{
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
                          alt={hike.imageCredit ? `Trail photo: ${hike.name}` : hike.name}
                          width={480}
                          height={320}
                        />
                      </ButtonBase>
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <MetaLine
                        items={[
                          <time key="date" dateTime={hike.date}>
                            {formatCalendarDate(hike.date)}
                          </time>,
                        ]}
                      />
                      <Typography variant="h6" component="h3" sx={{ mt: 0.5 }}>
                        {hike.trailUrl ? (
                          <Link
                            href={hike.trailUrl}
                            target="_blank"
                            rel="noreferrer"
                            color="inherit"
                          >
                            {hike.name}
                          </Link>
                        ) : (
                          hike.name
                        )}
                      </Typography>
                      {hike.location !== location.name && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {hike.location.endsWith(`, ${location.name}`)
                            ? hike.location.slice(0, -location.name.length - 2)
                            : hike.location}
                        </Typography>
                      )}
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
                        {hike.activity && (
                          <>
                            <Box>
                              <Typography component="dt">Moving time</Typography>
                              <Typography component="dd">
                                {formatActivityTime(hike.activity.movingTime)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography component="dt">Total time</Typography>
                              <Typography component="dd">
                                {formatActivityTime(hike.activity.totalTime)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography component="dt">Average pace</Typography>
                              <Typography component="dd">
                                {hike.activity.averagePace[0]}:
                                {String(hike.activity.averagePace[1]).padStart(2, "0")} / mi
                              </Typography>
                            </Box>
                            <Box>
                              <Typography component="dt">Estimated calories</Typography>
                              <Typography component="dd">
                                {hike.activity.estimatedCalories.toLocaleString("en-US")} kcal
                              </Typography>
                            </Box>
                            {hike.activity.rating !== undefined && (
                              <Box>
                                <Typography component="dt">My rating</Typography>
                                <Typography component="dd">{hike.activity.rating} / 5</Typography>
                              </Box>
                            )}
                          </>
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
              </RecordList>
            </>
          )}
        </ArchivePanel>
      ))}
      <ImageLightbox
        open={gallery !== null}
        onClose={() => setGallery(null)}
        image={
          gallery
            ? {
                src: gallery.hike.images[gallery.index],
                alt: gallery.hike.name,
                title: gallery.hike.name,
                caption: `${gallery.hike.location} / ${formatCalendarDate(gallery.hike.date)}`,
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
    </PageLayout>
  );
}
