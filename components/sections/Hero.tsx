"use client";

import Button from "@/ui/Button";
import GradientText from "@/ui/GradientText";
import FadeIn from "@/ui/FadeIn";
import DashboardMockup from "@/components/DashboardMockup";
import { ArrowRight, Sparkles, Play, Shield, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/8 blur-[150px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.4)_70%,rgba(3,7,18,1)_100%)]" />
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: Shield, label: "SOC 2 Certificado" },
    { icon: Star, label: "4.9 no G2" },
    { icon: Users, label: "50K+ Usuários" },
    { icon: Zap, label: "99.99% Uptime" },
  ];

  return (
    <FadeIn delay={1.0}>
      <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-gray-300"
          >
            <badge.icon className="h-3.5 w-3.5 text-blue-400" />
            <span>{badge.label}</span>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-gray-950 pt-16"
    >
      <GridBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Top badge */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mb-8 w-fit">
            <div className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-white/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Plataforma de IA de Nova Geração</span>
              <ArrowRight className="h-3.5 w-3.5 text-gray-500 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.2}>
          <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Transforme dados em{" "}
            <GradientText>decisões inteligentes</GradientText>
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.35}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base text-gray-400 sm:text-lg lg:text-xl">
            Automatize processos, descubra insights e escale seus resultados com
            agentes de IA que aprendem e se adaptam ao seu negócio.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.5}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="#cta" size="lg" className="group min-w-[200px]">
              Comece Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg" className="group min-w-[200px]">
              <Play className="mr-2 h-4 w-4 fill-current" />
              Veja o Demo
            </Button>
          </div>
        </FadeIn>

        {/* Dashboard mockup */}
        <DashboardMockup />

        {/* Trust badges */}
        <TrustBadges />

        {/* Stats bar */}
        <FadeIn delay={1.4}>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { value: "99.9%", label: "Uptime Garantido" },
              { value: "<200ms", label: "Latência Média" },
              { value: "50K+", label: "Decisões/dia" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-xl font-bold text-white sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
