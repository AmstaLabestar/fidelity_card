"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-primary text-primary-content overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight">
            Ready to start saving on everything you love?
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of early adopters and secure your Founder's Edition SmartCard today. Limited quantities available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register" className="btn btn-neutral btn-lg rounded-full px-12 text-lg group">
              Pre-order Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="avatar border-2 border-primary">
                  <div className="w-12 h-12">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                  </div>
                </div>
              ))}
              <div className="avatar placeholder border-2 border-primary">
                <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full">
                  <span className="text-xs">+5k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
