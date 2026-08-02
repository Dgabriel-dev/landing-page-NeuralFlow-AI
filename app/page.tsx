import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Benefits from "@/components/sections/Benefits";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Benefits />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
