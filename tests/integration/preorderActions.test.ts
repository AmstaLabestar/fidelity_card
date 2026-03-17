import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as preorderActions from '@/src/modules/preorders/controllers/preorderActions';
import * as nextAuth from 'next-auth';
import { PreorderService } from '@/src/services/PreorderService';

// Mock NextAuth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

// Mock Next Cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

const { mockPlacePreorder } = vi.hoisted(() => ({
  mockPlacePreorder: vi.fn(),
}));

// Mock PreorderService
vi.mock('@/src/services/PreorderService', () => {
  return {
    PreorderService: class {
      placePreorder = mockPlacePreorder;
    },
  };
});

describe('preorderActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createPreorder', () => {
    it('should return error if user is not authenticated', async () => {
      vi.mocked(nextAuth.getServerSession).mockResolvedValue(null);

      const result = await preorderActions.createPreorder(2);
      expect(result).toEqual({ errorCode: 'UNAUTHORIZED' });
      expect(mockPlacePreorder).not.toHaveBeenCalled();
    });

    it('should create a preorder successfully when authenticated', async () => {
      const mockSession = { user: { id: 'user1', email: 'test@example.com', name: 'Test User' } };
      vi.mocked(nextAuth.getServerSession).mockResolvedValue(mockSession as any);
      mockPlacePreorder.mockResolvedValue({ id: 'preorder-1' });

      const result = await preorderActions.createPreorder(3);

      expect(mockPlacePreorder).toHaveBeenCalledWith('user1', 3);
      expect(result).toEqual({ success: true });
    });

    it('should handle INVALID_QUANTITY error properly', async () => {
      const mockSession = { user: { id: 'user1', email: 'test@example.com' } };
      vi.mocked(nextAuth.getServerSession).mockResolvedValue(mockSession as any);
      mockPlacePreorder.mockRejectedValue(new Error('INVALID_QUANTITY'));

      const result = await preorderActions.createPreorder(11);

      expect(result).toEqual({ errorCode: 'INVALID_QUANTITY' });
    });

    it('should handle unexpected errors generically', async () => {
      const mockSession = { user: { id: 'user1', email: 'test@example.com' } };
      vi.mocked(nextAuth.getServerSession).mockResolvedValue(mockSession as any);
      mockPlacePreorder.mockRejectedValue(new Error('DATABASE_EXPLODED'));

      const result = await preorderActions.createPreorder(2);

      expect(result).toEqual({ errorCode: 'UNKNOWN_ERROR' });
    });
  });
});
