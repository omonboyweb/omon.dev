"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Lightbulb,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { type Locale, localizePath } from "@/lib/locale";
import type {
  BlogCategoryKey,
  BlogPost,
  PortfolioUiStrings,
} from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const BLOG_CATEGORY_KEYS: ReadonlyArray<"all" | BlogCategoryKey> = [
  "all",
  "system-design",
  "product-craft",
  "problem-solving",
  "web-speed",
];

export interface InstagramHubProps {
  locale: Locale;
  blogPosts: BlogPost[];
  instagramUrl: string;
  ui: Pick<
    PortfolioUiStrings["blog"],
    | "allCategories"
    | "categories"
    | "followHandle"
    | "readingNow"
    | "readPost"
    | "openFullArticle"
    | "keyTakeaway"
    | "prevArticle"
    | "nextArticle"
  >;
}

export function InstagramHub({
  locale,
  blogPosts,
  instagramUrl,
  ui,
}: InstagramHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | BlogCategoryKey
  >("all");
  const [selectedId, setSelectedId] = useState<string>(blogPosts[0]?.id ?? "");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return blogPosts;
    return blogPosts.filter((p) => p.categoryKey === selectedCategory);
  }, [blogPosts, selectedCategory]);

  const activeIndex = Math.max(
    0,
    filteredPosts.findIndex((p) => p.id === selectedId),
  );
  const activePost = filteredPosts[activeIndex] ?? blogPosts[0];

  if (!activePost) {
    return null;
  }

  const handleCategoryChange = (cat: "all" | BlogCategoryKey) => {
    setSelectedCategory(cat);
    const nextList =
      cat === "all"
        ? blogPosts
        : blogPosts.filter((p) => p.categoryKey === cat);
    if (nextList.length > 0 && !nextList.some((p) => p.id === selectedId)) {
      setSelectedId(nextList[0].id);
    }
  };

  const prevPost = activeIndex > 0 ? filteredPosts[activeIndex - 1] : null;
  const nextPost =
    activeIndex < filteredPosts.length - 1
      ? filteredPosts[activeIndex + 1]
      : null;

  return (
    <div className="space-y-6">
      {/* Category Filter & Instagram Handle Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter blog posts by topic"
        >
          {BLOG_CATEGORY_KEYS.map((key) => {
            const active = selectedCategory === key;
            const label =
              key === "all" ? ui.allCategories : ui.categories[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryChange(key)}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-xs transition-colors cursor-pointer",
                  active
                    ? "border-foreground bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <InstagramIcon className="size-3.5" />
          <span>{ui.followHandle}</span>
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      {/* Blog Master-Detail Reader */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Post List */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:content-start">
          {filteredPosts.map((post) => {
            const selected = post.id === activePost.id;
            return (
              <button
                key={post.id}
                type="button"
                onClick={() => setSelectedId(post.id)}
                className={cn(
                  "group flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer",
                  selected
                    ? "border-[var(--signal)] bg-card shadow-sm"
                    : "border-border bg-card/40 hover:border-foreground/25 hover:bg-card/80",
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-[var(--signal)]">
                      <BookOpen className="size-3" />
                      <span>{post.category}</span>
                    </span>
                    <span className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 font-mono text-[11px] text-muted-foreground">
                  <span>{post.publishedAt}</span>
                  <span
                    className={cn(
                      "transition-colors",
                      selected
                        ? "text-[var(--signal)]"
                        : "group-hover:text-foreground",
                    )}
                  >
                    {selected ? ui.readingNow : ui.readPost}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Full Blog Article Reader */}
        <article className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-8 lg:col-span-7">
          <div className="space-y-6">
            {/* Article Meta Header */}
            <header className="space-y-3 border-b border-border pb-5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-[var(--signal)]">
                  {activePost.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3" />
                  {activePost.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  {activePost.readTime}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                <Link
                  href={localizePath(locale, `/blog/${activePost.slug}`)}
                  className="hover:text-[var(--signal)] transition-colors"
                >
                  {activePost.title}
                </Link>
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {activePost.excerpt}
              </p>

              <div className="pt-1">
                <Link
                  href={localizePath(locale, `/blog/${activePost.slug}`)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--signal)] hover:underline"
                >
                  <span>{ui.openFullArticle}</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </header>

            {/* Article Sections */}
            <div className="space-y-6">
              {activePost.sections.map((section, sIdx) => (
                <section
                  key={`${activePost.id}-sec-${sIdx}`}
                  className="space-y-2.5"
                >
                  <h4 className="text-base font-semibold text-foreground">
                    {section.heading}
                  </h4>
                  <div className="space-y-2.5">
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={`${activePost.id}-sec-${sIdx}-p-${pIdx}`}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {/* Key Takeaway Callout */}
            <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-[var(--emerald)]" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {ui.keyTakeaway}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-foreground/90">
                  {activePost.keyTakeaway}
                </p>
              </div>
            </div>

            {/* Article Pagination */}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <button
                type="button"
                disabled={!prevPost}
                onClick={() => prevPost && setSelectedId(prevPost.id)}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground disabled:opacity-35 cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>{ui.prevArticle}</span>
              </button>

              <button
                type="button"
                disabled={!nextPost}
                onClick={() => nextPost && setSelectedId(nextPost.id)}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground disabled:opacity-35 cursor-pointer"
              >
                <span>{ui.nextArticle}</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
