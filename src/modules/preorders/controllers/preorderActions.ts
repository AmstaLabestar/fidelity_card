"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { PreorderService } from "@/src/services/PreorderService";
import { revalidatePath } from "next/cache";

const preorderService = new PreorderService();

export async function createPreorder(quantity: number) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { errorCode: "UNAUTHORIZED" as const };
  }

  try {
    const userId = (session.user as any).id;
    const preorder = await preorderService.placePreorder(userId, quantity);

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Preorder error:", error);
    if (error?.message === "INVALID_QUANTITY") {
      return { errorCode: "INVALID_QUANTITY" as const };
    }
    return { errorCode: "UNKNOWN_ERROR" as const };
  }
}
