import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function Preorder() {
  const t = useTranslations("landing.preorder");

  return (
    <section id="preorder" className="py-12 sm:py-20 bg-base-200 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 border border-base-300 shadow-xl overflow-hidden">
            <div className="card-body p-8 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">{t("title")}</h2>
                  <p className="text-base-content/70 mb-3">{t("subtitle")}</p>
                  <p className="text-xs sm:text-sm text-base-content/60">{t("note")}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/register?intent=preorder"
                    className="btn btn-primary btn-lg rounded-full px-6 sm:px-10 w-full sm:w-auto group"
                  >
                    {t("cta")}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                  <a href="#faq" className="btn btn-ghost rounded-full w-full sm:w-auto">
                    {t("faqCta")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
