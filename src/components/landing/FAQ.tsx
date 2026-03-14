"use client";

const faqs = [
  {
    question: "How do I use the card at a merchant?",
    answer: "Simply present your card at the checkout. The merchant will either tap it on their SmartCard scanner or scan the QR code on the back. Your discount is applied instantly to your bill."
  },
  {
    question: "Is there a monthly subscription fee?",
    answer: "No! For the Founder's Edition, you pay once and get lifetime access to the discount network. We believe in simple, transparent value."
  },
  {
    question: "Where can I see the list of partner merchants?",
    answer: "Once you create an account, you'll have access to our merchant directory. We are launching in major cities first and expanding rapidly."
  },
  {
    question: "What happens if I lose my card?",
    answer: "You can deactivate your lost card and order a replacement through your dashboard for a small shipping and handling fee. Your digital QR code in the app will still work!"
  },
  {
    question: "When will I receive my card?",
    answer: "We are currently in the pre-order phase to finalize merchant partnerships. We expect to ship the first batch of Founder's Edition cards in Q3 2024."
  }
];

export default function FAQ() {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Everything you need to know about the SmartCard network.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200 border border-base-300">
              <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
              <div className="collapse-title text-xl font-bold">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content/70"> 
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
