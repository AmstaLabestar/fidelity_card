"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User, LayoutDashboard, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import ThemeToggle from "@/src/components/ui/ThemeToggle";
import BrandMark from "@/src/components/layout/BrandMark";
import BrandText from "@/src/components/layout/BrandText";

export default function Navbar() {
  const t = useTranslations("nav");
  const { data: session } = useSession();
  const isAdmin = Boolean(session?.user?.isAdmin);

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50 px-4 lg:px-8">
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 group">
          <BrandMark />
          <BrandText />
        </Link>
      </div>
      <div className="flex-none gap-3">
        <ThemeToggle />
        {session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-200">
              <div className="w-10 rounded-full flex items-center justify-center bg-base-200">
                <User size={20} className="mx-auto mt-2" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-200">
              <li className="menu-title px-4 py-2 opacity-50 text-xs uppercase tracking-widest">{t("account")}</li>
              <li>
                <Link href="/dashboard" className="py-3 gap-3">
                  <LayoutDashboard size={16} />
                  {t("dashboard")}
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" className="py-3 gap-3 text-primary font-bold">
                    <ShieldCheck size={16} />
                    {t("admin")}
                  </Link>
                </li>
              )}
              <div className="divider my-1"></div>
              <li>
                <button onClick={() => signOut()} className="py-3 gap-3 text-error">
                  <LogOut size={16} />
                  {t("logout")}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm rounded-full px-6">
              {t("login")}
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-primary/20">
              {t("getStarted")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
