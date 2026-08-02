"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import Button from "@/ui/Button";
import GradientText from "@/ui/GradientText";
import { ArrowRight, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const perks = [
  "14 dias grátis, sem cartão",
  "Suporte técnico dedicado",
  "Setup em menos de 5 minutos",
];

export default function CTA() {
  return (
    <Section id="cta" className="bg-gray-900/30">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm">
          {/* Background effects */}
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]" />

          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
            <div className="mx-auto max-w-3xl text-center">
              <FadeIn delay={0.1}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>Comece agora mesmo</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Pronto para{" "}
                  <GradientText>transformar</GradientText> seu negócio?
                </h2>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="mx-auto mt-6 max-w-xl text-gray-400">
                  Junte-se a mais de 50 empresas que já estão usando o NeuralFlow
                  AI para automatizar processos e escalar resultados.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button href="#contact" size="lg" className="group min-w-[220px]">
                    Comece Gratuitamente
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    href="#"
                    variant="secondary"
                    size="lg"
                    className="group min-w-[220px]"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Fale com um Especialista
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {perks.map((perk, i) => (
                    <motion.div
                      key={perk}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span>{perk}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
