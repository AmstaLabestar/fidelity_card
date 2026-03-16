import Hero from "@/src/components/landing/Hero";
import Problem from "@/src/components/landing/Problem";
import Solution from "@/src/components/landing/Solution";
import HowItWorks from "@/src/components/landing/HowItWorks";
import Benefits from "@/src/components/landing/Benefits";
import Partners from "@/src/components/landing/Partners";
import Trust from "@/src/components/landing/Trust";
import Preorder from "@/src/components/landing/Preorder";
import FAQ from "@/src/components/landing/FAQ";
import CTA from "@/src/components/landing/CTA";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Benefits />
      <Partners />
      <Trust />
      <Preorder />
      <FAQ />
      <CTA />
    </div>
  );
}
