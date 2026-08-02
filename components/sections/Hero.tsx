"use client";

import Button from "@/ui/Button";
import GradientText from "@/ui/GradientText";
import FadeIn from "@/ui/FadeIn";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 pt-16"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <FadeIn delay={0.1}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>Plataforma de IA de Nova Geração</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Transforme dados em{" "}
            <GradientText>decisões inteligentes</GradientText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
            Automatize processos, descubra insights e escale seus resultados com
            agentes de IA que aprendem e se adaptam ao seu negócio.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="#cta" size="lg">
              Comece Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              Como Funciona
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-8 border-t border-white/10 pt-10">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "10x", label: "Mais Rápido" },
              { value: "50K+", label: "Usuários Ativos" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-white sm:text-3xl"
                >
                  {stat.value}
                </motion.div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
