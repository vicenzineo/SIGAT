import type { FastifyInstance } from "fastify";
import { itemPecoOSController } from "../controllers/ItemPecoOSController.js";
import {
  deleteItemPecoOSByIdSchema,
  getItemPecoOSByIdSchema,
  getItemPecoOSSchema,
  postItemPecoOSSchema,
  putItemPecoOSByIdSchema,
} from "../schemas/itemPecoOS.schema.js";

async function itensPecoOSRoutes(fastify: FastifyInstance) {
  fastify.get("/", getItemPecoOSSchema, itemPecoOSController.get);
  fastify.get("/:id", getItemPecoOSByIdSchema, itemPecoOSController.getParamId);
  fastify.post("/", postItemPecoOSSchema, itemPecoOSController.post);
  fastify.put("/:id", putItemPecoOSByIdSchema, itemPecoOSController.putParamId);
  fastify.delete("/:id", deleteItemPecoOSByIdSchema, itemPecoOSController.deleteParamId);
}

export default itensPecoOSRoutes;
