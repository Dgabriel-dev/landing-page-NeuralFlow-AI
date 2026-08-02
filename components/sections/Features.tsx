"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { FEATURES } from "@/lib/constants";
import {
  Brain,
  Zap,
  Shield,
  BarChart3,
  Puzzle,
  Globe,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Zap,
  Shield,
  BarChart3,
  Puzzle,
  Globe,
};

export default function Features() {
  return (
    <Section id="features" className="bg-gray-900/50">
      <FadeIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Funcionalidades <GradientText>Poderosas</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Tudo que você precisa para construir, treinar e deployar agentes de
            IA em produção.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-gray-950/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
