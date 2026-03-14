"use client";

import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter mb-4">Simple Pricing</h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            No hidden fees. No monthly subscriptions. Just a one-time payment for a lifetime of savings.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="card bg-base-100 shadow-2xl border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-content px-10 py-1 rotate-45 translate-x-10 translate-y-4 font-bold text-sm">
              BEST VALUE
            </div>
            
            <div className="card-body p-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Founder's Edition</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-black">$29</span>
                  <span className="text-base-content/50 line-through text-xl">$59</span>
                </div>
                <p className="text-sm text-primary font-semibold mt-2">One-time payment. Lifetime access.</p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="bg-success/20 text-success p-1 rounded-full">
                    <Check size={16} />
                  </div>
                  <span>Physical RFID + QR Card</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success/20 text-success p-1 rounded-full">
                    <Check size={16} />
                  </div>
                  <span>Unlimited network access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success/20 text-success p-1 rounded-full">
                    <Check size={16} />
                  </div>
                  <span>Mobile App companion</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success/20 text-success p-1 rounded-full">
                    <Check size={16} />
                  </div>
                  <span>Exclusive Founder's badge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-success/20 text-success p-1 rounded-full">
                    <Check size={16} />
                  </div>
                  <span>Priority support</span>
                </div>
              </div>

              <Link href="/register" className="btn btn-primary btn-lg w-full rounded-full">
                Pre-order Now
              </Link>
              <p className="text-center text-xs text-base-content/50 mt-4">
                Estimated shipping: Q3 2024. Limited to first 10,000 orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
