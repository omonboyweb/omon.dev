import { enContent } from "./portfolio/en";
import { ruContent } from "./portfolio/ru";
import {
  type BlogPost,
  type Locale,
  type LocalizedPortfolioContent,
  type ProjectItem,
} from "./portfolio/types";
import { uzContent } from "./portfolio/uz";

export * from "./locale";
export * from "./portfolio/types";

const CONTENT_BY_LOCALE: Record<Locale, LocalizedPortfolioContent> = {
  en: enContent,
  ru: ruContent,
  uz: uzContent,
};

export function getPortfolioContent(locale: Locale): LocalizedPortfolioContent {
  return CONTENT_BY_LOCALE[locale] ?? CONTENT_BY_LOCALE.en;
}

export function getBlogPostBySlug(
  locale: Locale,
  slug: string,
): BlogPost | undefined {
  return getPortfolioContent(locale).blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return CONTENT_BY_LOCALE.en.blogPosts.map((p) => p.slug);
}

export function getProjectById(
  locale: Locale,
  id: string,
): ProjectItem | undefined {
  return getPortfolioContent(locale).projects.find((p) => p.id === id);
}

export function getAllProjectIds(): string[] {
  return CONTENT_BY_LOCALE.en.projects.map((p) => p.id);
}

export const PRIMARY_PROJECT_COUNT = 4;
