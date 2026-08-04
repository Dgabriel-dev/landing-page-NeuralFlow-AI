# NeuralFlow AI

Plataforma de landing page + painel administrativo para a **NeuralFlow AI** — uma empresa de Inteligência Artificial.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3fcf8e?logo=supabase)

---

## Visão Geral

O projeto consiste em:

1. **Landing Page Pública** (`/`) — página de marketing completa com SEO, animações e formulário de contato
2. **Painel Administrativo** (`/admin`) — painel protegido por autenticação para gerenciar leads

---

## Rodando Localmente (sem Supabase/Vercel)

Se você quer rodar o projeto **100% local** sem criar conta no Supabase, veja o guia:

**[SETUP_LOCAL.md](./SETUP_LOCAL.md)** — instruções completas para rodar com Docker + PostgreSQL local.

Resumo rápido:

```bash
npm install
docker compose -f docker-compose.local.yml up -d
node scripts/db-setup-local.js
cp .env.local.example.local .env.local
npm run dev
```

Login: `admin@neuralflow.ai` / `admin123`

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilos | Tailwind CSS v4 |
| Animações | Framer Motion |
| Ícones | Lucide React |
| Formulários | React Hook Form + Zod |
| Banco de Dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth |
| Gráficos | Recharts |
| Deploy | Vercel |

---

## Pré-requisitos

- **Node.js** 18+ (recomendado: 20+)
- **npm**, **yarn** ou **pnpm**
- Conta gratuita no [Supabase](https://supabase.com)

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/Dgabriel-dev/landing-page-NeuralFlow-AI.git
cd landing-page-NeuralFlow-AI
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

> **Onde encontrar:** Acesse o [Supabase Dashboard](https://supabase.com/dashboard) → Seu projeto → **Project Settings** → **API**

---

## Setup do Banco de Dados (Supabase)

### Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **"New Project"**
3. Preencha:
   - **Organization**: selecione ou crie uma
   - **Project name**: `neuralflow-ai` (ou o que preferir)
   - **Database Password**: defina uma senha forte
   - **Region**: selecione a mais próxima (ex: South America - São Paulo)
4. Clique em **"Create new project"** e aguarde ser criado

### Criar a tabela de leads

1. No Supabase Dashboard, vá em **SQL Editor**
2. Clique em **"New query"**
3. Cole e execute o seguinte SQL:

```sql
-- Tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived'))
);

-- Índices
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);

-- RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Público pode inserir (formulário de contato)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT WITH CHECK (true);

-- Usuários autenticados podem ler todos os leads (admin)
CREATE POLICY "Allow authenticated read" ON leads
  FOR SELECT TO authenticated USING (true);

-- Usuários autenticados podem deletar leads (admin)
CREATE POLICY "Allow authenticated delete" ON leads
  FOR DELETE TO authenticated USING (true);

-- Usuários autenticados podem atualizar status dos leads
CREATE POLICY "Allow authenticated update" ON leads
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
```

### Criar usuário administrador

1. No Supabase Dashboard, vá em **Authentication** → **Users**
2. Clique em **"Add user"**
3. Preencha:
   - **Email**: `admin@neuralflow.ai` (ou o que preferir)
   - **Password**: defina uma senha forte
   - **Auto Confirm Email**: marque como **✓** (para não precisar confirmar por email)
4. Clique em **"Create user"**

### Habilitar Real-time (opcional, para notificações)

1. Vá em **Database** → **Replication**
2. Ative a replicação para a tabela `leads`

---

## Executar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

Acesse:
- **Landing page**: [http://localhost:3000](http://localhost:3000)
- **Admin panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

### Build de Produção

```bash
npm run build
npm run start
```

---

## Funcionalidades

### Landing Page (`/`)

| Seção | Descrição |
|-------|-----------|
| **Hero** | Apresentação com mockup animado do dashboard |
| **Partners** | Logos de empresas parceiras |
| **Benefits** | Benefícios com estatísticas (40% produtividade, 10x mais rápido, etc.) |
| **Features** | 6 funcionalidades principais da plataforma |
| **How It Works** | 3 passos de como usar (Conecte → Configure → Automatize) |
| **Testimonials** | 4 depoimentos com ratings de 5 estrelas |
| **FAQ** | 6 perguntas frequentes com accordion animado |
| **CTA** | Call-to-action final |
| **Contact** | Formulário de contato com validação |

**Formulário de Contato:**
- Validação com Zod (nome, email, empresa, mensagem)
- Feedback visual com toast (sucesso/erro)
- Dados salvos automaticamente no Supabase

### Painel Administrativo (`/admin`)

#### Login (`/admin/login`)
- Autenticação via Supabase Auth (email + senha)
- Sessão persistente no navegador
- Redirecionamento automático para `/admin` após login

#### Dashboard (`/admin`)
- **4 cards de métricas**: Total de Leads, Novos, Contactados, Convertidos
- **Tabela de leads** com:
  - Busca por nome, email ou empresa (com debounce)
  - Filtro por status (Novo, Contactado, Convertido, Arquivado)
  - Paginação (10 leads por página)
  - Alteração de status inline (dropdown)
  - Exclusão individual com confirmação
  - Seleção múltipla (checkbox) para ações em lote
  - Mudança de status em lote
  - Exclusão em lote
  - Exportação para CSV
  - Modal de detalhes do lead (ícone de olho)
  - Notificações em tempo real quando novo lead chega

#### Leads (`/admin/leads`)
- Mesma funcionalidade do Dashboard, sem os cards de métricas
- Tabela dedicada com todas as ações acima

#### Analytics (`/admin/analytics`)
- **6 cards de métricas**: Total, Novos, Contactados, Convertidos, Arquivados, Taxa de Conversão
- **Gráfico de Pizza**: distribuição de leads por status
- **Gráfico de Barras**: leads por status
- **Lista dos 5 leads mais recentes**

#### Configurações (`/admin/settings`)
- Exibe o email do usuário logado
- Botão de logout

---

## Estrutura do Projeto

```
├── app/
│   ├── layout.tsx              # Layout principal (SEO, fonts, JSON-LD)
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Estilos globais
│   ├── sitemap.ts              # Sitemap automático
│   ├── robots.ts               # Robots.txt (bloqueia /admin)
│   ├── not-found.tsx           # Página 404
│   └── admin/
│       ├── layout.tsx          # Layout admin (auth check + sidebar)
│       ├── page.tsx            # Dashboard com métricas + tabela
│       ├── login/page.tsx      # Tela de login
│       ├── leads/page.tsx      # Página dedicada de leads
│       ├── analytics/page.tsx  # Analytics com gráficos
│       └── settings/page.tsx   # Configurações da conta
├── components/
│   ├── Navbar.tsx              # Navbar responsiva
│   ├── Footer.tsx              # Footer com links
│   ├── ContactForm.tsx         # Formulário de contato (Zod + RHF)
│   ├── ToastProvider.tsx       # Provider de toast
│   ├── DashboardMockup.tsx     # Mockup decorativo
│   ├── admin/
│   │   ├── AdminSidebar.tsx    # Sidebar administrativa
│   │   ├── AdminLeadsTable.tsx # Tabela completa de leads
│   │   ├── AdminLayoutWrapper.tsx # Wrapper para esconder Navbar/Footer no admin
│   │   └── RealTimeNotifications.tsx # Notificações em tempo real
│   └── sections/
│       ├── Hero.tsx
│       ├── Partners.tsx
│       ├── Benefits.tsx
│       ├── Features.tsx
│       ├── HowItWorks.tsx
│       ├── Testimonials.tsx
│       ├── FAQ.tsx
│       ├── CTA.tsx
│       └── Contact.tsx
├── ui/
│   ├── Button.tsx              # Botão com 4 variantes
│   ├── Section.tsx             # Wrapper de seção
│   ├── FadeIn.tsx              # Animação de entrada
│   ├── GradientText.tsx        # Texto com gradiente
│   └── Logo.tsx                # Componente de logo
├── hooks/
│   └── useLeads.ts             # Hook compartilhado de leads
├── lib/
│   ├── utils.ts                # cn() para Tailwind
│   ├── supabase.ts             # Cliente Supabase (browser)
│   ├── validations.ts          # Schemas Zod
│   ├── constants.ts            # Dados do site
│   └── status-labels.ts        # Labels de status dos leads
├── types/
│   └── index.ts                # Types TypeScript
├── supabase/
│   └── migrations/
│       └── 001_create_leads_table.sql
├── docker-compose.local.yml      # PostgreSQL local via Docker
├── scripts/
│   └── db-setup-local.js         # Setup do banco local
├── SETUP_LOCAL.md                # Guia de instalação local
├── .env.local.example            # Variáveis de ambiente (Supabase)
├── .env.local.example.local      # Variáveis de ambiente (local)
└── package.json
```

---

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Chave pública (anon) do Supabase |

> ⚠️ **Nunca** commite o arquivo `.env.local` no Git. Ele já está no `.gitignore`.

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera o build de produção
npm run start        # Inicia o servidor de produção

# Qualidade
npm run lint         # Roda o ESLint
npx tsc --noEmit     # Verifica tipos TypeScript
```

---

## Deploy na Vercel

### Via GitHub (recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Importe o repositório
4. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Clique em **Deploy**

### Via CLI

```bash
npx vercel
```

---

## Troubleshooting

### "Missing environment variables"
- Verifique se o arquivo `.env.local` existe e está preenchido
- As variáveis devem começar com `NEXT_PUBLIC_` para funcionar no browser

### "Invalid login credentials"
- Verifique se o usuário foi criado no Supabase Dashboard → Authentication → Users
- Confirme que o email e senha estão corretos
- Verifique se "Auto Confirm Email" foi marcado ao criar o usuário

### "new row violates row-level security policy"
- Verifique se as políticas RLS foram criadas corretamente
- A política de INSERT deve permitir acesso público (WITH CHECK true)

### Build falha com erros de tipos
- Execute `npx tsc --noEmit` para ver os erros detalhados
- Verifique se todos os imports estão corretos

### Notificações em tempo real não funcionam
- Verifique se a replicação está ativa no Supabase → Database → Replication
- Notificações do navegador requerem permissão do usuário

---

## Acessibilidade

- Skip-to-content link
- Focus trap no menu mobile
- `aria-expanded`, `aria-controls`, `aria-label` nos componentes interativos
- `prefers-reduced-motion` respeitado
- Contraste WCAG AA
- Navegação por teclado

---

## Performance

- Geração estática (SSG) da landing page
- Code splitting por rota
- Lazy loading de imagens
- Headers de segurança (HSTS, CSP, X-Frame-Options)
- Sem `X-Powered-By` header

---

## Licença

MIT
