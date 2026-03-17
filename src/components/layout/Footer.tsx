import { CreditCard, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer p-6 sm:p-10 bg-base-200 text-base-content border-t border-base-300">
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
        <a
          href="https://www.facebook.com/Tangagroupbf?mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="inline-flex hover:text-primary transition-colors"
        >
          <Facebook size={20} />
        </a>
        <a
          href="https://www.instagram.com/tanga.group"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="inline-flex hover:text-primary transition-colors"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://www.linkedin.com/company/tanga-group/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex hover:text-primary transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://wa.me/22667402030"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="inline-flex hover:text-primary transition-colors"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </footer>
  );
}
