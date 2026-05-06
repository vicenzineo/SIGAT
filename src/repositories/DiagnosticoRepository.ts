import { prisma } from "../../lib/prisma.js";
import type { Diagnostico } from "../../generated/prisma/client.js";

export class DiagnosticoRepository {
  public async findAll(): Promise<Diagnostico[]> {
    return prisma.diagnostico.findMany();
  }

  public async findById(id: number): Promise<Diagnostico | null> {
    return prisma.diagnostico.findUnique({ where: { idDiagnostico: id } });
  }

  public async create(
    data: Omit<Diagnostico, "idDiagnostico">
  ): Promise<Diagnostico> {
    return prisma.diagnostico.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Diagnostico, "idDiagnostico">>
  ): Promise<Diagnostico> {
    return prisma.diagnostico.update({ where: { idDiagnostico: id }, data });
  }

  public async delete(id: number): Promise<Diagnostico> {
    return prisma.diagnostico.delete({ where: { idDiagnostico: id } });
  }
}
