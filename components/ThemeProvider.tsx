"use client";

import { ReactNode, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
