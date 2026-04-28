import type { FastifyInstance } from "fastify";
import { pecaController } from "../controllers/PecaController.js";
import {
  deletePecaByIdSchema,
  getPecaByIdSchema,
  getPecaSchema,
  postPecaSchema,
  putPecaByIdSchema,
} from "../schemas/peca.schema.js";

async function pecasRoutes(fastify: FastifyInstance) {
  fastify.get("/", getPecaSchema, pecaController.get);
  fastify.get("/:id", getPecaByIdSchema, pecaController.getParamId);
  fastify.post("/", postPecaSchema, pecaController.post);
  fastify.put("/:id", putPecaByIdSchema, pecaController.putParamId);
  fastify.delete("/:id", deletePecaByIdSchema, pecaController.deleteParamId);
}

export default pecasRoutes;
