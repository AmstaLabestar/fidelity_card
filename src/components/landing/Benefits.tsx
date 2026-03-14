"use client";

import { motion } from "motion/react";
import { Coffee, Utensils, Dumbbell, ShoppingCart, Plane, Zap } from "lucide-react";

const benefits = [
  {
    icon: <Coffee size={24} />,
    title: "Daily Coffee",
    discount: "20% OFF",
    description: "Save on your morning ritual at local specialty cafes."
  },
  {
    icon: <Utensils size={24} />,
    title: "Dining Out",
    discount: "15% OFF",
    description: "Exclusive deals at the best restaurants in town."
  },
  {
    icon: <Dumbbell size={24} />,
    title: "Fitness",
    discount: "30% OFF",
    description: "Reduced membership fees at partner gyms and studios."
  },
  {
    icon: <ShoppingCart size={24} />,
    title: "Groceries",
    discount: "10% OFF",
    description: "Save on essentials at local organic markets."
  },
  {
    icon: <Plane size={24} />,
    title: "Travel",
    discount: "25% OFF",
    description: "Discounts on local tours and boutique hotels."
  },
  {
    icon: <Zap size={24} />,
    title: "Entertainment",
    discount: "50% OFF",
    description: "Half-price tickets for cinemas and local events."
  }
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-base-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4">Unlimited Benefits</h2>
            <p className="text-base-content/60">
              The SmartCard network is growing every day. Here are some of the categories where you can start saving immediately.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="stats shadow bg-primary text-primary-content">
              <div className="stat">
                <div className="stat-title text-primary-content/70">Partner Merchants</div>
                <div className="stat-value">1,200+</div>
                <div className="stat-desc text-primary-content/70">Growing weekly</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-8 rounded-3xl bg-base-200 border border-base-300 hover:border-primary/30 transition-colors group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-base-100 flex items-center justify-center text-primary shadow-sm">
                  {benefit.icon}
                </div>
                <span className="badge badge-primary badge-lg font-bold py-4 px-4">{benefit.discount}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-base-content/60">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
