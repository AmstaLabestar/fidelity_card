import { CreditCard, MapPin, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("landing.problem");

  const cards = [
    { icon: <MapPin size={22} />, title: t("card1Title"), body: t("card1Body") },
    { icon: <CreditCard size={22} />, title: t("card2Title"), body: t("card2Body") },
    { icon: <Smartphone size={22} />, title: t("card3Title"), body: t("card3Body") },
  ];

  return (
    <section id="problem" className="py-12 sm:py-20 bg-base-100 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
            {t("title")}
          </h2>
          <p className="text-base-content/70">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <div key={index} className="card bg-base-200 border border-base-300">
              <div className="card-body p-7 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-base-100 flex items-center justify-center text-primary shadow-sm mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-black mb-2">{card.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
