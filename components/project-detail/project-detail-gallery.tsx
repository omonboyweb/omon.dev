"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type {
  LightboxProject,
  LightboxUiStrings,
} from "@/components/projects/project-lightbox-dialog";
import type { PortfolioUiStrings } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const ProjectLightboxDialog = dynamic(
  () =>
    import("@/components/projects/project-lightbox-dialog").then(
      (mod) => mod.ProjectLightboxDialog,
    ),
  { ssr: false },
);

export interface ProjectDetailGalleryProps {
  project: LightboxProject;
  ui: LightboxUiStrings &
    Pick<
      PortfolioUiStrings["projects"],
      | "prevImageLabel"
      | "nextImageLabel"
      | "inspectFullPreview"
      | "expand"
      | "viewWord"
    >;
}

export function ProjectDetailGallery({
  project,
  ui,
}: ProjectDetailGalleryProps) {
  const [activeImgIdx, setActiveImgIdx] = useState<0 | 1>(0);
  const [lightboxMounted, setLightboxMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback((idx: 0 | 1) => {
    setActiveImgIdx(idx);
    setLightboxMounted(true);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const activeImg = project.images[activeImgIdx] ?? project.images[0];
  const nextIdx: 0 | 1 = activeImgIdx === 0 ? 1 : 0;

  return (
    <section className="border-b border-border bg-card/20 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-background/80 p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="rounded border border-border bg-card px-2.5 py-1 text-foreground">
                {ui.imageCounter} {activeImgIdx + 1} / 2
              </span>
              <span className="font-medium text-foreground">
                {activeImg.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveImgIdx(nextIdx)}
                aria-label={`${ui.prevImageLabel}: ${project.title}`}
                className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveImgIdx(nextIdx)}
                aria-label={`${ui.nextImageLabel}: ${project.title}`}
                className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => openLightbox(activeImgIdx)}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 font-mono text-xs text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <Expand className="size-3.5" />
                <span>{ui.inspectFullPreview}</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openLightbox(activeImgIdx)}
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
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.005]"
            />
          </button>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {activeImg.caption}
          </p>

          {/* 2-Image Selector Thumbnails */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.images.map((img, idx) => {
              const imgIdx = idx as 0 | 1;
              const selected = activeImgIdx === imgIdx;
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveImgIdx(imgIdx)}
                  className={cn(
                    "flex items-center gap-3.5 rounded-xl border p-3 text-left transition-all cursor-pointer",
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
                    className="h-14 w-22 shrink-0 rounded-lg border border-border object-cover bg-zinc-950"
                  />
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {ui.viewWord} 0{idx + 1}
                    </div>
                    <div className="truncate text-sm font-medium text-foreground">
                      {img.label}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {img.caption}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {lightboxMounted ? (
        <ProjectLightboxDialog
          open={lightboxOpen}
          onClose={closeLightbox}
          project={project}
          imageIndex={activeImgIdx}
          onSwitchImage={setActiveImgIdx}
          ui={ui}
        />
      ) : null}
    </section>
  );
}
