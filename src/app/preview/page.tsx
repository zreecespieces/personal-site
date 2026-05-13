"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  ArchiveAccordion,
  ArtifactCard,
  ContourField,
  Crosshair,
  Glyph,
  HERO_VARIANTS,
  HERO_VARIANT_LABELS,
  HeroDiagram,
  Honeycomb,
  IndexRow,
  LabelChip,
  Overline,
  PageHeader,
  PortraitFrame,
  SacredGeometry,
  SectionFrame,
  Suminagashi,
  type SacredGeometryShape,
} from "@/components/primitives";

/**
 * Dev preview page (`/_preview`) — renders every primitive and every
 * hero option for visual QA. Not linked from anywhere in the site; reach
 * it via the URL.
 */
export default function PreviewPage() {
  return (
    <Box sx={{ minHeight: "100vh", pb: 12 }}>
      <SectionFrame spacing="loose">
        <PageHeader
          overline="Preview"
          index="00"
          title="Primitive Preview"
          subtitle="Every redesign primitive rendered on one page so we can iterate without rebuilding."
          withRule
          withMark
        />
      </SectionFrame>

      <SectionFrame spacing="regular" section="professional">
        <Overline index="01">Section Frame · Professional</Overline>
        <Stack gap={3} sx={{ mt: 3 }}>
          <Typography variant="h3">Heading inside a Professional section</Typography>
          <Typography variant="body1">
            The section accent flows down via the <code>--zr-section-accent</code> CSS variable.
          </Typography>
        </Stack>
      </SectionFrame>

      <SectionFrame spacing="regular" section="education">
        <Overline index="02">Section Frame · Education</Overline>
        <Typography variant="h3" sx={{ mt: 1 }}>
          Different accent inherited automatically
        </Typography>
      </SectionFrame>

      <SectionFrame spacing="regular" section="hobbies">
        <Overline index="03">Section Frame · Hobbies</Overline>
        <Typography variant="h3" sx={{ mt: 1 }}>
          Moss accent — disciplines family
        </Typography>
      </SectionFrame>

      <SectionFrame spacing="regular">
        <PageHeader overline="Cards" index="04" title="Artifact Cards" size="md" />
        <Stack direction={{ xs: "column", md: "row" }} gap={2} sx={{ mt: 4 }}>
          <ArtifactCard href="#" sx={{ maxWidth: 320 }}>
            <Typography variant="h5">Project title</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              A short one-sentence description that establishes context without bloating the card.
            </Typography>
          </ArtifactCard>
          <ArtifactCard sx={{ maxWidth: 320 }}>
            <Typography variant="h5">Static (not interactive)</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Same surface, no hover state. Sometimes a card is just a frame.
            </Typography>
          </ArtifactCard>
          <ArtifactCard href="#" withRule={false} sx={{ maxWidth: 320 }}>
            <Typography variant="h5">No rule</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Same shape, no left accent stripe.
            </Typography>
          </ArtifactCard>
        </Stack>
      </SectionFrame>

      <SectionFrame spacing="regular">
        <PageHeader overline="Chips" index="05" title="Label Chips" size="md" />
        <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 4 }}>
          <LabelChip>Software Engineer</LabelChip>
          <LabelChip>Product Builder</LabelChip>
          <LabelChip>Martial Artist</LabelChip>
          <LabelChip>Philosopher</LabelChip>
          <LabelChip size="sm">Small</LabelChip>
          <LabelChip href="#">Interactive</LabelChip>
          <LabelChip selected>Selected</LabelChip>
        </Stack>
      </SectionFrame>

      <SectionFrame spacing="regular">
        <PageHeader overline="Index Rows" index="06" title="Editorial Index" size="md" />
        <Box sx={{ mt: 4 }}>
          <IndexRow
            index={1}
            category="Systems Built"
            title="Projects"
            description="Software, experiments, tools, and applied systems."
            href="#"
            endGlyph={<Glyph name="bracket" size={16} />}
          />
          <IndexRow
            index={2}
            category="Field Notes"
            title="Aberrant Quiddity"
            description="Long-running blog of essays, technical reflections, and research notes."
            href="#"
            endGlyph={<Glyph name="page" size={16} />}
          />
          <IndexRow
            index={3}
            category="Disciplines"
            title="Hiking"
            description="A running log of trails, summits, and trip notes."
            href="#"
            endGlyph={<Glyph name="mountain" size={16} />}
          />
        </Box>
      </SectionFrame>

      <SectionFrame spacing="regular">
        <PageHeader overline="Accordions" index="07" title="Archive Accordions" size="md" />
        <Box sx={{ mt: 4 }}>
          <ArchiveAccordion
            label="Professional"
            index="01"
            glyph={<Glyph name="bracket" size={18} />}
            count={4}
            defaultOpen
          >
            <Stack gap={1.5}>
              <IndexRow
                index={1}
                category="Work"
                title="Flint"
                description="Edtech / AI LMS"
                href="#"
              />
              <IndexRow
                index={2}
                category="Projects"
                title="Perler"
                description="Instant Perler Pattern generator"
                href="#"
              />
            </Stack>
          </ArchiveAccordion>
          <ArchiveAccordion
            label="Education"
            index="02"
            glyph={<Glyph name="page" size={18} />}
            count={3}
          >
            <Typography variant="body2">Studying, reading, courses — bone family.</Typography>
          </ArchiveAccordion>
          <ArchiveAccordion
            label="Hobbies"
            index="03"
            glyph={<Glyph name="mountain" size={18} />}
            count={6}
          >
            <Typography variant="body2">
              Disciplines, expeditions, archives — moss family.
            </Typography>
          </ArchiveAccordion>
        </Box>
      </SectionFrame>

      <SectionFrame spacing="regular">
        <PageHeader overline="Identity" index="08" title="Portrait Frame" size="md" />
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" gap={6} sx={{ mt: 4 }}>
          <PortraitFrame src="/profile-picture.jpg" alt="Zachary Reece" size={220} />
          <Stack gap={2}>
            <Crosshair size={32} />
            <Stack direction="row" gap={1}>
              {(
                [
                  "node",
                  "compass",
                  "mountain",
                  "page",
                  "drawer",
                  "bracket",
                  "knot",
                  "hex",
                  "spiral",
                ] as const
              ).map((g) => (
                <Glyph key={g} name={g} size={20} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </SectionFrame>

      <SectionFrame spacing="regular">
        <PageHeader overline="Patterns" index="09" title="Tattoo Motif Primitives" size="md" />
        <Stack direction={{ xs: "column", md: "row" }} gap={3} sx={{ mt: 4 }} flexWrap="wrap">
          <Box
            sx={{
              width: 240,
              height: 240,
              color: "primary.main",
              border: "1px solid rgba(238,229,210,0.18)",
            }}
          >
            <Honeycomb cellSize={16} opacity={0.5} />
          </Box>
          <Box
            sx={{
              width: 240,
              height: 240,
              color: "primary.main",
              border: "1px solid rgba(238,229,210,0.18)",
            }}
          >
            <ContourField width={240} height={240} bands={8} />
          </Box>
          <Box
            sx={{
              width: 240,
              height: 240,
              color: "primary.main",
              border: "1px solid rgba(238,229,210,0.18)",
            }}
          >
            <Suminagashi width={240} height={240} strokes={16} />
          </Box>
          {(
            ["seed", "flower-of-life", "metatron", "vesica", "hexagram"] as SacredGeometryShape[]
          ).map((s) => (
            <Box
              key={s}
              sx={{
                width: 200,
                height: 200,
                color: "primary.main",
                border: "1px solid rgba(238,229,210,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SacredGeometry shape={s} size={170} />
            </Box>
          ))}
        </Stack>
      </SectionFrame>

      <SectionFrame spacing="loose">
        <PageHeader
          overline="Heroes"
          index="10"
          title="Hero Diagram Options"
          subtitle="All five hero options — switch on the home with ?hero=1..5"
          size="md"
        />
        <Stack gap={6} sx={{ mt: 6 }}>
          {HERO_VARIANTS.map((v, i) => (
            <Stack key={v} gap={2}>
              <Overline index={i + 1}>{HERO_VARIANT_LABELS[v]}</Overline>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <HeroDiagram variant={v} animate={false} />
              </Box>
            </Stack>
          ))}
        </Stack>
      </SectionFrame>
    </Box>
  );
}
