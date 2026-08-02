"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import Button from "@/ui/Button";
import GradientText from "@/ui/GradientText";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <Section id="cta" className="bg-gray-950">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-12 backdrop-blur-sm sm:p-16">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 text-center">
            <Mail className="mx-auto h-12 w-12 text-blue-400" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Pronto para{" "}
              <GradientText>transformar seu negócio</GradientText>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Comece gratuitamente e escale conforme cresce. Sem cartão de
              crédito, sem compromisso.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg">
                Comece Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="#" variant="secondary" size="lg">
                Fale com Especialista
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
