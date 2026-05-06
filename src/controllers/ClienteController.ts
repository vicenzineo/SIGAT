import type { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import type { Cliente } from "../../generated/prisma/client.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";

export class ClienteController {
  private clienteRepository = new ClienteRepository();

  private toPublicCliente(cliente: Cliente) {
    const { senha: _senha, ...publicCliente } = cliente;
    return publicCliente;
  }

  post = async (
    request: FastifyRequest<{ Body: Omit<Cliente, "idCliente"> }>,
    reply: FastifyReply
  ) => {
    const cliente = request.body;
    const senhaHash = await argon2.hash(cliente.senha);
    const json = await this.clienteRepository.create({
      ...cliente,
      senha: senhaHash,
    });
    reply.status(201).send(this.toPublicCliente(json));
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.clienteRepository.findAll();
    reply.status(200).send(json.map((cliente) => this.toPublicCliente(cliente)));
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.clienteRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(this.toPublicCliente(json));
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
    const { nome, telefone, email, senha } = request.body;

    try {
      const senhaHash = await argon2.hash(senha);
      const json = await this.clienteRepository.update(parseInt(id, 10), {
        nome,
        telefone,
        email,
        senha: senhaHash,
      });
      reply.status(200).send(this.toPublicCliente(json));
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
      reply.status(200).send(this.toPublicCliente(json));
    } catch {
      reply.status(404).send({ message: "Cliente not found" });
    }
  };
}

export const clienteController = new ClienteController();
