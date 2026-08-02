"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { TESTIMONIALS } from "@/lib/constants";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <Section id="testimonials" className="bg-gray-900/50">
      <FadeIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            O que nossos clientes <GradientText>dizem</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Empresas que já transformaram seus resultados com NeuralFlow AI.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, i) => (
          <FadeIn key={testimonial.name} delay={i * 0.15}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-300">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
