import { Scissors, Shirt, ShoppingBasket, UtensilsCrossed, Gamepad2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Partners() {
  const t = useTranslations("landing.partners");

  const categories = [
    { icon: <UtensilsCrossed size={20} />, label: t("c1") },
    { icon: <ShoppingBasket size={20} />, label: t("c2") },
    { icon: <Scissors size={20} />, label: t("c3") },
    { icon: <Shirt size={20} />, label: t("c4") },
    { icon: <Gamepad2 size={20} />, label: t("c5") },
  ];

  return (
    <section id="partners" className="py-16 sm:py-20 bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
            {t("title")}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="card-body p-7 flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary">
                  {category.icon}
                </div>
                <div className="font-black">{category.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

