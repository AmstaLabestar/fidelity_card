import { CheckCircle2, CreditCard, QrCode, Scan } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Solution() {
  const t = useTranslations("landing.solution");

  const bullets = [t("bullet1"), t("bullet2"), t("bullet3")];

  return (
    <section id="solution" className="py-12 sm:py-20 bg-base-200 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
              {t("title")}
            </h2>
            <p className="text-base-content/70 mb-6">{t("subtitle")}</p>
            <ul className="space-y-3">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 size={20} className="text-success mt-0.5 shrink-0" />
                  <span className="text-base-content/80">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-base-100 border border-base-300 shadow-xl">
            <div className="card-body p-7 sm:p-8">
              <div className="flex items-center justify-center gap-5 sm:gap-7 py-6">
                <div className="w-14 h-14 rounded-3xl bg-base-200 border border-base-300 flex items-center justify-center text-primary">
                  <QrCode size={22} />
                </div>
                <div className="w-14 h-14 rounded-3xl bg-base-200 border border-base-300 flex items-center justify-center text-primary">
                  <Scan size={22} />
                </div>
                <div className="w-14 h-14 rounded-3xl bg-base-200 border border-base-300 flex items-center justify-center text-primary">
                  <CreditCard size={22} />
                </div>
              </div>
              <div className="text-center text-sm text-base-content/70">
                {t("subtitle")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
