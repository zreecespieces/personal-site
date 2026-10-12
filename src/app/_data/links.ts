import type { SectionKey } from "@/theme/tokens";
import { socialLinks } from "./site";
import { udemyProjectUrl } from "./teaching";
import { hobbyLinks } from "./hobbies";

export interface LinkItem {
  title: string;
  url: string;
  external?: boolean;
}

export interface LinkCategory {
  title: "Professional" | "Education" | "Hobbies";
  section: SectionKey;
  links: LinkItem[];
}

/** A complete directory. Stories and supporting facts belong to their pages. */
export const linkCategories: LinkCategory[] = [
  {
    title: "Professional",
    section: "professional",
    links: [
      { title: "About", url: "/about" },
      { title: "Projects", url: "/projects" },
      { title: "Writing", url: "/blog" },
      { title: "GitHub", url: socialLinks[0].href, external: true },
      { title: "Flint", url: "https://flintk12.com", external: true },
    ],
  },
  {
    title: "Education",
    section: "education",
    links: [
      {
        title: "Teaching on Udemy",
        url: udemyProjectUrl,
      },
      { title: "Study", url: "/study" },
      { title: "Reading", url: "/reading" },
    ],
  },
  {
    title: "Hobbies",
    section: "hobbies",
    links: hobbyLinks,
  },
];
