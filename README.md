# Plataforma de Treinamento Esportivo Personalizado

Uma plataforma completa de treinamento personalizado com IA para geração de planos de treino adaptados às necessidades individuais de cada usuário.

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js (App Router) com TypeScript
- **Estilização**: Tailwind CSS com suporte a dark mode
- **Banco de Dados e Autenticação**: Supabase (plano gratuito)
- **IA**: OpenGateLLM (GPT-4o, Claude, Llama) para geração de treinos
- **Pagamento**: QR Codes PIX estáticos com diferentes valores
- **PDF**: react-pdf para geração de treinos em formato PDF
- **Validação**: Zod para validação de formulários

## 📋 Funcionalidades

### Fluxo do Usuário
1. **Landing Page**: Seção de herói impactante com seleção de categorias
2. **Formulário de Anamnese**: Coleta detalhada de informações pessoais
3. **Checkout**: Processamento de pagamento via PIX com QR Codes estáticos
4. **Confirmação**: Manual por parte do usuário após pagamento
5. **Dashboard**: Visualização e download do plano de treino

### Recursos Avançados
- **IA Integrada**: Geração de planos de treino personalizados com base em fisiologia do exercício
- **Sistema de Afiliados**: Suporte a cupons com descontos e rastreamento
- **Exportação PDF**: Planos de treino formatados para download
- **Segurança**: Consideração de lesões e limitações físicas

## 🏗️ Estrutura do Projeto

```
treinamento-esportivo/
├── components/           # Componentes reutilizáveis
│   ├── FormAnamnese.tsx
│   ├── CheckoutPage.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                 # Bibliotecas e utilitários
│   └── validation/
│       └── anamnese.ts
├── services/            # Serviços externos
│   ├── supabase.ts
│   └── gemini.ts
├── types/              # Tipos TypeScript
│   └── anamnese.ts
├── src/
│   └── app/            # Rotas da aplicação
│       ├── anamnese/
│       ├── checkout/
│       ├── dashboard/
│       ├── success/
│       └── api/
│           ├── webhook/
│           └── gerar-treino/
├── .env.example        # Variáveis de ambiente
└── db-schema.sql       # Schema do banco de dados
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd treinamento-esportivo
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Adicione suas chaves nas variáveis:
- `NEXT_PUBLIC_SUPABASE_URL` - URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave anônima do Supabase
- `GEMINI_API_KEY` - Chave da API do Google Gemini
<!-- As variáveis da InfinitePay não são mais necessárias com o sistema de QR Codes estáticos -->

5. Execute o projeto:
```bash
npm run dev
```

## 📊 Banco de Dados

O projeto utiliza o Supabase com as seguintes tabelas:
- `usuarios` - Informações dos usuários
- `pedidos` - Histórico de pagamentos
- `planos_treino` - Planos de treino gerados
- `cupons` - Cupons de afiliados
- `historico_acesso` - Histórico de acesso

Consulte `db-schema.sql` para detalhes completos sobre a estrutura do banco de dados.

## 🤖 IA - OpenGateLLM

O sistema utiliza **OpenGateLLM** como provedor de IA, oferecendo acesso a múltiplos modelos (GPT-4o, Claude, Llama) através de uma interface unificada. Isso proporciona:

- **Flexibilidade**: Troca de modelos sem alterar código
- **Confiabilidade**: Load balancing automático
- **Custo-benefício**: Escolha o melhor modelo para seu orçamento
- **Monitoramento**: Dashboard completo de uso

### Modelos Suportados
- `gpt-4o` - Recomendado (melhor equilíbrio)
- `llama-3-70b` - Opção gratuita (100 req/dia)
- `claude-3-sonnet` - Texto longo
- `mistral-large` - Rápido e econômico

### Configuração
1. Obtenha sua chave em https://docs.llmgateway.io/
2. Adicione ao `.env.local`: `OPENGATE_API_KEY=sua_chave`
3. Escolha o modelo em `services/opengate-llm.ts`

📚 **Veja**: `COMO_CONFIGURAR_OPENGATELLM.md` para guia completo

## 💳 Pagamento com PIX

O sistema utiliza QR Codes PIX estáticos para processamento de pagamentos. Basta colocar seus QR Codes na pasta pública:
- `qrcode-52.jpeg` - Para pagamentos de R$52,00 (com cupom de influenciador)
- `qrcode-65.jpeg` - Para pagamentos de R$65,00 (preço normal)

Recomenda-se que as imagens sejam quadradas (mesma largura e altura) para melhor aparência. O sistema automaticamente exibe o QR Code correto com base no valor final após aplicação de cupons.

## 🎯 Sistema de Afiliados

O sistema suporta cupons de desconto especiais:
- Cupom `JOAOPAULODEV888` - Gera plano gratuito
- Cupons de influenciadores - Aplicam desconto para R$52,00
- Sem cupom - Preço padrão de R$65,00

Basta configurar os QR Codes correspondentes para cada valor.

## 📄 Licença

Este projeto está licenciado sob os termos especificados pelo proprietário.

---

Feito com ❤️ usando Next.js, TypeScript e muito café ☕