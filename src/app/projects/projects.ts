import { formatCalendarDate } from "@/lib/dates";
import { teachingCourses, teachingImpact, type TeachingCourse } from "@/app/_data/teaching";

export interface Technology {
  name: string;
  icon?: string; // Optional URL to icon image or name of Material UI icon
  color?: string; // Optional color for styling
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Feature {
  group: string;
  title: string;
  description: string;
  icon?: string; // Material UI icon name
}

export interface FeatureGroup {
  id: string;
  title: string;
}

export type WorkflowKind = "perler-pattern" | "kokoro-speech";

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  overviewTitle?: string;
  technologies: Technology[];
  features: Feature[];
  featureGroups: FeatureGroup[];
  deployedUrl?: string;
  deployedLabel?: string;
  githubUrl?: string;
  banner?: ProjectImage & { width: number; height: number };
  workflow?: WorkflowKind;
  courses?: TeachingCourse[];
  technologyLabel?: string;
  images: ProjectImage[];
  startDate: string; // YYYY-MM-DD format
  dateLabel?: string;
  datePrecision?: "month";
  endDate?: string; // YYYY-MM-DD format for completed projects
  isOngoing?: boolean;
  highlights?: string[];
}

// Format date from YYYY-MM-DD to Month Year
export const formatDate = (dateString: string) => {
  return formatCalendarDate(dateString, { month: "long", year: "numeric" });
};

// Published projects
export const projects: Project[] = [
  {
    id: 3,
    slug: "udemy-courses",
    title: "Udemy Courses",
    subtitle: "Three hands-on courses on React, Material UI, and full-stack e-commerce.",
    summary: `Three Udemy courses on React, Material UI, and JAMstack e-commerce, reaching ${teachingImpact.students} students across ${teachingImpact.countries} countries with ${teachingImpact.reviews.toLowerCase()} reviews.`,
    overviewTitle: "Teaching through real projects",
    description: `
      I started teaching on Udemy in January 2020, turning the process of building a polished React application into a course. The goal was to bridge the gap between knowing the basics and confidently bringing a design to life.

      The next course expanded that approach into a full-stack e-commerce application. My third course focuses on understanding and customizing MUI components, with a systematic foundation you can return to while building your own applications.
    `,
    technologies: [
      { name: "React" },
      { name: "Material UI" },
      { name: "Gatsby" },
      { name: "Strapi" },
    ],
    technologyLabel: "Topics",
    features: [],
    featureGroups: [],
    courses: teachingCourses,
    startDate: `${teachingCourses[0].releaseDate}-01`,
    endDate: `${teachingCourses[teachingCourses.length - 1].releaseDate}-01`,
    dateLabel: "Released",
    datePrecision: "month",
    images: [],
  },
  {
    id: 2,
    slug: "kokoro-pi",
    title: "Kokoro Pi",
    subtitle: "Fast, streaming text-to-speech on a Raspberry Pi. No accelerator required.",
    summary:
      "A CPU-only Kokoro speech service for the Raspberry Pi, with native ARM optimizations, clause streaming, and integrations for existing voice tools.",
    overviewTitle: "Making local speech feel responsive",
    description: `
      Kokoro produces natural-sounding speech, but a straightforward install on a Raspberry Pi makes you wait for a whole passage before hearing anything. Kokoro Pi packages the speech engine from my Pi-based assistant into a local service that starts speaking clause by clause.

      The project combines ONNX graph optimizations with native C++ kernels, including a fused int8 convolution path for ARM. It builds on Kokoro-82M and kokoro-onnx rather than training a new voice model, and runs entirely on the CPU.

      In the repository's Raspberry Pi 5 paragraph benchmark, first audio arrived in 1.59 seconds rather than 10.45 seconds for a plain PyTorch install, using the same model and voice. The published listening samples let you compare the upstream, float, and int8 builds yourself.
    `,
    technologies: [
      { name: "Python" },
      { name: "C++" },
      { name: "ONNX Runtime" },
      { name: "ARM NEON" },
    ],
    featureGroups: [
      { id: "performance", title: "Local speech" },
      { id: "integration", title: "Integrations" },
      { id: "setup", title: "Setup and quality" },
    ],
    features: [
      {
        group: "performance",
        title: "Clause streaming",
        description: "Send audio as each clause finishes instead of waiting for the full passage.",
      },
      {
        group: "performance",
        title: "Native ARM kernels",
        description:
          "Fuse vocoder operations and int8 convolutions to make better use of the Pi's CPU.",
      },
      {
        group: "integration",
        title: "OpenAI-compatible speech API",
        description:
          "Use existing speech clients through the familiar audio endpoint and voice names.",
      },
      {
        group: "integration",
        title: "Home Assistant and Python",
        description:
          "Connect through the Wyoming protocol or use the Python library as a replacement for kokoro-onnx.",
      },
      {
        group: "setup",
        title: "Install and run locally",
        description:
          "Install from PyPI or use the service installer, with configuration for voices, ports, and access keys.",
      },
      {
        group: "setup",
        title: "Build, compare, and validate",
        description:
          "Derive optimized models from the upstream export, then compare speed and audio quality across upstream, float, and int8 variants.",
      },
    ],
    deployedUrl: "https://zreecespieces.github.io/kokoro-pi/",
    deployedLabel: "Hear the samples",
    githubUrl: "https://github.com/zreecespieces/kokoro-pi",
    banner: {
      url: "https://raw.githubusercontent.com/zreecespieces/kokoro-pi/main/docs/banner.png",
      alt: "Kokoro Pi README banner: Kokoro speech on a Raspberry Pi, twice as fast on the CPU. Repository benchmark highlights: 1.59 seconds to first audio (from 10.45 seconds), 0.45 realtime factor (from 1.54), and 451 GOP/s for the int8 convolution kernel.",
      width: 1280,
      height: 420,
      caption: "Original README banner; benchmark figures reflect the repository's test setups.",
    },
    workflow: "kokoro-speech",
    startDate: "2026-09-17",
    dateLabel: "Published",
    images: [],
  },
  {
    id: 1,
    slug: "instant-perler-pattern",
    title: "Instant Perler Pattern",
    subtitle: "Turn an image into a Perler bead pattern.",
    summary:
      "From an image on a screen to a pattern you can make by hand. A tool for pixel art, beadwork, and festival gifts.",
    overviewTitle: "The craft behind the tool",
    description: `
      Perler beads are arranged on a grid and fused with an iron to make a piece of pixel art. The finished pieces can become necklaces, bracelets, and other accessories, often traded or given away at music festivals.
    `,
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#000000" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Material UI", color: "#0081CB" },
    ],
    featureGroups: [
      { id: "create", title: "Create" },
      { id: "refine", title: "Refine" },
      { id: "finish", title: "Finish" },
    ],
    features: [
      {
        title: "Image upload",
        group: "create",
        description: "Upload an image to convert it into a grid of bead colors.",
      },
      {
        title: "Direct pattern editing",
        group: "create",
        description: "Draw and edit directly on the grid, with or without an uploaded image.",
      },
      {
        title: "Color replacement",
        group: "refine",
        description: "Replace a color in the pattern without redrawing the design.",
      },
      {
        title: "Custom grid size",
        group: "refine",
        description: "Adjust the pattern dimensions to suit your pegboard.",
      },
      {
        title: "Color normalization",
        group: "refine",
        description:
          "Simplify your pattern by reducing similar colors for easier crafting and fewer bead types.",
      },
      {
        title: "Export options",
        group: "finish",
        description: "Save your patterns as PNG images or JSON files for later use or sharing.",
      },
      {
        title: "Bead count",
        group: "finish",
        description: "Estimate the materials needed for your project before arranging beads.",
      },
      {
        title: "Pattern auto-size",
        group: "finish",
        description:
          "Fit a design to your pegboard dimensions, with a real-time preview of the pattern.",
      },
    ],
    deployedUrl: "https://zacharyreece.dev/instant-perler-pattern",
    deployedLabel: "Open the pattern maker",
    githubUrl: "https://github.com/zreecespieces/perler-pattern-generator",
    workflow: "perler-pattern",
    images: [],
    startDate: "2024-02-15",
    isOngoing: false,
    endDate: "2024-03-15",
    highlights: [
      "Smart Color Normalization that reduces similar colors for easier crafting",
      "Pattern Auto-Size feature that fits designs to any pegboard dimensions",
      "Bead Count Calculator to estimate materials needed for your project",
      "Real-time Pattern Preview showing exactly how your finished piece will look",
      "Easy Color Replacement for quick customization",
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug) ?? null;

// Helper functions for statistics
export const getTotalProjects = () => projects.length;
export const getTotalTechnologies = () => {
  const techSet = new Set<string>();
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      techSet.add(tech.name);
    });
  });
  return techSet.size;
};

export const getProjectsSortedByDate = () => {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime(); // Sort descending (newest first)
  });
};
