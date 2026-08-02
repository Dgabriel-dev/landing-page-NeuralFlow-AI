"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { getSupabase } from "@/lib/supabase";
import { showToast } from "@/components/ui/Toast";
import { Send, Loader2, User, Mail, Building2, MessageSquare } from "lucide-react";

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="mt-1.5 text-xs text-red-400">{error}</p>;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);

    try {
      const insertPayload = {
        name: data.name,
        email: data.email,
        company: data.company || null,
        message: data.message,
      };
      const { error } = await getSupabase()
        .from("leads")
        // @ts-expect-error Supabase types don't match our schema
        .insert(insertPayload);

      if (error) {
        if (error.code === "23505") {
          showToast("error", "Este email já foi cadastrado. Faremos contato em breve.");
        } else {
          showToast("error", "Erro ao enviar. Tente novamente mais tarde.");
        }
        return;
      }

      showToast("success", "Mensagem enviada com sucesso! Entraremos em contato em breve.");
      reset();
    } catch {
      showToast("error", "Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Nome */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
          Nome completo <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="João Silva"
            disabled={isSubmitting}
            {...register("name")}
            className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all ${
              errors.name
                ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            } disabled:opacity-50`}
          />
        </div>
        <FieldError error={errors.name?.message} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
          Email <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="joao@empresa.com"
            disabled={isSubmitting}
            {...register("email")}
            className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all ${
              errors.email
                ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            } disabled:opacity-50`}
          />
        </div>
        <FieldError error={errors.email?.message} />
      </div>

      {/* Empresa */}
      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-gray-300">
          Empresa
        </label>
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Sua empresa (opcional)"
            disabled={isSubmitting}
            {...register("company")}
            className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all ${
              errors.company
                ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            } disabled:opacity-50`}
          />
        </div>
        <FieldError error={errors.company?.message} />
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
          Mensagem <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
          <textarea
            id="message"
            rows={4}
            placeholder="Como podemos ajudar?"
            disabled={isSubmitting}
            {...register("message")}
            className={`w-full resize-none rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-all ${
              errors.message
                ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            } disabled:opacity-50`}
          />
        </div>
        <FieldError error={errors.message?.message} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Enviar Mensagem</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        Ao enviar, você concorda com nossos{" "}
        <a href="#" className="text-blue-400 hover:underline">
          Termos de Uso
        </a>{" "}
        e{" "}
        <a href="#" className="text-blue-400 hover:underline">
          Política de Privacidade
        </a>.
      </p>
    </form>
  );
}
