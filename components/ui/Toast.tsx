"use client";

import { useState, useEffect, useCallback } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

let toastListeners: Array<(toast: Toast) => void> = [];

export function showToast(type: "success" | "error", message: string) {
  const toast: Toast = {
    id: Math.random().toString(36).slice(2),
    type,
    message,
  };
  toastListeners.forEach((listener) => listener(toast));
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-xl ${
        toast.type === "success"
          ? "border-green-500/20 bg-green-500/10"
          : "border-red-500/20 bg-red-500/10"
      }`}
    >
      {toast.type === "success" ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
      ) : (
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      )}
      <p className="flex-1 text-sm text-white">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-gray-400 hover:text-white"
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== addToast);
    };
  }, [addToast]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
