import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Locale, localizePath } from "@/lib/locale";
import type { PortfolioUiStrings, ProjectItem } from "@/lib/portfolio/types";

export interface ProjectDetailPaginationProps {
  locale: Locale;
  prevProject: Pick<ProjectItem, "id" | "title" | "subtitle"> | null;
  nextProject: Pick<ProjectItem, "id" | "title" | "subtitle"> | null;
  ui: Pick<
    PortfolioUiStrings["projects"],
    "prevProject" | "nextProject" | "backToProjects" | "viewAllProjects"
  >;
}

export function ProjectDetailPagination({
  locale,
  prevProject,
  nextProject,
  ui,
}: ProjectDetailPaginationProps) {
  return (
    <nav
      aria-label="Project pagination"
      className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prevProject ? (
        <Link
          href={localizePath(locale, `/projects/${prevProject.id}`)}
          rel="nofollow"
          className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            <span>{ui.prevProject}</span>
          </span>
          <div className="mt-2">
            <div className="text-base font-semibold text-foreground">
              {prevProject.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {prevProject.subtitle}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={localizePath(locale, "/projects")}
          rel="nofollow"
          className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            <span>{ui.backToProjects}</span>
          </span>
          <div className="mt-2">
            <div className="text-base font-semibold text-foreground">
              {ui.viewAllProjects}
            </div>
          </div>
        </Link>
      )}

      {nextProject ? (
        <Link
          href={localizePath(locale, `/projects/${nextProject.id}`)}
          rel="nofollow"
          className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 text-right transition-colors hover:border-foreground/30 hover:bg-card"
        >
          <span className="inline-flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
            <span>{ui.nextProject}</span>
            <ArrowRight className="size-3.5" />
          </span>
          <div className="mt-2">
            <div className="text-base font-semibold text-foreground">
              {nextProject.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {nextProject.subtitle}
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={localizePath(locale, "/projects")}
          rel="nofollow"
          className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 text-right transition-colors hover:border-foreground/30 hover:bg-card"
        >
          <span className="inline-flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
            <span>{ui.backToProjects}</span>
            <ArrowRight className="size-3.5" />
          </span>
          <div className="mt-2">
            <div className="text-base font-semibold text-foreground">
              {ui.viewAllProjects}
            </div>
          </div>
        </Link>
      )}
    </nav>
  );
}
