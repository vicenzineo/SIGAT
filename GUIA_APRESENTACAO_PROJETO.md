# Guia de Apresentacao - SIGAT

## 1. Objetivo da apresentacao
Mostrar de forma clara:
- o problema que o SIGAT resolve
- como a solucao foi desenhada
- como funciona na pratica (demo)
- por que a arquitetura permite evolucao

## 2. Roteiro sugerido (10 a 15 minutos)
1. Contexto e problema (1-2 min)
2. Solucao SIGAT e arquitetura (3-4 min)
3. Modelo de dados e regras de negocio (2-3 min)
4. Demo da API (3-4 min)
5. Encerramento com melhorias futuras (1-2 min)

## 3. Script de fala (pronto para uso)
### 3.1 Abertura
"O SIGAT e uma API de gestao de assistencia tecnica. A ideia e organizar todo o fluxo de atendimento, desde o cadastro de cliente e equipamento ate pagamento e notificacao da ordem de servico."

### 3.2 Dor resolvida
"Sem um sistema centralizado, as informacoes ficam dispersas e o acompanhamento de OS vira um gargalo. O SIGAT centraliza dados e padroniza o processo."

### 3.3 Stack e decisoes
"Escolhemos Fastify com TypeScript por performance e produtividade, Prisma para acelerar modelagem e acesso ao banco, PostgreSQL para persistencia relacional e JWT para seguranca de acesso."

### 3.4 Arquitetura
"A estrutura segue Route -> Controller -> Repository. Isso separa responsabilidade HTTP, regra de entrada/saida e acesso ao banco, facilitando manutencao e testes futuros."

### 3.5 Seguranca
"Clientes e tecnicos fazem login e recebem token JWT. As senhas sao armazenadas com hash argon2. As rotas sensiveis exigem autenticacao."

### 3.6 Fechamento
"O projeto ja cobre o ciclo principal de assistencia tecnica e esta pronto para evoluir com scripts de build, testes automatizados e melhorias de observabilidade."

## 4. Demo guiada (passo a passo)
## 4.1 Preparacao
1. Subir banco:
   - docker compose up -d
2. Preparar Prisma:
   - npx prisma generate
   - npx prisma migrate dev
3. Iniciar API:
   - npx tsx src/server.ts
4. Abrir Swagger:
   - http://localhost:3000/docs

## 4.2 Sequencia de demonstracao recomendada
1. Cadastrar tecnico (rota publica)
   - POST /tecnicos
2. Fazer login de tecnico
   - POST /auth/login/tecnico
3. Copiar token JWT no Swagger
4. Testar rota protegida
   - GET /equipamentos (ou outro recurso)
5. Criar cliente, equipamento e ordem de servico
6. Registrar diagnostico/servico/peca
7. Mostrar consulta final da OS

Mensagem durante demo:
"Com esse fluxo, mostramos que o sistema cobre autenticacao, cadastro e operacao de ponta a ponta."

## 5. Pontos fortes para destacar
- Arquitetura limpa e consistente entre modulos
- Swagger pronto para consumo e testes
- Seguranca com JWT + hash de senha
- Modelo relacional coerente para o dominio
- Base preparada para crescimento

## 6. Perguntas que podem aparecer (com resposta curta)
1. "Por que Fastify e nao Express?"
Resposta: melhor desempenho e bom suporte a schema/validacao.

2. "Por que Prisma?"
Resposta: produtividade, tipagem forte e migracoes controladas.

3. "Como escalar esse projeto?"
Resposta: adicionar testes, observabilidade, cache, paginacao e separar servicos por contexto quando necessario.

4. "Como melhorar seguranca em producao?"
Resposta: JWT_SECRET forte, CORS restrito, rate limit, validacoes adicionais e auditoria/log estruturado.

## 7. Slide deck sugerido
1. Problema
2. Solucao SIGAT
3. Arquitetura (camadas)
4. Modelo de dados
5. Autenticacao e seguranca
6. Demo
7. Resultados e proximos passos

## 8. Checklist final antes de apresentar
- API rodando na porta 3000
- Banco em pe
- Endpoint de login testado
- Token valido para rotas protegidas
- Swagger aberto no navegador
- Fluxo de demo ensaiado

## 9. Encerramento sugerido
"O SIGAT entrega uma base robusta para operacao de assistencia tecnica com seguranca, clareza de arquitetura e espaco para evolucao. O proximo passo e fortalecer automacao e qualidade com testes e pipeline."