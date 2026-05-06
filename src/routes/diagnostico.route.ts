import type { FastifyInstance } from "fastify";
import { diagnosticoController } from "../controllers/DiagnosticoController.js";
import {
  deleteDiagnosticoByIdSchema,
  getDiagnosticoByIdSchema,
  getDiagnosticoSchema,
  postDiagnosticoSchema,
  putDiagnosticoByIdSchema,
} from "../schemas/diagnostico.schema.js";

async function diagnosticosRoutes(fastify: FastifyInstance) {
  fastify.get("/", getDiagnosticoSchema, diagnosticoController.get);
  fastify.get("/:id", getDiagnosticoByIdSchema, diagnosticoController.getParamId);
  fastify.post("/", postDiagnosticoSchema, diagnosticoController.post);
  fastify.put("/:id", putDiagnosticoByIdSchema, diagnosticoController.putParamId);
  fastify.delete("/:id", deleteDiagnosticoByIdSchema, diagnosticoController.deleteParamId);
}

export default diagnosticosRoutes;
