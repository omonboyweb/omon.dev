"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  Briefcase,
  FileCode2,
  Globe,
  Layers,
  Mail,
  Search,
  X,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import {
  attachDialogClosedByFallback,
  safeCloseDialog,
  safeShowModal,
} from "@/lib/dialog-utils";
import {
  type Locale,
  localizePath,
  persistLocalePreference,
  stripLocalePrefix,
} from "@/lib/locale";
import type { PortfolioUiStrings } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

interface CommandDescriptor {
  id: string;
  group: "Navigate" | "Actions" | "Language";
  label: string;
  hint: string;
  keywords: string;
  icon:
    | "projects"
    | "rfc"
    | "ig"
    | "briefcase"
    | "mail"
    | "link"
    | "globe";
}

export interface CommandPaletteProjectEntry {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  stack: string[];
}

export interface CommandPaletteBlogEntry {
  slug: string;
  title: string;
  category: string;
}

export interface CommandPaletteDialogProps {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  onOpenRecruiterDossier: () => void;
  profile: {
    email: string;
    links: {
      instagram: string;
      telegram: string;
    };
  };
  projects: CommandPaletteProjectEntry[];
  blogPosts: CommandPaletteBlogEntry[];
  ui: PortfolioUiStrings["dialogs"];
}

export function CommandPaletteDialog({
  locale,
  open,
  onClose,
  onOpenRecruiterDossier,
  profile,
  projects,
  blogPosts,
  ui,
}: CommandPaletteDialogProps) {
  const pathname = usePathname();
  const router = useRouter();
  const cmdTitleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const copyTimerRef = useRef<number | null>(null);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedFromPalette, setCopiedFromPalette] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      safeShowModal(dialog);
      inputRef.current?.focus();
    } else {
      safeCloseDialog(dialog);
    }
  }, [open]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      safeCloseDialog(dialog);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
        copyTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const cmd = dialogRef.current;
    const cleanupCmd = attachDialogClosedByFallback(cmd);
    const handleNativeClose = () => {
      if (cmd) cmd.returnValue = "";
      setQuery("");
      setActiveIndex(0);
      onClose();
    };
    cmd?.addEventListener("close", handleNativeClose);
    return () => {
      cleanupCmd?.();
      cmd?.removeEventListener("close", handleNativeClose);
    };
  }, [onClose]);

  const commands: CommandDescriptor[] = useMemo(() => {
    return [
      {
        id: "nav-projects",
        group: "Navigate",
        label: ui.cmdJumpProjects,
        hint: localizePath(locale, "/projects"),
        keywords:
          "projects portfolio igoo homex tashkent halalhub auranews images loyihalar проекты",
        icon: "projects",
      },
      ...projects.map((proj) => ({
        id: `project-${proj.id}`,
        group: "Navigate" as const,
        label: `${proj.title} — ${proj.subtitle}`,
        hint: localizePath(locale, `/projects/${proj.id}`),
        keywords: `project ${proj.id} ${proj.title} ${proj.category} ${proj.stack.join(" ")}`,
        icon: "projects" as const,
      })),
      {
        id: "nav-companion",
        group: "Navigate",
        label: ui.cmdJumpBlog,
        hint: localizePath(locale, "/blog"),
        keywords:
          "blog articles writing posts instagram maqolalar блог статьи",
        icon: "ig",
      },
      ...blogPosts.map((post) => ({
        id: `blog-${post.slug}`,
        group: "Navigate" as const,
        label: post.title,
        hint: localizePath(locale, `/blog/${post.slug}`),
        keywords: `blog article ${post.slug} ${post.title} ${post.category}`,
        icon: "rfc" as const,
      })),
      {
        id: "nav-systems",
        group: "Navigate",
        label: ui.cmdJumpAbout,
        hint: "#architecture",
        keywords: "about principles quality standards haqida принципы",
        icon: "rfc",
      },
      {
        id: "action-recruiter",
        group: "Actions",
        label: ui.cmdOpenSummary,
        hint: ui.summaryHint,
        keywords: "hiring resume google meta contact rezyume резюме",
        icon: "briefcase",
      },
      {
        id: "action-copy-email",
        group: "Actions",
        label: `${ui.cmdCopyEmail} (${profile.email})`,
        hint: ui.clipboardHint,
        keywords: "email contact hello@omon.dev pochta почта",
        icon: "mail",
      },
      {
        id: "action-ig",
        group: "Actions",
        label: ui.cmdOpenIg,
        hint: ui.externalHint,
        keywords: "instagram social handle profile",
        icon: "link",
      },
      {
        id: "action-telegram",
        group: "Actions",
        label: ui.cmdOpenTelegram,
        hint: ui.externalHint,
        keywords: "telegram message contact the_khojamurodov",
        icon: "link",
      },
      {
        id: "lang-en",
        group: "Language",
        label: ui.cmdLangEn,
        hint: locale === "en" ? ui.activeLabel : "EN",
        keywords: "english inglizcha английский language til язык",
        icon: "globe",
      },
      {
        id: "lang-ru",
        group: "Language",
        label: ui.cmdLangRu,
        hint: locale === "ru" ? ui.activeLabel : "RU",
        keywords: "russian русский язык til language",
        icon: "globe",
      },
      {
        id: "lang-uz",
        group: "Language",
        label: ui.cmdLangUz,
        hint: locale === "uz" ? ui.activeLabel : "UZ",
        keywords: "uzbek o'zbekcha uzbekcha til language язык",
        icon: "globe",
      },
    ];
  }, [blogPosts, locale, profile.email, projects, ui]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const safeActiveIndex =
    filtered.length === 0 ? 0 : Math.min(activeIndex, filtered.length - 1);

  const executeCommand = async (id: string) => {
    const subpath = stripLocalePrefix(pathname);

    const scrollToSection = (sectionId: string) => {
      safeCloseDialog(dialogRef.current);
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(localizePath(locale, `#${sectionId}`));
      }
    };

    const switchLanguage = (nextLocale: Locale) => {
      persistLocalePreference(nextLocale);
      safeCloseDialog(dialogRef.current);
      router.push(localizePath(nextLocale, subpath));
    };

    if (id.startsWith("project-")) {
      const projectId = id.slice("project-".length);
      safeCloseDialog(dialogRef.current);
      router.push(localizePath(locale, `/projects/${projectId}`));
      return;
    }

    if (id.startsWith("blog-")) {
      const slug = id.slice("blog-".length);
      safeCloseDialog(dialogRef.current);
      router.push(localizePath(locale, `/blog/${slug}`));
      return;
    }

    switch (id) {
      case "nav-projects":
        safeCloseDialog(dialogRef.current);
        if (subpath === "") {
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(localizePath(locale, "/projects"));
        }
        break;
      case "nav-companion":
        safeCloseDialog(dialogRef.current);
        router.push(localizePath(locale, "/blog"));
        break;
      case "nav-systems":
        scrollToSection("architecture");
        break;
      case "action-recruiter":
        safeCloseDialog(dialogRef.current);
        onOpenRecruiterDossier();
        break;
      case "action-copy-email":
        try {
          await navigator.clipboard?.writeText(profile.email);
          setCopiedFromPalette(true);
          if (copyTimerRef.current !== null) {
            window.clearTimeout(copyTimerRef.current);
          }
          copyTimerRef.current = window.setTimeout(() => {
            setCopiedFromPalette(false);
            copyTimerRef.current = null;
          }, 1800);
        } catch {
          // Ignore clipboard rejection in palette
        }
        break;
      case "action-ig":
        safeCloseDialog(dialogRef.current);
        window.open(profile.links.instagram, "_blank", "noopener,noreferrer");
        break;
      case "action-telegram":
        safeCloseDialog(dialogRef.current);
        window.open(profile.links.telegram, "_blank", "noopener,noreferrer");
        break;
      case "lang-en":
        switchLanguage("en");
        break;
      case "lang-ru":
        switchLanguage("ru");
        break;
      case "lang-uz":
        switchLanguage("uz");
        break;
    }
  };

  const renderIcon = (kind: CommandDescriptor["icon"]) => {
    switch (kind) {
      case "projects":
        return <Layers className="size-4 text-[var(--emerald)]" />;
      case "rfc":
        return <FileCode2 className="size-4 text-[var(--emerald)]" />;
      case "ig":
        return <InstagramIcon className="size-4 text-muted-foreground" />;
      case "briefcase":
        return <Briefcase className="size-4 text-[var(--signal)]" />;
      case "mail":
        return <Mail className="size-4 text-muted-foreground" />;
      case "link":
        return <ArrowUpRight className="size-4 text-muted-foreground" />;
      case "globe":
        return <Globe className="size-4 text-[var(--signal)]" />;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={cmdTitleId}
      {...({ closedby: "any" } as Record<string, string>)}
      className="m-auto w-[min(92vw,36rem)] rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Search className="size-4 text-muted-foreground" />
          <h2 id={cmdTitleId} className="font-mono text-xs text-muted-foreground">
            {ui.paletteTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => safeCloseDialog(dialogRef.current)}
          aria-label="Close"
          className="inline-flex size-7 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="size-3.5" />
        </button>
      </div>

      <div className="border-b border-border px-4 py-2.5">
        <input
          ref={inputRef}
          type="search"
          value={query}
          autoFocus
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((prev) =>
                filtered.length ? (prev + 1) % filtered.length : 0,
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((prev) =>
                filtered.length
                  ? (prev - 1 + filtered.length) % filtered.length
                  : 0,
              );
            } else if (e.key === "Enter" && filtered[safeActiveIndex]) {
              e.preventDefault();
              void executeCommand(filtered[safeActiveIndex].id);
            }
          }}
          placeholder={ui.searchPlaceholder}
          aria-label={ui.searchPlaceholder}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-3 py-6 text-center font-mono text-xs text-muted-foreground">
            {ui.noMatches} &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ul className="space-y-1">
            {filtered.map((item, idx) => {
              const active = idx === safeActiveIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => void executeCommand(item.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      {renderIcon(item.icon)}
                      <span>{item.label}</span>
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {item.id === "action-copy-email" && copiedFromPalette
                        ? ui.copiedLabel
                        : item.hint}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border bg-card/60 px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>{ui.paletteFooterHint}</span>
        <span>EN · RU · UZ</span>
      </div>
    </dialog>
  );
}
