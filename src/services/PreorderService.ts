import { IPreorderRepository, PreorderRepository } from "@/src/repositories/PreorderRepository";

export class PreorderService {
  private preorderRepository: IPreorderRepository;

  constructor(preorderRepository: IPreorderRepository = new PreorderRepository()) {
    this.preorderRepository = preorderRepository;
  }

  async getUserPreorders(userId: string) {
    return this.preorderRepository.findByUserId(userId);
  }

  async placePreorder(userId: string, quantity: number) {
    if (quantity < 1 || quantity > 10) {
      throw new Error("Quantity must be between 1 and 10");
    }

    return this.preorderRepository.create({ userId, quantity });
  }

  async getTotalPreordersCount() {
    return this.preorderRepository.countAll();
  }
}
