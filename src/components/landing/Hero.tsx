import { ArrowRight, CreditCard, MessageCircle, QrCode } from "lucide-react";
import { useTranslations } from "next-intl";
import TrackedLink from "@/src/components/marketing/TrackedLink";

export default function Hero() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative overflow-hidden bg-base-100 pt-10 pb-12 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-28">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(circle_at_top_left,oklch(var(--color-primary)/0.2),transparent_42%),radial-gradient(circle_at_bottom_right,oklch(var(--color-secondary)/0.16),transparent_38%)]" />
        <div className="absolute left-[-12%] top-[8%] h-72 w-72 rounded-full bg-primary/12 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[4%] h-72 w-72 rounded-full bg-secondary/10 blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-5">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg text-base-content/70 mb-8 max-w-2xl mx-auto lg:mx-0">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <TrackedLink
                href="/register?intent=preorder"
                className="btn btn-primary btn-lg rounded-full px-6 sm:px-10 w-full sm:w-auto group"
                trackingLocation="hero"
                trackingLabel="primary_preorder"
              >
                {t("primaryCta")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </TrackedLink>
              <a
                href="#how-it-works"
                className="btn btn-ghost btn-lg rounded-full px-6 sm:px-10 w-full sm:w-auto"
              >
                {t("secondaryCta")}
              </a>
            </div>

            <div className="mt-9 flex flex-wrap justify-center lg:justify-start gap-2">
              <div className="badge badge-outline gap-2 py-3 sm:py-4 px-3 sm:px-4">
                <CreditCard size={16} className="opacity-70" />
                <span className="font-semibold">{t("chipPhysical")}</span>
              </div>
              <div className="badge badge-outline gap-2 py-3 sm:py-4 px-3 sm:px-4">
                <QrCode size={16} className="opacity-70" />
                <span className="font-semibold">{t("chipTech")}</span>
              </div>
              <div className="badge badge-outline gap-2 py-3 sm:py-4 px-3 sm:px-4">
                <MessageCircle size={16} className="opacity-70" />
                <span className="font-semibold">{t("chipSupport")}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="relative mx-auto max-w-[26rem]">
              <div className="absolute inset-0 translate-y-5 scale-[0.96] rounded-[2.2rem] bg-primary/18 blur-3xl" />
              <div className="absolute inset-x-8 -top-3 h-14 rounded-full bg-primary/35 blur-2xl" />

              <div className="relative aspect-[1.58/1] overflow-hidden border border-primary/20 bg-[linear-gradient(135deg,oklch(14%_0.02_155)_0%,oklch(9%_0.018_150)_45%,oklch(13%_0.03_155)_100%)] p-7 text-white shadow-[0_25px_80px_-30px_oklch(0%_0_0_/0.85)] [border-radius:1.75rem_1.75rem_1.75rem_3.4rem] sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,oklch(var(--color-primary)/0.22),transparent_20%),radial-gradient(circle_at_78%_28%,oklch(var(--color-primary)/0.16),transparent_18%),radial-gradient(circle_at_50%_120%,oklch(var(--color-secondary)/0.2),transparent_42%)]" />
                <div className="absolute inset-[1px] border border-white/5 [border-radius:1.7rem_1.7rem_1.7rem_3.3rem]" />
                <div className="absolute left-6 top-6 h-14 w-14 rounded-2xl border border-primary/35 bg-primary/12 shadow-[0_0_22px_oklch(var(--color-primary)/0.32)]" />
                <div className="absolute right-7 top-9 flex flex-col gap-2">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="h-3 w-3 rounded-[0.28rem] bg-primary/95 shadow-[0_0_10px_oklch(var(--color-primary)/0.45)]" />
                    <span className="h-3 w-3 rounded-[0.28rem] bg-primary/75" />
                    <span className="h-3 w-3 rounded-[0.28rem] bg-primary/55" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 self-end pr-1">
                    <span className="h-3 w-3 rounded-[0.28rem] bg-primary/75" />
                    <span className="h-3 w-3 rounded-[0.28rem] bg-primary/95" />
                  </div>
                </div>
                <div className="absolute left-0 right-0 top-[4.7rem] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <div className="relative flex h-full flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="mb-1 text-[0.68rem] uppercase tracking-[0.38em] text-white/40 font-semibold">
                    SmartCard
                  </span>
                  <span className="font-black text-xl tracking-tight">{t("primaryCta")}</span>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-white/6 backdrop-blur-md">
                  <CreditCard size={22} />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-[0.68rem] uppercase tracking-[0.5em] text-white/20">
                  Carte de reductions
                </div>
                <div className="text-[2rem] font-black tracking-[0.06em] text-primary drop-shadow-[0_0_12px_oklch(var(--color-primary)/0.22)] sm:text-[2.25rem]">
                  SMARTCARD
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-x-3 gap-y-1 text-base sm:text-lg font-mono tracking-[0.18em] sm:tracking-[0.22em] opacity-80">
                  <span>****</span>
                  <span>****</span>
                  <span>****</span>
                  <span>2026</span>
                </div>
                <div className="mt-3 flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.35em] text-white/35">By Tanga Group</span>
                    <span className="h-1.5 w-10 rounded-full bg-primary shadow-[0_0_14px_oklch(var(--color-primary)/0.35)]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full border border-white/15 bg-white/16" />
                    <div className="-ml-6 h-10 w-10 rounded-full border border-white/15 bg-white/16" />
                  </div>
                </div>
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
