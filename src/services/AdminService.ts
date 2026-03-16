import { UserRepository } from "@/src/repositories/UserRepository";
import { PreorderRepository } from "@/src/repositories/PreorderRepository";

function getCardPriceXof(): number | null {
  const raw = process.env.CARD_PRICE_XOF?.trim();
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export class AdminService {
  private userRepository: UserRepository;
  private preorderRepository: PreorderRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.preorderRepository = new PreorderRepository();
  }

  async getGlobalStats() {
    const [totalUsers, totalOrders, totalCards, statusCounts] = await Promise.all([
      this.userRepository.countAll(),
      this.preorderRepository.countAll(),
      this.preorderRepository.sumTotalQuantity(),
      this.preorderRepository.countByStatus(),
    ]);

    const pricePerCardXof = getCardPriceXof();
    const estimatedRevenueXof = pricePerCardXof ? totalCards * pricePerCardXof : null;

    return {
      totalUsers,
      totalOrders,
      totalCards,
      statusCounts,
      pricePerCardXof,
      estimatedRevenueXof,
    };
  }

  async getRecentPreorders(take = 10) {
    return this.preorderRepository.findRecentWithUser(take);
  }
}
