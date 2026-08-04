"use client";

import { useEffect, useState, useRef } from "react";
import AdminLeadsTable from "@/components/admin/AdminLeadsTable";
import { Loader2 } from "lucide-react";
import type { Lead } from "@/types";

const PAGE_SIZE = 10;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

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
      try {
        const { getSupabase } = await import("@/lib/supabase");
        const supabase = getSupabase();
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
        }
      } catch {
        if (!cancelled) {
          setLeads([]);
          setTotalCount(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLeads();
    return () => { cancelled = true; };
  }, [page, search, status, refreshKey]);

  function handleRefresh() {
    setRefreshKey((k) => k + 1);
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="mt-1 text-sm text-gray-400">
          Todos os leads capturados pelo formulário de contato.
        </p>
      </div>

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
