import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PreorderRepository } from '@/src/repositories/PreorderRepository';
import { prismaMock } from '../setup/prisma.mock';

describe('PreorderRepository', () => {
  let repository: PreorderRepository;

  beforeEach(() => {
    repository = new PreorderRepository();
  });

  describe('findByUserId', () => {
    it('should query the database for user preorders, ordered by createdAt', async () => {
      const mockPreorders = [
        { id: '1', userId: 'user1', quantity: 2, status: 'pending', createdAt: new Date(), updatedAt: new Date() }
      ];
      prismaMock.preorder.findMany.mockResolvedValue(mockPreorders);

      const result = await repository.findByUserId('user1');

      expect(prismaMock.preorder.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toEqual(mockPreorders);
    });
  });

  describe('create', () => {
    it('should create a new pending preorder in the database', async () => {
      const mockCreated = { id: '2', userId: 'user1', quantity: 5, status: 'pending', createdAt: new Date(), updatedAt: new Date() };
      prismaMock.preorder.create.mockResolvedValue(mockCreated);

      const result = await repository.create({ userId: 'user1', quantity: 5 });

      expect(prismaMock.preorder.create).toHaveBeenCalledWith({
        data: {
          userId: 'user1',
          quantity: 5,
          status: 'pending',
        },
      });
      expect(result).toEqual(mockCreated);
    });
  });

  describe('countAll', () => {
    it('should count all preorders', async () => {
      prismaMock.preorder.count.mockResolvedValue(100);

      const result = await repository.countAll();

      expect(prismaMock.preorder.count).toHaveBeenCalled();
      expect(result).toBe(100);
    });
  });
});
