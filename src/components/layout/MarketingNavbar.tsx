import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import ThemeToggle from "@/src/components/ui/ThemeToggle";
import TrackedLink from "@/src/components/marketing/TrackedLink";
import BrandMark from "@/src/components/layout/BrandMark";
import BrandText from "@/src/components/layout/BrandText";

export default function MarketingNavbar() {
  const t = useTranslations("nav");
  const links = useTranslations("footer.links");

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50 px-4 lg:px-8">
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2 group">
          <BrandMark />
          <BrandText />
        </Link>
      </div>
      <div className="flex-none flex items-center gap-1 sm:gap-2">
        <ThemeToggle />

        <div className="hidden lg:flex items-center gap-2">
          <Link href="/login" className="btn btn-ghost btn-sm rounded-full px-6">
            {t("login")}
          </Link>
          <TrackedLink
            href="/register?intent=preorder"
            className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-primary/20"
          >
            {t("preorder")}
          </TrackedLink>
        </div>

        <div className="dropdown dropdown-end lg:hidden">
          <button
            type="button"
            tabIndex={0}
            aria-label="Open menu"
            className="btn btn-ghost btn-sm btn-circle"
          >
            <Menu size={18} />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 border border-base-200 z-[60] mt-2"
          >
            <li>
              <a href="#how-it-works" className="py-3">
                {links("howItWorks")}
              </a>
            </li>
            <li>
              <a href="#benefits" className="py-3">
                {links("benefits")}
              </a>
            </li>
            <li>
              <a href="#partners" className="py-3">
                {links("partners")}
              </a>
            </li>
            <li>
              <a href="#preorder" className="py-3">
                {links("preorder")}
              </a>
            </li>
            <li>
              <a href="#faq" className="py-3">
                {links("faq")}
              </a>
            </li>
            <div className="divider my-1" />
            <li>
              <Link href="/login" className="py-3">
                {t("login")}
              </Link>
            </li>
            <li>
              <TrackedLink href="/register?intent=preorder" className="py-3 font-bold text-primary">
                {t("preorder")}
              </TrackedLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
