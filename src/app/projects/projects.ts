// Projects data structure

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
  // Add a time component to ensure correct date in all timezones
  const dateTimeString = `${dateString}T12:00:00`;
  const date = new Date(dateTimeString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Placeholder project data
export const projects: Project[] = [
  {
    id: 1,
    title: "Instant Perler Pattern",
    subtitle: "Turn normal images into perler bead patterns",
    description: `
      Instantly turn any image into a perler pattern! Perler beads are a type of bead that can be arranged in a grid and pressed with an iron to create a pattern resembling pixel art.
    
      I built a web application that offers a user-friendly interface for converting normal images into perler patterns with features like image upload, direct pattern editing, color replacement, and custom grid size.
    
      The tool is designed to be both beginner-friendly and powerful, allowing users to create custom patterns with ease.

      This makes it really easy for people to visualize and create custom patterns.

      It's common to make perlers and string them into necklaces, bracelets, and other accessories. These are often traded or given away at music festivals.
    
      `,
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#000000" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Material UI", color: "#0081CB" }
    ],
    features: [
      { 
        title: "Image Upload", 
        description: "Convert any image into a Perler bead pattern instantly with intelligent color mapping."
      },
      { 
        title: "Direct Pattern Editing", 
        description: "Create and edit patterns directly without uploading an image, giving you full creative control."
      },
      { 
        title: "Color Replacement", 
        description: "Change any color in your pattern with an intuitive replacement tool for perfect customization."
      },
      { 
        title: "Custom Grid Size", 
        description: "Customize your pattern dimensions to fit any pegboard size and shape exactly."
      },
      { 
        title: "Color Normalization", 
        description: "Simplify your pattern by reducing similar colors for easier crafting and fewer bead types."
      },
      { 
        title: "Export Options", 
        description: "Save your patterns as PNG images or JSON files for later use or sharing."
      }
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
      "Easy Color Replacement for quick customization"
    ]
  }
];

// Helper functions for statistics
export const getTotalProjects = () => projects.length;
export const getTotalTechnologies = () => {
  const techSet = new Set<string>();
  projects.forEach(project => {
    project.technologies.forEach(tech => {
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
