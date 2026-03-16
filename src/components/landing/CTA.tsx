import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function CTA() {
  const t = useTranslations("landing.finalCta");

  return (
    <section className="py-12 sm:py-20 bg-primary text-primary-content overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-9 opacity-90 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/register?intent=preorder"
              className="btn btn-neutral btn-lg rounded-full px-6 sm:px-12 text-base sm:text-lg w-full sm:w-auto group"
            >
              {t("cta")}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <a
              href="#how-it-works"
              className="btn btn-ghost btn-lg rounded-full px-6 sm:px-12 text-base sm:text-lg w-full sm:w-auto text-primary-content"
            >
              {t("secondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
