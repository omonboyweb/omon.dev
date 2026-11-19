import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { TopNavAndDialogs } from "@/components/command-dialog";
import { SiteFooter } from "@/components/site-footer";
import {
  getPortfolioContent,
  isLocale,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import {
  buildPersonAndWebsiteJsonLd,
  buildRootLayoutMetadata,
  serializeJsonLd,
} from "@/lib/seo";

export const ensureStatic = "navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  return buildRootLayoutMetadata(lang);
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { profile, projects, blogPosts, ui } = getPortfolioContent(lang);
  const jsonLd = buildPersonAndWebsiteJsonLd(lang);

  const navProjects = projects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    affiliationBadge: p.affiliationBadge,
    stack: p.stack,
  }));

  const paletteBlogPosts = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
  }));

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <TopNavAndDialogs
            locale={lang}
            navUi={ui.nav}
            dialogsUi={ui.dialogs}
            telegramLabel={ui.footer.telegram}
            profile={{
              fullName: profile.fullName,
              role: profile.role,
              availability: profile.availability,
              location: profile.location,
              email: profile.email,
              links: {
                telegram: profile.links.telegram,
                instagram: profile.links.instagram,
              },
              recruiterHighlights: profile.recruiterHighlights,
            }}
            projects={navProjects}
            blogPosts={paletteBlogPosts}
          />

          {children}

          <SiteFooter
            email={profile.email}
            links={{
              telegram: profile.links.telegram,
              instagram: profile.links.instagram,
              github: profile.links.github,
            }}
            ui={ui.footer}
          />
        </div>
      </body>
    </html>
  );
}
