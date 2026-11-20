import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import {
  getPortfolioContent,
  isLocale,
  localizePath,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import {
  absoluteUrl,
  buildBlogCollectionJsonLd,
  buildBlogIndexMetadata,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }
  return buildBlogIndexMetadata(lang);
}

export default async function LocalizedBlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const { blogPosts, profile, ui } = getPortfolioContent(lang);

  const blogJsonLd = buildBlogCollectionJsonLd(lang, blogPosts);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: ui.projects.backToHome, url: absoluteUrl(localizePath(lang, "")) },
    {
      name: ui.blog.backToBlog,
      url: absoluteUrl(localizePath(lang, "/blog")),
    },
  ]);

  return (
    <>
      <JsonLd id="blog-collection-jsonld" data={blogJsonLd} />
      <JsonLd id="blog-breadcrumb-jsonld" data={breadcrumbJsonLd} />

      <main className="flex-1">
        {/* Page Header & Semantic Breadcrumb */}
        <section className="relative border-b border-border overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_60%,transparent_100%)]"
          />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
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
                      aria-current="page"
                      className="font-semibold text-foreground"
                    >
                      {ui.blog.backToBlog}
                    </Link>
                  </li>
                </ol>
              </nav>

              <Link
                href={localizePath(lang, "")}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                <span>{ui.projects.backToHome}</span>
              </Link>
            </div>

            <div className="mt-6 max-w-3xl space-y-3">
              <div className="font-mono text-xs text-[var(--signal)]">
                {ui.blog.allArticlesEyebrow} · {blogPosts.length}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {ui.blog.allArticlesTitle}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {ui.blog.allArticlesSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Article Index Cards */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-foreground/30 hover:bg-card"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-[var(--signal)]">
                        <BookOpen className="size-3" />
                        <span>{post.category}</span>
                      </span>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
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
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold tracking-tight text-foreground leading-snug">
                        <Link
                          href={localizePath(lang, `/blog/${post.slug}`)}
                          className="hover:text-[var(--signal)] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4 font-mono text-xs">
                    <span className="text-muted-foreground">
                      {profile.fullName}
                    </span>
                    <Link
                      href={localizePath(lang, `/blog/${post.slug}`)}
                      className="inline-flex items-center gap-1.5 text-[var(--signal)] hover:underline"
                    >
                      <span>{ui.blog.openFullArticle}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
