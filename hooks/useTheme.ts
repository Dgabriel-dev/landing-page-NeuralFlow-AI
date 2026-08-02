"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", callback);
  return () => {
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem("theme") as "light" | "dark" | null;
}

function getServerSnapshot() {
  return "dark" as const;
}

export function useTheme() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const preferred = typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : "dark";

  const theme = stored || preferred;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    window.dispatchEvent(new Event("storage"));
  };

  return { theme, toggleTheme };
}
