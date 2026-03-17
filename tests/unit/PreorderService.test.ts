import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PreorderService } from '@/src/services/PreorderService';
import { IPreorderRepository } from '@/src/repositories/PreorderRepository';

describe('PreorderService', () => {
  let mockRepository: IPreorderRepository;
  let preorderService: PreorderService;

  beforeEach(() => {
    // Mocking the IPreorderRepository methods
    mockRepository = {
      findByUserId: vi.fn(),
      create: vi.fn(),
      countAll: vi.fn(),
    };
    // Injecting the mocked repository
    preorderService = new PreorderService(mockRepository);
  });

  describe('getUserPreorders', () => {
    it('should return preorders for the given user', async () => {
      const mockPreorders = [{ id: '1', userId: 'user1', quantity: 2 }];
      vi.mocked(mockRepository.findByUserId).mockResolvedValue(mockPreorders as any);

      const result = await preorderService.getUserPreorders('user1');
      expect(mockRepository.findByUserId).toHaveBeenCalledWith('user1');
      expect(result).toEqual(mockPreorders);
    });
  });

  describe('placePreorder', () => {
    it('should throw an error if quantity is less than 1', async () => {
      await expect(preorderService.placePreorder('user1', 0)).rejects.toThrow('INVALID_QUANTITY');
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw an error if quantity is greater than 10', async () => {
      await expect(preorderService.placePreorder('user1', 11)).rejects.toThrow('INVALID_QUANTITY');
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should create a preorder successfully with valid quantity', async () => {
      const mockCreatedPreorder = { id: '1', userId: 'user1', quantity: 5, status: 'pending' };
      vi.mocked(mockRepository.create).mockResolvedValue(mockCreatedPreorder as any);

      const result = await preorderService.placePreorder('user1', 5);
      expect(mockRepository.create).toHaveBeenCalledWith({ userId: 'user1', quantity: 5 });
      expect(result).toEqual(mockCreatedPreorder);
    });
  });

  describe('getTotalPreordersCount', () => {
    it('should return the total count of preorders', async () => {
      vi.mocked(mockRepository.countAll).mockResolvedValue(42);
      const result = await preorderService.getTotalPreordersCount();
      expect(mockRepository.countAll).toHaveBeenCalled();
      expect(result).toBe(42);
    });
  });
});
