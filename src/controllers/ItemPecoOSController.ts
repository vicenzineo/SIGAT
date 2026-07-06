import type { FastifyReply, FastifyRequest } from "fastify";
import type { ItemPecoOS } from "../../generated/prisma/client.js";
import {
  InsufficientStockError,
  ItemPecoOSNotFoundError,
  ItemPecoOSRepository,
  PecaNotFoundError,
} from "../repositories/ItemPecoOSRepository.js";

export class ItemPecoOSController {
  private itemPecoOSRepository = new ItemPecoOSRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<ItemPecoOS, "idItemPecaOS"> }>,
    reply: FastifyReply
  ) => {
    const itemPecoOS = request.body;
    try {
      const json = await this.itemPecoOSRepository.create(itemPecoOS);
      reply.status(201).send(json);
    } catch (error) {
      if (error instanceof PecaNotFoundError) {
        reply.status(404).send({ message: "Peca not found" });
        return;
      }

      if (error instanceof InsufficientStockError) {
        reply.status(400).send({
          message: `Estoque insuficiente. Disponivel: ${error.available}, solicitado: ${error.requested}`,
        });
        return;
      }

      request.log.error(error, "Erro ao criar item de peca na OS");
      reply.status(500).send({ message: "Erro ao criar item de peca na OS" });
    }
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.itemPecoOSRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.itemPecoOSRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Item de peca OS not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<ItemPecoOS, "idItemPecaOS">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { quantidade, ordemServicoId, pecaId } = request.body;

    try {
      const json = await this.itemPecoOSRepository.update(parseInt(id, 10), {
        quantidade,
        ordemServicoId,
        pecaId,
      });
      reply.status(200).send(json);
    } catch (error) {
      if (error instanceof ItemPecoOSNotFoundError) {
        reply.status(404).send({ message: "Item de peca OS not found" });
        return;
      }

      if (error instanceof PecaNotFoundError) {
        reply.status(404).send({ message: "Peca not found" });
        return;
      }

      if (error instanceof InsufficientStockError) {
        reply.status(400).send({
          message: `Estoque insuficiente. Disponivel: ${error.available}, solicitado: ${error.requested}`,
        });
        return;
      }

      request.log.error(error, "Erro ao atualizar item de peca na OS");
      reply.status(500).send({ message: "Erro ao atualizar item de peca na OS" });
      return;
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.itemPecoOSRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch (error) {
      if (error instanceof ItemPecoOSNotFoundError) {
        reply.status(404).send({ message: "Item de peca OS not found" });
        return;
      }

      if (error instanceof PecaNotFoundError) {
        reply.status(404).send({ message: "Peca not found" });
        return;
      }

      request.log.error(error, "Erro ao excluir item de peca na OS");
      reply.status(500).send({ message: "Erro ao excluir item de peca na OS" });
    }
  };
}

export const itemPecoOSController = new ItemPecoOSController();
