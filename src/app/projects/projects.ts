import { formatCalendarDate } from "@/lib/dates";

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
  title: string;
  description: string;
  icon?: string; // Material UI icon name
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  technologies: Technology[];
  features: Feature[];
  deployedUrl?: string;
  githubUrl?: string;
  images: ProjectImage[];
  startDate: string; // YYYY-MM-DD format
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
    id: 1,
    title: "Instant Perler Pattern",
    subtitle: "Turn an image into a Perler bead pattern.",
    description: `
      Perler beads are arranged on a grid and fused with an iron to make a piece of pixel art. The finished pieces can become necklaces, bracelets, and other accessories, often traded or given away at music festivals.

      I built a web application that converts images into bead patterns. You can also draw a pattern from scratch, edit it directly, replace colors, and change the grid size.

      Color normalization reduces similar colors so a pattern needs fewer bead types. PNG and JSON exports let you save the design for later use or sharing.
    `,
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#000000" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Material UI", color: "#0081CB" },
    ],
    features: [
      {
        title: "Image Upload",
        description: "Upload an image to convert it into a grid of bead colors.",
      },
      {
        title: "Direct Pattern Editing",
        description: "Draw and edit directly on the grid, with or without an uploaded image.",
      },
      {
        title: "Color Replacement",
        description: "Replace a color in the pattern without redrawing the design.",
      },
      {
        title: "Custom Grid Size",
        description: "Adjust the pattern dimensions to suit your pegboard.",
      },
      {
        title: "Color Normalization",
        description:
          "Simplify your pattern by reducing similar colors for easier crafting and fewer bead types.",
      },
      {
        title: "Export Options",
        description: "Save your patterns as PNG images or JSON files for later use or sharing.",
      },
      {
        title: "Bead Count",
        description: "Estimate the materials needed for your project before arranging beads.",
      },
      {
        title: "Pattern Auto-Size",
        description:
          "Fit a design to your pegboard dimensions, with a real-time preview of the pattern.",
      },
    ],
    deployedUrl: "https://zacharyreece.dev/instant-perler-pattern",
    githubUrl: "https://github.com/zreecespieces/perler-pattern-generator",
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
