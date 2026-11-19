"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Images } from "lucide-react";
import { CompactProjectCard } from "@/components/projects/compact-project-card";
import {
  DetailedProjectCard,
  type DetailedProjectCardUi,
} from "@/components/projects/detailed-project-card";
import type { LightboxUiStrings } from "@/components/projects/project-lightbox-dialog";
import type { Locale } from "@/lib/locale";
import type {
  PortfolioUiStrings,
  ProjectCategoryKey,
  ProjectItem,
} from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const ProjectLightboxDialog = dynamic(
  () =>
    import("@/components/projects/project-lightbox-dialog").then(
      (mod) => mod.ProjectLightboxDialog,
    ),
  { ssr: false },
);

const PROJECT_CATEGORY_KEYS: ReadonlyArray<"all" | ProjectCategoryKey> = [
  "all",
  "education",
  "productivity",
  "fintech",
  "foodtech",
  "media",
];

export interface AllProjectsShowcaseProps {
  locale: Locale;
  primaryProjects: ProjectItem[];
  extraProjects: ProjectItem[];
  projectsSubtitle: string;
  ui: DetailedProjectCardUi &
    LightboxUiStrings &
    Pick<
      PortfolioUiStrings["projects"],
      | "allCategories"
      | "categories"
      | "screenshotsHint"
      | "otherProjectsTitle"
      | "otherProjectsSubtitle"
      | "primaryProjectsBadge"
    >;
}

export function AllProjectsShowcase({
  locale,
  primaryProjects,
  extraProjects,
  projectsSubtitle,
  ui,
}: AllProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ProjectCategoryKey
  >("all");
  const [lightboxMounted, setLightboxMounted] = useState(false);
  const [lightboxTarget, setLightboxTarget] = useState<{
    projectId: string;
    imageIndex: 0 | 1;
  } | null>(null);

  const allProjects = [...extraProjects, ...primaryProjects];
  const presentCategories = new Set(allProjects.map((p) => p.categoryKey));
  const availableCategories = PROJECT_CATEGORY_KEYS.filter(
    (key) => key === "all" || presentCategories.has(key),
  );

  const filteredPrimary =
    selectedCategory === "all"
      ? primaryProjects
      : primaryProjects.filter((p) => p.categoryKey === selectedCategory);

  const filteredExtra =
    selectedCategory === "all"
      ? extraProjects
      : extraProjects.filter((p) => p.categoryKey === selectedCategory);

  const openLightbox = useCallback((projectId: string, imageIndex: 0 | 1) => {
    setLightboxMounted(true);
    setLightboxTarget({ projectId, imageIndex });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxTarget(null);
  }, []);

  const lightboxProject = lightboxTarget
    ? (allProjects.find((p) => p.id === lightboxTarget.projectId) ??
      allProjects[0] ??
      null)
    : null;

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {availableCategories.map((key) => {
            const active = selectedCategory === key;
            const label =
              key === "all" ? ui.allCategories : ui.categories[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors cursor-pointer",
                  active
                    ? "border-foreground bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Images className="size-3.5 text-[var(--signal)]" />
          <span>{ui.screenshotsHint}</span>
        </div>
      </div>

      <div className="space-y-12">
        {/* Additional / Rest of the Projects */}
        {filteredExtra.length > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-end">
              <div>
                <div className="font-mono text-xs text-[var(--signal)]">
                  01 // {ui.otherProjectsTitle.toUpperCase()}
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {ui.otherProjectsTitle}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {ui.otherProjectsSubtitle}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {filteredExtra.map((project, idx) => (
                <DetailedProjectCard
                  key={project.id}
                  locale={locale}
                  project={project}
                  ui={ui}
                  priority={idx === 0}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* 4 Primary Projects */}
        {filteredPrimary.length > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-end">
              <div>
                <div className="font-mono text-xs text-[var(--emerald)]">
                  02 // {ui.primaryProjectsBadge.toUpperCase()}
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {ui.primaryProjectsBadge}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {projectsSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredPrimary.map((project) => (
                <CompactProjectCard
                  key={project.id}
                  locale={locale}
                  project={project}
                  ui={ui}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {lightboxMounted ? (
        <ProjectLightboxDialog
          open={lightboxTarget !== null}
          onClose={closeLightbox}
          project={lightboxProject}
          imageIndex={lightboxTarget?.imageIndex ?? 0}
          onSwitchImage={(nextIndex) => {
            if (lightboxProject) {
              setLightboxTarget({
                projectId: lightboxProject.id,
                imageIndex: nextIndex,
              });
            }
          }}
          ui={ui}
        />
      ) : null}
    </div>
  );
}
