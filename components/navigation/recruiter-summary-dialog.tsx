"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { CheckCircle2, Mail, Send, Sparkles, X } from "lucide-react";
import { CopyCodeButton } from "@/components/copy-code-button";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import {
  attachDialogClosedByFallback,
  safeCloseDialog,
  safeShowModal,
} from "@/lib/dialog-utils";
import { type Locale, localizePath } from "@/lib/locale";
import type { PortfolioUiStrings } from "@/lib/portfolio/types";

export interface RecruiterSummaryProjectEntry {
  id: string;
  title: string;
  subtitle: string;
  affiliationBadge: string;
}

export interface RecruiterSummaryDialogProps {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  profile: {
    name: string;
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
  projects: RecruiterSummaryProjectEntry[];
  ui: {
    dialogs: Pick<
      PortfolioUiStrings["dialogs"],
      "summaryBadge" | "featuredAtGlance" | "copyEmail" | "browseProjects"
    >;
    telegramLabel: string;
  };
}

export function RecruiterSummaryDialog({
  locale,
  open,
  onClose,
  profile,
  projects,
  ui,
}: RecruiterSummaryDialogProps) {
  const recruiterTitleId = useId();
  const recruiterEmailId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      safeShowModal(dialog);
    } else {
      safeCloseDialog(dialog);
    }
  }, [open]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      safeCloseDialog(dialog);
    };
  }, []);

  useEffect(() => {
    const rec = dialogRef.current;
    const cleanupRecruiter = attachDialogClosedByFallback(rec);
    const handleNativeClose = () => {
      if (rec) rec.returnValue = "";
      onClose();
    };
    rec?.addEventListener("close", handleNativeClose);
    return () => {
      cleanupRecruiter?.();
      rec?.removeEventListener("close", handleNativeClose);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={recruiterTitleId}
      {...({ closedby: "any" } as Record<string, string>)}
      className="m-auto w-[min(94vw,42rem)] rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl"
    >
      <div className="flex items-start justify-between border-b border-border px-6 py-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--emerald)]">
            <Sparkles className="size-3.5" />
            <span>{ui.dialogs.summaryBadge}</span>
          </div>
          <h2
            id={recruiterTitleId}
            className="mt-1 text-lg font-semibold tracking-tight text-foreground"
          >
            {profile.name} — {profile.role}
          </h2>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {profile.availability}
          </p>
        </div>
        <button
          type="button"
          autoFocus
          onClick={() => safeCloseDialog(dialogRef.current)}
          aria-label="Close"
          className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="space-y-5 p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {profile.recruiterHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-card p-3"
            >
              <div className="font-mono text-[11px] text-muted-foreground">
                {item.label}
              </div>
              <div className="mt-1 text-sm font-medium text-foreground">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {ui.dialogs.featuredAtGlance}
          </h3>
          <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
            {projects.map((proj) => (
              <li key={proj.id} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--emerald)]" />
                <span>
                  <Link
                    href={localizePath(locale, `/projects/${proj.id}`)}
                    prefetch={false}
                    rel="nofollow"
                    onClick={() => safeCloseDialog(dialogRef.current)}
                    className="font-semibold text-foreground hover:text-[var(--signal)] underline decoration-border underline-offset-4"
                  >
                    {proj.title}
                  </Link>{" "}
                  <span className="inline-flex items-center rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {proj.affiliationBadge}
                  </span>{" "}
                  — {proj.subtitle}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background p-3.5">
          <div className="flex items-center gap-2.5">
            <Mail className="size-4 text-[var(--signal)]" />
            <span
              id={recruiterEmailId}
              className="font-mono text-sm text-foreground"
            >
              {profile.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CopyCodeButton
              targetId={recruiterEmailId}
              ariaLabel={ui.dialogs.copyEmail}
              label={ui.dialogs.copyEmail}
            />
            <a
              href={profile.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 font-mono text-xs text-foreground hover:bg-muted transition-colors"
            >
              <Send className="size-3" />
              <span>{ui.telegramLabel}</span>
            </a>
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 font-mono text-xs text-foreground hover:bg-muted transition-colors"
            >
              <InstagramIcon className="size-3.5" />
              <span>@omon.dev</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="font-mono">{profile.location}</span>
          <Link
            href={localizePath(locale, "/projects")}
            prefetch={false}
            rel="nofollow"
            onClick={() => safeCloseDialog(dialogRef.current)}
            className="font-mono text-[var(--signal)] hover:underline"
          >
            {ui.dialogs.browseProjects}
          </Link>
        </div>
      </div>
    </dialog>
  );
}
