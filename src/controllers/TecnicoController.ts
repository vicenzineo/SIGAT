import type { FastifyReply, FastifyRequest } from "fastify";
import argon2 from "argon2";
import type { Tecnico } from "../../generated/prisma/client.js";
import { TecnicoRepository } from "../repositories/TecnicoRepository.js";

export class TecnicoController {
  private tecnicoRepository = new TecnicoRepository();

  private toPublicTecnico(tecnico: Tecnico) {
    const { senha: _senha, ...publicTecnico } = tecnico;
    return publicTecnico;
  }

  post = async (
    request: FastifyRequest<{ Body: Omit<Tecnico, "idTecnico"> }>,
    reply: FastifyReply
  ) => {
    const tecnico = request.body;
    const senhaHash = await argon2.hash(tecnico.senha);
    const json = await this.tecnicoRepository.create({
      ...tecnico,
      senha: senhaHash,
    });
    reply.status(201).send(this.toPublicTecnico(json));
  };

  get = async (_request: FastifyRequest, reply: FastifyReply) => {
    const json = await this.tecnicoRepository.findAll();
    reply.status(200).send(json.map((tecnico) => this.toPublicTecnico(tecnico)));
  };

  getParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const json = await this.tecnicoRepository.findById(parseInt(id, 10));

    if (json) {
      reply.status(200).send(this.toPublicTecnico(json));
      return;
    }

    reply.status(404).send({ message: "Tecnico not found" });
  };

  putParamId = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: Omit<Tecnico, "idTecnico">;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const { nome, especialidade, telefone, senha } = request.body;

    try {
      const senhaHash = await argon2.hash(senha);
      const json = await this.tecnicoRepository.update(parseInt(id, 10), {
        nome,
        especialidade,
        telefone,
        senha: senhaHash,
      });
      reply.status(200).send(this.toPublicTecnico(json));
    } catch {
      reply.status(404).send({ message: "Tecnico not found" });
    }
  };

  deleteParamId = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const json = await this.tecnicoRepository.delete(parseInt(id, 10));
      reply.status(200).send(this.toPublicTecnico(json));
    } catch {
      reply.status(404).send({ message: "Tecnico not found" });
    }
  };
}

export const tecnicoController = new TecnicoController();
