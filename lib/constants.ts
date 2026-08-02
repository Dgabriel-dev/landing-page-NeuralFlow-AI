import { NavItem, Feature, Testimonial } from "@/types";

export const SITE_CONFIG = {
  name: "NeuralFlow AI",
  title: "NeuralFlow AI - Inteligência Artificial de Nova Geração",
  description:
    "Plataforma avançada de IA que transforma dados em decisões inteligentes. Automatize processos, descubra insights e escale seus resultados com NeuralFlow AI.",
  url: "https://neuralflow-ai.com",
  ogImage: "/og-image.png",
  keywords: [
    "inteligência artificial",
    "machine learning",
    "automação",
    "análise de dados",
    "NeuralFlow AI",
  ],
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Funcionalidades", href: "#features" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Contato", href: "#cta" },
];

export const FEATURES: Feature[] = [
  {
    icon: "Brain",
    title: "IA Generativa Avançada",
    description:
      "Modelos de última geração que geram conteúdo, análises e soluções personalizadas para o seu negócio.",
  },
  {
    icon: "Zap",
    title: "Automação Inteligente",
    description:
      "Automatize fluxos de trabalho complexos com agentes de IA que aprendem e se adaptam continuamente.",
  },
  {
    icon: "Shield",
    title: "Segurança Enterprise",
    description:
      "Criptografia de ponta a ponta, compliance com LGPD e GDPR. Seus dados estão sempre protegidos.",
  },
  {
    icon: "BarChart3",
    title: "Analytics em Tempo Real",
    description:
      "Dashboards interativos e relatórios inteligentes para tomada de decisão baseada em dados.",
  },
  {
    icon: "Puzzle",
    title: "Integração Fácil",
    description:
      "APIs RESTful e webhooks para integrar com suas ferramentas existentes em minutos.",
  },
  {
    icon: "Globe",
    title: "Escala Global",
    description:
      "Infraestrutura cloud-native que escala automaticamente para milhões de requests por segundo.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ana Carolina Silva",
    role: "CTO na TechBR",
    content:
      "O NeuralFlow AI revolucionou nossa operação. Reduzimos 60% do tempo em tarefas manuais e aumentamos a precisão das nossas análises em 40%.",
  },
  {
    name: "Ricardo Mendes",
    role: "Diretor de Inovação na DataFlow",
    content:
      "A integração foi surpreendentemente simples. Em uma semana já estávamos rodando nossos primeiros agentes de IA em produção.",
  },
  {
    name: "Mariana Costa",
    role: "Product Manager na StartupX",
    content:
      "O suporte técnico é excepcional. A equipe do NeuralFlow nos ajudou a personalizar cada aspecto da plataforma para nosso caso de uso específico.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Conecte seus Dados",
    description:
      "Integre suas fontes de dados em minutos com nossa API intuitiva e conectores nativos.",
  },
  {
    step: 2,
    title: "Configure seus Agentes",
    description:
      "Defina regras, treine modelos e crie agentes de IA personalizados para suas necessidades.",
  },
  {
    step: 3,
    title: "Automatize e Escale",
    description:
      "Ative seus agentes e veja a produtividade disparar. Escale de 10 para 10.000 usuários sem esforço.",
  },
];
