import type { MetadataRoute } from "next";
import {
  DEFAULT_LOCALE,
  getAllBlogSlugs,
  getBlogPostBySlug,
  localizePath,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { absoluteUrl, OG_IMAGE_URL } from "@/lib/seo";

const SITE_LAST_MODIFIED = "2026-11-20";

function buildSitemapAlternates(subpath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = absoluteUrl(localizePath(locale, subpath));
  }
  languages["x-default"] = absoluteUrl(localizePath(DEFAULT_LOCALE, subpath));
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Localized Home pages (/en, /ru, /uz)
  const homeAlternates = buildSitemapAlternates("");
  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: absoluteUrl(localizePath(locale, "")),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeAlternates },
      images: [OG_IMAGE_URL],
    });
  }

  // 2. Localized Blog Index pages (/en/blog, /ru/blog, /uz/blog)
  const blogIndexAlternates = buildSitemapAlternates("/blog");
  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: absoluteUrl(localizePath(locale, "/blog")),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: blogIndexAlternates },
      images: [OG_IMAGE_URL],
    });
  }

  // 3. Localized Blog Article pages (/en/blog/[slug], /ru/blog/[slug], /uz/blog/[slug])
  // Note: /projects and /projects/[id] are intentionally excluded from sitemap & noindexed.
  const slugs = getAllBlogSlugs();
  for (const slug of slugs) {
    const subpath = `/blog/${slug}`;
    const postAlternates = buildSitemapAlternates(subpath);

    for (const locale of SUPPORTED_LOCALES) {
      const post = getBlogPostBySlug(locale, slug);
      entries.push({
        url: absoluteUrl(localizePath(locale, subpath)),
        lastModified: post?.publishedDateIso ?? SITE_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: { languages: postAlternates },
        images: [OG_IMAGE_URL],
      });
    }
  }

  // 4. Machine-readable LLM context files (/llms.txt & /llms-full.txt)
  entries.push(
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/llms-full.txt"),
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  );

  return entries;
}
