"use client";

import { useEffect, useState } from "react";
import { Loader2, TrendingUp, TrendingDown, Users, Mail, Building2, Clock } from "lucide-react";

interface AnalyticsData {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  archivedLeads: number;
  recentLeads: { name: string; email: string; created_at: string; status: string }[];
  leadsByDay: { date: string; count: number }[];
  conversionRate: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchAnalytics() {
      try {
        const { getSupabase } = await import("@/lib/supabase");
        const supabase = getSupabase();

        const [total, newC, contacted, converted, archived, recent] = await Promise.all([
          supabase.from("leads").select("*", { count: "exact", head: true }),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "contacted"),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "converted"),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "archived"),
          supabase.from("leads").select("name, email, created_at, status").order("created_at", { ascending: false }).limit(5),
        ]);

        const totalCount = total.count || 0;
        const convertedCount = converted.count || 0;

        if (!cancelled) {
          setData({
            totalLeads: totalCount,
            newLeads: newC.count || 0,
            contactedLeads: contacted.count || 0,
            convertedLeads: convertedCount,
            archivedLeads: archived.count || 0,
            recentLeads: recent.data || [],
            leadsByDay: [],
            conversionRate: totalCount > 0 ? Math.round((convertedCount / totalCount) * 100) : 0,
          });
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAnalytics();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!data) return null;

  const statCards = [
    { label: "Total de Leads", value: data.totalLeads, icon: Users, color: "text-white" },
    { label: "Novos", value: data.newLeads, icon: Mail, color: "text-blue-400" },
    { label: "Contactados", value: data.contactedLeads, icon: Building2, color: "text-yellow-400" },
    { label: "Convertidos", value: data.convertedLeads, icon: TrendingUp, color: "text-green-400" },
    { label: "Arquivados", value: data.archivedLeads, icon: TrendingDown, color: "text-gray-400" },
    { label: "Taxa de Conversão", value: `${data.conversionRate}%`, icon: TrendingUp, color: "text-purple-400" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-gray-400">
          Métricas e desempenho do formulário de contato.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <stat.icon className="h-4 w-4" />
              {stat.label}
            </div>
            <div className={`mt-2 text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Leads Recentes</h2>
        {data.recentLeads.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhum lead ainda.</p>
        ) : (
          <div className="space-y-3">
            {data.recentLeads.map((lead, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-white">{lead.name}</div>
                  <div className="text-xs text-gray-500">{lead.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    <Clock className="mr-1 inline h-3 w-3" />
                    {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${
                    lead.status === "new" ? "border-blue-500/20 bg-blue-500/10 text-blue-400" :
                    lead.status === "contacted" ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400" :
                    lead.status === "converted" ? "border-green-500/20 bg-green-500/10 text-green-400" :
                    "border-gray-500/20 bg-gray-500/10 text-gray-400"
                  }`}>
                    {lead.status === "new" ? "Novo" :
                     lead.status === "contacted" ? "Contactado" :
                     lead.status === "converted" ? "Convertido" : "Arquivado"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
