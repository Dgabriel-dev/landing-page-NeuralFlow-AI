"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { FEATURES } from "@/lib/constants";
import {
  Brain,
  Zap,
  BarChart3,
  Puzzle,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Zap,
  BarChart3,
  Puzzle,
  Globe,
  Lock,
};

export default function Features() {
  return (
    <Section id="features" className="bg-gray-950">
      <FadeIn>
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Funcionalidades
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Tudo que você precisa em{" "}
            <GradientText>um só lugar</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Ferramentas poderosas para construir, treinar e deployar agentes de
            IA em produção.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-3 ring-1 ring-white/10">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-1 text-sm text-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>Saiba mais</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
