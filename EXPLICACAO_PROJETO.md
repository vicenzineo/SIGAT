# SIGAT - Explicacao do Projeto

## 1. Visao geral
SIGAT e uma API REST para gestao de assistencia tecnica.
O sistema cobre o ciclo principal de atendimento:
- cadastro de clientes e tecnicos
- cadastro de equipamentos
- abertura e acompanhamento de ordens de servico
- registro de diagnosticos, servicos, pecas e itens por OS
- notificacoes e pagamentos

A aplicacao foi desenvolvida em TypeScript com Fastify e Prisma, usando PostgreSQL como banco de dados.

## 2. Stack e principais dependencias
- Runtime/API: Fastify
- Documentacao da API: Swagger + Swagger UI
- Autenticacao: JWT (plugin @fastify/jwt)
- Persistencia: Prisma ORM + PostgreSQL
- Seguranca de senha: argon2
- Execucao TS em desenvolvimento: tsx

## 3. Estrutura de pastas
- src/server.ts: bootstrap da API, plugins e registro de rotas
- src/routes: definicao dos endpoints HTTP por recurso
- src/controllers: camada de regra de entrada/saida HTTP
- src/repositories: camada de acesso ao banco via Prisma
- src/schemas: schemas JSON para validacao e Swagger
- prisma/schema.prisma: modelo de dados e relacoes
- prisma/migrations: historico de migracoes
- prisma/seed.ts: carga inicial de dados
- lib/prisma.ts: instancia do PrismaClient
- generated/prisma: cliente gerado pelo Prisma
- docker-compose.yaml: container PostgreSQL local

## 4. Arquitetura em camadas
A API segue um padrao simples e claro:
1. Route recebe a requisicao e aplica schema.
2. Controller trata request/response e regras basicas (ex.: hash de senha).
3. Repository executa operacoes no banco com Prisma.
4. Prisma mapeia para PostgreSQL.

Beneficios desse desenho:
- separacao de responsabilidades
- facil manutencao e evolucao
- padrao repetivel entre modulos

## 5. Modelo de dominio (Prisma)
Entidades principais:
- Cliente
- Tecnico
- Equipamento
- OrdemServico
- Diagnostico
- Servico
- Peca
- ItemPecoOS
- Notificacao
- Pagamento

Relacoes importantes:
- Cliente 1:N Equipamento
- Equipamento 1:N OrdemServico
- Tecnico 1:N OrdemServico
- OrdemServico 1:1 Pagamento
- OrdemServico 1:N Diagnostico
- OrdemServico 1:N Servico
- OrdemServico 1:N Notificacao
- OrdemServico 1:N ItemPecoOS
- Peca 1:N ItemPecoOS

## 6. Autenticacao e autorizacao
### Login
- POST /auth/login/tecnico: autentica por nome + senha
- POST /auth/login/cliente: autentica por email + senha

### Protecao de rotas
A maior parte da API roda em grupo protegido por preHandler com jwtVerify.
Excecoes publicas:
- POST /clientes
- POST /tecnicos
- rotas de login em /auth

### Senhas
- Cadastro/atualizacao de cliente e tecnico faz hash com argon2.
- Login valida senha com argon2.verify.
- Controllers removem o campo senha das respostas de cliente/tecnico.

## 7. Endpoints de negocio
Padrao de CRUD presente nos recursos:
- /clientes
- /tecnicos
- /equipamentos
- /servicos
- /pecas
- /ordens-servico
- /pagamentos
- /notificacoes
- /diagnosticos
- /itens-peca-os

Cada recurso possui, em geral:
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id

## 8. Validacao e documentacao
Os arquivos em src/schemas definem:
- corpo esperado das requisicoes
- parametros de rota
- respostas por status HTTP
- metadados de Swagger (tags, summary, security)

Documentacao interativa:
- GET /docs

## 9. Ambiente de execucao local
### 9.1 Requisitos
- Node.js (versao atual)
- Docker + Docker Compose

### 9.2 Variaveis de ambiente
Usadas no projeto:
- DATABASE_URL (obrigatoria para acesso ao banco)
- JWT_SECRET (opcional, existe valor padrao no codigo)

Exemplo:
DATABASE_URL="postgresql://sigat:sigat@localhost:5432/sigat"
JWT_SECRET="troque_este_valor_em_producao"

### 9.3 Banco com Docker
Comando:
- docker compose up -d

### 9.4 Prisma
Comandos comuns:
- npx prisma generate
- npx prisma migrate dev
- npx prisma db seed

### 9.5 Subir API
Como nao ha script start/dev no package.json, execute diretamente:
- npx tsx src/server.ts

API local:
- http://localhost:3000
- docs em http://localhost:3000/docs

## 10. Estado atual e observacoes tecnicas
- O package.json possui apenas script de teste placeholder.
- O seed cria cliente/tecnico sem senha explicita (usa default vazio no schema).
- Como o login exige hash argon2 valido, o fluxo recomendado para testes de login e:
  - cadastrar cliente/tecnico via endpoints de POST (que ja aplicam hash)
  - depois autenticar via /auth/login/*

## 11. Possiveis melhorias
- Adicionar scripts npm (dev, build, start, migrate, seed).
- Padronizar mensagens de erro e camada de tratamento global.
- Implementar testes automatizados (unitarios e integracao).
- Adicionar paginacao/filtros em listagens.
- Revisar campos monetarios para decimal apropriado.
- Fortalecer requisitos de validacao (formatos de email, telefone, etc.).

## 12. Resumo final
SIGAT esta estruturado de forma objetiva para um backend de assistencia tecnica, com separacao clara de camadas, schema bem definido no Prisma e documentacao de API via Swagger.
A base esta pronta para evolucao com foco em qualidade operacional (scripts, testes e padronizacao de erros).