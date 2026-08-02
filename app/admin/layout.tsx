"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setError("Tempo esgotado ao conectar com Supabase. Verifique as variáveis de ambiente no Vercel.");
        setLoading(false);
      }
    }, 10000);

    async function checkAuth() {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          if (!cancelled) {
            setError("Variáveis de ambiente do Supabase não configuradas.");
            setLoading(false);
          }
          return;
        }

        const { getSupabase } = await import("@/lib/supabase");
        const supabase = getSupabase();
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (cancelled) return;

        if (sessionError) {
          router.replace("/admin/login");
          return;
        }

        if (!data.session) {
          router.replace("/admin/login");
          return;
        }

        setUser(data.session.user);
        setLoading(false);
      } catch {
        if (!cancelled) {
          router.replace("/admin/login");
        }
      }
    }

    checkAuth();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-400">Erro de Configuração</h2>
          <p className="mt-2 text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
