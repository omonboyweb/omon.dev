import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const DISALLOWED_PROJECT_PATHS = [
  "/projects",
  "/projects/",
  "/en/projects",
  "/en/projects/",
  "/ru/projects",
  "/ru/projects/",
  "/uz/projects",
  "/uz/projects/",
];

const ALLOWED_AI_AND_SEARCH_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
] as const;

const ALLOW_ROOT_AND_LLMS = ["/", "/llms.txt", "/llms-full.txt"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ALLOWED_AI_AND_SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ALLOW_ROOT_AND_LLMS,
        disallow: DISALLOWED_PROJECT_PATHS,
      })),
      {
        userAgent: "*",
        allow: ALLOW_ROOT_AND_LLMS,
        disallow: DISALLOWED_PROJECT_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
