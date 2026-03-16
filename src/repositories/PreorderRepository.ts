import prisma from '@/src/lib/prisma';
import { Preorder, Prisma } from '@prisma/client';

export type PreorderWithUser = Prisma.PreorderGetPayload<{
  include: { user: { select: { name: true; email: true; phone: true } } };
}>;

export interface IPreorderRepository {
  findByUserId(userId: string): Promise<Preorder[]>;
  create(data: { userId: string; quantity: number }): Promise<Preorder>;
  countAll(): Promise<number>;
  sumTotalQuantity(): Promise<number>;
}

export class PreorderRepository implements IPreorderRepository {
  async findByUserId(userId: string): Promise<Preorder[]> {
    return prisma.preorder.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { userId: string; quantity: number }): Promise<Preorder> {
    return prisma.preorder.create({
      data: {
        userId: data.userId,
        quantity: data.quantity,
        status: 'pending',
      },
    });
  }

  async countAll(): Promise<number> {
    return prisma.preorder.count();
  }

  async sumTotalQuantity(): Promise<number> {
    const result = await prisma.preorder.aggregate({
      _sum: {
        quantity: true,
      },
    });
    return result._sum.quantity || 0;
  }

  async countByStatus(): Promise<Record<string, number>> {
    const rows = await prisma.preorder.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    const result: Record<string, number> = {};
    for (const row of rows) {
      result[row.status] = row._count._all;
    }
    return result;
  }

  async findRecentWithUser(take = 10): Promise<PreorderWithUser[]> {
    return prisma.preorder.findMany({
      orderBy: { createdAt: "desc" },
      take,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }
}
