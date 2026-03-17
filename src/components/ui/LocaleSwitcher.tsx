"use client";

import { Globe } from "lucide-react";
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
    <div className="dropdown dropdown-end">
      <button type="button" className="btn btn-ghost btn-xs" aria-label="Language">
        <Globe size={14} />
      </button>
      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 border border-base-200 z-[60]">
        <li>
          <button
            type="button"
            className={locale === "fr" ? "active" : undefined}
            onClick={() => setLocale("fr")}
          >
            Français
          </button>
        </li>
        <li>
          <button
            type="button"
            className={locale === "en" ? "active" : undefined}
            onClick={() => setLocale("en")}
          >
            English
          </button>
        </li>
      </ul>
    </div>
  );
}

export default memo(LocaleSwitcher);
