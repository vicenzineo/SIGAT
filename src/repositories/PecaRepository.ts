import { prisma } from "../../lib/prisma.js";
import type { Peca } from "../../generated/prisma/client.js";

export class PecaRepository {
  public async findAll(): Promise<Peca[]> {
    return prisma.peca.findMany();
  }

  public async findById(id: number): Promise<Peca | null> {
    return prisma.peca.findUnique({ where: { idPeca: id } });
  }

  public async create(data: Omit<Peca, "idPeca">): Promise<Peca> {
    return prisma.peca.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Peca, "idPeca">>
  ): Promise<Peca> {
    return prisma.peca.update({ where: { idPeca: id }, data });
  }

  public async delete(id: number): Promise<Peca> {
    return prisma.peca.delete({ where: { idPeca: id } });
  }
}
