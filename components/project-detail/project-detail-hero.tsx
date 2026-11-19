import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  GitBranch,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { type Locale, localizePath } from "@/lib/locale";
import type { PortfolioUiStrings, ProjectItem } from "@/lib/portfolio/types";

export interface ProjectDetailHeroProps {
  locale: Locale;
  project: ProjectItem;
  ui: Pick<
    PortfolioUiStrings["projects"],
    "backToHome" | "backToProjects" | "visitLiveSite"
  >;
}

export function ProjectDetailHero({
  locale,
  project,
  ui,
}: ProjectDetailHeroProps) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumbs" className="breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <li>
                <Link
                  href={localizePath(locale, "")}
                  className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground transition-colors"
                >
                  {ui.backToHome}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath(locale, "/projects")}
                  rel="nofollow"
                  className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground transition-colors"
                >
                  {ui.backToProjects}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath(locale, `/projects/${project.id}`)}
                  rel="nofollow"
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  {project.title}
                </Link>
              </li>
            </ol>
          </nav>

          <Link
            href={localizePath(locale, "/projects")}
            rel="nofollow"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>{ui.backToProjects}</span>
          </Link>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {project.originType === "company" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--emerald)]/40 bg-[var(--emerald)]/10 px-3 py-0.5 font-medium text-[var(--emerald)]">
                  <Building2 className="size-3.5" />
                  <span>{project.affiliationBadge}</span>
                </span>
              ) : project.originType === "client" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-0.5 text-foreground">
                  <ShieldCheck className="size-3.5 text-[var(--signal)]" />
                  <span>{project.affiliationBadge}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-3 py-0.5 font-medium text-[var(--signal)]">
                  <GitBranch className="size-3.5" />
                  <span>{project.affiliationBadge}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-0.5 text-muted-foreground">
                <Sparkles className="size-3 text-[var(--signal)]" />
                <span>{project.category}</span>
              </span>
              <span className="text-muted-foreground">
                {project.role} · {project.year}
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-base font-medium text-[var(--emerald)] sm:text-lg">
              {project.subtitle}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <span>{ui.visitLiveSite}</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 font-mono text-xs text-[var(--signal)] hover:bg-muted transition-colors"
              >
                <GitBranch className="size-3.5" />
                <span>{project.codeAccessBadge}</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : (
              <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card/60 px-4 font-mono text-xs text-muted-foreground">
                <Lock className="size-3.5" />
                <span>{project.codeAccessBadge}</span>
              </span>
            )}
          </div>
        </div>

        {/* Metadata & Key Results Strip */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {project.results.map((res) => (
            <div
              key={res.label}
              className="rounded-xl border border-border bg-card/70 p-4"
            >
              <div className="font-mono text-xs text-muted-foreground">
                {res.label}
              </div>
              <div className="mt-1 font-mono text-xl font-semibold text-foreground">
                {res.value}
              </div>
              {res.delta ? (
                <div className="mt-0.5 font-mono text-xs text-[var(--emerald)]">
                  {res.delta}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
