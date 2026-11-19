"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Briefcase, Command, Terminal } from "lucide-react";
import type {
  CommandPaletteBlogEntry,
  CommandPaletteProjectEntry,
} from "@/components/navigation/command-palette-dialog";
import type { RecruiterSummaryProjectEntry } from "@/components/navigation/recruiter-summary-dialog";
import { OPEN_RECRUITER_SUMMARY_EVENT } from "@/lib/dialog-utils";
import {
  LOCALES,
  localizePath,
  type Locale,
  persistLocalePreference,
  stripLocalePrefix,
} from "@/lib/locale";
import type { PortfolioUiStrings } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const loadCommandPalette = () =>
  import("@/components/navigation/command-palette-dialog").then(
    (mod) => mod.CommandPaletteDialog,
  );

const loadRecruiterSummary = () =>
  import("@/components/navigation/recruiter-summary-dialog").then(
    (mod) => mod.RecruiterSummaryDialog,
  );

const CommandPaletteDialog = dynamic(loadCommandPalette, { ssr: false });
const RecruiterSummaryDialog = dynamic(loadRecruiterSummary, { ssr: false });

export interface TopNavProjectEntry
  extends CommandPaletteProjectEntry,
    RecruiterSummaryProjectEntry {}

export interface TopNavAndDialogsProps {
  locale: Locale;
  navUi: PortfolioUiStrings["nav"];
  dialogsUi: PortfolioUiStrings["dialogs"];
  telegramLabel: string;
  profile: {
    fullName: string;
    role: string;
    availability: string;
    location: string;
    email: string;
    links: {
      telegram: string;
      instagram: string;
    };
    recruiterHighlights: Array<{ label: string; value: string }>;
  };
  projects: TopNavProjectEntry[];
  blogPosts: CommandPaletteBlogEntry[];
}

export function TopNavAndDialogs({
  locale,
  navUi,
  dialogsUi,
  telegramLabel,
  profile,
  projects,
  blogPosts,
}: TopNavAndDialogsProps) {
  const pathname = usePathname();
  const subpath = stripLocalePrefix(pathname);

  const [cmdMounted, setCmdMounted] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [summaryMounted, setSummaryMounted] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const openCommandPalette = useCallback(() => {
    setCmdMounted(true);
    setCmdOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setCmdOpen(false);
  }, []);

  const openRecruiterDossier = useCallback(() => {
    setSummaryMounted(true);
    setSummaryOpen(true);
  }, []);

  const closeRecruiterDossier = useCallback(() => {
    setSummaryOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdMounted(true);
        setCmdOpen((prev) => !prev);
      }
    };
    const onOpenSummary = () => {
      setSummaryMounted(true);
      setSummaryOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_RECRUITER_SUMMARY_EVENT, onOpenSummary);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_RECRUITER_SUMMARY_EVENT, onOpenSummary);
    };
  }, []);

  const isProjectsActive = subpath.startsWith("/projects");
  const isBlogActive = subpath.startsWith("/blog");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href={localizePath(locale, "")}
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              <span className="inline-flex size-6 items-center justify-center rounded border border-border bg-card text-xs">
                <Terminal className="size-3.5 text-[var(--signal)]" />
              </span>
              <span>omon.dev</span>
            </Link>
            <span className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline-flex">
              <span className="size-1.5 rounded-full bg-[var(--emerald)]" />
              <span>@omon.dev</span>
            </span>
          </div>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 text-xs font-mono text-muted-foreground lg:flex"
          >
            <Link
              href={localizePath(locale, "/projects")}
              rel="nofollow"
              aria-current={isProjectsActive ? "page" : undefined}
              className={cn(
                "hover:text-foreground transition-colors",
                isProjectsActive &&
                  "text-foreground font-semibold underline decoration-[var(--signal)] underline-offset-4",
              )}
            >
              {navUi.projects}
            </Link>
            <Link
              href={localizePath(locale, "/blog")}
              aria-current={isBlogActive ? "page" : undefined}
              className={cn(
                "hover:text-foreground transition-colors",
                isBlogActive &&
                  "text-foreground font-semibold underline decoration-[var(--signal)] underline-offset-4",
              )}
            >
              {navUi.blog}
            </Link>
            <Link
              href={localizePath(locale, "#architecture")}
              className="hover:text-foreground transition-colors"
            >
              {navUi.about}
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Selector Pill Group (crawlable localized links) */}
            <nav
              aria-label="Select language"
              className="inline-flex h-8 items-center rounded-md border border-border bg-card p-0.5 font-mono text-[11px]"
            >
              {LOCALES.map((item) => {
                const active = locale === item.code;
                return (
                  <Link
                    key={item.code}
                    href={localizePath(item.code, subpath)}
                    hrefLang={item.code}
                    onClick={() => persistLocalePreference(item.code)}
                    aria-current={active ? "page" : undefined}
                    title={item.nativeName}
                    className={cn(
                      "rounded px-1.5 py-1 transition-colors cursor-pointer sm:px-2",
                      active
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={openRecruiterDossier}
              onPointerEnter={() => void loadRecruiterSummary()}
              onFocus={() => void loadRecruiterSummary()}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted cursor-pointer"
            >
              <Briefcase className="size-3.5 text-[var(--emerald)]" />
              <span className="hidden sm:inline">{navUi.quickSummary}</span>
              <span className="sm:hidden">{navUi.quickSummaryShort}</span>
            </button>

            <button
              type="button"
              onClick={openCommandPalette}
              onPointerEnter={() => void loadCommandPalette()}
              onFocus={() => void loadCommandPalette()}
              aria-label={navUi.openPaletteLabel}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground cursor-pointer"
            >
              <Command className="size-3.5" />
              <span className="hidden sm:inline">K</span>
            </button>
          </div>
        </div>
      </header>

      {cmdMounted ? (
        <CommandPaletteDialog
          locale={locale}
          open={cmdOpen}
          onClose={closeCommandPalette}
          onOpenRecruiterDossier={openRecruiterDossier}
          profile={{
            email: profile.email,
            links: profile.links,
          }}
          projects={projects}
          blogPosts={blogPosts}
          ui={dialogsUi}
        />
      ) : null}

      {summaryMounted ? (
        <RecruiterSummaryDialog
          locale={locale}
          open={summaryOpen}
          onClose={closeRecruiterDossier}
          profile={profile}
          projects={projects}
          ui={{
            dialogs: {
              summaryBadge: dialogsUi.summaryBadge,
              featuredAtGlance: dialogsUi.featuredAtGlance,
              copyEmail: dialogsUi.copyEmail,
              browseProjects: dialogsUi.browseProjects,
            },
            telegramLabel,
          }}
        />
      ) : null}
    </>
  );
}
