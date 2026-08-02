"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { BENEFITS } from "@/lib/constants";
import {
  TrendingUp,
  Clock,
  Target,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Clock,
  Target,
  Shield,
};

export default function Benefits() {
  return (
    <Section id="benefits" className="bg-gray-950">
      <FadeIn>
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Benefícios
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Por que escolher o <GradientText>NeuralFlow AI</GradientText>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Resultados comprovados que transformam a maneira como sua empresa
            opera e toma decisões.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit, i) => {
          const Icon = iconMap[benefit.icon];
          return (
            <FadeIn key={benefit.title} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.08]">
                {benefit.stat && (
                  <div className="absolute -top-3 -right-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 + i * 0.1 }}
                      className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-blue-500/25"
                    >
                      {benefit.stat}
                    </motion.div>
                  </div>
                )}

                <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {benefit.description}
                </p>

                {benefit.statLabel && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="text-xs text-gray-500">{benefit.statLabel}</div>
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
