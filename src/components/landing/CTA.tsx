import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import TrackedLink from "@/src/components/marketing/TrackedLink";

export default function CTA() {
  const t = useTranslations("landing.finalCta");

  return (
    <section className="py-12 sm:py-20 bg-primary text-primary-content overflow-hidden relative dark:bg-[linear-gradient(135deg,oklch(34%_0.08_152)_0%,oklch(28%_0.07_150)_52%,oklch(22%_0.05_148)_100%)] dark:text-white">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl dark:bg-primary/24" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40 blur-3xl dark:bg-secondary/16" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight">
            {t("title")}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-9 opacity-90 max-w-2xl mx-auto dark:text-white/92">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <TrackedLink
              href="/register?intent=preorder"
              className="btn btn-neutral btn-lg rounded-full px-6 sm:px-12 text-base sm:text-lg w-full sm:w-auto group dark:border-white/20 dark:bg-white dark:text-neutral"
            >
              {t("cta")}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </TrackedLink>
            <a
              href="#how-it-works"
              className="btn btn-ghost btn-lg rounded-full px-6 sm:px-12 text-base sm:text-lg w-full sm:w-auto text-primary-content dark:text-white dark:hover:bg-white/10"
            >
              {t("secondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
