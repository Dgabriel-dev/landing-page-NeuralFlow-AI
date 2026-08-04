"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getSupabase } from "@/lib/supabase";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  LogOut,
  BarChart3,
  Settings,
  X,
  Menu,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Configurações", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getSupabase().auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? "");
    });
  }, []);

  const handleLogout = useCallback(async () => {
    await getSupabase().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }, [router]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <span className="text-sm font-bold text-white">N</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">NeuralFlow</div>
          <div className="text-xs text-gray-500">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Menu administrativo">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 truncate rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-400">
          {userEmail}
        </div>
        <button
          onClick={handleLogout}
          aria-label="Sair do painel administrativo"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm lg:hidden"
        aria-label="Abrir menu"
        aria-expanded={mobileOpen}
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-gray-950 transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white"
          aria-label="Fechar menu"
        >
          <X className="h-4 w-4" />
        </button>
        {sidebar}
      </aside>

      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-gray-950 lg:block" aria-label="Menu administrativo">
        {sidebar}
      </aside>
    </>
  );
}
