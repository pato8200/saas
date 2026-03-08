-- Tabela de usuários
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nome TEXT NOT NULL,
  email TEXT UNIQUE,
  idade INTEGER,
  peso DECIMAL(5,2),
  altura DECIMAL(5,2),
  objetivo TEXT CHECK (objetivo IN ('emagrecimento', 'hipertrofia', 'resistencia', 'forca', 'saude')),
  nivel TEXT CHECK (nivel IN ('iniciante', 'intermediario', 'avancado', 'pro')),
  local_treino TEXT CHECK (local_treino IN ('casa', 'academia')),
  lesao TEXT
);

-- Tabela de pedidos
CREATE TABLE pedidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES usuarios(id),
  valor DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'processado', 'falhou', 'expirado')),
  pedido_id TEXT UNIQUE
);

-- Tabela de planos de treino
CREATE TABLE planos_treino (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES usuarios(id),
  dados_treino JSONB NOT NULL,
  status TEXT DEFAULT 'gerado' CHECK (status IN ('gerado', 'visualizado', 'baixado'))
);


-- Tabela de histórico de acesso
CREATE TABLE historico_acesso (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES usuarios(id),
  tipo_acao TEXT NOT NULL,
  descricao TEXT
);

-- Índices
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_pedidos_user_id ON pedidos(user_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_planos_treino_user_id ON planos_treino(user_id);