import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("landing.faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-base-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">
            {t("title")}
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200 border border-base-300">
              <input type="radio" name="landing-faq" defaultChecked={index === 0} />
              <div className="collapse-title text-lg font-black">{faq.q}</div>
              <div className="collapse-content text-base-content/70">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

