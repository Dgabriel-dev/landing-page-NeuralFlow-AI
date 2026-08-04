"use client";

import AdminLeadsTable from "@/components/admin/AdminLeadsTable";
import { Loader2 } from "lucide-react";
import { useLeads } from "@/hooks/useLeads";

export default function LeadsPage() {
  const {
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
  } = useLeads();

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
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}
