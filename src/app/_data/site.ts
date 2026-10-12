/** Shared identity and navigation labels. Content pages own their own stories. */
export const siteIdentity = {
  name: "Zachary Reece",
  location: "Denver, Colorado",
  email: "zachdreece@gmail.com",
  resume: "/resume.pdf",
} as const;

export const primaryNavigation = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Hobbies", href: "/hobbies" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/zreecespieces" },
  { label: "Instagram", href: "https://www.instagram.com/zacharydreece/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zachary-reece-b587811a8/" },
  { label: "Résumé (PDF)", href: siteIdentity.resume },
] as const;
