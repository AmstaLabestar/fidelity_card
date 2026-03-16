import { PiggyBank, Store, Smile, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Benefits() {
  const t = useTranslations("landing.benefits");

  const items = [
    {
      icon: <PiggyBank size={22} />,
      title: t("b1Title"),
      description: t("b1Body"),
    },
    {
      icon: <Store size={22} />,
      title: t("b2Title"),
      description: t("b2Body"),
    },
    {
      icon: <Smile size={22} />,
      title: t("b3Title"),
      description: t("b3Body"),
    },
    {
      icon: <Smartphone size={22} />,
      title: t("b4Title"),
      description: t("b4Body"),
    },
  ];

  return (
    <section id="benefits" className="py-12 sm:py-20 bg-base-100 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
              {t("title")}
            </h2>
            <p className="text-base-content/70">{t("subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-7 rounded-3xl bg-base-200 border border-base-300 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-base-100 flex items-center justify-center text-primary shadow-sm mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-black mb-2">{item.title}</h3>
              <p className="text-base-content/70 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
