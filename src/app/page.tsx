import Hero from "@/src/components/landing/Hero";
import HowItWorks from "@/src/components/landing/HowItWorks";
import Benefits from "@/src/components/landing/Benefits";
import Pricing from "@/src/components/landing/Pricing";
import FAQ from "@/src/components/landing/FAQ";
import CTA from "@/src/components/landing/CTA";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}
