"use client";

import { useState } from "react";
import { Box, ButtonBase, Link, Stack, Tab, Tabs, Typography } from "@mui/material";
import { PageHeader, SectionFrame } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox } from "@/components/ImageLightbox";
import { useArchiveTab } from "@/lib/useArchiveTab";
import { type Festival, festivals } from "./festivals";

const years = [...new Set(festivals.map((festival) => festival.year))].sort(
  (a, b) => Number(b) - Number(a)
);
const yearTabs = ["all", ...years];

export default function MusicFestivals() {
  const [selectedYear, setSelectedYear] = useArchiveTab("year", yearTabs);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="hobbies" spacing="regular">
        <PageHeader
          overline="Personal logs"
          title="Music festivals"
          subtitle="Festivals attended, year by year, with notes from the weekends."
          size="md"
          meta={
            <Typography color="text.secondary">
              {festivals.length} entries across {years.length} years
            </Typography>
          }
        />
      </SectionFrame>
      <SectionFrame section="hobbies" spacing="none" sx={{ pb: 8 }}>
        <Tabs
          value={selectedYear}
          onChange={(_, value: string) => setSelectedYear(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Festival years"
          sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 4 }}
        >
          {yearTabs.map((year) => (
            <Tab
              key={year}
              value={year}
              label={year === "all" ? "All years" : year}
              id={`festival-tab-${year}`}
              aria-controls={`festival-panel-${year}`}
            />
          ))}
        </Tabs>
        {yearTabs.map((tab) => (
          <Box
            key={tab}
            role="tabpanel"
            id={`festival-panel-${tab}`}
            aria-labelledby={`festival-tab-${tab}`}
            hidden={selectedYear !== tab}
            tabIndex={0}
          >
            {selectedYear === tab &&
              (tab === "all" ? years : [tab]).map((year) => (
                <Box
                  component="section"
                  key={year}
                  aria-labelledby={`festival-year-${year}`}
                  sx={{ mb: 6 }}
                >
                  <Typography
                    id={`festival-year-${year}`}
                    component="h2"
                    variant="h4"
                    sx={{ mb: 3 }}
                  >
                    {year}
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      listStyle: "none",
                      m: 0,
                      p: 0,
                      display: "grid",
                      gap: { xs: 4, md: 5 },
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                        lg: "repeat(3, minmax(0, 1fr))",
                      },
                    }}
                  >
                    {festivals
                      .filter((festival) => festival.year === year)
                      .map((festival) => (
                        <Box component="li" key={`${festival.name}-${year}`} sx={{ minWidth: 0 }}>
                          <ButtonBase
                            aria-label={`View ${festival.name} ${year} image and details`}
                            onClick={() => setSelectedFestival(festival)}
                            sx={{ width: "100%", display: "block", mb: 2 }}
                          >
                            <ContentImage
                              src={festival.image}
                              alt={`${festival.name} ${year}`}
                              width={600}
                              height={400}
                            />
                          </ButtonBase>
                          <Typography component="h3" variant="h6">
                            {festival.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {festival.location}
                          </Typography>
                          {festival.description && (
                            <Typography variant="body2" sx={{ mt: 1.5 }}>
                              {festival.description}
                            </Typography>
                          )}
                          {festival.url && (
                            <Link
                              href={festival.url}
                              target="_blank"
                              rel="noreferrer"
                              variant="body2"
                              aria-label={`${festival.name} official site`}
                              sx={{ display: "inline-block", mt: 1.5 }}
                            >
                              Official site
                            </Link>
                          )}
                        </Box>
                      ))}
                  </Box>
                </Box>
              ))}
          </Box>
        ))}
      </SectionFrame>
      <ImageLightbox
        open={selectedFestival !== null}
        onClose={() => setSelectedFestival(null)}
        image={
          selectedFestival
            ? {
                src: selectedFestival.image,
                alt: `${selectedFestival.name} ${selectedFestival.year}`,
                title: `${selectedFestival.name} ${selectedFestival.year}`,
                caption: selectedFestival.description,
              }
            : null
        }
      >
        {selectedFestival && (
          <Stack gap={1.5}>
            <Typography color="text.secondary">{selectedFestival.location}</Typography>
            {selectedFestival.url && (
              <Link href={selectedFestival.url} target="_blank" rel="noreferrer">
                Visit {selectedFestival.name}&apos;s official site
              </Link>
            )}
          </Stack>
        )}
      </ImageLightbox>
    </Box>
  );
}
