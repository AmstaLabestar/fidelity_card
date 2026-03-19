import { IPreorderRepository, PreorderRepository } from "@/src/repositories/PreorderRepository";
import { UserRepository } from "@/src/repositories/UserRepository";
import { TrackingParams } from "@/src/lib/tracking";

export class PreorderService {
  private preorderRepository: IPreorderRepository;
  private userRepository: UserRepository;

  constructor(preorderRepository: IPreorderRepository = new PreorderRepository()) {
    this.preorderRepository = preorderRepository;
    this.userRepository = new UserRepository();
  }

  async getUserPreorders(userId: string) {
    return this.preorderRepository.findByUserId(userId);
  }

  async placePreorder(userId: string, quantity: number, tracking?: TrackingParams) {
    if (quantity < 1 || quantity > 10) {
      // Return a stable error code; the UI translates it (FR/EN).
      throw new Error("INVALID_QUANTITY");
    }

    const normalizedTracking = Object.keys(tracking ?? {}).length
      ? tracking
      : await this.getUserTracking(userId);

    return this.preorderRepository.create({ userId, quantity, tracking: normalizedTracking });
  }

  async getTotalPreordersCount() {
    return this.preorderRepository.countAll();
  }

  private async getUserTracking(userId: string): Promise<TrackingParams> {
    const user = await this.userRepository.findById(userId);
    if (!user) return {};

    return {
      utm_source: user.utmSource ?? undefined,
      utm_medium: user.utmMedium ?? undefined,
      utm_campaign: user.utmCampaign ?? undefined,
      utm_content: user.utmContent ?? undefined,
      utm_term: user.utmTerm ?? undefined,
      fbclid: user.fbclid ?? undefined,
    };
  }
}
