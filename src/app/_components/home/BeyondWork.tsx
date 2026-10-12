"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Overline } from "@/components/primitives";

export default function BeyondWork() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1fr) minmax(0, 1.2fr)" },
        gap: { xs: 3, md: 8 },
        borderTop: "1px solid var(--zr-line-muted)",
        py: { xs: 5, md: 7 },
      }}
    >
      <Box>
        <Overline accent="#aab68e">Away from the screen</Overline>
        <Typography component="h2" variant="h3" sx={{ mt: 2, maxWidth: "15ch" }}>
          There is more to a life than the work.
        </Typography>
      </Box>
      <Box sx={{ pt: { md: 4 } }}>
        <Typography
          sx={{
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            lineHeight: 1.8,
            color: "text.secondary",
            "& a": { color: "text.primary", textDecorationColor: "#929b73" },
          }}
        >
          You can also find me on the{" "}
          <Box component="a" href="https://smoothcomp.com/en/profile/979762">
            judo and jiu-jitsu mats
          </Box>
          , out on a{" "}
          <Box component={Link} href="/hikes">
            trail
          </Box>
          , deep in a{" "}
          <Box component={Link} href="/reading">
            book
          </Box>
          , or somewhere in a{" "}
          <Box component={Link} href="/music-festivals">
            festival crowd
          </Box>
          .
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          The rest of this site keeps a record of those things, too.
        </Typography>
      </Box>
    </Box>
  );
}
