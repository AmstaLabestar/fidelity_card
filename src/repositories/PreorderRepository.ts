import prisma from '@/src/lib/prisma';
import { Preorder, Prisma } from '@prisma/client';
import { TrackingParams } from "@/src/lib/tracking";

export type PreorderWithUser = Prisma.PreorderGetPayload<{
  include: { user: { select: { name: true; email: true; phone: true; utmSource: true; utmCampaign: true } } };
}>;

export interface IPreorderRepository {
  findByUserId(userId: string): Promise<Preorder[]>;
  create(data: { userId: string; quantity: number; tracking?: TrackingParams }): Promise<Preorder>;
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

  async create(data: { userId: string; quantity: number; tracking?: TrackingParams }): Promise<Preorder> {
    return prisma.preorder.create({
      data: {
        userId: data.userId,
        quantity: data.quantity,
        status: 'pending',
        utmSource: data.tracking?.utm_source,
        utmMedium: data.tracking?.utm_medium,
        utmCampaign: data.tracking?.utm_campaign,
        utmContent: data.tracking?.utm_content,
        utmTerm: data.tracking?.utm_term,
        fbclid: data.tracking?.fbclid,
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
            utmSource: true,
            utmCampaign: true,
          },
        },
      },
    });
  }

  async countByCampaign(limit = 5): Promise<Array<{ source: string; campaign: string; total: number }>> {
    const rows = await prisma.preorder.groupBy({
      by: ["utmSource", "utmCampaign"],
      where: {
        OR: [{ utmSource: { not: null } }, { utmCampaign: { not: null } }],
      },
      _count: { _all: true },
      orderBy: {
        _count: { _all: "desc" },
      },
      take: limit,
    });

    return rows.map((row) => ({
      source: row.utmSource ?? "direct",
      campaign: row.utmCampaign ?? "unknown",
      total: row._count._all,
    }));
  }
}
