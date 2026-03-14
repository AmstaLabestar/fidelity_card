import prisma from '@/src/lib/prisma';
import { Preorder } from '@prisma/client';

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
}
