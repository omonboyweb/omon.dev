import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  getPortfolioContent,
  localizePath,
  SUPPORTED_LOCALES,
  type BlogPost,
  type Locale,
} from "./i18n";
import { PROFILE } from "./portfolio/types";

export const SITE_URL = "https://omon.dev";
export const BRAND_NAME = "omon.dev";
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const LOGO_IMAGE_URL = `${SITE_URL}/brand-logo.png`;

export const SAME_AS_LINKS = [
  PROFILE.links.instagram,
  PROFILE.links.telegram,
  PROFILE.links.github,
  PROFILE.links.linkedin,
] as const;

export const INDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    noarchive: true,
  },
};

const OG_LOCALE_BY_LANG: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  uz: "uz_UZ",
};

export const SEO_KEYWORDS_BY_LOCALE: Record<Locale, string[]> = {
  en: [
    "Frontend Engineer Uzbekistan",
    "Next.js developer Tashkent",
    "Full-Stack Software Engineer",
    "Omon dev",
    "omon.dev",
    "Omonbek Khojamurodov",
    "Omonbek Xojamurodov",
    "Software Engineer Uzbekistan",
    "React developer Tashkent",
    "TypeScript developer Uzbekistan",
    "Web developer Tashkent",
    "Product Software Engineer",
    "Remote Frontend Engineer",
    "Next.js TypeScript portfolio",
    "Frontend architecture blog",
  ],
  uz: [
    "Omonbek Xojamurodov",
    "Omonbek Khojamurodov",
    "Omon dev",
    "omon.dev",
    "Frontend dasturchi Toshkent",
    "Next.js dasturchi O'zbekiston",
    "Full-Stack dasturchi",
    "Veb dasturchi Toshkent",
    "Sayt yaratish Toshkent",
    "React dasturchi O'zbekiston",
    "Dasturiy ta'minot muhandisi",
    "IT dasturchi O'zbekiston",
    "Frontend Engineer Uzbekistan",
    "Next.js developer Tashkent",
    "Full-Stack Software Engineer",
  ],
  ru: [
    "Омонбек Хожамуродов",
    "Omonbek Khojamurodov",
    "Omonbek Xojamurodov",
    "Omon dev",
    "omon.dev",
    "Frontend разработчик Ташкент",
    "Next.js разработчик Узбекистан",
    "Full-Stack разработчик Ташкент",
    "Веб-разработчик Узбекистан",
    "React разработчик Ташкент",
    "Создание веб-приложений Ташкент",
    "Инженер-программист Узбекистан",
    "Frontend Engineer Uzbekistan",
    "Next.js developer Tashkent",
    "Full-Stack Software Engineer",
  ],
};

const HOME_META_BY_LOCALE: Record<
  Locale,
  { title: string; description: string; ogAlt: string }
> = {
  en: {
    title:
      "omon.dev — Omonbek Khojamurodov | Frontend & Full-Stack Software Engineer",
    description:
      "Official site and engineering blog of Omonbek Khojamurodov (omon.dev) — Frontend & Full-Stack Software Engineer and Next.js developer from Tashkent, Uzbekistan, building fast web products globally.",
    ogAlt: "omon.dev — Omonbek Khojamurodov | Software Engineer",
  },
  uz: {
    title:
      "omon.dev — Omonbek Xojamurodov | Frontend va Full-Stack dasturchi",
    description:
      "Omonbek Xojamurodov (omon.dev) rasmiy sayti va dasturlash blogi — Toshkent va butun dunyo uchun tezkor Next.js, React hamda Full-Stack veb-ilovalar yaratuvchi dasturiy taʼminot muhandisi.",
    ogAlt: "omon.dev — Omonbek Xojamurodov | Dasturiy taʼminot muhandisi",
  },
  ru: {
    title:
      "omon.dev — Омонбек Хожамуродов | Frontend и Full-Stack разработчик",
    description:
      "Официальный сайт и технический блог Омонбека Хожамуродова (omon.dev) — Frontend и Full-Stack инженера, Next.js разработчика из Ташкента (Узбекистан), создающего быстрые веб-продукты по всему миру.",
    ogAlt: "omon.dev — Омонбек Хожамуродов | Software Engineer",
  },
};

const BLOG_INDEX_META_BY_LOCALE: Record<
  Locale,
  { title: string; description: string }
> = {
  en: {
    title: "Blog — Frontend, Next.js & System Design Articles",
    description:
      "Plain-English engineering articles by Omonbek Khojamurodov (omon.dev) covering web performance, Next.js, offline-first UX, and scalable system design.",
  },
  uz: {
    title: "Blog — Frontend, Next.js va tizim arxitekturasi maqolalari",
    description:
      "Omonbek Xojamurodov (omon.dev) tomonidan veb tezligi, Next.js, oflayn-barqaror ilovalar va tizim arxitekturasi haqida tushunarli maqolalar.",
  },
  ru: {
    title: "Блог — статьи о Frontend, Next.js и архитектуре систем",
    description:
      "Практические статьи Омонбека Хожамуродова (omon.dev) о производительности веба, Next.js, офлайн-приложениях и масштабируемой архитектуре.",
  },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildLanguageAlternates(
  locale: Locale,
  pathWithoutLocale = "",
): NonNullable<Metadata["alternates"]> {
  const normalizedSubpath =
    !pathWithoutLocale || pathWithoutLocale === "/"
      ? ""
      : pathWithoutLocale.startsWith("/")
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`;

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = absoluteUrl(localizePath(loc, normalizedSubpath));
  }
  languages["x-default"] = absoluteUrl(
    localizePath(DEFAULT_LOCALE, normalizedSubpath),
  );

  return {
    canonical: absoluteUrl(localizePath(locale, normalizedSubpath)),
    languages,
  };
}

export function buildRootLayoutMetadata(locale: Locale): Metadata {
  const home = HOME_META_BY_LOCALE[locale];
  const content = getPortfolioContent(locale);
  const ogImages = [
    {
      url: OG_IMAGE_URL,
      width: 1200,
      height: 630,
      alt: home.ogAlt,
      type: "image/png",
    },
  ];

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: BRAND_NAME,
    title: {
      default: home.title,
      template: `%s | ${BRAND_NAME}`,
    },
    description: home.description,
    keywords: SEO_KEYWORDS_BY_LOCALE[locale],
    authors: [{ name: content.profile.fullName, url: SITE_URL }],
    creator: content.profile.fullName,
    publisher: BRAND_NAME,
    category: "technology",
    alternates: buildLanguageAlternates(locale, ""),
    robots: INDEX_ROBOTS,
    openGraph: {
      title: home.title,
      description: home.description,
      url: absoluteUrl(localizePath(locale, "")),
      siteName: BRAND_NAME,
      locale: OG_LOCALE_BY_LANG[locale],
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE_BY_LANG[l],
      ),
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export function buildHomeMetadata(locale: Locale): Metadata {
  const home = HOME_META_BY_LOCALE[locale];
  return {
    title: {
      absolute: home.title,
    },
    description: home.description,
    alternates: buildLanguageAlternates(locale, ""),
    robots: INDEX_ROBOTS,
    openGraph: {
      title: home.title,
      description: home.description,
      url: absoluteUrl(localizePath(locale, "")),
      siteName: BRAND_NAME,
      locale: OG_LOCALE_BY_LANG[locale],
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: home.ogAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export function buildBlogIndexMetadata(locale: Locale): Metadata {
  const meta = BLOG_INDEX_META_BY_LOCALE[locale];
  const url = absoluteUrl(localizePath(locale, "/blog"));

  return {
    title: meta.title,
    description: meta.description,
    keywords: SEO_KEYWORDS_BY_LOCALE[locale],
    alternates: buildLanguageAlternates(locale, "/blog"),
    robots: INDEX_ROBOTS,
    openGraph: {
      title: `${meta.title} | ${BRAND_NAME}`,
      description: meta.description,
      url,
      siteName: BRAND_NAME,
      locale: OG_LOCALE_BY_LANG[locale],
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${meta.title} — ${BRAND_NAME}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | ${BRAND_NAME}`,
      description: meta.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export function buildBlogPostMetadata(locale: Locale, post: BlogPost): Metadata {
  const content = getPortfolioContent(locale);
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(localizePath(locale, path));

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      post.category,
      content.profile.fullName,
      BRAND_NAME,
      ...SEO_KEYWORDS_BY_LOCALE[locale].slice(0, 8),
    ],
    authors: [{ name: content.profile.fullName, url: SITE_URL }],
    alternates: buildLanguageAlternates(locale, path),
    robots: INDEX_ROBOTS,
    openGraph: {
      title: `${post.title} | ${BRAND_NAME}`,
      description: post.excerpt,
      url,
      siteName: BRAND_NAME,
      locale: OG_LOCALE_BY_LANG[locale],
      type: "article",
      publishedTime: `${post.publishedDateIso}T00:00:00.000Z`,
      authors: [content.profile.fullName],
      section: post.category,
      tags: [post.category, BRAND_NAME, content.profile.fullName],
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${post.title} — ${BRAND_NAME}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${BRAND_NAME}`,
      description: post.excerpt,
      images: [OG_IMAGE_URL],
    },
  };
}

export function buildProjectsNoIndexMetadata(
  locale: Locale,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    robots: NOINDEX_ROBOTS,
    openGraph: {
      title: `${title} | ${BRAND_NAME}`,
      description,
      siteName: BRAND_NAME,
      locale: OG_LOCALE_BY_LANG[locale],
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${title} — ${BRAND_NAME}`,
          type: "image/png",
        },
      ],
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildPersonAndWebsiteJsonLd(locale: Locale) {
  const content = getPortfolioContent(locale);
  const homeUrl = absoluteUrl(localizePath(locale, ""));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: content.profile.fullName,
        alternateName: [
          "Omonbek Khojamurodov",
          "Omonbek Xojamurodov",
          "Омонбек Хожамуродов",
          "Omon",
          "Omon dev",
          "@omon.dev",
        ],
        url: homeUrl,
        image: LOGO_IMAGE_URL,
        jobTitle: content.profile.role,
        description: HOME_META_BY_LOCALE[locale].description,
        email: `mailto:${PROFILE.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
        knowsLanguage: ["en", "ru", "uz"],
        knowsAbout: [
          "Frontend Engineering",
          "Full-Stack Software Engineering",
          "Next.js",
          "React",
          "TypeScript",
          "Web Performance",
          "System Design",
          "Product Engineering",
        ],
        brand: {
          "@type": "Brand",
          name: BRAND_NAME,
          url: SITE_URL,
          logo: LOGO_IMAGE_URL,
        },
        sameAs: [...SAME_AS_LINKS],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BRAND_NAME,
        url: homeUrl,
        inLanguage: locale,
        description: HOME_META_BY_LOCALE[locale].description,
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        author: {
          "@id": `${SITE_URL}/#person`,
        },
      },
    ],
  };
}

export function buildBlogCollectionJsonLd(locale: Locale, posts: BlogPost[]) {
  const content = getPortfolioContent(locale);
  const blogUrl = absoluteUrl(localizePath(locale, "/blog"));

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${blogUrl}#blog`,
    name: `${BRAND_NAME} — ${content.ui.blog.allArticlesTitle}`,
    description: BLOG_INDEX_META_BY_LOCALE[locale].description,
    url: blogUrl,
    inLanguage: locale,
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: content.profile.fullName,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(localizePath(locale, `/blog/${post.slug}`)),
      datePublished: post.publishedDateIso,
      inLanguage: locale,
      author: {
        "@id": `${SITE_URL}/#person`,
      },
    })),
  };
}

export function buildBlogPostingJsonLd(locale: Locale, post: BlogPost) {
  const content = getPortfolioContent(locale);
  const postUrl = absoluteUrl(localizePath(locale, `/blog/${post.slug}`));
  const articleBody = post.sections
    .map((s) => `${s.heading}\n${s.paragraphs.join("\n")}`)
    .join("\n\n");

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    articleBody,
    inLanguage: locale,
    datePublished: post.publishedDateIso,
    dateModified: post.publishedDateIso,
    image: OG_IMAGE_URL,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: content.profile.fullName,
      url: absoluteUrl(localizePath(locale, "")),
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_IMAGE_URL,
      },
    },
    keywords: [post.category, BRAND_NAME, content.profile.fullName],
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
