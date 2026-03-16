import { Percent, ShoppingBag, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("landing.howItWorks");

  const steps = [
    {
      icon: <UserPlus className="text-primary" size={28} />,
      title: t("step1Title"),
      description: t("step1Body"),
    },
    {
      icon: <ShoppingBag className="text-secondary" size={28} />,
      title: t("step2Title"),
      description: t("step2Body"),
    },
    {
      icon: <Percent className="text-accent" size={28} />,
      title: t("step3Title"),
      description: t("step3Body"),
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
            {t("title")}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl border border-base-300"
            >
              <div className="card-body items-center text-center p-8 sm:p-10">
                <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <h3 className="card-title text-xl font-black mb-2">{step.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

