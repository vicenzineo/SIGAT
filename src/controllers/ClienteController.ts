import type { FastifyReply, FastifyRequest } from "fastify";
import type { Cliente } from "../../generated/prisma/client.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";

export class ClienteController {
  private clienteRepository = new ClienteRepository();

  post = async (
    request: FastifyRequest<{ Body: Omit<Cliente, "idCliente"> }>,
    reply: FastifyReply
  ) => {
    const cliente = request.body;
    const json = await this.clienteRepository.create(cliente);
    reply.status(201).send(json);
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.clienteRepository.findAll();
    reply.status(200).send(json);
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.clienteRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(json);
      return;
    }

    reply.status(404).send({ message: "Cliente not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Cliente, "idCliente">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { nome, telefone, email } = request.body;

    try {
      const json = await this.clienteRepository.update(parseInt(id, 10), {
        nome,
        telefone,
        email,
      });
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Cliente not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.clienteRepository.delete(parseInt(id, 10));
      reply.status(200).send(json);
    } catch {
      reply.status(404).send({ message: "Cliente not found" });
    }
  };
}

export const clienteController = new ClienteController();
