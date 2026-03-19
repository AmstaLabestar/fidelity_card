import prisma from '@/src/lib/prisma';
import { User } from '@prisma/client';
import { TrackingParams } from "@/src/lib/tracking";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Partial<User>): Promise<User>;
}

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: any): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async updateTracking(userId: string, tracking: TrackingParams): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        utmSource: tracking.utm_source,
        utmMedium: tracking.utm_medium,
        utmCampaign: tracking.utm_campaign,
        utmContent: tracking.utm_content,
        utmTerm: tracking.utm_term,
        fbclid: tracking.fbclid,
      },
    });
  }

  async countAll(): Promise<number> {
    return prisma.user.count();
  }
}
