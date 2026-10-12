"use client";

import { useState } from "react";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { PageHeader, SectionFrame } from "@/components/primitives";
import { ContentImage } from "@/components/ContentImage";
import { ImageLightbox } from "@/components/ImageLightbox";
import { formatCalendarDate } from "@/lib/dates";
import { type ArtPiece, pics } from "./pics";

export default function Art() {
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);

  return (
    <Box component="main" id="main-content">
      <SectionFrame section="hobbies" spacing="regular">
        <PageHeader
          overline="Personal logs"
          title="AI art"
          subtitle="Generated images, with the tools and dates behind them."
          size="md"
        />
      </SectionFrame>
      <SectionFrame section="hobbies" spacing="none" sx={{ pb: 8 }}>
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
                  <Stack gap={0.5} sx={{ mt: 3 }}>
                    {pic.dateCreated && (
                      <Typography variant="body2" color="text.secondary">
                        Created{" "}
                        <time dateTime={pic.dateCreated}>
                          {formatCalendarDate(pic.dateCreated)}
                        </time>
                      </Typography>
                    )}
                    {pic.model && (
                      <Typography variant="body2" color="text.secondary">
                        Tool: {pic.model}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </SectionFrame>
      <ImageLightbox
        open={selectedPiece !== null}
        onClose={() => setSelectedPiece(null)}
        image={
          selectedPiece
            ? {
                src: selectedPiece.src,
                alt: selectedPiece.title,
                title: selectedPiece.title,
                caption: selectedPiece.description,
              }
            : null
        }
      >
        {selectedPiece && (
          <Stack gap={0.5}>
            {selectedPiece.dateCreated && (
              <Typography variant="body2" color="text.secondary">
                Created {formatCalendarDate(selectedPiece.dateCreated)}
              </Typography>
            )}
            {selectedPiece.model && (
              <Typography variant="body2" color="text.secondary">
                Tool: {selectedPiece.model}
              </Typography>
            )}
          </Stack>
        )}
      </ImageLightbox>
    </Box>
  );
}
