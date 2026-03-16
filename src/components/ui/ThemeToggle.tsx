"use client";

import { memo, startTransition, useCallback, useEffect, useMemo, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";

type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function ThemeToggle() {
  const t = useTranslations("nav.theme");
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as ThemePreference | null) ?? "system";
    setPreference(saved);
  }, []);

  useEffect(() => {
    if (preference !== "system") return;

    const media = window.matchMedia?.("(prefers-color-scheme: dark)") ?? null;
    if (!media) return;

    const onChange = () => {
      const resolved = getSystemTheme();
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  const resolvedTheme = useMemo(() => {
    return preference === "system" ? getSystemTheme() : preference;
  }, [preference]);

  const applyPreference = useCallback((nextPreference: ThemePreference) => {
    startTransition(() => {
      setPreference(nextPreference);
      localStorage.setItem(STORAGE_KEY, nextPreference);

      const resolved = nextPreference === "system" ? getSystemTheme() : nextPreference;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
      document.documentElement.dataset.themePref = nextPreference;
    });
  }, []);

  const label = useMemo(() => {
    if (preference === "light") return t("light");
    if (preference === "dark") return t("dark");
    return t("system");
  }, [preference, t]);

  return (
    <div className="dropdown dropdown-end">
      <button type="button" className="btn btn-ghost btn-xs" aria-label={t("label")}>
        {resolvedTheme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
        <span className="hidden sm:inline">{label}</span>
      </button>
      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 border border-base-200 z-[60]">
        <li>
          <button type="button" onClick={() => applyPreference("system")}>
            <Monitor size={16} />
            {t("system")}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => applyPreference("light")}>
            <Sun size={16} />
            {t("light")}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => applyPreference("dark")}>
            <Moon size={16} />
            {t("dark")}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default memo(ThemeToggle);
