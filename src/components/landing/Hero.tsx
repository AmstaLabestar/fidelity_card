import { ArrowRight, CreditCard, MessageCircle, QrCode } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function Hero() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative overflow-hidden bg-base-100 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-28">
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-secondary rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-5">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg text-base-content/70 mb-8 max-w-2xl mx-auto lg:mx-0">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/register?intent=preorder"
                className="btn btn-primary btn-lg rounded-full px-10 group"
              >
                {t("primaryCta")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <a href="#how-it-works" className="btn btn-ghost btn-lg rounded-full px-10">
                {t("secondaryCta")}
              </a>
            </div>

            <div className="mt-9 flex flex-wrap justify-center lg:justify-start gap-2">
              <div className="badge badge-outline gap-2 py-4 px-4">
                <CreditCard size={16} className="opacity-70" />
                <span className="font-semibold">{t("chipPhysical")}</span>
              </div>
              <div className="badge badge-outline gap-2 py-4 px-4">
                <QrCode size={16} className="opacity-70" />
                <span className="font-semibold">{t("chipTech")}</span>
              </div>
              <div className="badge badge-outline gap-2 py-4 px-4">
                <MessageCircle size={16} className="opacity-70" />
                <span className="font-semibold">{t("chipSupport")}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="relative mx-auto max-w-md aspect-[1.586/1] bg-gradient-to-br from-neutral to-neutral-focus rounded-2xl shadow-2xl p-7 sm:p-8 text-white flex flex-col justify-between overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32" />

              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest opacity-60 font-semibold mb-1">
                    SmartCard
                  </span>
                  <span className="font-black text-xl tracking-tight">{t("primaryCta")}</span>
                </div>
                <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <CreditCard size={22} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-3 text-lg font-mono tracking-[0.22em] opacity-80">
                  <span>****</span>
                  <span>****</span>
                  <span>****</span>
                  <span>2026</span>
                </div>
                <div className="flex justify-between items-end mt-3">
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-wide">SMARTCARD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full border border-white/20" />
                    <div className="w-10 h-10 bg-white/20 rounded-full -ml-6 border border-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
