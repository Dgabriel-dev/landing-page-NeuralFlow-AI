"use client";

import { useState } from "react";
import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import { FAQ_ITEMS } from "@/lib/constants";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-blue-400"
      >
        <span className="text-base font-medium text-white">{question}</span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all duration-300 group-hover:bg-white/10">
          {isOpen ? (
            <Minus className="h-4 w-4 text-blue-400" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-gray-950">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column - heading */}
        <FadeIn direction="left">
          <div className="lg:sticky lg:top-32">
            <p className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
              FAQ
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Perguntas{" "}
              <GradientText>frequentes</GradientText>
            </h2>
            <p className="mt-4 text-gray-400">
              Não encontrou o que procurava? Entre em contato com nosso time de
              suporte.
            </p>
            <div className="mt-8">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Fale Conosco
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Right column - accordion */}
        <FadeIn direction="right" delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
