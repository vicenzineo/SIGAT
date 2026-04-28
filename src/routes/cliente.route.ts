import type { FastifyInstance } from "fastify";
import { clienteController } from "../controllers/ClienteController.js";
import {
  deleteClienteByIdSchema,
  getClienteByIdSchema,
  getClienteSchema,
  postClienteSchema,
  putClienteByIdSchema,
} from "../schemas/cliente.schema.js";

async function clientesRoutes(fastify: FastifyInstance) {
  fastify.get("/", getClienteSchema, clienteController.get);
  fastify.get("/:id", getClienteByIdSchema, clienteController.getParamId);
  fastify.post("/", postClienteSchema, clienteController.post);
  fastify.put("/:id", putClienteByIdSchema, clienteController.putParamId);
  fastify.delete("/:id", deleteClienteByIdSchema, clienteController.deleteParamId);
}

export default clientesRoutes;
