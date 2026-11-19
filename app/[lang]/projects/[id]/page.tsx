import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectDetailCaseStudy } from "@/components/project-detail/project-detail-case-study";
import { ProjectDetailGallery } from "@/components/project-detail/project-detail-gallery";
import { ProjectDetailHero } from "@/components/project-detail/project-detail-hero";
import { ProjectDetailPagination } from "@/components/project-detail/project-detail-pagination";
import {
  getAllProjectIds,
  getPortfolioContent,
  getProjectById,
  isLocale,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { buildProjectsNoIndexMetadata, NOINDEX_ROBOTS } from "@/lib/seo";

export function generateStaticParams() {
  const ids = getAllProjectIds();
  return SUPPORTED_LOCALES.flatMap((lang) => ids.map((id) => ({ lang, id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;

  if (!isLocale(lang)) {
    return { robots: NOINDEX_ROBOTS };
  }

  const localizedProject = getProjectById(lang, id);

  if (!localizedProject) {
    return {
      title: "Project Not Found",
      robots: NOINDEX_ROBOTS,
    };
  }

  return buildProjectsNoIndexMetadata(
    lang,
    `${localizedProject.title} — ${localizedProject.subtitle}`,
    localizedProject.summary,
  );
}

function ProjectDetailSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <section className="relative border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-6 animate-pulse">
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-48 rounded bg-muted" />
            <div className="h-8 w-28 rounded-md bg-muted" />
          </div>
          <div className="max-w-3xl space-y-3">
            <div className="flex gap-2">
              <div className="h-6 w-28 rounded-full bg-muted" />
              <div className="h-6 w-24 rounded-full bg-muted" />
            </div>
            <div className="h-10 w-2/3 rounded-lg bg-muted" />
            <div className="h-6 w-5/6 rounded bg-muted/80" />
            <div className="h-4 w-full rounded bg-muted/60" />
          </div>
          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
            <div className="h-24 rounded-xl border border-border bg-card/70" />
            <div className="h-24 rounded-xl border border-border bg-card/70" />
            <div className="h-24 rounded-xl border border-border bg-card/70" />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/20 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 animate-pulse">
          <div className="aspect-[16/9] w-full rounded-2xl border border-border bg-card/50" />
        </div>
      </section>
    </div>
  );
}

async function ProjectDetailContent({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { projects, ui } = getPortfolioContent(lang);
  const currentIndex = projects.findIndex((p) => p.id === id);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <ProjectDetailHero
        locale={lang}
        project={project}
        ui={{
          backToHome: ui.projects.backToHome,
          backToProjects: ui.projects.backToProjects,
          visitLiveSite: ui.projects.visitLiveSite,
        }}
      />

      <ProjectDetailGallery
        project={{
          id: project.id,
          title: project.title,
          category: project.category,
          images: project.images,
        }}
        ui={{
          imageCounter: ui.projects.imageCounter,
          ofWord: ui.projects.ofWord,
          switchToImage: ui.projects.switchToImage,
          closePreviewLabel: ui.projects.closePreviewLabel,
          prevImageLabel: ui.projects.prevImageLabel,
          nextImageLabel: ui.projects.nextImageLabel,
          inspectFullPreview: ui.projects.inspectFullPreview,
          expand: ui.projects.expand,
          viewWord: ui.projects.viewWord,
        }}
      />

      <section className="deferred-section py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ProjectDetailCaseStudy
            project={project}
            ui={{
              theProblem: ui.projects.theProblem,
              whatIBuilt: ui.projects.whatIBuilt,
              keyHighlightsTitle: ui.projects.keyHighlightsTitle,
              techStackTitle: ui.projects.techStackTitle,
              affiliationLabel: ui.projects.affiliationLabel,
              roleLabel: ui.projects.roleLabel,
              categoryLabel: ui.projects.categoryLabel,
              codeAccessLabel: ui.projects.codeAccessLabel,
              yearLabel: ui.projects.yearLabel,
              ipDisclosureNote: ui.projects.ipDisclosureNote,
              visitLiveSite: ui.projects.visitLiveSite,
            }}
          />

          <ProjectDetailPagination
            locale={lang}
            prevProject={prevProject}
            nextProject={nextProject}
            ui={{
              prevProject: ui.projects.prevProject,
              nextProject: ui.projects.nextProject,
              backToProjects: ui.projects.backToProjects,
              viewAllProjects: ui.projects.viewAllProjects,
            }}
          />
        </div>
      </section>
    </>
  );
}

export default function LocalizedProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailContent params={params} />
      </Suspense>
    </main>
  );
}
