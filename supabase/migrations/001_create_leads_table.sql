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

-- Índices
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);

-- =============================================
-- RLS (Row Level Security)
-- =============================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Público pode inserir (formulário de contato)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Usuários autenticados podem ler todos os leads (admin)
CREATE POLICY "Allow authenticated read" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Usuários autenticados podem deletar leads (admin)
CREATE POLICY "Allow authenticated delete" ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- Usuários autenticados podem atualizar status dos leads
CREATE POLICY "Allow authenticated update" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

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
