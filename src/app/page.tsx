import React from "react";
import { Box, Stack } from "@mui/material";
import { SectionFrame } from "@/components/primitives";
import Hero from "./_components/home/Hero";
import IndexSections from "./_components/home/IndexSections";
import LatestWriting from "./_components/home/LatestWriting";
import HomeProjects from "./_components/home/HomeProjects";
import { getAllPosts } from "@/lib/blog";

/**
 * The canonical home page.
 */
export default function Home() {
  return (
    <Box component="main" id="main-content" tabIndex={-1}>
      <SectionFrame spacing="none">
        <Hero />
      </SectionFrame>

      <SectionFrame spacing="none">
        <Stack gap={{ xs: 5, md: 7 }}>
          <HomeProjects />
          <LatestWriting post={getAllPosts()[0]} />
        </Stack>
        <IndexSections />
      </SectionFrame>
    </Box>
  );
}
