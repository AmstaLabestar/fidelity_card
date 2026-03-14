"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-base-100 pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Star size={14} fill="currentColor" />
                <span>Join 5,000+ early adopters</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight mb-6">
                The Only Card You Need for <span className="text-primary italic">Unlimited</span> Discounts.
              </h1>
              <p className="text-lg lg:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto lg:mx-0">
                One physical RFID card. Thousands of local merchants. Instant savings with a simple tap or scan. Pre-order yours today and save up to 50% on your daily expenses.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/register" className="btn btn-primary btn-lg rounded-full px-10 group">
                  Pre-order My Card
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link href="#how-it-works" className="btn btn-ghost btn-lg rounded-full px-10">
                  See How it Works
                </Link>
              </div>
              
              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-success" />
                  <span className="text-sm font-medium">Secure RFID Tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-warning" />
                  <span className="text-sm font-medium">Instant Activation</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              {/* Card Mockup */}
              <div className="w-full max-w-md mx-auto aspect-[1.586/1] bg-gradient-to-br from-neutral to-neutral-focus rounded-2xl shadow-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest opacity-60 font-semibold mb-1">SmartCard Network</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <Zap size={16} className="text-primary" fill="currentColor" />
                      </div>
                      <span className="font-bold text-xl italic tracking-tighter">PREMIUM</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                    <CreditCard size={24} />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex gap-4 text-xl font-mono tracking-[0.2em] opacity-80">
                    <span>••••</span>
                    <span>••••</span>
                    <span>••••</span>
                    <span>2024</span>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase opacity-50 font-bold">Card Holder</span>
                      <span className="font-semibold tracking-wide">EARLY ADOPTER</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/20 rounded-full border border-white/20"></div>
                      <div className="w-10 h-10 bg-white/20 rounded-full -ml-6 border border-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/30 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/30 rounded-full blur-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreditCard({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
