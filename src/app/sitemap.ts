import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/study",
    "/reading",
    "/hikes",
    "/travel",
    "/comedy",
    "/art",
    "/music-festivals",
    ...getAllSlugs().map((slug) => `/blog/${encodeURIComponent(slug)}`),
  ];

  return routes.map((route) => ({ url: `https://zacharyreece.dev${route}` }));
}
