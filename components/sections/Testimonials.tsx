"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { TESTIMONIALS } from "@/lib/constants";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} de 5 estrelas`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <Section id="testimonials" className="bg-gray-900/30">
      <FadeIn>
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Depoimentos
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            O que nossos clientes{" "}
            <GradientText>dizem</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Mais de 50 empresas já transformaram seus resultados com NeuralFlow
            AI.
          </p>
        </div>
      </FadeIn>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((testimonial, i) => (
          <FadeIn key={testimonial.name} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-white/5" />

              <StarRating rating={testimonial.rating} />

              <p className="mt-4 flex-1 text-sm text-gray-300 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.role} na {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      {/* Social proof bar */}
      <FadeIn delay={0.5}>
        <div className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-10">
          {[
            { value: "4.9/5", label: "Avaliação média" },
            { value: "500+", label: "Reviews" },
            { value: "98%", label: "Recomendam" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
