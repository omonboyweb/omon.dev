import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AllProjectsShowcase } from "@/components/projects/all-projects-showcase";
import {
  getPortfolioContent,
  isLocale,
  localizePath,
  PRIMARY_PROJECT_COUNT,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { buildProjectsNoIndexMetadata } from "@/lib/seo";

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
    return { robots: { index: false, follow: false } };
  }
  const { ui } = getPortfolioContent(lang);
  return buildProjectsNoIndexMetadata(
    lang,
    ui.projects.allProjectsPageTitle,
    ui.projects.allProjectsPageSubtitle,
  );
}

export default async function LocalizedProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { projects, ui } = getPortfolioContent(lang);
  const primaryProjects = projects.slice(0, PRIMARY_PROJECT_COUNT);
  const extraProjects = projects.slice(PRIMARY_PROJECT_COUNT);

  return (
    <main className="flex-1">
      {/* Page Header & Semantic Breadcrumb */}
      <section className="relative border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Breadcrumbs" className="breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <li>
                  <Link
                    href={localizePath(lang, "")}
                    className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground transition-colors"
                  >
                    {ui.projects.backToHome}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath(lang, "/projects")}
                    aria-current="page"
                    className="font-semibold text-foreground"
                  >
                    {ui.projects.backToProjects}
                  </Link>
                </li>
              </ol>
            </nav>

            <Link
              href={localizePath(lang, "")}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>{ui.projects.backToHome}</span>
            </Link>
          </div>

          <div className="mt-6 max-w-3xl space-y-3">
            <div className="font-mono text-xs text-[var(--emerald)]">
              {ui.projects.allProjectsPageEyebrow} · {projects.length}{" "}
              {ui.projects.allCategories.toUpperCase()}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {ui.projects.allProjectsPageTitle}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {ui.projects.allProjectsPageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Dedicated Projects Catalog (Additional builds + 4 Primary builds) */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AllProjectsShowcase
            locale={lang}
            primaryProjects={primaryProjects}
            extraProjects={extraProjects}
            projectsSubtitle={ui.sections.projectsSubtitle}
            ui={{
              allCategories: ui.projects.allCategories,
              categories: ui.projects.categories,
              screenshotsHint: ui.projects.screenshotsHint,
              otherProjectsTitle: ui.projects.otherProjectsTitle,
              otherProjectsSubtitle: ui.projects.otherProjectsSubtitle,
              primaryProjectsBadge: ui.projects.primaryProjectsBadge,
              imageCounter: ui.projects.imageCounter,
              ofWord: ui.projects.ofWord,
              switchToImage: ui.projects.switchToImage,
              closePreviewLabel: ui.projects.closePreviewLabel,
              prevImageLabel: ui.projects.prevImageLabel,
              nextImageLabel: ui.projects.nextImageLabel,
              expand: ui.projects.expand,
              viewWord: ui.projects.viewWord,
              theProblem: ui.projects.theProblem,
              whatIBuilt: ui.projects.whatIBuilt,
              viewDetails: ui.projects.viewDetails,
              visitLiveSite: ui.projects.visitLiveSite,
              inspectFullPreview: ui.projects.inspectFullPreview,
            }}
          />
        </div>
      </section>
    </main>
  );
}
