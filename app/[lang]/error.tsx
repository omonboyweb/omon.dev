"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLocaleFromPathname, localizePath } from "@/lib/locale";

export default function LocalizedError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const copy =
    locale === "uz"
      ? {
          code: "500 // KUTILMAGAN XATOLIK",
          title: "Sahifani yuklashda xatolik yuz berdi",
          body: "Qayta urinib koʻring yoki bosh sahifaga qayting.",
          retry: "Qayta urinish",
          home: "Bosh sahifa",
        }
      : locale === "ru"
        ? {
            code: "500 // НЕПРЕДВИДЕННАЯ ОШИБКА",
            title: "Не удалось загрузить страницу",
            body: "Попробуйте повторить запрос или вернитесь на главную.",
            retry: "Повторить",
            home: "На главную",
          }
        : {
            code: "500 // UNEXPECTED ERROR",
            title: "Something went wrong",
            body: "Please try loading this page again or return to the homepage.",
            retry: "Try again",
            home: "Back to Home",
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
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
          >
            {copy.retry}
          </button>
          <Link
            href={localizePath(locale, "")}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            {copy.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
