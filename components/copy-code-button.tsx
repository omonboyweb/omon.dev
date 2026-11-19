"use client";

import { useEffect } from "react";
import { Check, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";

const timers = new WeakMap<HTMLElement, number>();
let copyListenerInitialized = false;
let lastAnnouncement = "";

function legacyCopy(text: string): boolean {
  const field = Object.assign(document.createElement("textarea"), { value: text });
  field.setAttribute("readonly", "");
  field.style.cssText = "position:fixed;inset-block-start:0;opacity:0";
  document.body.append(field);
  field.select();
  try {
    return document.execCommand("copy");
  } finally {
    field.remove();
  }
}

function reportCopyStatus(button: HTMLElement, ok: boolean) {
  if (!button.isConnected) return;
  const tip = button.nextElementSibling;
  if (!(tip instanceof HTMLElement)) return;

  const prevTimer = timers.get(button);
  if (prevTimer !== undefined) {
    window.clearTimeout(prevTimer);
  }

  button.removeAttribute("data-copied");
  button.removeAttribute("data-failed");

  let message = ok ? "Copied" : "Copy failed";
  if (message === lastAnnouncement) {
    message += "\u00A0";
  }
  lastAnnouncement = message;

  tip.textContent = "";
  void button.offsetWidth;
  button.setAttribute(ok ? "data-copied" : "data-failed", "");

  window.requestAnimationFrame(() => {
    if (tip.isConnected) {
      tip.textContent = message;
    }
  });

  const timeoutId = window.setTimeout(() => {
    if (button.isConnected) {
      button.removeAttribute("data-copied");
      button.removeAttribute("data-failed");
    }
    if (tip.isConnected) {
      tip.textContent = "";
    }
    timers.delete(button);
  }, 2000);

  timers.set(button, timeoutId);
}

async function copyTargetText(button: HTMLElement, target: HTMLElement) {
  const text =
    target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
      ? target.value
      : (target.innerText || target.textContent || "").trim();

  if (!text) return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else if (!legacyCopy(text)) {
      throw new Error("Clipboard API unavailable");
    }
    reportCopyStatus(button, true);
  } catch {
    try {
      if (!legacyCopy(text)) {
        reportCopyStatus(button, false);
        return;
      }
      reportCopyStatus(button, true);
    } catch {
      reportCopyStatus(button, false);
    }
  }
}

function ensureCopyListeners() {
  if (copyListenerInitialized || typeof window === "undefined") return;
  copyListenerInitialized = true;

  if ("CommandEvent" in window) {
    document.addEventListener(
      "command",
      (event: Event) => {
        const cmdEvent = event as Event & {
          command?: string;
          source?: Element | null;
        };
        if (!cmdEvent.command?.startsWith("--copy")) return;
        const source = cmdEvent.source;
        const target = event.target;
        if (source instanceof HTMLElement && target instanceof HTMLElement) {
          void copyTargetText(source, target);
        }
      },
      true,
    );
  } else {
    document.addEventListener("click", (event: MouseEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const button = origin.closest('button[command^="--copy"]');
      if (!(button instanceof HTMLElement)) return;
      const targetId = button.getAttribute("commandfor");
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        void copyTargetText(button, target);
      }
    });
  }
}

export interface CopyCodeButtonProps {
  targetId: string;
  ariaLabel: string;
  label?: string;
  className?: string;
}

export function CopyCodeButton({
  targetId,
  ariaLabel,
  label,
  className,
}: CopyCodeButtonProps) {
  useEffect(() => {
    ensureCopyListeners();
  }, []);

  return (
    <span className="copy">
      <button
        type="button"
        className={cn(
          "copy-button inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-background/90 px-2 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer",
          className,
        )}
        aria-label={label ? undefined : ariaLabel}
        {...({
          command: "--copy",
          commandfor: targetId,
        } as Record<string, string>)}
      >
        <span
          className="inline-flex items-center [.copy-button[data-copied]_&]:hidden [.copy-button[data-failed]_&]:hidden"
          aria-hidden="true"
        >
          <Copy className="size-3.5" />
        </span>
        <span
          className="hidden items-center text-[var(--emerald)] [.copy-button[data-copied]_&]:inline-flex"
          aria-hidden="true"
        >
          <Check className="size-3.5" />
        </span>
        <span
          className="hidden items-center text-destructive [.copy-button[data-failed]_&]:inline-flex"
          aria-hidden="true"
        >
          <X className="size-3.5" />
        </span>
        {label ? <span>{label}</span> : null}
      </button>
      <span className="tip" role="status" />
    </span>
  );
}
