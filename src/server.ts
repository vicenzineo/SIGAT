import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { requireRole } from "./middlewares/role.middleware.js";
import authRoutes from "./routes/auth.route.js";
import { clientesPublicRoutes, clientesProtectedRoutes, clientesSelfRoutes } from "./routes/cliente.route.js";
import { tecnicosPublicRoutes, tecnicosProtectedRoutes } from "./routes/tecnico.route.js";
import equipamentosRoutes from "./routes/equipamento.route.js";
import servicosRoutes from "./routes/servico.route.js";
import pecasRoutes from "./routes/peca.route.js";
import ordensServicoRoutes from "./routes/ordemServico.route.js";
import pagamentosRoutes from "./routes/pagamento.route.js";
import notificacoesRoutes from "./routes/notificacao.route.js";
import diagnosticosRoutes from "./routes/diagnostico.route.js";
import itensPecoOSRoutes from "./routes/itemPecoOS.route.js";

const fastify = Fastify({ logger: true });
let numero = 0;

await fastify.register(cors, {
    origin: "*",
    methods: "*",
});

await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET ?? "sigat_jwt_secret",
});

await fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: "SIGAT API",
            description: "API REST para gestao de assistencia tecnica",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
        servers: [{ url: "http://localhost:3000" }],
    },
});

await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

fastify.get("/", async () => {
    numero++;
    return { api: "seraph-api", acesso: numero };
});
fastify.register(authRoutes, { prefix: "/auth" });

// Rotas públicas (sem autenticação)
fastify.register(clientesPublicRoutes, { prefix: "/clientes" });
fastify.register(tecnicosPublicRoutes, { prefix: "/tecnicos" });

// Rotas protegidas (com autenticação)
await fastify.register(async function protectedRoutes(protectedFastify) {
    protectedFastify.addHook("preHandler", authMiddleware);

    await protectedFastify.register(async function tecnicoRoutes(tecnicoFastify) {
        tecnicoFastify.addHook("preHandler", requireRole("tecnico"));

        tecnicoFastify.register(clientesProtectedRoutes, { prefix: "/clientes" });
        tecnicoFastify.register(tecnicosProtectedRoutes, { prefix: "/tecnicos" });
        tecnicoFastify.register(equipamentosRoutes, { prefix: "/equipamentos" });
        tecnicoFastify.register(servicosRoutes, { prefix: "/servicos" });
        tecnicoFastify.register(pecasRoutes, { prefix: "/pecas" });
        tecnicoFastify.register(ordensServicoRoutes, { prefix: "/ordens-servico" });
        tecnicoFastify.register(pagamentosRoutes, { prefix: "/pagamentos" });
        tecnicoFastify.register(notificacoesRoutes, { prefix: "/notificacoes" });
        tecnicoFastify.register(diagnosticosRoutes, { prefix: "/diagnosticos" });
        tecnicoFastify.register(itensPecoOSRoutes, { prefix: "/itens-peca-os" });
    });

    await protectedFastify.register(async function clienteRoutes(clienteFastify) {
        clienteFastify.addHook("preHandler", requireRole("cliente"));

        clienteFastify.register(clientesSelfRoutes, { prefix: "/clientes" });
    });
});

const start = async () => {
    try {// Inicia o servidor na porta 3000
        await fastify.listen({ port: 3000 })
    } catch (err) {
        //registra no log caso erro ao iniciar
        fastify.log.error(err)
        process.exit(1) } }
start() // Executa a função start
