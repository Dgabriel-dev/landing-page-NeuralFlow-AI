# NeuralFlow AI

Plataforma de landing page e admin panel para a NeuralFlow AI — uma empresa de Inteligência Artificial.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Deploy:** Vercel

## Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm
- Conta no [Supabase](https://supabase.com)

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/Dgabriel-dev/landing-page-NeuralFlow-AI.git
cd landing-page-NeuralFlow-AI

# Instalar dependências
npm install

# Copiar o arquivo de variáveis de ambiente
cp .env.local.example .env.local
```

## Variáveis de Ambiente

Configure o arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

Obtidas em: **Supabase Dashboard > Project Settings > API**

## Setup do Banco de Dados

1. Acesse o **Supabase Dashboard > SQL Editor**
2. Execute o conteúdo do arquivo `supabase/migrations/001_create_leads_table.sql`
3. Crie um usuário admin em **Authentication > Users > Add user**

## Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page pública |
| `/admin` | Dashboard administrativo (protegido) |
| `/admin/login` | Login do admin |

## Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout principal com SEO, fonts, JSON-LD
│   ├── page.tsx            # Landing page com todas as seções
│   ├── globals.css         # Estilos globais + dark/light + reduced-motion
│   ├── sitemap.ts          # Sitemap automático
│   ├── robots.ts           # Robots.txt (bloqueia /admin)
│   ├── not-found.tsx       # Página 404
│   └── admin/
│       ├── layout.tsx      # Layout admin com auth check
│       ├── page.tsx        # Dashboard com listagem de leads
│       └── login/page.tsx  # Tela de login
├── components/
│   ├── Navbar.tsx          # Navbar responsiva com focus trap
│   ├── Footer.tsx          # Footer com newsletter e links
│   ├── ContactForm.tsx     # Formulário com Zod + React Hook Form
│   ├── ThemeProvider.tsx   # Provider de tema
│   ├── ToastProvider.tsx   # Provider de toast
│   ├── DashboardMockup.tsx # Mockup decorativo do dashboard
│   ├── admin/
│   │   ├── AdminSidebar.tsx      # Sidebar administrativa
│   │   └── AdminLeadsTable.tsx   # Tabela com busca/filtro/paginação
│   └── sections/
│       ├── Hero.tsx        # Hero com mockup e badges
│       ├── Partners.tsx    # Logos de empresas parceiras
│       ├── Benefits.tsx    # Benefícios com stats
│       ├── Features.tsx    # Funcionalidades
│       ├── HowItWorks.tsx  # Como funciona (3 passos)
│       ├── Testimonials.tsx# Depoimentos com ratings
│       ├── FAQ.tsx         # Perguntas frequentes (accordion)
│       ├── CTA.tsx         # Call to action final
│       └── Contact.tsx     # Seção de contato com formulário
├── ui/
│   ├── Button.tsx          # Botão com 4 variantes
│   ├── Section.tsx         # Wrapper de seção
│   ├── FadeIn.tsx          # Animação de entrada
│   ├── GradientText.tsx    # Texto com gradiente
│   └── ThemeToggle.tsx     # Toggle dark/light
├── hooks/
│   ├── useTheme.ts         # Hook de tema
│   └── useMediaQuery.ts    # Hook de media query
├── lib/
│   ├── utils.ts            # cn() para Tailwind
│   ├── supabase.ts         # Cliente Supabase (client-side)
│   ├── supabase-server.ts  # Cliente Supabase (server-side)
│   ├── validations.ts      # Schemas Zod
│   └── constants.ts        # Dados do site
├── types/
│   └── index.ts            # Types TypeScript
├── supabase/
│   └── migrations/
│       └── 001_create_leads_table.sql
└── middleware.ts           # Proteção de rotas /admin
```

## Funcionalidades

### Landing Page
- Hero Section com dashboard mockup animado
- Seções de Benefícios, Funcionalidades, Como Funciona
- Depoimentos com ratings
- FAQ com accordion animado
- Formulário de contato com validação Zod
- Toast de sucesso/erro
- Dark/Light theme
- Animações com Framer Motion
- SEO completo (Open Graph, Twitter Cards, Schema.org, sitemap)

### Admin Panel
- Login com email/senha (Supabase Auth)
- Dashboard com stats (total, novos, contactados, convertidos)
- Listagem de leads com paginação
- Busca por nome, email ou empresa
- Filtro por status
- Exclusão com confirmação
- Visualização de mensagens
- Sidebar responsiva com mobile menu
- Middleware de proteção de rotas

## Acessibilidade

- Skip-to-content link
- Focus trap no menu mobile
- aria-expanded, aria-controls, aria-label nos componentes interativos
- prefers-reduced-motion respeitado
- Contraste WCAG AA
- Navegação por teclado

## Performance

- Geração estática (SSG) da landing page
- Code splitting por rota
- Lazy loading de imagens (quando aplicável)
- Headers de segurança (HSTS, CSP, X-Frame-Options)
- Sem `X-Powered-By` header

## Deploy na Vercel

1. Conecte o repositório no [Vercel](https://vercel.com/new)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na `main`

```bash
# Ou via CLI
npx vercel
```

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Iniciar servidor de produção
npm run lint     # Verificar lint
```

## Licença

MIT
