"use client";

import { useEffect, useState } from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { MetaLine, PageLayout, RecordList } from "@/components/primitives";
import { ArchivePanel } from "@/components/ArchiveSelector";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox, type ImageLightboxProps } from "@/components/ImageLightbox";
import { formatCalendarDate } from "@/lib/dates";
import { useArchiveTab } from "@/lib/useArchiveTab";
import {
  calculateDaysSpent,
  countries,
  getTotalCountriesVisited,
  getTotalDaysSpent,
  getTotalStatesVisited,
} from "./countries";
import USAMapComponent from "./USAMapComponent";
import CountryCarousel from "./CountryCarousel";

const countryIds = countries.map((country) =>
  country.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
);

export default function Travel() {
  const [selectedCountry, setSelectedCountry] = useArchiveTab("country", countryIds);
  const [image, setImage] = useState<ImageLightboxProps["image"]>(null);
  const [today, setToday] = useState<string>();

  useEffect(() => {
    // Read the current UTC calendar day after hydration, not at static-build time.
    const refreshToday = () => setToday(new Date().toISOString().slice(0, 10));
    refreshToday();
    const interval = window.setInterval(refreshToday, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <PageLayout
      section="hobbies"
      title="Travel"
      meta={
        <MetaLine
          items={[
            `${getTotalCountriesVisited()} countries, including home`,
            `${getTotalStatesVisited()} US states${countries.some((country) => country.states?.includes("Washington DC")) ? " + DC" : ""}`,
            `${getTotalDaysSpent()} days abroad`,
          ]}
        />
      }
    >
      <CountryCarousel
        countries={countries}
        countryIds={countryIds}
        value={selectedCountry}
        onChange={setSelectedCountry}
      />
      {countries.map((country, index) => (
        <ArchivePanel
          key={country.name}
          id="travel"
          value={countryIds[index]}
          label={country.name}
          selected={selectedCountry === countryIds[index]}
          tabbed
        >
          <Stack gap={5}>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
                alignItems: "start",
              }}
            >
              <Box>
                <Typography variant="h4" component="h2">
                  {country.name}
                </Typography>
                {(country.isHomeCountry || country.visits.length > 1) && (
                  <Box sx={{ mt: 1.5 }}>
                    <MetaLine
                      items={[
                        country.isHomeCountry
                          ? "Home / Born and raised in Kansas"
                          : `${country.visits.length} ${country.visits.length === 1 ? "visit" : "visits"} / ${calculateDaysSpent(country.visits)} days${country.visits.some((visit) => visit.isOngoing) ? " in completed visits" : ""}`,
                      ]}
                    />
                  </Box>
                )}
                {country.description && !country.isHomeCountry && (
                  <Typography sx={{ mt: 3 }}>{country.description}</Typography>
                )}
              </Box>
              <ButtonBase
                aria-label={`Enlarge ${country.name} image`}
                onClick={() =>
                  setImage({ src: country.coverImage, alt: country.name, title: country.name })
                }
                sx={{ width: "100%", display: "block" }}
              >
                <ContentImage
                  src={country.coverImage}
                  alt={country.name}
                  width={720}
                  height={480}
                />
              </ButtonBase>
            </Box>

            <Box component="section" aria-labelledby={`travel-visits-${index}`}>
              <Typography id={`travel-visits-${index}`} component="h3" variant="h5" sx={{ mb: 2 }}>
                {country.isHomeCountry ? "Home history" : "Visit history"}
              </Typography>
              <RecordList>
                {country.visits.map((visit) => {
                  const days = (visit.isOngoing ? today : visit.endDate)
                    ? calculateDaysSpent([visit], today)
                    : null;
                  return (
                    <Box
                      component="li"
                      key={`${visit.startDate}-${visit.purpose}`}
                      sx={{
                        display: "grid",
                        gap: 1,
                        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
                      }}
                    >
                      <Box>
                        <Typography variant="body2">
                          <time dateTime={visit.startDate}>
                            {formatCalendarDate(visit.startDate)}
                          </time>{" "}
                          to{" "}
                          {visit.isOngoing ? (
                            "Present"
                          ) : visit.endDate ? (
                            <time dateTime={visit.endDate}>
                              {formatCalendarDate(visit.endDate)}
                            </time>
                          ) : (
                            "End date not recorded"
                          )}
                        </Typography>
                        {days !== null && (
                          <Typography variant="caption" color="text.secondary">
                            {days.toLocaleString("en-US")} {days === 1 ? "day" : "days"}
                          </Typography>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {visit.purpose}
                      </Typography>
                    </Box>
                  );
                })}
              </RecordList>
            </Box>

            {country.favoriteSpots.length > 0 && (
              <Box component="section" aria-labelledby={`travel-places-${index}`}>
                <Typography
                  id={`travel-places-${index}`}
                  component="h3"
                  variant="h5"
                  sx={{ mb: 2 }}
                >
                  Favorite places
                </Typography>
                <RecordList
                  sx={{
                    display: "grid",
                    columnGap: 5,
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                  }}
                >
                  {country.favoriteSpots.map((spot) => (
                    <Box component="li" key={spot.name}>
                      {spot.image && (
                        <ButtonBase
                          aria-label={`Enlarge ${spot.name} image`}
                          onClick={() =>
                            setImage({
                              src: spot.image!,
                              alt: spot.name,
                              title: spot.name,
                            })
                          }
                          sx={{ width: "100%", display: "block", mb: 2 }}
                        >
                          <ContentImage src={spot.image} alt={spot.name} />
                        </ButtonBase>
                      )}
                      <Typography variant="h6" component="h4">
                        {spot.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {spot.description}
                      </Typography>
                    </Box>
                  ))}
                </RecordList>
              </Box>
            )}
            {country.states && (
              <Box component="section" aria-labelledby="travel-states">
                <Typography id="travel-states" component="h3" variant="h5">
                  States visited
                </Typography>
                <USAMapComponent visitedStates={country.states} />
              </Box>
            )}
          </Stack>
        </ArchivePanel>
      ))}
      <ImageLightbox open={image !== null} onClose={() => setImage(null)} image={image} />
    </PageLayout>
  );
}
