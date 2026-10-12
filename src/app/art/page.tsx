"use client";

import { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { MetaLine, PageLayout } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox } from "@/components/ImageLightbox";
import { formatCalendarDate } from "@/lib/dates";
import { type ArtPiece, pics } from "./pics";

export default function Art() {
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  return (
    <PageLayout section="hobbies" title="AI art">
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gap: 6,
          gridTemplateColumns:
            pics.length === 1 ? "1fr" : { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {pics.map((pic) => (
          <Box component="li" key={pic.src}>
            <Box
              component="figure"
              sx={{
                m: 0,
                display: "grid",
                gap: { xs: 3, md: 5 },
                gridTemplateColumns:
                  pics.length === 1 ? { xs: "1fr", md: "minmax(0, 2fr) minmax(0, 1fr)" } : "1fr",
                alignItems: "start",
              }}
            >
              <ButtonBase
                aria-label={`Enlarge ${pic.title}`}
                onClick={() => setSelectedPiece(pic)}
                sx={{ width: "100%", display: "block" }}
              >
                <ContentImage
                  src={pic.src}
                  alt={pic.title}
                  width={800}
                  height={1000}
                  priority={pics.length === 1}
                  sx={{ objectFit: "contain", maxHeight: "75vh" }}
                />
              </ButtonBase>
              <Box
                component="figcaption"
                sx={{ pt: 2, borderTop: "1px solid", borderColor: "divider" }}
              >
                <Typography variant="h4" component="h2">
                  {pic.title}
                </Typography>
                {pic.description && <Typography sx={{ mt: 2 }}>{pic.description}</Typography>}
                <Box sx={{ mt: 2.5 }}>
                  <MetaLine
                    items={[
                      pic.dateCreated ? (
                        <time key="date" dateTime={pic.dateCreated}>
                          Created {formatCalendarDate(pic.dateCreated)}
                        </time>
                      ) : null,
                      pic.model ? `Tool: ${pic.model}` : null,
                    ]}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <ImageLightbox
        open={selectedPiece !== null}
        onClose={() => setSelectedPiece(null)}
        image={
          selectedPiece
            ? {
                src: selectedPiece.src,
                alt: selectedPiece.title,
                title: selectedPiece.title,
                caption: [
                  selectedPiece.model,
                  selectedPiece.dateCreated ? formatCalendarDate(selectedPiece.dateCreated) : null,
                ]
                  .filter(Boolean)
                  .join(" / "),
              }
            : null
        }
      />
    </PageLayout>
  );
}
