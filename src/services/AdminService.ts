import { UserRepository } from "@/src/repositories/UserRepository";
import { PreorderRepository } from "@/src/repositories/PreorderRepository";

export class AdminService {
  private userRepository: UserRepository;
  private preorderRepository: PreorderRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.preorderRepository = new PreorderRepository();
  }

  async getGlobalStats() {
    const [totalUsers, totalOrders, totalCards] = await Promise.all([
      this.userRepository.countAll(),
      this.preorderRepository.countAll(),
      this.preorderRepository.sumTotalQuantity(),
    ]);

    const revenue = totalCards * 29;

    return {
      totalUsers,
      totalOrders,
      totalCards,
      revenue,
    };
  }
}
