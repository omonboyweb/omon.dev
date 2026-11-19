import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/projects",
          "/projects/",
          "/en/projects",
          "/en/projects/",
          "/ru/projects",
          "/ru/projects/",
          "/uz/projects",
          "/uz/projects/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
