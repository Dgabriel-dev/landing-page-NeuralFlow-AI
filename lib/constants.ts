import {
  NavItem,
  Feature,
  Testimonial,
  Benefit,
  FAQItem,
  Partner,
  FooterLinkGroup,
} from "@/types";

export const SITE_CONFIG = {
  name: "NeuralFlow AI",
  title: "NeuralFlow AI - Inteligência Artificial de Nova Geração",
  description:
    "Plataforma avançada de IA que transforma dados em decisões inteligentes. Automatize processos, descubra insights e escale seus resultados com NeuralFlow AI.",
  url: "https://neuralflow-ai.com",
  ogImage: "/og-image.png",
  email: "contato@neuralflow.ai",
  phone: "+55 (11) 9999-0000",
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
  { label: "Benefícios", href: "#benefits" },
  { label: "Funcionalidades", href: "#features" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const PARTNERS: Partner[] = [
  { name: "TechBR" },
  { name: "DataFlow" },
  { name: "StartupX" },
  { name: "InnovateLab" },
  { name: "CloudBase" },
  { name: "DigitalMind" },
];

export const BENEFITS: Benefit[] = [
  {
    icon: "TrendingUp",
    title: "Aumente a Produtividade",
    description:
      "Automatize tarefas repetitivas e libere seu time para focar no que realmente importa. Nossos clientes reportam 40% mais produtividade.",
    stat: "40%",
    statLabel: "mais produtividade",
  },
  {
    icon: "Clock",
    title: "Economize Tempo",
 description:
      "Reduza horas de trabalho manual para minutos. Processos que antes levavam dias agora são resolvidos em segundos.",
    stat: "10x",
    statLabel: "mais rápido",
  },
  {
    icon: "Target",
    title: "Decisões Mais Precisas",
    description:
      "IA que analisa milhões de pontos de dados para entregar insights acurados e recomendações personalizadas.",
    stat: "95%",
    statLabel: "precisão",
  },
  {
    icon: "Shield",
    title: "Segurança Garantida",
    description:
      "Criptografia de ponta a ponta, compliance com LGPD e GDPR. Seus dados nunca saem do seu controle.",
    stat: "SOC 2",
    statLabel: "certificado",
  },
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
  {
    icon: "Lock",
    title: "Controle de Acesso",
    description:
      "Permissões granulares, SSO e auditoria completa para equipes que levam segurança a sério.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Conecte seus Dados",
    description:
      "Integre suas fontes de dados em minutos com nossa API intuitiva e conectores nativos para PostgreSQL, MongoDB, APIs REST e mais.",
    icon: "Database",
  },
  {
    step: 2,
    title: "Configure seus Agentes",
    description:
      "Defina regras, treine modelos e crie agentes de IA personalizados para suas necessidades específicas.",
    icon: "Settings",
  },
  {
    step: 3,
    title: "Automatize e Escale",
    description:
      "Ative seus agentes e veja a produtividade disparar. Escale de 10 para 10.000 usuários sem esforço.",
    icon: "Rocket",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ana Carolina Silva",
    role: "CTO",
    company: "TechBR",
    content:
      "O NeuralFlow AI revolucionou nossa operação. Reduzimos 60% do tempo em tarefas manuais e aumentamos a precisão das nossas análises em 40%. A integração foi simples e o suporte excepcional.",
    rating: 5,
  },
  {
    name: "Ricardo Mendes",
    role: "Diretor de Inovação",
    company: "DataFlow",
    content:
      "A integração foi surpreendentemente simples. Em uma semana já estávamos rodando nossos primeiros agentes de IA em produção. O ROI foi visível já no primeiro mês.",
    rating: 5,
  },
  {
    name: "Mariana Costa",
    role: "Product Manager",
    company: "StartupX",
    content:
      "O suporte técnico é excepcional. A equipe do NeuralFlow nos ajudou a personalizar cada aspecto da plataforma para nosso caso de uso específico. Recomendo fortemente.",
    rating: 5,
  },
  {
    name: "Pedro Oliveira",
    role: "CEO",
    company: "InnovateLab",
    content:
      "Implementamos o NeuralFlow em 3 departamentos. A redução de custos operacionais foi de 35% no primeiro trimestre. Uma ferramenta indispensável.",
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "O que é o NeuralFlow AI?",
    answer:
      "O NeuralFlow AI é uma plataforma de inteligência artificial que permite automatizar processos, analisar dados e criar agentes inteligentes para empresas de todos os tamanhos. Nossa IA aprende e se adapta às necessidades específicas do seu negócio.",
  },
  {
    question: "Preciso ter conhecimento técnico para usar?",
    answer:
      "Não! O NeuralFlow foi projetado para ser intuitivo. Nossa interface drag-and-drop permite criar agentes de IA sem escrever uma única linha de código. Para usuários avançados, oferecemos APIs e SDKs completos.",
  },
  {
    question: "Como funciona a integração com meus sistemas?",
    answer:
      "Oferecemos conectores nativos para os principais bancos de dados, CRMs e ferramentas de business intelligence. Nossa API RESTful permite integração personalizada em minutos. Temos documentação completa e suporte técnico dedicado.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Utilizamos criptografia AES-256 em trânsito e em repouso. Somos certificados SOC 2 Tipo II e complymos com LGPD e GDPR. Seus dados nunca são compartilhados com terceiros e você mantém controle total.",
  },
  {
    question: "Qual o preço da plataforma?",
    answer:
      "Oferecemos um plano gratuito com funcionalidades básicas. Planos pagos começam em R$ 99/mês para times pequenos, com escala para enterprise. Entre em contato para um orçamento personalizado.",
  },
  {
    question: "Posso testar antes de contratar?",
    answer:
      "Sim! Oferecemos 14 dias de trial gratuito com acesso completo a todas as funcionalidades. Não é necessário cartão de crédito para começar. Nosso time de sucesso do cliente ajuda você na configuração inicial.",
  },
];

export const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "#features" },
      { label: "Preços", href: "#pricing" },
      { label: "Integrações", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Contato", href: "#cta" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Documentação", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Comunidade", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
      { label: "LGPD", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];
