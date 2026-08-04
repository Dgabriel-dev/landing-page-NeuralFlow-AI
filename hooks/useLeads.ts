"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { Lead } from "@/types";

const PAGE_SIZE = 10;

export function useLeads() {
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

  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
    setPage(1);
  }, []);

  return {
    leads,
    loading,
    page,
    search,
    status,
    totalCount,
    totalPages,
    setPage,
    handleRefresh,
    handleSearchChange,
    handleStatusChange,
  };
}
