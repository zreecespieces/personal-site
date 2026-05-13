import React from "react";
import { Box } from "@mui/material";
import { MakersMarkFooter, SectionFrame } from "@/components/primitives";
import { resolveHeroVariant } from "@/components/primitives";
import Hero from "./_components/home/Hero";
import IndexSections from "./_components/home/IndexSections";

interface HomeProps {
  searchParams: Promise<{ hero?: string; heroNav?: string }>;
}

/**
 * The canonical home page.
 *
 * Accepts `?hero=1..5` to switch between the five hero diagram options
 * (resolved via `resolveHeroVariant`) and `?heroNav=1` to surface the
 * dev-only variant switcher in the corner — useful during the iteration
 * phase per `docs/redesign_roadmap.md` §1.4.
 */
export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const heroVariant = resolveHeroVariant(params.hero);
  const showVariantSwitcher = params.heroNav === "1";

  return (
    <Box component="main">
      <SectionFrame spacing="none">
        <Hero heroVariant={heroVariant} showVariantSwitcher={showVariantSwitcher} />
      </SectionFrame>

      <SectionFrame spacing="none">
        <IndexSections />
      </SectionFrame>

      <MakersMarkFooter />
    </Box>
  );
}
