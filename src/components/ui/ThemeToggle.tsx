"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

type ThemePreference = "system" | "light" | "dark";

function ThemeToggle() {
  const t = useTranslations("nav.theme");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const preference = (theme ?? "system") as ThemePreference;
  const ready = mounted && (resolvedTheme === "light" || resolvedTheme === "dark");

  const label = useMemo(() => {
    if (!ready) return "";

    if (preference === "light") return t("light");
    if (preference === "dark") return t("dark");
    return t("system");
  }, [preference, ready, t]);

  const icon = useMemo(() => {
    if (!ready) return <Monitor size={14} />;

    return resolvedTheme === "dark" ? <Moon size={14} /> : <Sun size={14} />;
  }, [ready, resolvedTheme]);

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        aria-label={t("label")}
        aria-live="polite"
        disabled={!ready}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </button>
      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 border border-base-200 z-[60]">
        <li>
          <button
            type="button"
            className={ready && preference === "system" ? "active" : undefined}
            onClick={() => setTheme("system")}
          >
            <Monitor size={16} />
            {t("system")}
          </button>
        </li>
        <li>
          <button
            type="button"
            className={ready && preference === "light" ? "active" : undefined}
            onClick={() => setTheme("light")}
          >
            <Sun size={16} />
            {t("light")}
          </button>
        </li>
        <li>
          <button
            type="button"
            className={ready && preference === "dark" ? "active" : undefined}
            onClick={() => setTheme("dark")}
          >
            <Moon size={16} />
            {t("dark")}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default memo(ThemeToggle);
