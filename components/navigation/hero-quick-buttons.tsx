import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { OpenSummaryButton } from "@/components/navigation/open-summary-button";
import { localizePath, type Locale } from "@/lib/locale";

export interface HeroQuickButtonsProps {
  locale: Locale;
  instagramUrl: string;
  ui: {
    viewProjects: string;
    viewAllProjects: string;
    quickSummaryCta: string;
    instagramCta: string;
  };
}

export function HeroQuickButtons({
  locale,
  instagramUrl,
  ui,
}: HeroQuickButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="#projects"
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Layers className="size-4" />
        <span>{ui.viewProjects}</span>
      </a>
      <Link
        href={localizePath(locale, "/projects")}
        rel="nofollow"
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
      >
        <span>{ui.viewAllProjects}</span>
        <ArrowUpRight className="size-3.5" />
      </Link>
      <OpenSummaryButton label={ui.quickSummaryCta} />
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <InstagramIcon className="size-3.5" />
        <span>{ui.instagramCta}</span>
        <ArrowUpRight className="size-3.5" />
      </a>
    </div>
  );
}
