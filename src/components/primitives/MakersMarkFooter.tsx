"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { siteIdentity, socialLinks } from "@/app/_data/site";

export function MakersMarkFooter() {
  return (
    <Box component="footer" sx={{ mt: { xs: 5, md: 7 }, pb: 4 }}>
      <Container>
        <Box sx={{ borderTop: "1px solid var(--zr-line-strong)", pt: { xs: 3, md: 4 } }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap={3}>
            <Box>
              <Typography component={Link} href="/" variant="h6" sx={{ textDecoration: "none" }}>
                {siteIdentity.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {siteIdentity.location}
              </Typography>
              <Typography
                component="a"
                href={`mailto:${siteIdentity.email}`}
                variant="body2"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 44,
                  mt: 0.5,
                  color: "text.primary",
                }}
              >
                {siteIdentity.email}
              </Typography>
            </Box>
            <Stack alignItems={{ xs: "flex-start", md: "flex-end" }} gap={1}>
              <Box
                component="nav"
                aria-label="Social and contact links"
                sx={{ display: "flex", flexWrap: "wrap", columnGap: 2.5 }}
              >
                {socialLinks.map(({ label, href }) => (
                  <Typography
                    key={href}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    variant="body2"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: 44,
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover, &:focus-visible": {
                        color: "text.primary",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Box>
              <Button
                variant="outlined"
                onClick={() => window.dispatchEvent(new Event("zr:newsletter-open"))}
              >
                Subscribe to the newsletter
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default MakersMarkFooter;
