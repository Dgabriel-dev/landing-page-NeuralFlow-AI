"use client";

import Section from "@/ui/Section";
import FadeIn from "@/ui/FadeIn";
import GradientText from "@/ui/GradientText";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contato@neuralflow.ai",
    href: "mailto:contato@neuralflow.ai",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 (11) 9999-0000",
    href: "tel:+551199990000",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "São Paulo, BR",
    href: "#",
  },
];

export default function Contact() {
  return (
    <Section id="contact" className="bg-gray-950">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column - info */}
        <FadeIn direction="left">
          <div className="lg:sticky lg:top-32">
            <p className="mb-3 text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Contato
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Vamos{" "}
              <GradientText>conversar</GradientText>
            </h2>
            <p className="mt-4 text-gray-400">
              Preencha o formulário e nosso time entrará em contato em até 24
              horas.
            </p>

            <div className="mt-10 space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="text-sm text-white transition-colors group-hover:text-blue-400">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Right column - form */}
        <FadeIn direction="right" delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm sm:p-8">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
