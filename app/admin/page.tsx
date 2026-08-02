"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import AdminLeadsTable from "@/components/admin/AdminLeadsTable";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 10;

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
  status: string;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0,
  });

  const pageRef = useRef(page);
  const searchRef = useRef(search);
  const statusRef = useRef(status);

  useEffect(() => {
    pageRef.current = page;
    searchRef.current = search;
    statusRef.current = status;
  }, [page, search, status]);

  useEffect(() => {
    let cancelled = false;

    async function fetchLeads() {
      setLoading(true);
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const currentPage = pageRef.current;
      const currentSearch = searchRef.current;
      const currentStatus = statusRef.current;
      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("leads")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (currentSearch) {
        query = query.or(
          `name.ilike.%${currentSearch}%,email.ilike.%${currentSearch}%,company.ilike.%${currentSearch}%`
        );
      }

      if (currentStatus) {
        query = query.eq("status", currentStatus);
      }

      const { data, count } = await query;

      if (!cancelled) {
        setLeads(data || []);
        setTotalCount(count || 0);
        setLoading(false);
      }
    }

    fetchLeads();

    return () => {
      cancelled = true;
    };
  }, [page, search, status]);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const [total, newCount, contacted, converted] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "contacted"),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "converted"),
      ]);

      if (!cancelled) {
        setStats({
          total: total.count || 0,
          new: newCount.count || 0,
          contacted: contacted.count || 0,
          converted: converted.count || 0,
        });
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleRefresh() {
    // Force re-fetch by toggling a refresh counter
    setPage((p) => p);
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Gerencie os leads capturados pelo formulário de contato.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total de Leads", value: stats.total, color: "text-white" },
          { label: "Novos", value: stats.new, color: "text-blue-400" },
          { label: "Contactados", value: stats.contacted, color: "text-yellow-400" },
          { label: "Convertidos", value: stats.converted, color: "text-green-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className={`mt-1 text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Leads table */}
      {loading && leads.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      ) : (
        <AdminLeadsTable
          leads={leads}
          totalPages={totalPages}
          currentPage={page}
          search={search}
          status={status}
          totalCount={totalCount}
          onPageChange={setPage}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}
