"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ArrowRight, Images, Layers } from "lucide-react";
import {
  CompactProjectCard,
  type CompactProjectCardUi,
  type CompactProjectData,
} from "@/components/projects/compact-project-card";
import type { LightboxUiStrings } from "@/components/projects/project-lightbox-dialog";
import { type Locale, localizePath } from "@/lib/locale";
import type {
  PortfolioUiStrings,
  ProjectCategoryKey,
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

export interface PrimaryProjectsShowcaseProps {
  locale: Locale;
  projects: CompactProjectData[];
  totalProjectCount: number;
  ui: CompactProjectCardUi &
    LightboxUiStrings &
    Pick<
      PortfolioUiStrings["projects"],
      | "allCategories"
      | "categories"
      | "screenshotsHint"
      | "moreProjectsHint"
      | "otherProjectsSubtitle"
      | "viewAllProjects"
    >;
}

export function PrimaryProjectsShowcase({
  locale,
  projects,
  totalProjectCount,
  ui,
}: PrimaryProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ProjectCategoryKey
  >("all");
  const [lightboxMounted, setLightboxMounted] = useState(false);
  const [lightboxTarget, setLightboxTarget] = useState<{
    projectId: string;
    imageIndex: 0 | 1;
  } | null>(null);

  const presentCategories = new Set(projects.map((p) => p.categoryKey));
  const availableCategories = PROJECT_CATEGORY_KEYS.filter(
    (key) => key === "all" || presentCategories.has(key),
  );

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.categoryKey === selectedCategory);

  const openLightbox = useCallback((projectId: string, imageIndex: 0 | 1) => {
    setLightboxMounted(true);
    setLightboxTarget({ projectId, imageIndex });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxTarget(null);
  }, []);

  const lightboxProject = lightboxTarget
    ? (projects.find((p) => p.id === lightboxTarget.projectId) ??
      projects[0] ??
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

      {/* Shortened 2x2 Grid for the 4 Primary Projects on Main Page */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <CompactProjectCard
            key={project.id}
            locale={locale}
            project={project}
            ui={ui}
            onOpenLightbox={openLightbox}
          />
        ))}
      </div>

      {/* Call-to-action footer linking to the dedicated /projects page */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card/50 p-5 sm:flex-row sm:items-center sm:px-6">
        <div className="space-y-1">
          <div className="font-mono text-xs text-[var(--emerald)]">
            {ui.moreProjectsHint} · {totalProjectCount}{" "}
            {ui.allCategories.toLowerCase()}
          </div>
          <p className="text-xs text-muted-foreground">
            {ui.otherProjectsSubtitle}
          </p>
        </div>

        <Link
          href={localizePath(locale, "/projects")}
          rel="nofollow"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Layers className="size-3.5" />
          <span>{ui.viewAllProjects}</span>
          <ArrowRight className="size-3.5" />
        </Link>
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
