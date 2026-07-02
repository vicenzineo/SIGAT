import type { FastifyReply, FastifyRequest } from "fastify";
import type { Equipamento } from "../../generated/prisma/client.js";
import { EquipamentoRepository } from "../repositories/EquipamentoRepository.js";

export class EquipamentoController {
  private equipamentoRepository = new EquipamentoRepository();

  private getPrismaErrorCode(error: unknown): string | null {
    if (typeof error !== "object" || error === null || !("code" in error)) {
      return null;
    }

    const code = (error as { code?: unknown }).code;
    return typeof code === "string" ? code : null;
  }

  post = async (
    request: FastifyRequest<{ Body: Omit<Equipamento, "idEquipamento"> }>,
    reply: FastifyReply
  ) => {
    const equipamento = request.body;

    try {
      const json = await this.equipamentoRepository.create({
        ...equipamento,
        clienteId: Number(equipamento.clienteId),
      });
      reply.status(201).send(json);
    } catch (error) {
      const prismaCode = this.getPrismaErrorCode(error);

      if (prismaCode === "P2003") {
        reply.status(400).send({ message: "Cliente informado nao existe. Verifique o ID do cliente." });
        return;
      }

      request.log.error(error, "Erro ao criar equipamento");
      reply.status(500).send({ message: "Nao foi possivel criar o equipamento" });
    }
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
        clienteId: Number(clienteId),
      });
      reply.status(200).send(json);
    } catch (error) {
      const prismaCode = this.getPrismaErrorCode(error);

      if (prismaCode === "P2003") {
        reply.status(400).send({ message: "Cliente informado nao existe. Verifique o ID do cliente." });
        return;
      }

      if (prismaCode === "P2025") {
        reply.status(404).send({ message: "Equipamento not found" });
        return;
      }

      request.log.error(error, "Erro ao atualizar equipamento");
      reply.status(500).send({ message: "Nao foi possivel atualizar o equipamento" });
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
