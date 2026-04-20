import type { FastifyInstance } from "fastify";
import { tecnicoController } from "../controllers/TecnicoController.js";

async function tecnicosRoutes(fastify: FastifyInstance) {
  fastify.get("/", tecnicoController.get);
  fastify.get("/:id", tecnicoController.getParamId);
  fastify.post("/", tecnicoController.post);
  fastify.put("/:id", tecnicoController.putParamId);
  fastify.delete("/:id", tecnicoController.deleteParamId);
}

export default tecnicosRoutes;
