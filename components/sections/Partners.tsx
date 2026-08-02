"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import { PARTNERS } from "@/lib/constants";

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-10 items-center justify-center rounded-lg bg-white/5 px-6 text-sm font-medium text-gray-500 transition-colors hover:text-gray-400">
      {name}
    </div>
  );
}

export default function Partners() {
  return (
    <Section id="partners" className="border-y border-white/5 bg-gray-950/50 py-12 md:py-16">
      <FadeIn>
        <p className="mb-8 text-center text-sm text-gray-500 uppercase tracking-wider">
          Empresas que confiam no NeuralFlow AI
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {PARTNERS.map((partner, i) => (
            <div
              key={partner.name}
              className="grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <LogoPlaceholder name={partner.name} />
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
