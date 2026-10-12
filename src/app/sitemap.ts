import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { projects } from "./projects/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    ...projects.map((project) => `/projects/${project.slug}`),
    "/blog",
    "/study",
    "/reading",
    "/hobbies",
    "/hikes",
    "/travel",
    "/comedy",
    "/art",
    "/music-festivals",
    ...getAllSlugs().map((slug) => `/blog/${encodeURIComponent(slug)}`),
  ];

  return routes.map((route) => ({ url: `https://zacharyreece.dev${route}` }));
}
