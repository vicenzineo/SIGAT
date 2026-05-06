import { prisma } from "../../lib/prisma.js";
import type { Notificacao } from "../../generated/prisma/client.js";

export class NotificacaoRepository {
  public async findAll(): Promise<Notificacao[]> {
    return prisma.notificacao.findMany();
  }

  public async findById(id: number): Promise<Notificacao | null> {
    return prisma.notificacao.findUnique({ where: { idNotificacao: id } });
  }

  public async create(
    data: Omit<Notificacao, "idNotificacao">
  ): Promise<Notificacao> {
    return prisma.notificacao.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<Notificacao, "idNotificacao">>
  ): Promise<Notificacao> {
    return prisma.notificacao.update({ where: { idNotificacao: id }, data });
  }

  public async delete(id: number): Promise<Notificacao> {
    return prisma.notificacao.delete({ where: { idNotificacao: id } });
  }
}
