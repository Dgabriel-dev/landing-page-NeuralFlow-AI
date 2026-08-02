"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { Target, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Missão",
    description:
      "Democratizar o acesso à inteligência artificial, tornando-a acessível e útil para empresas de todos os tamanhos.",
  },
  {
    icon: Users,
    title: "Equipe",
    description:
      "Um time apaixonado por tecnologia e inovação, com experiência em empresas como Google, Meta e startups de IA.",
  },
  {
    icon: Lightbulb,
    title: "Visão",
    description:
      "Ser a plataforma de IA mais confiável do mercado, empoderando milhões de decisões inteligentes todos os dias.",
  },
];

export default function About() {
  return (
    <Section id="about" className="bg-gray-950">
      <FadeIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Sobre a <GradientText>NeuralFlow AI</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Fundada em 2024, a NeuralFlow AI nasceu da vontade de tornar a
            inteligência artificial uma ferramenta acessível e poderosa para
            todos.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {values.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
              <item.icon className="h-10 w-10 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-400">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
