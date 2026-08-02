"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Database, Settings, Rocket } from "lucide-react";

const stepIcons = [Database, Settings, Rocket];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-gray-950">
      <FadeIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Como <GradientText>Funciona</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Em três passos simples, você terá agentes de IA rodando em
            produção.
          </p>
        </div>
      </FadeIn>

      <div className="relative mt-16">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-500 to-purple-500 lg:block" />

        <div className="grid gap-12 lg:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <FadeIn key={step.step} delay={i * 0.2}>
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mt-6 text-sm font-semibold text-blue-400">
                    Passo {step.step}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-400">{step.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
