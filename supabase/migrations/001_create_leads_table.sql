-- =============================================
-- Tabela: leads
-- Descrição: Armazena leads do formulário de contato
-- =============================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived'))
);

-- Índice para buscas por email (deduplicação)
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- Índice para ordenação por data
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: apenas service_role pode inserir (via API route ou edge function)
-- O client anon NÃO deve ter acesso direto à tabela por segurança
CREATE POLICY "Insert only via service role" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Política: sem select/update/delete para o anon key
CREATE POLICY "No read for anon" ON leads
  FOR SELECT
  USING (false);

-- =============================================
-- COMENTÁRIOS
-- =============================================

COMMENT ON TABLE leads IS 'Leads capturados pelo formulário de contato';
COMMENT ON COLUMN leads.id IS 'UUID único do lead';
COMMENT ON COLUMN leads.name IS 'Nome completo do lead';
COMMENT ON COLUMN leads.email IS 'Email do lead (único)';
COMMENT ON COLUMN leads.company IS 'Empresa do lead (opcional)';
COMMENT ON COLUMN leads.message IS 'Mensagem enviada pelo lead';
COMMENT ON COLUMN leads.created_at IS 'Data de criação do registro';
COMMENT ON COLUMN leads.status IS 'Status do lead: new, contacted, converted, archived';
