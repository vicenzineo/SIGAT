import type { FastifyInstance } from "fastify";
import { clienteController } from "../controllers/ClienteController.js";

async function clientesRoutes(fastify: FastifyInstance) {
  fastify.get("/", clienteController.get);
  fastify.get("/:id", clienteController.getParamId);
  fastify.post("/", clienteController.post);
  fastify.put("/:id", clienteController.putParamId);
  fastify.delete("/:id", clienteController.deleteParamId);
}

export default clientesRoutes;
