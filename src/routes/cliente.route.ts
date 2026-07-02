import type { FastifyInstance } from "fastify";
import { clienteController } from "../controllers/ClienteController.js";
import {
  deleteClienteByIdSchema,
  getClienteByIdSchema,
  getClienteMeEquipamentosSchema,
  getClienteMeOrdemServicoSchema,
  getClienteMeSchema,
  getClienteSchema,
  postClienteSchema,
  putClienteMeSchema,
  putClienteByIdSchema,
} from "../schemas/cliente.schema.js";

async function clientesPublicRoutes(fastify: FastifyInstance) {
  fastify.post("/", postClienteSchema, clienteController.post);
}

async function clientesProtectedRoutes(fastify: FastifyInstance) {
  fastify.get("/", getClienteSchema, clienteController.get);
  fastify.get("/:id", getClienteByIdSchema, clienteController.getParamId);
  fastify.put("/:id", putClienteByIdSchema, clienteController.putParamId);
  fastify.delete("/:id", deleteClienteByIdSchema, clienteController.deleteParamId);
}

async function clientesSelfRoutes(fastify: FastifyInstance) {
  fastify.get("/me", getClienteMeSchema, clienteController.getMe);
  fastify.put("/me", putClienteMeSchema, clienteController.putMe);
  fastify.get("/me/equipamentos", getClienteMeEquipamentosSchema, clienteController.getMyEquipamentos);
  fastify.get("/me/ordens-servico", getClienteMeOrdemServicoSchema, clienteController.getMyOrdensServico);
}

export { clientesPublicRoutes, clientesProtectedRoutes, clientesSelfRoutes };
