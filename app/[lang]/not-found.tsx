"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLocaleFromPathname, localizePath } from "@/lib/locale";

export default function LocalizedNotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const copy =
    locale === "uz"
      ? {
          code: "404 // SAHIFA TOPILMADI",
          title: "Kechirasiz, bunday sahifa mavjud emas",
          body: "Manzil oʻzgargan yoki notoʻgʻri kiritilgan boʻlishi mumkin. Bosh sahifaga yoki blog boʻlimiga qayting.",
          home: "Bosh sahifaga qaytish",
          blog: "Blogni ochish",
        }
      : locale === "ru"
        ? {
            code: "404 // СТРАНИЦА НЕ НАЙДЕНА",
            title: "К сожалению, эта страница не найдена",
            body: "Возможно, ссылка устарела или введена с ошибкой. Вернитесь на главную или откройте блог.",
            home: "На главную",
            blog: "Открыть блог",
          }
        : {
            code: "404 // PAGE NOT FOUND",
            title: "This page could not be found",
            body: "The link may have moved or been mistyped. Return to the homepage or browse the engineering blog.",
            home: "Back to Home",
            blog: "Browse Blog",
          };

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20 sm:px-6">
      <div className="max-w-lg space-y-5 text-center">
        <div className="font-mono text-xs text-[var(--signal)]">
          {copy.code}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {copy.title}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href={localizePath(locale, "")}
            prefetch={false}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="size-4" />
            <span>{copy.home}</span>
          </Link>
          <Link
            href={localizePath(locale, "/blog")}
            prefetch={false}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span>{copy.blog}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
