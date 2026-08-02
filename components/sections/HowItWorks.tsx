"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Database, Settings, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const stepIcons: Record<string, React.ElementType> = {
  Database,
  Settings,
  Rocket,
};

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-gray-900/30">
      <FadeIn>
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Como Funciona
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Três passos para <GradientText>transformar</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Em minutos, você terá agentes de IA rodando em produção. Sem
            complicação, sem código complexo.
          </p>
        </div>
      </FadeIn>

      <div className="relative mt-20">
        {/* Connecting line */}
        <div className="absolute left-0 top-0 hidden h-full w-full lg:block">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = stepIcons[step.icon];
            return (
              <FadeIn key={step.step} delay={i * 0.2} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
                <div className="relative text-center">
                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.2 + i * 0.15 }}
                    className="relative mx-auto mb-6"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/25">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-950 text-xs font-bold text-white ring-2 ring-blue-500">
                      {step.step}
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-400">{step.description}</p>

                  {/* Decorative arrow (hidden on mobile and last item) */}
                  {i < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="absolute right-0 top-10 hidden text-gray-700 lg:block">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M8 20H32M32 20L24 12M32 20L24 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
