import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import LocaleSwitcher from "@/src/components/ui/LocaleSwitcher";
import ThemeToggle from "@/src/components/ui/ThemeToggle";

export default function MarketingNavbar() {
  const t = useTranslations("nav");

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50 px-4 lg:px-8">
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-content p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <CreditCard size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter">SmartCard</span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
        <Link href="/login" className="btn btn-ghost btn-sm rounded-full px-6">
          {t("login")}
        </Link>
        <Link
          href="/register?intent=preorder"
          className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-primary/20"
        >
          {t("preorder")}
        </Link>
      </div>
    </div>
  );
}
