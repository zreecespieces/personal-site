import type { GlyphName } from "@/components/primitives/Glyphs";

export const hobbyLinks: {
  title: string;
  url: string;
  icon: GlyphName;
  description: string;
  external?: boolean;
}[] = [
  {
    title: "Hikes",
    url: "/hikes",
    icon: "mountain",
    description: "Trails, peaks, and recorded routes.",
  },
  {
    title: "Travel",
    url: "/travel",
    icon: "compass",
    description: "Places I've spent time, near and far.",
  },
  {
    title: "BJJ & Judo",
    url: "https://smoothcomp.com/en/profile/979762",
    icon: "belt",
    description: "Grappling and my competition profile.",
    external: true,
  },
  {
    title: "Music festivals",
    url: "/music-festivals",
    icon: "music",
    description: "Live music and festival memories.",
  },
  {
    title: "Comedy",
    url: "/comedy",
    icon: "microphone",
    description: "Stand-up shows and live series.",
  },
  {
    title: "AI art",
    url: "/art",
    icon: "palette",
    description: "Experiments with image generation.",
  },
];
