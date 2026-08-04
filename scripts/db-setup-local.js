const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "neuralflow",
  user: "neuralflow",
  password: "neuralflow123",
});

async function setup() {
  console.log("Configurando banco de dados local...\n");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("Tabela admin_users criada.");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived'))
    );
  `);
  console.log("Tabela leads criada.");

  await pool.query("CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_email ON leads (email)");
  await pool.query("CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC)");
  await pool.query("CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status)");
  console.log("Indices criados.\n");

  const passwordHash = await bcrypt.hash("admin123", 10);
  await pool.query(
    "INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET password_hash = $2",
    ["admin@neuralflow.ai", passwordHash]
  );
  console.log("Usuario admin criado: admin@neuralflow.ai / admin123\n");

  const leads = [
    { name: "Joao Silva", email: "joao@empresa.com.br", company: "Tech Solutions", message: "Gostaria de saber mais sobre os servicos de IA para nossa empresa.", status: "new" },
    { name: "Maria Santos", email: "maria@startup.io", company: "DataFlow", message: "Precisamos de uma solucao de automacao para nossos processos.", status: "contacted" },
    { name: "Pedro Costa", email: "pedro@corp.com", company: "Innovate Corp", message: "Interessados em parceria para desenvolvimento de chatbot.", status: "converted" },
    { name: "Ana Oliveira", email: "ana@digital.com.br", company: "Digital Agency", message: "Queremos implementar IA no atendimento ao cliente.", status: "new" },
    { name: "Lucas Ferreira", email: "lucas@tech.com", company: "TechStart", message: "Precisamos de consultoria em machine learning.", status: "archived" },
    { name: "Juliana Mendes", email: "juliana@grupo.com.br", company: "Grupo Alpha", message: "Interesse em solucao de analise preditiva.", status: "new" },
    { name: "Rafael Souza", email: "rafael@empresa.com", company: "Beta Corp", message: "Gostaria de agendar uma demo dos servicos.", status: "contacted" },
    { name: "Camila Lima", email: "camila@startup.com.br", company: "StartupXYZ", message: "Precisamos de integracao com nossos sistemas.", status: "new" },
    { name: "Bruno Almeida", email: "bruno@tech.com", company: "TechPro", message: "Interessados em automacao de processos com IA.", status: "converted" },
    { name: "Fernanda Ribeiro", email: "fernanda@digital.com", company: "DigitalFirst", message: "Queremos saber sobre chatbots para WhatsApp.", status: "new" },
  ];

  for (const lead of leads) {
    await pool.query(
      "INSERT INTO leads (name, email, company, message, status) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING",
      [lead.name, lead.email, lead.company, lead.message, lead.status]
    );
  }
  console.log(`${leads.length} leads de exemplo inseridos.\n`);

  console.log("Setup concluido!");
  console.log("Acesse: http://localhost:3000");
  console.log("Admin:  http://localhost:3000/admin");
  console.log("Login:  admin@neuralflow.ai / admin123\n");

  await pool.end();
}

setup().catch((err) => {
  console.error("Erro no setup:", err.message);
  process.exit(1);
});
