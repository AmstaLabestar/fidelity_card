import { BadgeCheck, RefreshCcw, ShieldCheck, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Trust() {
  const t = useTranslations("landing.trust");

  const items = [
    { icon: <Smartphone size={20} />, text: t("t1") },
    { icon: <BadgeCheck size={20} />, text: t("t2") },
    { icon: <ShieldCheck size={20} />, text: t("t3") },
    { icon: <RefreshCcw size={20} />, text: t("t4") },
  ];

  return (
    <section id="trust" className="py-12 sm:py-20 bg-base-100 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
              {t("title")}
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">{t("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {items.map((item, index) => (
              <div key={index} className="card bg-base-200 border border-base-300">
                <div className="card-body p-7 flex flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-base-100 flex items-center justify-center text-primary shrink-0">
                    {item.icon}
                  </div>
                  <div className="text-base-content/80 font-semibold leading-relaxed">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
