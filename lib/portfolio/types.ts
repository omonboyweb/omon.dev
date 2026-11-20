export type Locale = "en" | "ru" | "uz";

export interface Metric {
  label: string;
  value: string;
  delta?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export type ProjectCategoryKey =
  | "fintech"
  | "productivity"
  | "education"
  | "foodtech"
  | "media";

export type ProjectOriginKey = "company" | "client" | "opensource";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  categoryKey: ProjectCategoryKey;
  category: string;
  year: string;
  role: string;
  originType: ProjectOriginKey;
  companyName?: string;
  affiliationBadge: string;
  codeAccessBadge: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  results: Metric[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  images: [ProjectImage, ProjectImage];
}

export type BlogCategoryKey =
  | "system-design"
  | "product-craft"
  | "problem-solving"
  | "web-speed";

export interface BlogPost {
  id: string;
  slug: string;
  categoryKey: BlogCategoryKey;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  publishedDateIso: string;
  readTime: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  keyTakeaway: string;
}

export interface BentoCard {
  id: string;
  label: string;
  title: string;
  value: string;
  detail: string;
  tags: string[];
}

export interface PrincipleItem {
  code: string;
  title: string;
  body: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EntityOverviewContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  bioSummary: string;
  locationLabel: string;
  locationValue: string;
  roleLabel: string;
  roleValue: string;
  stackTitle: string;
  stackItems: string[];
  servicesTitle: string;
  serviceItems: string[];
  profilesTitle: string;
}

export interface PortfolioUiStrings {
  nav: {
    projects: string;
    blog: string;
    about: string;
    quickSummary: string;
    quickSummaryShort: string;
    openPaletteLabel: string;
  };
  hero: {
    viewProjects: string;
    quickSummaryCta: string;
    instagramCta: string;
    focusLabel: string;
    paletteHint: string;
  };
  sections: {
    projectsEyebrow: string;
    projectsTitle: string;
    projectsSubtitle: string;
    projectsMeta: string;
    blogEyebrow: string;
    blogTitle: string;
    blogSubtitlePrefix: string;
    blogSubtitleSuffix: string;
    blogBadge: string;
    aboutEyebrow: string;
    aboutTitle: string;
    aboutSubtitle: string;
    principlePrefix: string;
  };
  projects: {
    allCategories: string;
    categories: Record<ProjectCategoryKey, string>;
    screenshotsHint: string;
    imageCounter: string;
    ofWord: string;
    expand: string;
    viewWord: string;
    theProblem: string;
    whatIBuilt: string;
    inspectFullPreview: string;
    visitLiveSite: string;
    viewImageWord: string;
    codeLabel: string;
    switchToImage: string;
    closePreviewLabel: string;
    prevImageLabel: string;
    nextImageLabel: string;
    viewDetails: string;
    viewAllProjects: string;
    backToHome: string;
    backToProjects: string;
    primaryProjectsBadge: string;
    otherProjectsTitle: string;
    otherProjectsSubtitle: string;
    allProjectsPageEyebrow: string;
    allProjectsPageTitle: string;
    allProjectsPageSubtitle: string;
    keyHighlightsTitle: string;
    impactMetricsTitle: string;
    techStackTitle: string;
    galleryTitle: string;
    projectOverviewTitle: string;
    roleLabel: string;
    yearLabel: string;
    categoryLabel: string;
    affiliationLabel: string;
    codeAccessLabel: string;
    ipDisclosureNote: string;
    prevProject: string;
    nextProject: string;
    moreProjectsHint: string;
  };
  blog: {
    allCategories: string;
    categories: Record<BlogCategoryKey, string>;
    followHandle: string;
    readingNow: string;
    readPost: string;
    openFullArticle: string;
    viewAllArticles: string;
    backToBlog: string;
    allArticlesEyebrow: string;
    allArticlesTitle: string;
    allArticlesSubtitle: string;
    authorLabel: string;
    keyTakeaway: string;
    prevArticle: string;
    nextArticle: string;
  };
  dialogs: {
    paletteTitle: string;
    searchPlaceholder: string;
    noMatches: string;
    paletteFooterHint: string;
    cmdJumpProjects: string;
    cmdJumpBlog: string;
    cmdJumpAbout: string;
    cmdOpenSummary: string;
    cmdCopyEmail: string;
    cmdOpenIg: string;
    cmdOpenTelegram: string;
    cmdLangEn: string;
    cmdLangRu: string;
    cmdLangUz: string;
    summaryBadge: string;
    featuredAtGlance: string;
    copyEmail: string;
    browseProjects: string;
    activeLabel: string;
    copiedLabel: string;
    summaryHint: string;
    clipboardHint: string;
    externalHint: string;
  };
  footer: {
    tagline: string;
    copyEmailLabel: string;
    github: string;
    linkedin: string;
    telegram: string;
  };
}

export interface LocalizedPortfolioContent {
  profile: {
    name: string;
    fullName: string;
    brandName: string;
    handle: string;
    domain: string;
    role: string;
    headline: string;
    subheadline: string;
    availability: string;
    targetRoles: string;
    location: string;
    email: string;
    links: {
      instagram: string;
      telegram: string;
      github: string;
      linkedin: string;
      website: string;
    };
    recruiterHighlights: { label: string; value: string }[];
  };
  entityOverview: EntityOverviewContent;
  faqSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  bentoMetrics: BentoCard[];
  projects: ProjectItem[];
  blogPosts: BlogPost[];
  principles: PrincipleItem[];
  ui: PortfolioUiStrings;
}

export const CORE_STACK = [
  "TypeScript",
  "React",
  "Next.js (App Router, Server Components)",
  "Tailwind CSS",
  "TanStack Query",
  "WebSockets",
  "Python (Telegram Bots & Backend integration)",
] as const;

export const KEY_SERVICES = [
  "High-performance web applications",
  "B2B automation platforms",
  "Custom CRM & admin dashboards",
  "Telegram WebApps",
  "Next.js performance optimization",
] as const;

export const PROFILE = {
  name: "Omon",
  fullName: "Omonbek Xojamurodov",
  brandName: "omon.dev",
  handle: "@omon.dev",
  domain: "omon.dev",
  role: "Frontend Engineer | Next.js & React Specialist",
  headline:
    "Hi, I’m Omon. I design and build fast, intuitive web apps that solve real problems.",
  subheadline:
    "Frontend Engineer and Next.js & React Specialist in Tashkent, Uzbekistan (omon.dev). I build high-performance web applications, B2B automation platforms, custom CRM & admin dashboards, and Telegram WebApps.",
  availability:
    "Available for Frontend Engineering, Next.js/React & B2B CRM/Web builds",
  targetRoles:
    "Frontend Engineer · Next.js & React Specialist · B2B Web, CRM & Telegram WebApps",
  location: "Tashkent, Uzbekistan · Remote / Global",
  email: "hello@omon.dev",
  links: {
    instagram: "https://instagram.com/omon.dev",
    telegram: "https://t.me/the_khojamurodov",
    github: "https://github.com/omonboyweb",
    linkedin: "https://www.linkedin.com/in/omonbekxojamurodov/",
    website: "https://omon.dev",
  },
  recruiterHighlights: [
    { label: "Focus", value: "Next.js, B2B Systems & Custom CRM" },
    { label: "Core Stack", value: "TypeScript, React, Next.js, Python" },
    { label: "Location", value: "Tashkent, Uzbekistan · Remote" },
    { label: "Community", value: "@omon.dev on Instagram" },
  ],
} as const;
