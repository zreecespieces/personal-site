import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import { ArtifactCard, Glyph, PageLayout } from "@/components/primitives";
import { hobbyLinks } from "@/app/_data/hobbies";

const title = "Hobbies | Zachary Reece";
const description =
  "Hikes, travel, grappling, music festivals, comedy, and AI art. Life away from work.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hobbies" },
  openGraph: {
    title,
    description,
    url: "/hobbies",
    siteName: "Zachary Reece",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zachary Reece" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@zreecespieces",
    images: ["/opengraph-image"],
  },
};

export default function HobbiesPage() {
  return (
    <PageLayout section="hobbies" title="Hobbies" subtitle="Life away from work.">
      <Box
        component="ul"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 2, md: 3 },
          listStyle: "none",
          p: 0,
          m: 0,
        }}
      >
        {hobbyLinks.map((hobby) => (
          <Box component="li" key={hobby.url} sx={{ minWidth: 0 }}>
            <ArtifactCard
              href={hobby.url}
              ariaLabel={hobby.title}
              target={hobby.external ? "_blank" : undefined}
              rel={hobby.external ? "noreferrer" : undefined}
              padding="loose"
              sx={{
                display: "grid",
                gridTemplateColumns: "36px minmax(0, 1fr) auto",
                gap: { xs: 2, md: 3 },
                height: "100%",
                alignItems: "start",
              }}
            >
              <Glyph
                name={hobby.icon}
                size={32}
                sx={{ color: "var(--zr-section-accent)", mt: 0.25 }}
              />
              <Box>
                <Typography component="h2" variant="h5">
                  {hobby.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {hobby.description}
                </Typography>
              </Box>
              <Typography
                component="span"
                aria-hidden="true"
                sx={{ color: "var(--zr-section-accent)", alignSelf: "center", fontSize: "1.5rem" }}
              >
                →
              </Typography>
            </ArtifactCard>
          </Box>
        ))}
      </Box>
    </PageLayout>
  );
}
