import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getPortfolioContent,
  isLocale,
  localizePath,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import {
  absoluteUrl,
  buildBlogPostingJsonLd,
  buildBlogPostMetadata,
  buildBreadcrumbJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return SUPPORTED_LOCALES.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  const post = getBlogPostBySlug(lang, slug);
  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }
  return buildBlogPostMetadata(lang, post);
}

function BlogPostSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <section className="relative border-b border-border overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 space-y-6 animate-pulse">
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-44 rounded bg-muted" />
            <div className="h-8 w-32 rounded-md bg-muted" />
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex gap-3">
              <div className="h-6 w-24 rounded-full bg-muted" />
              <div className="h-6 w-28 rounded bg-muted/70" />
            </div>
            <div className="h-10 w-4/5 rounded-lg bg-muted" />
            <div className="h-5 w-full rounded bg-muted/70" />
            <div className="h-5 w-2/3 rounded bg-muted/60" />
          </div>
        </div>
      </section>

      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 animate-pulse">
          <div className="space-y-6 rounded-2xl border border-border bg-card/50 p-6 sm:p-10">
            <div className="h-7 w-1/2 rounded bg-muted" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-muted/70" />
              <div className="h-4 w-11/12 rounded bg-muted/70" />
              <div className="h-4 w-4/5 rounded bg-muted/70" />
            </div>
            <div className="h-7 w-2/5 rounded bg-muted" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-muted/70" />
              <div className="h-4 w-5/6 rounded bg-muted/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function BlogPostContent({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { blogPosts, profile, ui } = getPortfolioContent(lang);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const post = blogPosts[currentIndex];
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const articleJsonLd = buildBlogPostingJsonLd(lang, post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: ui.projects.backToHome, url: absoluteUrl(localizePath(lang, "")) },
    {
      name: ui.blog.backToBlog,
      url: absoluteUrl(localizePath(lang, "/blog")),
    },
    {
      name: post.title,
      url: absoluteUrl(localizePath(lang, `/blog/${post.slug}`)),
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      {/* Article Hero & Semantic Breadcrumbs */}
      <section className="relative border-b border-border overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"
          />

          <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav aria-label="Breadcrumbs" className="breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <li>
                    <Link
                      href={localizePath(lang, "")}
                      className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground transition-colors"
                    >
                      {ui.projects.backToHome}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath(lang, "/blog")}
                      className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground transition-colors"
                    >
                      {ui.blog.backToBlog}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizePath(lang, `/blog/${post.slug}`)}
                      aria-current="page"
                      className="font-semibold text-foreground"
                    >
                      {post.category}
                    </Link>
                  </li>
                </ol>
              </nav>

              <Link
                href={localizePath(lang, "/blog")}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                <span>{ui.blog.viewAllArticles}</span>
              </Link>
            </div>

            <header className="mt-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-[var(--signal)]">
                  <BookOpen className="size-3" />
                  <span>{post.category}</span>
                </span>
                <time
                  dateTime={post.publishedDateIso}
                  className="inline-flex items-center gap-1"
                >
                  <Calendar className="size-3" />
                  <span>{post.publishedAt}</span>
                </time>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-[1.15]">
                {post.title}
              </h1>

              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-mono text-xs text-muted-foreground">
                <span>
                  {ui.blog.authorLabel}:{" "}
                  <strong className="font-medium text-foreground">
                    {profile.fullName}
                  </strong>{" "}
                  ({profile.brandName})
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <InstagramIcon className="size-3.5" />
                    <span>@omon.dev</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                  <a
                    href={profile.links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <span>Telegram</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </header>
          </div>
        </section>

        {/* Full Article Body */}
        <article className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10">
            <div className="space-y-8 rounded-2xl border border-border bg-card/50 p-6 sm:p-10">
              {post.sections.map((section, sIdx) => (
                <section key={`${post.id}-sec-${sIdx}`} className="space-y-3.5">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-3.5">
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={`${post.id}-sec-${sIdx}-p-${pIdx}`}
                        className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Key Takeaway Callout */}
              <aside className="flex items-start gap-3.5 rounded-xl border border-border bg-background p-5">
                <Lightbulb className="mt-0.5 size-5 shrink-0 text-[var(--emerald)]" />
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {ui.blog.keyTakeaway}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                    {post.keyTakeaway}
                  </p>
                </div>
              </aside>
            </div>

            {/* Article Pagination */}
            <nav
              aria-label="Blog article pagination"
              className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
            >
              {prevPost ? (
                <Link
                  href={localizePath(lang, `/blog/${prevPost.slug}`)}
                  className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    <ArrowLeft className="size-3.5" />
                    <span>{ui.blog.prevArticle}</span>
                  </span>
                  <div className="mt-2 text-sm font-semibold text-foreground">
                    {prevPost.title}
                  </div>
                </Link>
              ) : (
                <Link
                  href={localizePath(lang, "/blog")}
                  className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-foreground/30 hover:bg-card"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    <ArrowLeft className="size-3.5" />
                    <span>{ui.blog.backToBlog}</span>
                  </span>
                  <div className="mt-2 text-sm font-semibold text-foreground">
                    {ui.blog.viewAllArticles}
                  </div>
                </Link>
              )}

              {nextPost ? (
                <Link
                  href={localizePath(lang, `/blog/${nextPost.slug}`)}
                  className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 text-right transition-colors hover:border-foreground/30 hover:bg-card"
                >
                  <span className="inline-flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    <span>{ui.blog.nextArticle}</span>
                    <ArrowRight className="size-3.5" />
                  </span>
                  <div className="mt-2 text-sm font-semibold text-foreground">
                    {nextPost.title}
                  </div>
                </Link>
              ) : (
                <Link
                  href={localizePath(lang, "/blog")}
                  className="group flex flex-col justify-between rounded-xl border border-border bg-card/40 p-4 text-right transition-colors hover:border-foreground/30 hover:bg-card"
                >
                  <span className="inline-flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    <span>{ui.blog.backToBlog}</span>
                    <ArrowRight className="size-3.5" />
                  </span>
                  <div className="mt-2 text-sm font-semibold text-foreground">
                    {ui.blog.viewAllArticles}
                  </div>
                </Link>
              )}
            </nav>
          </div>
        </article>
    </>
  );
}

export default function LocalizedBlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostContent params={params} />
      </Suspense>
    </main>
  );
}
