"use client";

import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import type { Lead } from "@/types";
import {
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Mail,
  Building2,
  Calendar,
  MessageSquare,
} from "lucide-react";

const statusLabels: Record<string, { label: string; color: string }> = {
  new: { label: "Novo", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  contacted: { label: "Contactado", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  converted: { label: "Convertido", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  archived: { label: "Arquivado", color: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
};

export default function AdminLeadsTable({
  leads,
  totalPages,
  currentPage,
  search,
  status,
  totalCount,
  onPageChange,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: {
  leads: Lead[];
  totalPages: number;
  currentPage: number;
  search: string;
  status: string;
  totalCount: number;
  onPageChange: (page: number) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRefresh: () => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== search) {
        onSearchChange(searchInput);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput, search, onSearchChange]);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;

    setDeletingId(id);
    try {
      const { error } = await getSupabase().from("leads").delete().eq("id", id);
      if (error) {
        alert("Erro ao excluir lead.");
        return;
      }
      onRefresh();
    } catch {
      alert("Erro inesperado.");
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou empresa..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Buscar leads"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filtrar por status"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
          >
            <option value="">Todos os status</option>
            <option value="new">Novo</option>
            <option value="contacted">Contactado</option>
            <option value="converted">Convertido</option>
            <option value="archived">Arquivado</option>
          </select>
        </div>

        <div className="text-sm text-gray-500">
          {totalCount} lead{totalCount !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="overflow-x-auto">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Search className="mb-3 h-10 w-10 text-gray-700" />
            <p className="text-sm">Nenhum lead encontrado.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider">
                <th scope="col" className="px-4 py-3 font-medium">Nome</th>
                <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">Empresa</th>
                <th scope="col" className="hidden px-4 py-3 font-medium lg:table-cell">Data</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-white">{lead.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="flex items-center gap-1 text-gray-400">
                      {lead.company ? (
                        <>
                          <Building2 className="h-3 w-3" />
                          {lead.company}
                        </>
                      ) : (
                        <span className="text-gray-600">&mdash;</span>
                      )}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(lead.created_at)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusLabels[lead.status]?.color || ""}`}>
                      {statusLabels[lead.status]?.label || lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label={expandedId === lead.id ? "Ocultar mensagem" : "Ver mensagem"}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={deletingId === lead.id}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                        aria-label="Excluir lead"
                      >
                        {deletingId === lead.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {expandedId && (
          <div className="border-t border-white/10 bg-white/[0.02] px-4 py-4">
            <div className="text-xs text-gray-500">Mensagem:</div>
            <p className="mt-1 text-sm text-gray-300">
              {leads.find((l) => l.id === expandedId)?.message}
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center justify-between border-t border-white/10 px-4 py-3" aria-label="Paginação">
          <div className="text-xs text-gray-500">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Próxima página"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
