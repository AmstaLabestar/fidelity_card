"use client";

import { memo, startTransition, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import type { Locale } from "@/src/i18n/routing";

function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });
    },
    [locale, pathname, router]
  );

  return (
    <div className="join" aria-label="Language switcher">
      <button
        type="button"
        onClick={() => setLocale("fr")}
        className={[
          "btn btn-xs join-item",
          locale === "fr" ? "btn-primary" : "btn-ghost",
        ].join(" ")}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={[
          "btn btn-xs join-item",
          locale === "en" ? "btn-primary" : "btn-ghost",
        ].join(" ")}
      >
        EN
      </button>
    </div>
  );
}

export default memo(LocaleSwitcher);

