"use client";

import { useState } from "react";
import { Box, ButtonBase, Stack, Tab, Tabs, Typography } from "@mui/material";
import { PageHeader, SectionFrame } from "@/components/primitives";
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

const countryIds = countries.map((country) =>
  country.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
);

export default function Travel() {
  const [selectedCountry, setSelectedCountry] = useArchiveTab("country", countryIds);
  const [image, setImage] = useState<ImageLightboxProps["image"]>(null);

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="hobbies" spacing="regular">
        <PageHeader
          overline="Personal logs"
          title="Travel"
          subtitle="Places visited, dates, and favorite stops along the way."
          size="md"
          meta={
            <Stack direction="row" flexWrap="wrap" columnGap={3} rowGap={0.5}>
              <Typography color="text.secondary">
                {getTotalCountriesVisited()} countries, including home
              </Typography>
              <Typography color="text.secondary">
                {getTotalStatesVisited()} US states
                {countries.some((country) => country.states?.includes("Washington DC"))
                  ? " + DC"
                  : ""}
              </Typography>
              <Typography color="text.secondary">{getTotalDaysSpent()} days abroad</Typography>
            </Stack>
          }
        />
      </SectionFrame>
      <SectionFrame section="hobbies" spacing="none" sx={{ pb: 8 }}>
        <Tabs
          value={selectedCountry}
          onChange={(_, value: string) => setSelectedCountry(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Countries visited"
          sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 4 }}
        >
          {countries.map((country, index) => (
            <Tab
              key={country.name}
              value={countryIds[index]}
              label={country.name}
              id={`travel-tab-${index}`}
              aria-controls={`travel-panel-${index}`}
            />
          ))}
        </Tabs>
        {countries.map((country, index) => (
          <Box
            key={country.name}
            role="tabpanel"
            id={`travel-panel-${index}`}
            aria-labelledby={`travel-tab-${index}`}
            hidden={selectedCountry !== countryIds[index]}
            tabIndex={0}
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
                  <Typography variant="h3" component="h2">
                    {country.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {country.isHomeCountry
                      ? "Home / Born and raised in Kansas"
                      : `${country.visits.length} ${country.visits.length === 1 ? "visit" : "visits"} / ${calculateDaysSpent(country.visits)} days${country.visits.some((visit) => visit.isOngoing) ? " in completed visits" : ""}`}
                  </Typography>
                  {country.description && (
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
                <Typography
                  id={`travel-visits-${index}`}
                  component="h3"
                  variant="h5"
                  sx={{ mb: 2 }}
                >
                  {country.isHomeCountry ? "Home history" : "Visit history"}
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
                  {country.visits.map((visit) => {
                    const days = calculateDaysSpent([visit]);
                    return (
                      <Box
                        component="li"
                        key={`${visit.startDate}-${visit.purpose}`}
                        sx={{
                          borderTop: "1px solid",
                          borderColor: "divider",
                          py: 2,
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
                          {!visit.isOngoing && visit.endDate && (
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
                </Box>
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
                  <Box
                    component="ul"
                    sx={{
                      listStyle: "none",
                      m: 0,
                      p: 0,
                      display: "grid",
                      columnGap: 5,
                      gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                    }}
                  >
                    {country.favoriteSpots.map((spot) => (
                      <Box
                        component="li"
                        key={spot.name}
                        sx={{ borderTop: "1px solid", borderColor: "divider", py: 2 }}
                      >
                        {spot.image && (
                          <ButtonBase
                            aria-label={`Enlarge ${spot.name} image`}
                            onClick={() =>
                              setImage({
                                src: spot.image!,
                                alt: spot.name,
                                title: spot.name,
                                caption: spot.description,
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
                  </Box>
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
          </Box>
        ))}
      </SectionFrame>
      <ImageLightbox open={image !== null} onClose={() => setImage(null)} image={image} />
    </Box>
  );
}
