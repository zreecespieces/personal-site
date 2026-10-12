import React from "react";
import { Box } from "@mui/material";
import { SectionFrame } from "@/components/primitives";
import Hero from "./_components/home/Hero";
import IndexSections from "./_components/home/IndexSections";
import SelectedWork from "./_components/home/SelectedWork";
import BeyondWork from "./_components/home/BeyondWork";
import { getAllPosts } from "@/lib/blog";

/**
 * The canonical home page.
 */
export default function Home() {
  return (
    <Box component="main" id="main-content">
      <SectionFrame spacing="none">
        <Hero />
      </SectionFrame>

      <SectionFrame spacing="none">
        <SelectedWork post={getAllPosts()[0]} />
        <BeyondWork />
        <IndexSections />
      </SectionFrame>
    </Box>
  );
}
