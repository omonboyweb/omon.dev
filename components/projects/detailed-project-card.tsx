"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
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
import { cn } from "@/lib/utils";

export type DetailedProjectCardUi = Pick<
  PortfolioUiStrings["projects"],
  | "imageCounter"
  | "prevImageLabel"
  | "nextImageLabel"
  | "expand"
  | "viewWord"
  | "theProblem"
  | "whatIBuilt"
  | "viewDetails"
  | "visitLiveSite"
  | "inspectFullPreview"
>;

export interface DetailedProjectCardProps {
  locale: Locale;
  project: ProjectItem;
  ui: DetailedProjectCardUi;
  priority?: boolean;
  onOpenLightbox: (projectId: string, imageIndex: 0 | 1) => void;
}

export function DetailedProjectCard({
  locale,
  project,
  ui,
  priority = false,
  onOpenLightbox,
}: DetailedProjectCardProps) {
  const [activeImgIdx, setActiveImgIdx] = useState<0 | 1>(0);

  const activeImg = project.images[activeImgIdx] ?? project.images[0];
  const nextIdx: 0 | 1 = activeImgIdx === 0 ? 1 : 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card/40 transition-colors hover:border-foreground/20">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Visual Gallery Column (2 Images per Project) */}
        <div className="flex flex-col justify-between border-b border-border bg-background/60 p-4 sm:p-6 lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="space-y-3">
            {/* Top Frame Bar */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="rounded border border-border bg-card px-2 py-0.5 text-[11px] text-foreground">
                  {ui.imageCounter} {activeImgIdx + 1} / 2
                </span>
                <span className="text-foreground font-medium">
                  {activeImg.label}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveImgIdx(nextIdx)}
                  aria-label={`${ui.prevImageLabel}: ${project.title}`}
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <ChevronLeft className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImgIdx(nextIdx)}
                  aria-label={`${ui.nextImageLabel}: ${project.title}`}
                  className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <ChevronRight className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLightbox(project.id, activeImgIdx)}
                  className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 font-mono text-[11px] text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <Expand className="size-3" />
                  <span>{ui.expand}</span>
                </button>
              </div>
            </div>

            {/* Primary Image Canvas */}
            <button
              type="button"
              onClick={() => onOpenLightbox(project.id, activeImgIdx)}
              aria-label={`${ui.expand}: ${project.title} — ${activeImg.label}`}
              className="group relative block w-full overflow-hidden rounded-xl border border-border bg-zinc-950 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
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

            <p className="text-xs leading-relaxed text-muted-foreground">
              {activeImg.caption}
            </p>
          </div>

          {/* 2-Image Thumbnail Switcher */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {project.images.map((img, idx) => {
              const imgIdx = idx as 0 | 1;
              const selected = activeImgIdx === imgIdx;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveImgIdx(imgIdx)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-2 text-left transition-all cursor-pointer",
                    selected
                      ? "border-[var(--signal)] bg-card shadow-xs"
                      : "border-border bg-card/40 opacity-80 hover:opacity-100 hover:border-foreground/30",
                  )}
                >
                  {/* Local vector SVG illustration: native <img> avoids next/image runtime overhead */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt=""
                    width={160}
                    height={100}
                    decoding="async"
                    loading="lazy"
                    className="h-11 w-16 shrink-0 rounded border border-border object-cover bg-zinc-950"
                  />
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {ui.viewWord} 0{idx + 1}
                    </div>
                    <div className="truncate text-xs font-medium text-foreground">
                      {img.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Details Column */}
        <div className="flex flex-col justify-between p-5 sm:p-6 lg:col-span-5">
          <div className="space-y-4">
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
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3 text-[var(--signal)]" />
                  <span>{project.category}</span>
                </span>
              </div>
              <span className="text-muted-foreground">
                {project.role} · {project.year}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                <Link
                  href={localizePath(locale, `/projects/${project.id}`)}
                  rel="nofollow"
                  className="hover:text-[var(--signal)] transition-colors"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-0.5 text-sm font-medium text-[var(--emerald)]">
                {project.subtitle}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
            </div>

            {/* Plain-Language Problem & Solution */}
            <div className="space-y-2.5">
              <div className="rounded-lg border border-border bg-background/70 p-3.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {ui.theProblem}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-foreground/90">
                  {project.problem}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background/70 p-3.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--emerald)]">
                  {ui.whatIBuilt}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-foreground/90">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Highlights */}
            <ul className="space-y-1.5">
              {project.highlights.map((item, idx) => (
                <li
                  key={`${project.id}-hl-${idx}`}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[var(--emerald)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Results Strip */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {project.results.map((res) => (
                <div
                  key={res.label}
                  className="rounded-lg border border-border bg-background p-2.5"
                >
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {res.label}
                  </div>
                  <div className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                    {res.value}
                  </div>
                  {res.delta ? (
                    <div className="font-mono text-[10px] text-[var(--emerald)]">
                      {res.delta}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Stack & Action Links */}
          <div className="mt-5 space-y-4 border-t border-border pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href={localizePath(locale, `/projects/${project.id}`)}
                rel="nofollow"
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <span>{ui.viewDetails}</span>
                <ArrowRight className="size-3.5" />
              </Link>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <span>{ui.visitLiveSite}</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => onOpenLightbox(project.id, activeImgIdx)}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <Expand className="size-3.5" />
                <span>{ui.inspectFullPreview}</span>
              </button>
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 font-mono text-xs text-[var(--signal)] hover:bg-muted transition-colors"
                >
                  <GitBranch className="size-3.5" />
                  <span>{project.codeAccessBadge}</span>
                  <ArrowUpRight className="size-3" />
                </a>
              ) : (
                <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 font-mono text-xs text-muted-foreground">
                  <Lock className="size-3.5" />
                  <span>{project.codeAccessBadge}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
