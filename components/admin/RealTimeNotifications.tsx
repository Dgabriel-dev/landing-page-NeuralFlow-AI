"use client";

import { useEffect, useState, useCallback } from "react";
import { Bell, X } from "lucide-react";

interface Notification {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export default function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  useEffect(() => {
    let channel: ReturnType<ReturnType<typeof import("@/lib/supabase").getSupabase>["channel"]> | null = null;
    let supabaseInstance: ReturnType<typeof import("@/lib/supabase").getSupabase> | null = null;

    async function subscribe() {
      const { getSupabase } = await import("@/lib/supabase");
      const supabase = getSupabase();
      supabaseInstance = supabase;

      channel = supabase
        .channel("leads-realtime")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "leads" },
          (payload) => {
            const newLead = payload.new as Notification;
            setNotifications((prev) => [newLead, ...prev].slice(0, 10));

            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Novo Lead!", {
                body: `${newLead.name} - ${newLead.email}`,
                icon: "/favicon.ico",
              });
            }
          }
        )
        .subscribe();
    }

    subscribe();

    return () => {
      if (channel && supabaseInstance) {
        supabaseInstance.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && notifications.length > 0 && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/10 bg-gray-900 shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">Novos Leads</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 border-b border-white/5 px-4 py-3 last:border-0"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{n.name}</div>
                  <div className="text-xs text-gray-500">{n.email}</div>
                  <div className="mt-1 text-[10px] text-gray-600">
                    {new Date(n.created_at).toLocaleTimeString("pt-BR")}
                  </div>
                </div>
                <button
                  onClick={() => removeNotification(n.id)}
                  className="text-gray-500 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
