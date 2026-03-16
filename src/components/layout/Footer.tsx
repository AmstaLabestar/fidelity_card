import { CreditCard, Github, Instagram, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300">
      <aside>
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter mb-4">
          <div className="bg-primary text-primary-content p-2 rounded-xl">
            <CreditCard size={24} />
          </div>
          <span>SmartCard</span>
        </div>
        <p>{t("tagline")}</p>
      </aside> 
      <nav>
        <h6 className="footer-title">{t("sections.product")}</h6>
        <Link href="/#how-it-works" className="link link-hover">
          {t("links.howItWorks")}
        </Link>
        <Link href="/#benefits" className="link link-hover">
          {t("links.benefits")}
        </Link>
        <Link href="/#partners" className="link link-hover">
          {t("links.partners")}
        </Link>
        <Link href="/#preorder" className="link link-hover">
          {t("links.preorder")}
        </Link>
        <Link href="/#faq" className="link link-hover">
          {t("links.faq")}
        </Link>
      </nav> 
      <div className="flex gap-4 mt-4">
        <Twitter className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <Instagram className="cursor-pointer hover:text-primary transition-colors" size={20} />
        <Github className="cursor-pointer hover:text-primary transition-colors" size={20} />
      </div>
    </footer>
  );
}
