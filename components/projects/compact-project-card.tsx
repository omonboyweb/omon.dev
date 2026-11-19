"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Expand,
  GitBranch,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { type Locale, localizePath } from "@/lib/locale";
import type { PortfolioUiStrings, ProjectItem } from "@/lib/portfolio/types";

export type CompactProjectData = Pick<
  ProjectItem,
  | "id"
  | "title"
  | "subtitle"
  | "categoryKey"
  | "category"
  | "year"
  | "role"
  | "originType"
  | "affiliationBadge"
  | "codeAccessBadge"
  | "summary"
  | "results"
  | "stack"
  | "liveUrl"
  | "repoUrl"
  | "images"
>;

export type CompactProjectCardUi = Pick<
  PortfolioUiStrings["projects"],
  | "prevImageLabel"
  | "nextImageLabel"
  | "expand"
  | "viewDetails"
  | "visitLiveSite"
>;

export interface CompactProjectCardProps {
  locale: Locale;
  project: CompactProjectData;
  ui: CompactProjectCardUi;
  priority?: boolean;
  onOpenLightbox: (projectId: string, imageIndex: 0 | 1) => void;
}

export function CompactProjectCard({
  locale,
  project,
  ui,
  priority = false,
  onOpenLightbox,
}: CompactProjectCardProps) {
  const [activeImgIdx, setActiveImgIdx] = useState<0 | 1>(0);

  const activeImg = project.images[activeImgIdx] ?? project.images[0];
  const nextIdx: 0 | 1 = activeImgIdx === 0 ? 1 : 0;

  return (
    <article className="project-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/40 transition-colors hover:border-foreground/25">
      <div>
        <div className="border-b border-border bg-background/60 p-3.5 sm:p-4">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground min-w-0">
              <span className="shrink-0 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-foreground">
                {activeImgIdx + 1}/2
              </span>
              <span className="truncate text-foreground font-medium">
                {activeImg.label}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveImgIdx(nextIdx)}
                aria-label={`${ui.prevImageLabel}: ${project.title}`}
                className="inline-flex size-6 items-center justify-center rounded border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ChevronLeft className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => setActiveImgIdx(nextIdx)}
                aria-label={`${ui.nextImageLabel}: ${project.title}`}
                className="inline-flex size-6 items-center justify-center rounded border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ChevronRight className="size-3" />
              </button>
              <button
                type="button"
                onClick={() => onOpenLightbox(project.id, activeImgIdx)}
                aria-label={`${ui.expand}: ${project.title} — ${activeImg.label}`}
                className="inline-flex h-6 items-center gap-1 rounded border border-border bg-card px-2 font-mono text-[10px] text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <Expand className="size-2.5" />
                <span>{ui.expand}</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenLightbox(project.id, activeImgIdx)}
            aria-label={`${ui.expand}: ${project.title} — ${activeImg.label}`}
            className="relative block w-full overflow-hidden rounded-xl border border-border bg-zinc-950 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
          >
            {/* Local vector SVG illustration: native <img> avoids next/image runtime overhead */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImg.src}
              alt={activeImg.alt}
              width={1200}
              height={750}
              decoding="async"
              fetchPriority={priority && activeImgIdx === 0 ? "high" : undefined}
              loading={priority && activeImgIdx === 0 ? undefined : "lazy"}
              className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </button>
        </div>

        <div className="space-y-3 p-5 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.originType === "company" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--emerald)]/40 bg-[var(--emerald)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--emerald)]">
                  <Building2 className="size-3" />
                  <span>{project.affiliationBadge}</span>
                </span>
              ) : project.originType === "client" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-foreground">
                  <ShieldCheck className="size-3 text-[var(--signal)]" />
                  <span>{project.affiliationBadge}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--signal)]">
                  <GitBranch className="size-3" />
                  <span>{project.affiliationBadge}</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                <Sparkles className="size-2.5 text-[var(--signal)]" />
                <span>{project.category}</span>
              </span>
            </div>
            <span className="text-muted-foreground">
              {project.role} · {project.year}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              <Link
                href={localizePath(locale, `/projects/${project.id}`)}
                rel="nofollow"
                className="card-link hover:text-[var(--signal)] transition-colors"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-0.5 text-xs font-medium text-[var(--emerald)]">
              {project.subtitle}
            </p>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {project.results.map((res) => (
              <div
                key={res.label}
                className="rounded-lg border border-border bg-background/80 p-2"
              >
                <div className="truncate font-mono text-[10px] text-muted-foreground">
                  {res.label}
                </div>
                <div className="mt-0.5 font-mono text-xs font-semibold text-foreground">
                  {res.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="space-y-3.5 border-t border-border/70 px-5 py-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 ? (
            <span className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              +{project.stack.length - 5}
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href={localizePath(locale, `/projects/${project.id}`)}
            rel="nofollow"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <span>{ui.viewDetails}</span>
            <span className="sr-only"> — {project.title}</span>
            <ArrowRight className="size-3.5" />
          </Link>

          <div className="flex flex-wrap items-center gap-1.5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                <span>{ui.visitLiveSite}</span>
                <ArrowUpRight className="size-3" />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-background px-2.5 font-mono text-xs text-[var(--signal)] hover:bg-muted transition-colors"
              >
                <GitBranch className="size-3" />
                <span>{project.codeAccessBadge}</span>
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              <span className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-background/60 px-2.5 font-mono text-[11px] text-muted-foreground">
                <Lock className="size-3 text-muted-foreground" />
                <span>{project.codeAccessBadge}</span>
              </span>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}
