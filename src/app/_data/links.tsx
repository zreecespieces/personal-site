import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import PaletteIcon from "@mui/icons-material/Palette";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PublicIcon from "@mui/icons-material/Public";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import LandscapeIcon from "@mui/icons-material/Landscape";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import type { SectionKey } from "@/theme/tokens";

/**
 * The single source of truth for the site's navigation taxonomy.
 *
 * Taxonomy follows the resolved decision in `docs/redesign_roadmap.md`
 * §1.2: keep the existing `Professional` / `Education` / `Hobbies`
 * categories with their existing items. Each item now also carries a
 * one-sentence description that the `IndexRow` primitive surfaces, and a
 * `kind` flag so we can render external links with the right rel/target.
 */

export interface LinkItem {
  /** Display title. */
  title: string;
  /** Optional small kicker (e.g. "blog"). */
  subtitle?: string;
  /** One-sentence description shown on the home IndexRow. */
  description?: string;
  /** Destination. */
  url: string;
  /** Whether this link points off-site. */
  external?: boolean;
  /** Visual icon. */
  icon: React.ReactNode;
}

export interface LinkCategory {
  /** Top-level label (matches the section key for accent inheritance). */
  title: "Professional" | "Education" | "Hobbies";
  /** SectionKey used to look up the accent in `theme.zr.sectionAccent`. */
  section: SectionKey;
  /** Header glyph. */
  icon: React.ReactNode;
  /** Items in the category. */
  links: LinkItem[];
}

const professionalLinks: LinkItem[] = [
  {
    icon: <PersonIcon />,
    title: "About",
    description: "Longer narrative — teaching, work, philosophy, and discipline.",
    url: "/about",
  },
  {
    icon: <LanguageIcon />,
    title: "Projects",
    description: "Software, experiments, tools, and applied systems.",
    url: "/projects",
  },
  {
    icon: <HistoryEduIcon />,
    title: "Aberrant Quiddity",
    subtitle: "blog",
    description: "Long-running notebook of essays, technical reflections, and research notes.",
    url: "/blog",
  },
  {
    icon: <GitHubIcon />,
    title: "GitHub",
    description: "Open source, side projects, and code under construction.",
    url: "https://github.com/zreecespieces",
    external: true,
  },
  {
    icon: <WorkIcon />,
    title: "Work",
    description: "Product engineering at Flint — AI-powered LMS / SIS for K–12.",
    url: "https://flintk12.com",
    external: true,
  },
];

const educationLinks: LinkItem[] = [
  {
    icon: <SchoolIcon />,
    title: "Courses",
    description: "Best-selling MUI and React courses on Udemy; 20K+ students across 145 countries.",
    url: "https://www.udemy.com/user/zacharyreece/",
    external: true,
  },
  {
    icon: <LocalLibraryIcon />,
    title: "Studying",
    description: "Khan Academy threads currently in progress.",
    url: "/study",
  },
  {
    icon: <MenuBookIcon />,
    title: "Reading",
    description: "Currently reading and completed books — annotated.",
    url: "/reading",
  },
];

const hobbyLinks: LinkItem[] = [
  {
    icon: <LandscapeIcon />,
    title: "Hiking",
    description: "Trail log — summits, distance, elevation, and trip notes.",
    url: "/hikes",
  },
  {
    icon: <PublicIcon />,
    title: "Travel",
    description: "Countries visited, favorite spots, and the U.S. states map.",
    url: "/travel",
  },
  {
    icon: <SportsKabaddiIcon />,
    title: "BJJ & Judo",
    description: "Grappling competition record and ongoing practice.",
    url: "https://smoothcomp.com/en/profile/979762",
    external: true,
  },
  {
    icon: <NightlifeIcon />,
    title: "Music Festivals",
    description: "Festival history by year — Bonnaroo, ACL, Lost Lands, and more.",
    url: "/music-festivals",
  },
  {
    icon: <TheaterComedyIcon />,
    title: "Comedy",
    description: "Stand-up comedians and live shows attended.",
    url: "/comedy",
  },
  {
    icon: <PaletteIcon />,
    title: "AI Art",
    description: "Generated visual artifacts and ongoing prompt experiments.",
    url: "/art",
  },
];

export const linkCategories: LinkCategory[] = [
  {
    title: "Professional",
    section: "professional",
    icon: <WorkIcon />,
    links: professionalLinks,
  },
  {
    title: "Education",
    section: "education",
    icon: <SchoolIcon />,
    links: educationLinks,
  },
  {
    title: "Hobbies",
    section: "hobbies",
    icon: <LandscapeIcon />,
    links: hobbyLinks,
  },
];

export const contactInfo: LinkItem[] = [
  {
    icon: <InstagramIcon />,
    title: "Instagram",
    url: "https://www.instagram.com/zacharydreece/",
    external: true,
  },
  {
    icon: <LinkedInIcon />,
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/zachary-reece-b587811a8/",
    external: true,
  },
  {
    icon: <EmailIcon />,
    title: "Email",
    url: "mailto:zachdreece@gmail.com",
  },
  {
    icon: <DescriptionIcon />,
    title: "Resume",
    url: "/resume.pdf",
    external: true,
  },
];
