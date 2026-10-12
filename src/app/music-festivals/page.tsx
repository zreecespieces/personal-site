"use client";

import { useState } from "react";
import { Box, ButtonBase, Link, Typography } from "@mui/material";
import { MetaLine, PageLayout } from "@/components/primitives";
import { ArchivePanel, ArchiveSelector } from "@/components/ArchiveSelector";
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
    <PageLayout
      section="hobbies"
      title="Music festivals"
      meta={<MetaLine items={[`${festivals.length} entries across ${years.length} years`]} />}
    >
      <ArchiveSelector
        id="festival"
        label="Festival years"
        value={selectedYear}
        onChange={setSelectedYear}
        options={yearTabs.map((year) => ({
          value: year,
          label: year === "all" ? "All years" : year,
        }))}
      />
      {yearTabs.map((tab) => (
        <ArchivePanel
          key={tab}
          id="festival"
          value={tab}
          label={tab === "all" ? "All years" : tab}
          selected={selectedYear === tab}
          tabbed={yearTabs.length <= 7}
        >
          {selectedYear === tab &&
            (tab === "all" ? years : [tab]).map((year) => (
              <Box component="section" key={year} aria-label={`${year} festivals`} sx={{ mb: 6 }}>
                {tab === "all" && (
                  <Typography
                    id={`festival-year-${year}`}
                    component="h2"
                    variant="h4"
                    sx={{ mb: 3 }}
                  >
                    {year}
                  </Typography>
                )}
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
                          aria-label={`Enlarge ${festival.name} ${year} image`}
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
                        <Typography component={tab === "all" ? "h3" : "h2"} variant="h6">
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
        </ArchivePanel>
      ))}
      <ImageLightbox
        open={selectedFestival !== null}
        onClose={() => setSelectedFestival(null)}
        image={
          selectedFestival
            ? {
                src: selectedFestival.image,
                alt: `${selectedFestival.name} ${selectedFestival.year}`,
                title: `${selectedFestival.name} ${selectedFestival.year}`,
                caption: selectedFestival.location,
              }
            : null
        }
      />
    </PageLayout>
  );
}
