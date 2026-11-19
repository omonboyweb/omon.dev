import { ArrowUpRight, CheckCircle2, GitBranch, Lock } from "lucide-react";
import type { PortfolioUiStrings, ProjectItem } from "@/lib/portfolio/types";

export interface ProjectDetailCaseStudyProps {
  project: ProjectItem;
  ui: Pick<
    PortfolioUiStrings["projects"],
    | "theProblem"
    | "whatIBuilt"
    | "keyHighlightsTitle"
    | "techStackTitle"
    | "affiliationLabel"
    | "roleLabel"
    | "categoryLabel"
    | "codeAccessLabel"
    | "yearLabel"
    | "ipDisclosureNote"
    | "visitLiveSite"
  >;
}

export function ProjectDetailCaseStudy({
  project,
  ui,
}: ProjectDetailCaseStudyProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left 8 Columns: Problem, What I Built, Key Highlights */}
      <div className="space-y-6 lg:col-span-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              01 // {ui.theProblem}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {project.problem}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--emerald)]">
              02 // {ui.whatIBuilt}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="font-mono text-xs uppercase tracking-wider text-[var(--signal)]">
            03 // {ui.keyHighlightsTitle}
          </div>
          <ul className="mt-4 space-y-3.5">
            {project.highlights.map((item, idx) => (
              <li
                key={`${project.id}-detail-hl-${idx}`}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--emerald)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right 4 Columns: Tech Stack, Metadata & Direct Links */}
      <aside className="space-y-6 lg:col-span-4">
        <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-5">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {ui.techStackTitle}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-4 font-mono text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">
                {ui.affiliationLabel}
              </span>
              <span className="text-right font-medium text-[var(--emerald)]">
                {project.affiliationBadge}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">{ui.roleLabel}</span>
              <span className="text-right text-foreground font-medium">
                {project.role}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">{ui.categoryLabel}</span>
              <span className="text-right text-foreground">
                {project.category}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">
                {ui.codeAccessLabel}
              </span>
              <span className="text-right text-foreground">
                {project.codeAccessBadge}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">{ui.yearLabel}</span>
              <span className="text-right text-foreground">{project.year}</span>
            </div>
          </div>

          {!project.repoUrl ? (
            <div className="rounded-xl border border-border bg-background/70 p-3.5 text-xs leading-relaxed text-muted-foreground">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-foreground">
                <Lock className="size-3 text-[var(--signal)]" />
                <span>{project.codeAccessBadge}</span>
              </div>
              <p className="mt-1.5">{ui.ipDisclosureNote}</p>
            </div>
          ) : null}

          <div className="flex flex-col gap-2.5 border-t border-border pt-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
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
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 font-mono text-xs text-[var(--signal)] hover:bg-muted transition-colors"
              >
                <GitBranch className="size-3.5" />
                <span>{project.codeAccessBadge}</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
