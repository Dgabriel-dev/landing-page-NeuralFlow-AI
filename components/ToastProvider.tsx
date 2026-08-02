"use client";

import { ReactNode } from "react";
import { ToastContainer } from "@/components/ui/Toast";

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
