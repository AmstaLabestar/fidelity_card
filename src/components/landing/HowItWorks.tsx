"use client";

import { motion } from "motion/react";
import { UserPlus, ShoppingBag, Percent } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="text-primary" size={32} />,
    title: "1. Create Account",
    description: "Sign up in seconds and pre-order your unique SmartCard. We'll ship it directly to your doorstep."
  },
  {
    icon: <ShoppingBag className="text-secondary" size={32} />,
    title: "2. Visit Partners",
    description: "Check our app to find thousands of partner merchants in your city—from cafes to gyms."
  },
  {
    icon: <Percent className="text-accent" size={32} />,
    title: "3. Tap & Save",
    description: "Simply tap your card on the merchant's scanner or scan the QR code to unlock instant discounts."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4">How It Works</h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            We've made saving money as simple as buying a coffee. No coupons, no complex apps, just one card.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300 group"
            >
              <div className="card-body items-center text-center p-10">
                <div className="w-20 h-20 rounded-2xl bg-base-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="card-title text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-base-content/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
