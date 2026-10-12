import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview", "/api/", "/proxy/", "/instant-perler-pattern"],
    },
    sitemap: "https://zacharyreece.dev/sitemap.xml",
  };
}
