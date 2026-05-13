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
 * (resolved via `resolveHeroVariant`).
 *
 * The floating `HeroVariantSwitcher` is currently always-on so the
 * options can be compared on the live site during the iteration phase.
 * Pass `?heroNav=0` to hide it. Once a hero is canonized, drop the
 * switcher mount and the resolveHeroVariant query-param handling.
 */
export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const heroVariant = resolveHeroVariant(params.hero);
  // Default on; explicit `?heroNav=0` hides it.
  const showVariantSwitcher = params.heroNav !== "0";

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
