import type { FastifyReply, FastifyRequest } from "fastify";
import type { Equipamento } from "../../generated/prisma/client.js";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository.js";

export class EquipamentoController {
  private equipamentoRepository = new EquipamentoRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<Equipamento, "idEquipamento"> }>,
    reply: FastifyReply
  ) => {
    const equipamento = request.body;
    const json = await this.equipamentoRepository.create(equipamento);
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.equipamentoRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.equipamentoRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Equipamento not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Equipamento, "idEquipamento">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const {
      tipo,
      marca,
      modelo,
      numeroSerie,
      defeitoRelatado,
      clienteId,
    } = request.body;

    try {
      const json = await this.equipamentoRepository.update(parseInt(id, 10), {
        tipo,
        marca,
        modelo,
        numeroSerie,
        defeitoRelatado,
        clienteId,
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Equipamento not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.equipamentoRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Equipamento not found" });
    }
  };
}

export const equipamentoController = new EquipamentoController();
