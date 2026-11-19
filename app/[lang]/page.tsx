import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { InstagramHub } from "@/components/instagram-hub";
import { HeroQuickButtons } from "@/components/navigation/hero-quick-buttons";
import { PrimaryProjectsShowcase } from "@/components/projects/primary-projects-showcase";
import {
  getPortfolioContent,
  isLocale,
  localizePath,
  PRIMARY_PROJECT_COUNT,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { buildHomeMetadata } from "@/lib/seo";

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
  return buildHomeMetadata(lang);
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { profile, bentoMetrics, projects, blogPosts, principles, ui } =
    getPortfolioContent(lang);

  const primaryProjects = projects
    .slice(0, PRIMARY_PROJECT_COUNT)
    .map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      categoryKey: p.categoryKey,
      category: p.category,
      year: p.year,
      role: p.role,
      originType: p.originType,
      affiliationBadge: p.affiliationBadge,
      codeAccessBadge: p.codeAccessBadge,
      summary: p.summary,
      results: p.results,
      stack: p.stack,
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
      images: p.images,
    }));

  return (
    <main className="flex-1">
      {/* Hero & 4-Card Overview Grid */}
      <section className="relative border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-[var(--emerald)]" />
              <span>{profile.availability}</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
              {profile.headline}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.subheadline}
            </p>

            <HeroQuickButtons
              locale={lang}
              instagramUrl={profile.links.instagram}
              ui={{
                viewProjects: ui.hero.viewProjects,
                viewAllProjects: ui.projects.viewAllProjects,
                quickSummaryCta: ui.hero.quickSummaryCta,
                instagramCta: ui.hero.instagramCta,
              }}
            />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono text-xs text-muted-foreground">
              <span>
                {ui.hero.focusLabel}: {profile.targetRoles}
              </span>
              <span className="hidden sm:inline">·</span>
              <span>{ui.hero.paletteHint}</span>
            </div>
          </div>

          {/* 4-Card Plain-Language Bento Grid */}
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {bentoMetrics.map((card) => (
              <article
                key={card.id}
                className="flex flex-col justify-between bg-background p-5 transition-colors hover:bg-card/70"
              >
                <div>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    {card.label}
                  </div>
                  <h2 className="mt-2 text-sm font-semibold text-foreground">
                    {card.title}
                  </h2>
                  <div className="mt-1 font-mono text-sm font-medium text-[var(--signal)]">
                    {card.value}
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                    {card.detail}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-card px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 01: Featured Projects Showcase */}
      <section
        id="projects"
        className="deferred-section border-b border-border py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="font-mono text-xs text-[var(--emerald)]">
                {ui.sections.projectsEyebrow}
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {ui.sections.projectsTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {ui.sections.projectsSubtitle}
              </p>
            </div>
            <Link
              href={localizePath(lang, "/projects")}
              rel="nofollow"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--signal)] hover:underline"
            >
              <span>{ui.sections.projectsMeta}</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <PrimaryProjectsShowcase
            locale={lang}
            projects={primaryProjects}
            totalProjectCount={projects.length}
            ui={{
              allCategories: ui.projects.allCategories,
              categories: ui.projects.categories,
              screenshotsHint: ui.projects.screenshotsHint,
              moreProjectsHint: ui.projects.moreProjectsHint,
              otherProjectsSubtitle: ui.projects.otherProjectsSubtitle,
              viewAllProjects: ui.projects.viewAllProjects,
              prevImageLabel: ui.projects.prevImageLabel,
              nextImageLabel: ui.projects.nextImageLabel,
              expand: ui.projects.expand,
              viewDetails: ui.projects.viewDetails,
              visitLiveSite: ui.projects.visitLiveSite,
              imageCounter: ui.projects.imageCounter,
              ofWord: ui.projects.ofWord,
              switchToImage: ui.projects.switchToImage,
              closePreviewLabel: ui.projects.closePreviewLabel,
            }}
          />
        </div>
      </section>

      {/* Section 02: Blog & Articles */}
      <section
        id="companion"
        className="deferred-section border-b border-border bg-card/20 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="font-mono text-xs text-[var(--signal)]">
                {ui.sections.blogEyebrow}
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {ui.sections.blogTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {ui.sections.blogSubtitlePrefix}
                <a
                  href={profile.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  @omon.dev
                </a>
                {ui.sections.blogSubtitleSuffix}
              </p>
            </div>
            <Link
              href={localizePath(lang, "/blog")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
            >
              <BookOpen className="size-3.5 text-[var(--emerald)]" />
              <span>{ui.blog.viewAllArticles}</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <InstagramHub
            locale={lang}
            blogPosts={blogPosts}
            instagramUrl={profile.links.instagram}
            ui={{
              allCategories: ui.blog.allCategories,
              categories: ui.blog.categories,
              followHandle: ui.blog.followHandle,
              readingNow: ui.blog.readingNow,
              readPost: ui.blog.readPost,
              openFullArticle: ui.blog.openFullArticle,
              keyTakeaway: ui.blog.keyTakeaway,
              prevArticle: ui.blog.prevArticle,
              nextArticle: ui.blog.nextArticle,
            }}
          />
        </div>
      </section>

      {/* Section 03: How I Work & Contact */}
      <section id="architecture" className="deferred-section py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <div className="font-mono text-xs text-muted-foreground">
              {ui.sections.aboutEyebrow}
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {ui.sections.aboutTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {ui.sections.aboutSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <div
                key={item.code}
                className="rounded-xl border border-border bg-card/50 p-5"
              >
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>
                    {ui.sections.principlePrefix} {item.code}
                  </span>
                  <ShieldCheck className="size-3.5 text-[var(--emerald)]" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
