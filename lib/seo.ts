import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  getPortfolioContent,
  localizePath,
  SUPPORTED_LOCALES,
  type BlogPost,
  type Locale,
} from "./i18n";
import { CORE_STACK, KEY_SERVICES, PROFILE } from "./portfolio/types";

export const SITE_URL = "https://omon.dev";
export const BRAND_NAME = "omon.dev";
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const LOGO_IMAGE_URL = `${SITE_URL}/brand-logo.png`;

export const SAME_AS_LINKS = [
  PROFILE.links.github,
  PROFILE.links.linkedin,
  PROFILE.links.telegram,
  PROFILE.links.instagram,
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
    "Omonbek Xojamurodov",
    "Omonbek Khojamurodov",
    "omon.dev",
    "Omon dev",
    "Frontend Engineer in Tashkent",
    "Frontend Engineer Uzbekistan",
    "Next.js & React Specialist",
    "Next.js developer Tashkent",
    "React developer Tashkent",
    "B2B Web & CRM Systems",
    "B2B automation developer Uzbekistan",
    "Custom CRM developer Tashkent",
    "Admin dashboard developer",
    "Telegram WebApp developer Uzbekistan",
    "Next.js performance optimization",
    "TypeScript developer Uzbekistan",
    "TanStack Query",
    "WebSockets",
    "Python Telegram Bot developer",
  ],
  uz: [
    "Omonbek Xojamurodov",
    "Omonbek Khojamurodov",
    "omon.dev",
    "Omon dev",
    "Frontend dasturchi Toshkent",
    "Next.js va React mutaxassisi",
    "Next.js dasturchi O'zbekiston",
    "React dasturchi Toshkent",
    "B2B veb-ilovalar va CRM tizimlar",
    "Maxsus CRM va admin panel yaratish Toshkent",
    "B2B avtomatlashtirish Toshkent",
    "Telegram WebApp dasturchi O'zbekiston",
    "Telegram bot dasturchi Toshkent",
    "TypeScript dasturchi O'zbekiston",
    "Next.js tezlik optimizatsiyasi",
  ],
  ru: [
    "Омонбек Хожамуродов",
    "Omonbek Xojamurodov",
    "Omonbek Khojamurodov",
    "omon.dev",
    "Frontend разработчик Ташкент",
    "Специалист по Next.js и React Ташкент",
    "Next.js разработчик Узбекистан",
    "React разработчик Ташкент",
    "Разработка B2B веб-приложений и CRM систем",
    "Кастомные CRM и админ-панели Ташкент",
    "B2B автоматизация Узбекистан",
    "Разработка Telegram WebApps Ташкент",
    "Оптимизация производительности Next.js",
    "TypeScript разработчик Узбекистан",
  ],
};

const HOME_META_BY_LOCALE: Record<
  Locale,
  { title: string; description: string; ogAlt: string }
> = {
  en: {
    title:
      "Omonbek Xojamurodov (omon.dev) — Frontend Engineer | Next.js & React Specialist in Tashkent",
    description:
      "Omonbek Xojamurodov (omon.dev) is a Frontend Engineer and Next.js & React Specialist in Tashkent, Uzbekistan, building high-performance web applications, B2B automation platforms, custom CRM & admin dashboards, and Telegram WebApps.",
    ogAlt:
      "Omonbek Xojamurodov (omon.dev) — Frontend Engineer | Next.js & React Specialist in Tashkent, Uzbekistan",
  },
  uz: {
    title:
      "Omonbek Xojamurodov (omon.dev) — Frontend Engineer | Toshkentdagi Next.js va React mutaxassisi",
    description:
      "Omonbek Xojamurodov (omon.dev) — Toshkent (Oʻzbekiston) va global bozor uchun yuqori tezlikdagi veb-ilovalar, B2B avtomatlashtirish, maxsus CRM va admin panellar hamda Telegram WebApp yaratuvchi Frontend muhandisi (Next.js va React mutaxassisi).",
    ogAlt:
      "Omonbek Xojamurodov (omon.dev) — Frontend Engineer | Next.js va React mutaxassisi",
  },
  ru: {
    title:
      "Омонбек Хожамуродов (omon.dev) — Frontend Engineer | Специалист по Next.js и React в Ташкенте",
    description:
      "Омонбек Хожамуродов (Omonbek Xojamurodov, omon.dev) — Frontend-инженер и специалист по Next.js и React в Ташкенте (Узбекистан). Разработка быстрых веб-приложений, B2B-автоматизации, кастомных CRM/админ-панелей и Telegram WebApps.",
    ogAlt:
      "Омонбек Хожамуродов (omon.dev) — Frontend Engineer | Next.js & React Specialist",
  },
};

const BLOG_INDEX_META_BY_LOCALE: Record<
  Locale,
  { title: string; description: string }
> = {
  en: {
    title: "Blog — Frontend Engineering, Next.js & B2B System Design",
    description:
      "Engineering articles by Omonbek Xojamurodov (omon.dev), Frontend Engineer & Next.js Specialist in Tashkent, covering web performance, React architecture, offline-first UX, and scalable B2B system design.",
  },
  uz: {
    title: "Blog — Frontend, Next.js va B2B tizim arxitekturasi maqolalari",
    description:
      "Omonbek Xojamurodov (omon.dev) tomonidan veb tezligi, Next.js va React arxitekturasi, oflayn-barqaror ilovalar hamda B2B tizim dizayni haqida tushunarli maqolalar.",
  },
  ru: {
    title: "Блог — статьи о Frontend, Next.js, React и архитектуре систем",
    description:
      "Практические статьи Омонбека Хожамуродова (Omonbek Xojamurodov, omon.dev) о производительности веба, Next.js и React, офлайн-приложениях и масштабируемой B2B-архитектуре.",
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
    authors: [{ name: PROFILE.fullName, url: SITE_URL }],
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
    keywords: SEO_KEYWORDS_BY_LOCALE[locale],
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
      PROFILE.fullName,
      BRAND_NAME,
      ...SEO_KEYWORDS_BY_LOCALE[locale].slice(0, 10),
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
      tags: [post.category, BRAND_NAME, PROFILE.fullName],
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

const AREA_SERVED_PLACES = [
  {
    "@type": "City",
    name: "Tashkent",
    containedInPlace: {
      "@type": "Country",
      name: "Uzbekistan",
    },
  },
  {
    "@type": "Country",
    name: "Uzbekistan",
  },
  {
    "@type": "AdministrativeArea",
    name: "Remote / Worldwide",
  },
];

const ENTITY_KNOWS_ABOUT = [
  ...CORE_STACK,
  ...KEY_SERVICES,
  "Next.js App Router",
  "React Server Components",
  "Multi-Tenant SaaS Architecture",
  "Role-Based Access Control (RBAC)",
  "Frontend Performance Optimization",
];

export function buildPersonAndWebsiteJsonLd(locale: Locale) {
  const homeUrl = absoluteUrl(localizePath(locale, ""));
  const description = HOME_META_BY_LOCALE[locale].description;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.fullName,
        givenName: "Omonbek",
        familyName: "Xojamurodov",
        alternateName: [
          "Omonbek Xojamurodov",
          "Omonbek Khojamurodov",
          "Омонбек Хожамуродов",
          "Omon",
          "Omon dev",
          "@omon.dev",
        ],
        url: homeUrl,
        image: LOGO_IMAGE_URL,
        jobTitle: PROFILE.role,
        description,
        email: `mailto:${PROFILE.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressRegion: "Tashkent",
          addressCountry: "UZ",
        },
        homeLocation: {
          "@type": "Place",
          name: "Tashkent, Uzbekistan",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tashkent",
            addressCountry: "UZ",
          },
        },
        areaServed: AREA_SERVED_PLACES,
        knowsLanguage: ["en", "ru", "uz"],
        knowsAbout: ENTITY_KNOWS_ABOUT,
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
        name: `${BRAND_NAME} — ${PROFILE.fullName}`,
        alternateName: BRAND_NAME,
        url: SITE_URL,
        inLanguage: locale,
        description,
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        author: {
          "@id": `${SITE_URL}/#person`,
        },
        about: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: `${PROFILE.fullName} — ${BRAND_NAME} Frontend & B2B Web Engineering`,
        url: homeUrl,
        image: OG_IMAGE_URL,
        logo: LOGO_IMAGE_URL,
        description,
        founder: {
          "@id": `${SITE_URL}/#person`,
        },
        provider: {
          "@id": `${SITE_URL}/#person`,
        },
        email: PROFILE.email,
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressRegion: "Tashkent",
          addressCountry: "UZ",
        },
        areaServed: AREA_SERVED_PLACES,
        knowsAbout: ENTITY_KNOWS_ABOUT,
        serviceType: [...KEY_SERVICES],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Frontend & B2B Web Engineering Services",
          itemListElement: KEY_SERVICES.map((serviceName) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: serviceName,
            },
          })),
        },
        sameAs: [...SAME_AS_LINKS],
      },
    ],
  };
}

export function buildFaqJsonLd(locale: Locale) {
  const { faqSection } = getPortfolioContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(localizePath(locale, ""))}#faq`,
    inLanguage: locale,
    mainEntity: faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
      name: PROFILE.fullName,
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
    keywords: [post.category, BRAND_NAME, PROFILE.fullName],
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
