import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .email("Email inválido")
    .max(255, "Email muito longo"),
  company: z
    .string()
    .min(2, "Empresa deve ter pelo menos 2 caracteres")
    .max(100, "Nome da empresa muito longo")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
