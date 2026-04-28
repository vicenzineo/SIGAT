import type { FastifyReply, FastifyRequest } from "fastify";
import type { Peca } from "../../generated/prisma/client.js";
import { PecaRepository } from "../repositories/PecaRepository.js";

export class PecaController {
  private pecaRepository = new PecaRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<Peca, "idPeca"> }>,
    reply: FastifyReply
  ) => {
    const peca = request.body;
    const json = await this.pecaRepository.create(peca);
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.pecaRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.pecaRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Peca not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Peca, "idPeca">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { nome, quantidadeEstoque, precoUnitario } = request.body;

    try {
      const json = await this.pecaRepository.update(parseInt(id, 10), {
        nome,
        quantidadeEstoque,
        precoUnitario,
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Peca not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.pecaRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Peca not found" });
    }
  };
}

export const pecaController = new PecaController();
