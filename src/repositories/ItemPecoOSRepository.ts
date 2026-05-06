import { prisma } from "../../lib/prisma.js";
import type { ItemPecoOS } from "../../generated/prisma/client.js";

export class ItemPecoOSRepository {
  public async findAll(): Promise<ItemPecoOS[]> {
    return prisma.itemPecoOS.findMany();
  }

  public async findById(id: number): Promise<ItemPecoOS | null> {
    return prisma.itemPecoOS.findUnique({ where: { idItemPecaOS: id } });
  }

  public async create(
    data: Omit<ItemPecoOS, "idItemPecaOS">
  ): Promise<ItemPecoOS> {
    return prisma.itemPecoOS.create({ data });
  }

  public async update(
    id: number,
    data: Partial<Omit<ItemPecoOS, "idItemPecaOS">>
  ): Promise<ItemPecoOS> {
    return prisma.itemPecoOS.update({ where: { idItemPecaOS: id }, data });
  }

  public async delete(id: number): Promise<ItemPecoOS> {
    return prisma.itemPecoOS.delete({ where: { idItemPecaOS: id } });
  }
}
