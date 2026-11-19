import { type LocalizedPortfolioContent, PROFILE } from "./types";

export const enContent: LocalizedPortfolioContent = {
  profile: {
    ...PROFILE,
    links: { ...PROFILE.links },
    recruiterHighlights: [...PROFILE.recruiterHighlights],
  },
  bentoMetrics: [
    {
      id: "what-i-build",
      label: "01 / WHAT I BUILD",
      title: "Apps People Love Using",
      value: "Web & Mobile Products",
      detail:
        "End-to-end digital products—from payment dashboards and team workspaces to interactive learning tools—built for clarity and daily reliability.",
      tags: ["Product Design", "Web Apps", "Mobile UX", "APIs"],
    },
    {
      id: "my-approach",
      label: "02 / MY APPROACH",
      title: "Speed & Simplicity",
      value: "Instant & Intuitive",
      detail:
        "Software should feel effortless. Every button responds right away, pages load in a split second, and nothing gets lost if your Wi-Fi drops.",
      tags: ["Fast Load", "Offline Safe", "Clear UX"],
    },
    {
      id: "omon-dev",
      label: "03 / @OMON.DEV & BLOG",
      title: "Tech Explained Simply",
      value: "Instagram & Blog Articles",
      detail:
        "I share quick visual takeaways on @omon.dev and publish clear, plain-English blog posts right here breaking down how great apps work.",
      tags: ["Instagram @omon.dev", "Blog Articles", "Plain English"],
    },
    {
      id: "quality-bar",
      label: "04 / QUALITY BAR",
      title: "Built to Scale",
      value: "Google & Meta Standards",
      detail:
        "Designed for real-world traffic, keyboard and screen-reader accessibility, and clean engineering under the hood so products grow without breaking.",
      tags: ["Accessibility", "Reliability", "Clean Code"],
    },
  ],
  projects: [
    {
      id: "igoo",
      title: "Igoo",
      subtitle:
        "Multi-tenant CRM with cross-subdomain authentication for learning centers",
      categoryKey: "education",
      category: "Education & CRM",
      year: "2026",
      role: "Frontend Engineer",
      originType: "company",
      companyName: "Infonex",
      affiliationBadge: "Built at Infonex",
      codeAccessBadge: "Private Repo · Infonex",
      summary:
        "Cloud CRM and ERP platform for learning centers built at Infonex—where I engineered seamless cross-subdomain token transfer from igoo.uz to tenant workspaces, alongside full API integration and core UI modules.",
      problem:
        "In multi-tenant SaaS platforms, signing up on the main domain (igoo.uz) and redirecting to a new school subdomain often forces users to log in a second time, creating onboarding friction alongside complex API state management.",
      solution:
        "I engineered a seamless cross-subdomain authentication handoff that transfers tokens from igoo.uz directly to the user's dedicated subdomain upon sign-up—eliminating repeat logins—and built the frontend UI components and API integration layers.",
      highlights: [
        "Cross-Subdomain Token Handoff: Built the sign-up authentication flow on igoo.uz that securely transfers session tokens to the newly created center subdomain so users enter their workspace without logging in again.",
        "End-to-End API Integration: Architected client-side API request layers, state synchronization, and error handling across CRM and ERP workflows.",
        "Multi-Tenant UI Engineering: Built responsive, interactive UI screens for student admissions, group management, schedules, and financial dashboards.",
      ],
      results: [
        {
          label: "Subdomain Auth",
          value: "Zero Re-Login",
          delta: "igoo.uz → subdomain token handoff",
        },
        {
          label: "Architecture",
          value: "Multi-Tenant",
          delta: "Isolated school subdomains",
        },
        {
          label: "Engineering Scope",
          value: "UI & APIs",
          delta: "Full frontend & auth flows",
        },
      ],
      stack: [
        "Next.js",
        "React 19",
        "TypeScript",
        "TanStack Query",
        "Cross-Subdomain Auth",
        "Tailwind CSS",
      ],
      liveUrl: "https://igoo.uz",
      images: [
        {
          src: "/projects/igoo-dashboard.svg",
          alt: "Igoo main dashboard illustration showing student metrics, monthly revenue charts, payment breakdowns, and class schedules.",
          label: "Executive Center Dashboard",
          caption:
            "UI concept preview: after signing up on igoo.uz, center owners land directly in their custom subdomain dashboard without logging in twice.",
        },
        {
          src: "/projects/igoo-leads-groups.svg",
          alt: "Visual drag-and-drop board for prospective students and detailed class attendance view in Igoo.",
          label: "Admissions & Group Tracking",
          caption:
            "UI concept preview: responsive UI modules and real-time API integrations for tracking student inquiries, trial classes, and group attendance.",
        },
      ],
    },
    {
      id: "homex-admin",
      title: "HomeX Admin",
      subtitle:
        "Operations dashboard with dynamic checkbox-based page permissions",
      categoryKey: "productivity",
      category: "Operations & Productivity",
      year: "2026",
      role: "Frontend Engineer",
      originType: "company",
      companyName: "Infonex",
      affiliationBadge: "Built at Infonex",
      codeAccessBadge: "Private Repo · Infonex",
      summary:
        "Internal operations and management platform developed at Infonex—where I built the frontend UI architecture and engineered the granular role-based access control (RBAC) system for staff permissions.",
      problem:
        "As operations teams grow, giving every staff member access to the entire admin panel exposes sensitive data and clutters workflows—requiring a flexible way for admins to control exactly which pages each employee can open.",
      solution:
        "At Infonex, I built the platform's UI modules and implemented a dynamic permission system where admins assign allowed pages via checkboxes when adding an employee, ensuring staff members only see and access their authorized routes upon login.",
      highlights: [
        "Checkbox-Driven Page Permissions: Engineered the staff onboarding flow where admins select exact page-level permissions via checkboxes when creating or editing an employee account.",
        "Strict Route & Navigation Guards: Enforced client-side and route-level access control so logged-in employees only see and navigate to the specific pages permitted for their role.",
        "Modular Admin UI Components: Built clean, reusable UI interfaces, data tables, and operational views across the HomeX management workspace.",
      ],
      results: [
        {
          label: "Access Control",
          value: "Page-Level",
          delta: "Granular checkbox permissions",
        },
        {
          label: "Route Security",
          value: "100% Guarded",
          delta: "Only permitted pages visible",
        },
        {
          label: "Frontend Scope",
          value: "UI & RBAC",
          delta: "Clean admin interfaces",
        },
      ],
      stack: [
        "React 19",
        "TypeScript",
        "Role-Based Access (RBAC)",
        "Tailwind CSS",
        "TanStack Query",
        "Dynamic Routing",
      ],
      images: [
        {
          src: "/projects/homex-dashboard.svg",
          alt: "HomeX Admin dashboard illustration showing daily order metrics, revenue charts, and active service requests.",
          label: "Role-Aware Admin UI",
          caption:
            "UI concept preview: clean operational dashboard where navigation and modules dynamically adapt to the logged-in employee's assigned permissions.",
        },
        {
          src: "/projects/homex-map.svg",
          alt: "Real-time map tracking active home service technicians across the city with status filters.",
          label: "Staff & Operations Modules",
          caption:
            "UI concept preview: admins configure checkbox-based page permissions per employee so dispatchers and managers only access their designated tools.",
        },
      ],
    },
    {
      id: "tashkent-logistic",
      title: "Tashkent Logistics",
      subtitle:
        "Custom Telegram bot built from 2-day on-site business & accounting discovery",
      categoryKey: "fintech",
      category: "Fleet & Operations",
      year: "2026",
      role: "Product & Full-Stack Engineer",
      originType: "client",
      affiliationBadge: "Custom Client Project",
      codeAccessBadge: "Private Client Code",
      summary:
        "Bespoke logistics and accounting automation built after spending two full days embedded on-site with the client's team—studying their real-world workflow bottlenecks and financial calculations from the inside to deliver a Telegram bot they loved.",
      problem:
        "Logistics operations were losing time and accuracy due to manual accounting, scattered order tracking, and day-to-day operational friction that couldn't be solved without truly understanding how the business ran on the ground.",
      solution:
        "I spent two days working side-by-side with the company inside their operations, mapped out their exact financial calculations and operational pain points, and built a tailored Telegram bot that automated their daily workflows and accounting.",
      highlights: [
        "2-Day On-Site Operational Discovery: Immersed directly inside the business for two days to observe real operations, identify hidden bottlenecks, and learn their exact accounting formulas.",
        "Tailored Telegram Bot Automation: Engineered a custom Telegram bot built around their real daily habits to handle order logging, driver calculations, and financial tracking.",
        "High Client Satisfaction & Adoption: Delivered a practical, zero-friction solution that solved their exact pain points and earned enthusiastic praise from the entire team.",
      ],
      results: [
        {
          label: "Field Discovery",
          value: "2 Days On-Site",
          delta: "Inside the daily business",
        },
        {
          label: "Core Solution",
          value: "Telegram Bot",
          delta: "Automated accounting & ops",
        },
        {
          label: "Client Impact",
          value: "100% Adopted",
          delta: "Loved by the client team",
        },
      ],
      stack: [
        "Telegram Bot API",
        "TypeScript",
        "Node.js / Fastify",
        "PostgreSQL",
        "Automated Accounting",
        "Next.js",
      ],
      images: [
        {
          src: "/projects/tashkent-logistic-dashboard.svg",
          alt: "Tashkent Logistics admin dashboard illustration displaying revenue, expenses, unpaid credit, and driver balances.",
          label: "Automated Accounting & Balances",
          caption:
            "UI concept preview: financial calculations and operational metrics structured directly from two days of on-site business analysis.",
        },
        {
          src: "/projects/tashkent-logistic-miniapp.svg",
          alt: "Mobile view of the Telegram bot and Mini App used by the logistics team to track daily operations and calculations.",
          label: "Custom Telegram Bot Workflow",
          caption:
            "UI concept preview: the custom Telegram bot workflow designed around the team's daily habits for fast, error-free order and expense tracking.",
        },
      ],
    },
    {
      id: "halalhub",
      title: "HalalHub",
      subtitle:
        "High-speed halal food platform with smart caching, smooth Reels & OAuth",
      categoryKey: "foodtech",
      category: "Food Delivery & Discovery",
      year: "2026",
      role: "Frontend Engineer",
      originType: "company",
      companyName: "Infonex",
      affiliationBadge: "Built at Infonex",
      codeAccessBadge: "Private Repo · Infonex",
      summary:
        "Consumer food discovery platform developed at Infonex—where I cut initial load times and redundant server requests via React Query and Next.js caching, optimized Reels video scrolling for zero lag, added Google & Apple Auth, and built viewport-driven infinite scroll.",
      problem:
        "Redundant API requests, loading the entire restaurant list at once, and heavy video feeds caused slow initial page loads, unnecessary server load, and laggy scrolling in the Reels discovery section.",
      solution:
        "I implemented multi-layer data caching with React Query and Next.js, engineered lag-free Reels playback and preloading on scroll, integrated secure Google and Apple authentication, and built incremental on-scroll restaurant pagination so only visible items load initially.",
      highlights: [
        "React Query & Next.js Caching: Cached API responses across client and server layers—eliminating redundant network requests and dramatically cutting initial page load times.",
        "Lag-Free Video Reels & Scroll Optimization: Engineered smooth video playback and smart scroll buffering in the Reels feed so videos never stutter or stall while swiping.",
        "On-Scroll Pagination & Google/Apple Auth: Built incremental restaurant loading (rendering only visible items first and fetching more on scroll) alongside secure Google and Apple sign-in.",
      ],
      results: [
        {
          label: "Data Caching",
          value: "React Query + Next",
          delta: "Prevented redundant API calls",
        },
        {
          label: "Reels & Lists",
          value: "Zero-Lag Scroll",
          delta: "Viewport loading & smooth video",
        },
        {
          label: "Authentication",
          value: "Google & Apple",
          delta: "Fast, secure OAuth sign-in",
        },
      ],
      stack: [
        "Next.js",
        "React Query (TanStack)",
        "TypeScript",
        "Google & Apple Auth",
        "Infinite Scroll",
        "Tailwind CSS",
      ],
      liveUrl: "https://wehalalhub.com",
      images: [
        {
          src: "/projects/halalhub-discovery.svg",
          alt: "HalalHub home screen illustration showing verified halal restaurants loaded incrementally with React Query caching.",
          label: "Cached Discovery & Infinite Scroll",
          caption:
            "UI concept preview: fast initial load powered by Next.js + React Query caching, rendering only visible restaurants first and fetching more on scroll.",
        },
        {
          src: "/projects/halalhub-tracking.svg",
          alt: "HalalHub smooth Reels video feed and secure Google and Apple authentication flow.",
          label: "Smooth Video Reels & OAuth",
          caption:
            "UI concept preview: stutter-free Reels video scrolling and secure one-tap sign-in with Google and Apple Auth.",
        },
      ],
    },
    {
      id: "auranews",
      title: "AuraNews",
      subtitle:
        "Automated news aggregation powered by DeepSeek APIs & Google AI Studio",
      categoryKey: "media",
      category: "Media & Productivity",
      year: "2026",
      role: "Creator & Full-Stack Engineer",
      originType: "opensource",
      affiliationBadge: "Open Source Project",
      codeAccessBadge: "Open Source (GitHub)",
      summary:
        "An open-source AI news platform that automatically gathers, analyzes, and structures breaking news from across the internet using DeepSeek APIs and Google AI Studio.",
      problem:
        "Manually monitoring dozens of web sources and summarizing breaking news across the internet takes hours of repetitive effort, delaying timely and structured updates for readers.",
      solution:
        "I architected and built an automated news aggregation engine powered by DeepSeek APIs and Google AI Studio (Gemini) to collect stories from the internet, process and summarize them into clean Uzbek articles, and present them in a modern web portal.",
      highlights: [
        "Internet-Wide News Aggregation: Built automated ingestion pipelines that gather and extract breaking news stories from across the web.",
        "DeepSeek API & Google AI Studio Integration: Leveraged DeepSeek APIs and Google AI Studio models to analyze raw web content, deduplicate stories, and generate structured summaries.",
        "Clean Reader & Editorial Experience: Paired the AI aggregation backend with a fast Next.js interface featuring 3-point summaries and instant Latin/Cyrillic script switching.",
      ],
      results: [
        {
          label: "AI Engine",
          value: "DeepSeek + Google",
          delta: "DeepSeek API & Google Studio",
        },
        {
          label: "Data Collection",
          value: "Automated",
          delta: "Gathers news across the web",
        },
        {
          label: "Open Source",
          value: "100%",
          delta: "Public codebase on GitHub",
        },
      ],
      stack: [
        "Next.js 15",
        "TypeScript",
        "DeepSeek API",
        "Google AI Studio (Gemini)",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      repoUrl: "https://github.com/omonboyweb/news-startup",
      images: [
        {
          src: "/projects/auranews-home.svg",
          alt: "AuraNews homepage showing news stories gathered from the web and summarized via DeepSeek API and Google AI Studio.",
          label: "AI-Curated News Portal",
          caption:
            "Front page displaying breaking stories automatically gathered from the internet and summarized using DeepSeek APIs and Google AI Studio.",
        },
        {
          src: "/projects/auranews-editor.svg",
          alt: "AuraNews AI processing pipeline and editorial dashboard powered by DeepSeek API and Google Studio.",
          label: "DeepSeek & Google Studio Pipeline",
          caption:
            "Editorial dashboard where web-gathered news processed through DeepSeek APIs and Google AI Studio is reviewed and published.",
        },
      ],
    },
  ],
  blogPosts: [
    {
      id: "post-servers-without-breaking",
      slug: "how-big-apps-add-servers-without-breaking",
      categoryKey: "system-design",
      category: "System Design",
      title: "How Apps Like Instagram Scale to Millions Without Slowing Down",
      excerpt:
        "Adding more computers sounds simple—until one mistake moves 85% of user data at once. Here is the smart idea that keeps massive apps calm under growth.",
      publishedAt: "Nov 12, 2026",
      publishedDateIso: "2026-11-12",
      readTime: "4 min read",
      sections: [
        {
          heading: "Why simply splitting users across servers breaks",
          paragraphs: [
            "Imagine a library with 4 bookshelves arranged strictly by dividing each book number by 4. If the library buys a 5th shelf and switches to dividing by 5, almost every single book suddenly belongs on a different shelf.",
            "In real apps, moving almost every user's cached photos and profile data at the exact same moment triggers an enormous traffic spike that can freeze the main database.",
          ],
        },
        {
          heading: "Arranging servers around a shared circle",
          paragraphs: [
            "Instead of dividing by the total count, engineers place both servers and users along a shared circle. Each person simply uses the next server clockwise.",
            "When a new server joins the circle, it only picks up a narrow slice from its immediate neighbor. Everyone else stays right where they are—keeping page loads fast and steady.",
          ],
        },
      ],
      keyTakeaway:
        "Great product reliability isn't magic—it comes from designing systems where normal growth or a single computer failing never creates a domino effect.",
    },
    {
      id: "post-smooth-scrolling",
      slug: "why-scrolling-50000-items-feels-instant",
      categoryKey: "web-speed",
      category: "Web Speed",
      title: "Why Scrolling 50,000 Items Feels Instant on Your Phone",
      excerpt:
        "Trying to draw fifty thousand rows at once freezes almost any phone. Here is how modern feeds stay silky smooth by only working on what you actually see.",
      publishedAt: "Nov 04, 2026",
      publishedDateIso: "2026-11-04",
      readTime: "3 min read",
      sections: [
        {
          heading: "The 16-millisecond race on every swipe",
          paragraphs: [
            "To feel completely natural at 60 frames per second, your phone screen has roughly 16 milliseconds to draw each new frame while your finger scrolls.",
            "If a web app tries to create tens of thousands of hidden boxes off-screen, the browser spends hundreds of milliseconds measuring layouts—causing noticeable stutter.",
          ],
        },
        {
          heading: "Draw the window, not the warehouse",
          paragraphs: [
            "Even in an endless feed or project board, your phone can only display around 8 to 12 items at a time. By rendering just the visible window plus a small buffer above and below, the work stays tiny no matter how huge the list grows.",
          ],
        },
      ],
      keyTakeaway:
        "The fastest software doesn't work harder—it politely skips work the person using the app can't even see.",
    },
    {
      id: "post-offline-first-apps",
      slug: "building-apps-that-never-lose-work-offline",
      categoryKey: "product-craft",
      category: "Product Craft",
      title: "Designing Apps That Never Lose Your Work When Wi-Fi Drops",
      excerpt:
        "You shouldn't lose 20 minutes of notes because your train went through a tunnel. How local-first habits protect everyday users.",
      publishedAt: "Oct 21, 2026",
      publishedDateIso: "2026-10-21",
      readTime: "4 min read",
      sections: [
        {
          heading: "Save locally first, sync quietly second",
          paragraphs: [
            "Traditional web forms freeze with a spinning circle until a distant server confirms your save. If your signal drops halfway through, your changes vanish.",
            "In FlowCanvas, every edit saves on your device immediately in under two milliseconds. The app then syncs changes quietly in the background whenever a connection is available.",
          ],
        },
        {
          heading: "Merging teammate edits without overwriting",
          paragraphs: [
            "When two teammates edit different cards on the same board while offline, each update carries a timestamped order marker so both changes combine cleanly instead of one person erasing the other.",
          ],
        },
      ],
      keyTakeaway:
        "Respecting someone's time means never making them wait on a spinner—and never losing work because of spotty Wi-Fi.",
    },
    {
      id: "post-smart-search-habits",
      slug: "how-instant-search-avoids-repeating-work",
      categoryKey: "problem-solving",
      category: "Problem Solving",
      title: "The Simple Mental Trick Behind Instant Search & Smart Filtering",
      excerpt:
        "Why re-checking everything from scratch slows down growing apps—and how remembering just one small clue makes search feel instantaneous.",
      publishedAt: "Oct 08, 2026",
      publishedDateIso: "2026-10-08",
      readTime: "3 min read",
      sections: [
        {
          heading: "Spotting wasted repetition",
          paragraphs: [
            "When checking long streams of transactions or messages, starting over from the beginning for every single item causes work to grow rapidly as data scales.",
            "Instead, keeping track of where you last saw a match lets you slide forward cleanly in a single pass—never scanning the same territory twice.",
          ],
        },
        {
          heading: "Why this matters outside interviews",
          paragraphs: [
            "This exact habit powers live duplicate payment checks, instant search bars, and clean real-time notifications—turning sluggish pages into snappy everyday tools.",
          ],
        },
      ],
      keyTakeaway:
        "Strong problem solving isn't about memorizing tricks—it's about noticing what you already learned a moment ago so you never pay for it twice.",
    },
  ],
  principles: [
    {
      code: "01",
      title: "Start With the User, Not the Jargon",
      body: "Software is only impressive if real people find it effortless. I focus on clear screens, instant responses, and journeys that work cleanly on any phone or laptop.",
    },
    {
      code: "02",
      title: "Built to Stay Fast Under Pressure",
      body: "Whether a payment page gets thousands of visitors at once or someone edits a board offline on a flight, I design products so nothing slows down or gets lost.",
    },
    {
      code: "03",
      title: "Explain Complex Tech Simply (@omon.dev)",
      body: "If I can't explain how a system works in 60 seconds without buzzwords, I keep refining until it's crystal clear—both in my articles and in my products.",
    },
  ],
  ui: {
    nav: {
      projects: "01. Projects",
      blog: "02. Blog",
      about: "03. About",
      quickSummary: "Quick Summary",
      quickSummaryShort: "Summary",
      openPaletteLabel: "Open command palette",
    },
    hero: {
      viewProjects: "View My Projects",
      quickSummaryCta: "Quick Summary / Contact",
      instagramCta: "@omon.dev on Instagram",
      focusLabel: "Focus",
      paletteHint: "Press ⌘K / Ctrl+K for Quick Search",
    },
    sections: {
      projectsEyebrow: "01 // FEATURED PROJECTS",
      projectsTitle: "Products I've designed and built",
      projectsSubtitle:
        "Explore what each project does, the everyday problem it solves, and switch between two screens of every product—no coding background needed.",
      projectsMeta: "4 primary builds · Explore all projects →",
      blogEyebrow: "02 // BLOG & ARTICLES",
      blogTitle: "Thoughts on building fast, everyday digital products",
      blogSubtitlePrefix:
        "Long-form blog posts expanding on the ideas I share on ",
      blogSubtitleSuffix:
        "—written in plain English so anyone can read and enjoy them.",
      blogBadge: "4 Articles · Plain English",
      aboutEyebrow: "03 // HOW I WORK & QUALITY STANDARDS",
      aboutTitle: "Built with clarity for users—and rigor for teams",
      aboutSubtitle:
        "Great products combine human-friendly simplicity on the surface with solid engineering underneath.",
      principlePrefix: "PRINCIPLE",
    },
    projects: {
      allCategories: "All Projects",
      categories: {
        fintech: "Fleet & Operations",
        productivity: "Operations & Productivity",
        education: "Education & CRM",
        foodtech: "Food Delivery & Discovery",
        media: "Media & Productivity",
      },
      screenshotsHint: "2 interactive screenshots per project",
      imageCounter: "Image",
      ofWord: "of",
      expand: "Expand",
      viewWord: "VIEW",
      theProblem: "The Problem",
      whatIBuilt: "What I Built",
      inspectFullPreview: "Inspect Full Preview",
      visitLiveSite: "Visit Live Site",
      viewImageWord: "View Image",
      codeLabel: "Code",
      switchToImage: "Switch to Image",
      closePreviewLabel: "Close expanded project image",
      prevImageLabel: "Previous image",
      nextImageLabel: "Next image",
      viewDetails: "Project Details",
      viewAllProjects: "View All Projects",
      backToHome: "Home",
      backToProjects: "All Projects",
      primaryProjectsBadge: "4 Primary Projects",
      otherProjectsTitle: "More Projects",
      otherProjectsSubtitle:
        "Additional builds and specialized systems beyond the 4 primary projects on the main page.",
      allProjectsPageEyebrow: "PORTFOLIO ARCHIVE // PROJECTS",
      allProjectsPageTitle: "All Projects & Case Studies",
      allProjectsPageSubtitle:
        "Browse every product I've designed and engineered—including the 4 primary projects from the main page and additional specialized builds. Open any project for its full breakdown and interactive screens.",
      keyHighlightsTitle: "Key Capabilities & Highlights",
      impactMetricsTitle: "Key Results & Metrics",
      techStackTitle: "Technology Stack",
      galleryTitle: "Interactive Product Screens",
      projectOverviewTitle: "Overview & Architecture",
      roleLabel: "Role",
      yearLabel: "Year",
      categoryLabel: "Category",
      affiliationLabel: "Engagement",
      codeAccessLabel: "Source Code",
      ipDisclosureNote:
        "Source code and internal company/client structures are kept private to respect intellectual property and confidentiality.",
      prevProject: "Previous Project",
      nextProject: "Next Project",
      moreProjectsHint: "Showing 4 primary projects on the main page",
    },
    blog: {
      allCategories: "All",
      categories: {
        "system-design": "System Design",
        "product-craft": "Product Craft",
        "problem-solving": "Problem Solving",
        "web-speed": "Web Speed",
      },
      followHandle: "Follow @omon.dev",
      readingNow: "Reading now →",
      readPost: "Read post →",
      openFullArticle: "Open full article",
      viewAllArticles: "All blog articles",
      backToBlog: "Blog",
      allArticlesEyebrow: "JOURNAL // BLOG & ARTICLES",
      allArticlesTitle: "Engineering & Product Articles",
      allArticlesSubtitle:
        "Clear, practical writing on frontend performance, Next.js architecture, system design, and product craft by Omonbek Khojamurodov (omon.dev).",
      authorLabel: "Written by",
      keyTakeaway: "Key Takeaway",
      prevArticle: "Previous Article",
      nextArticle: "Next Article",
    },
    dialogs: {
      paletteTitle: "Command Palette · omon.dev",
      searchPlaceholder:
        "Jump to projects, blog, @omon.dev, or switch language...",
      noMatches: "No matching commands for",
      paletteFooterHint: "↑↓ Navigate · ↵ Run · Esc Close",
      cmdJumpProjects: "Jump to Featured Projects & Screenshots",
      cmdJumpBlog: "Open Blog & Articles (@omon.dev)",
      cmdJumpAbout: "Jump to How I Work & Principles",
      cmdOpenSummary: "Open Quick Summary & Contact",
      cmdCopyEmail: "Copy email",
      cmdOpenIg: "Open @omon.dev on Instagram",
      cmdOpenTelegram: "Contact on Telegram (@the_khojamurodov)",
      cmdLangEn: "Language: English (EN)",
      cmdLangRu: "Language: Русский (RU)",
      cmdLangUz: "Language: Oʻzbekcha (UZ)",
      summaryBadge: "ABOUT & QUICK SUMMARY",
      featuredAtGlance: "Featured Projects at a Glance",
      copyEmail: "Copy email",
      browseProjects: "Browse featured projects →",
      activeLabel: "Active",
      copiedLabel: "Copied!",
      summaryHint: "Summary",
      clipboardHint: "Clipboard",
      externalHint: "External",
    },
    footer: {
      tagline:
        "Designed & engineered by Omonbek Khojamurodov · omon.dev. Fast, accessible, and easy to explore.",
      copyEmailLabel: "Copy hello@omon.dev email address",
      github: "GitHub",
      telegram: "Telegram",
    },
  },
};
