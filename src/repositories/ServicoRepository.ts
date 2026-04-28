import { prisma } from "../../lib/prisma.js";
import type { Servico } from "../../generated/prisma/client.js";

export class ServicoRepository {
  public async findAll(): Promise<Servico[]> {
    return prisma.servico.findMany();
  }

  public async findById(id: number): Promise<Servico | null> {
    return prisma.servico.findUnique({ where: { idServico: id } });
  }

  public async create(data: Omit<Servico, "idServico">): Promise<Servico> {
    return prisma.servico.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Servico, "idServico">>
  ): Promise<Servico> {
    return prisma.servico.update({ where: { idServico: id }, data });
  }

  public async delete(id: number): Promise<Servico> {
    return prisma.servico.delete({ where: { idServico: id } });
  }
}
