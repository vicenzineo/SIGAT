import { prisma } from "../../lib/prisma.js";
import type { Equipamento } from "../../generated/prisma/client.js";

export class EquipamentoRepository {
  public async findAll(): Promise<Equipamento[]> {
    return prisma.equipamento.findMany();
  }

  public async findById(id: number): Promise<Equipamento | null> {
    return prisma.equipamento.findUnique({ where: { idEquipamento: id } });
  }

  public async create(
    data: Omit<Equipamento, "idEquipamento">
  ): Promise<Equipamento> {
    return prisma.equipamento.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Equipamento, "idEquipamento">>
  ): Promise<Equipamento> {
    return prisma.equipamento.update({ where: { idEquipamento: id }, data });
  }

  public async delete(id: number): Promise<Equipamento> {
    return prisma.equipamento.delete({ where: { idEquipamento: id } });
  }
}
