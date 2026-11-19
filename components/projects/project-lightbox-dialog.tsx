"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { X } from "lucide-react";
import {
  attachDialogClosedByFallback,
  safeCloseDialog,
  safeShowModal,
} from "@/lib/dialog-utils";
import type { PortfolioUiStrings, ProjectItem } from "@/lib/portfolio/types";

export type LightboxProject = Pick<
  ProjectItem,
  "id" | "title" | "category" | "images"
>;

export type LightboxUiStrings = Pick<
  PortfolioUiStrings["projects"],
  "imageCounter" | "ofWord" | "switchToImage" | "closePreviewLabel"
>;

export interface ProjectLightboxDialogProps {
  open: boolean;
  onClose: () => void;
  project: LightboxProject | null;
  imageIndex: 0 | 1;
  onSwitchImage: (nextIndex: 0 | 1) => void;
  ui: LightboxUiStrings;
}

export function ProjectLightboxDialog({
  open,
  onClose,
  project,
  imageIndex,
  onSwitchImage,
  ui,
}: ProjectLightboxDialogProps) {
  const lightboxTitleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && project) {
      safeShowModal(dialog);
    } else {
      safeCloseDialog(dialog);
    }
  }, [open, project]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      safeCloseDialog(dialog);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const cleanup = attachDialogClosedByFallback(dialog);
    const handleNativeClose = () => {
      if (dialog) dialog.returnValue = "";
      onClose();
    };
    dialog?.addEventListener("close", handleNativeClose);
    return () => {
      cleanup?.();
      dialog?.removeEventListener("close", handleNativeClose);
    };
  }, [onClose]);

  const activeImage = project
    ? (project.images[imageIndex] ?? project.images[0])
    : null;
  const nextIdx: 0 | 1 = imageIndex === 0 ? 1 : 0;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={lightboxTitleId}
      {...({ closedby: "any" } as Record<string, string>)}
      className="m-auto w-[min(95vw,64rem)] rounded-2xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div>
          <h2
            id={lightboxTitleId}
            className="text-sm font-semibold text-foreground"
          >
            {project
              ? `${project.title} — ${activeImage?.label ?? ""}`
              : "Preview"}
          </h2>
          {project ? (
            <p className="font-mono text-[11px] text-muted-foreground">
              {ui.imageCounter} {imageIndex + 1} {ui.ofWord} 2 ·{" "}
              {project.category}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {project ? (
            <button
              type="button"
              onClick={() => onSwitchImage(nextIdx)}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 font-mono text-xs text-foreground hover:bg-muted cursor-pointer"
            >
              <span>
                {ui.switchToImage} {nextIdx + 1}
              </span>
            </button>
          ) : null}
          <button
            type="button"
            autoFocus
            onClick={() => safeCloseDialog(dialogRef.current)}
            aria-label={ui.closePreviewLabel}
            className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {activeImage ? (
        <div className="p-4 sm:p-5">
          {/* Local vector SVG illustration: native <img> avoids next/image runtime overhead */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            width={1200}
            height={750}
            decoding="async"
            className="w-full rounded-xl border border-border bg-zinc-950 object-contain"
          />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {activeImage.caption}
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
