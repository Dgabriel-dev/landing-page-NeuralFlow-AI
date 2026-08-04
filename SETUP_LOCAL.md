# NeuralFlow AI - Rodando Localmente

Guia para rodar o projeto 100% localmente, sem Supabase nem Vercel.

---

## Pré-requisitos

- **Node.js** 18+
- **Docker** e **Docker Compose**

---

## Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar PostgreSQL via Docker
docker compose -f docker-compose.local.yml up -d

# 3. Criar tabelas + usuário admin + dados de exemplo
node scripts/db-setup-local.js

# 4. Copiar variáveis de ambiente local
cp .env.local.example.local .env.local

# 5. Iniciar aplicação
npm run dev
```

Acesse:
- **Landing page**: [http://localhost:3000](http://localhost:3000)
- **Admin panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Credenciais

| Email | Senha |
|-------|-------|
| `admin@neuralflow.ai` | `admin123` |

---

## O que muda

Quando roda localmente, o projeto usa:

- **PostgreSQL** via Docker (porta 5432)
- **API Routes** do Next.js (em vez do cliente Supabase)
- **JWT** para autenticação (em vez do Supabase Auth)

Todas as funcionalidades continuam iguais:
- Formulário de contato salva leads no banco
- Admin com login, dashboard, leads, analytics, configurações
- Busca, filtro, paginação, status inline, exclusão, CSV
- Notificações em tempo real (polling a cada 10s)

---

## Arquivos Locais

| Arquivo | Descrição |
|---------|-----------|
| `docker-compose.local.yml` | PostgreSQL via Docker |
| `scripts/db-setup-local.js` | Cria tabelas + admin + dados |
| `.env.local.example.local` | Variáveis de ambiente local |

---

## Comandos

```bash
docker compose -f docker-compose.local.yml up -d    # Iniciar PostgreSQL
docker compose -f docker-compose.local.yml down      # Parar PostgreSQL
node scripts/db-setup-local.js                       # Setup do banco
npm run dev                                          # Rodar aplicação
```

---

## Troubleshooting

### Erro de conexão com banco
- Verifique se o Docker está rodando: `docker ps`
- Verifique se o PostgreSQL está ativo: `docker compose -f docker-compose.local.yml logs db`

### "Invalid login credentials"
- Execute: `node scripts/db-setup-local.js`

### Porta 5432 em uso
- Altere a porta no `docker-compose.local.yml` e no `.env.local`
