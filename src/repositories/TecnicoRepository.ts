import { prisma } from "../../lib/prisma.js";
import type { Tecnico } from "../../generated/prisma/client.js";

export class TecnicoRepository {
  public async findAll(): Promise<Tecnico[]> {
    return prisma.tecnico.findMany();
  }

  public async findById(id: number): Promise<Tecnico | null> {
    return prisma.tecnico.findUnique({ where: { idTecnico: id } });
  }

  public async create(data: Omit<Tecnico, "idTecnico">): Promise<Tecnico> {
    return prisma.tecnico.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Tecnico, "idTecnico">>
  ): Promise<Tecnico> {
    return prisma.tecnico.update({ where: { idTecnico: id }, data });
  }

  public async delete(id: number): Promise<Tecnico> {
    return prisma.tecnico.delete({ where: { idTecnico: id } });
  }
}
