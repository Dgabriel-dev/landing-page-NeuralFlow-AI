"use client";

import { motion } from "framer-motion";

function ChartBar({ delay, height, color }: { delay: number; height: number; color: string }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`w-full origin-bottom rounded-t-sm ${color}`}
      style={{ height: `${height}%` }}
    />
  );
}

function StatCard({
  label,
  value,
  change,
  delay,
}: {
  label: string;
  value: string;
  change: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
    >
      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-white">{value}</div>
      <div className="text-[10px] text-emerald-400">{change}</div>
    </motion.div>
  );
}

export default function DashboardMockup() {
  const bars = [
    { height: 45, color: "bg-blue-500/60", delay: 0.8 },
    { height: 70, color: "bg-blue-500/70", delay: 0.9 },
    { height: 55, color: "bg-blue-500/60", delay: 1.0 },
    { height: 85, color: "bg-purple-500/70", delay: 1.1 },
    { height: 65, color: "bg-blue-500/60", delay: 1.2 },
    { height: 90, color: "bg-purple-500/80", delay: 1.3 },
    { height: 75, color: "bg-blue-500/70", delay: 1.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="relative mx-auto mt-16 max-w-4xl"
    >
      {/* Glow behind */}
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/80 shadow-2xl backdrop-blur-xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-4 flex-1 text-center text-[11px] text-gray-500">
            app.neuralflow.ai/dashboard
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Sidebar mini */}
            <div className="hidden w-12 shrink-0 space-y-3 lg:block">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="mx-auto h-8 w-8 rounded-lg bg-white/5" />
              ))}
            </div>

            {/* Main area */}
            <div className="flex-1 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">Dashboard Overview</div>
                  <div className="text-[10px] text-gray-500">Últimos 7 dias</div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-md bg-white/5" />
                  <div className="h-6 w-16 rounded-md bg-blue-500/20" />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <StatCard label="Receita" value="R$ 284K" change="+12.5%" delay={0.7} />
                <StatCard label="Usuários" value="18.2K" change="+8.3%" delay={0.8} />
                <StatCard label="Conversão" value="4.6%" change="+1.2%" delay={0.9} />
                <StatCard label="Uptime" value="99.9%" change="Estável" delay={1.0} />
              </div>

              {/* Chart area */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[11px] font-medium text-gray-400">Performance</div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Mensal
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                      Projeção
                    </div>
                  </div>
                </div>
                <div className="flex h-32 items-end gap-2">
                  {bars.map((bar, i) => (
                    <ChartBar key={i} {...bar} />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-gray-600">
                  <span>Seg</span>
                  <span>Ter</span>
                  <span>Qua</span>
                  <span>Qui</span>
                  <span>Sex</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
