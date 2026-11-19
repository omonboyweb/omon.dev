"use client";

import { Briefcase } from "lucide-react";
import { OPEN_RECRUITER_SUMMARY_EVENT } from "@/lib/dialog-utils";

export function OpenSummaryButton({ label }: { label: string }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent(OPEN_RECRUITER_SUMMARY_EVENT));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted cursor-pointer"
    >
      <Briefcase className="size-4 text-[var(--emerald)]" />
      <span>{label}</span>
    </button>
  );
}
