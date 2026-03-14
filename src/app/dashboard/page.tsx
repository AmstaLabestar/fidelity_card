import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { PreorderService } from "@/src/services/PreorderService";
import DashboardContent from "@/src/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const preorderService = new PreorderService();
  const userId = (session.user as any).id;
  const preorders = await preorderService.getUserPreorders(userId);

  return (
    <DashboardContent 
      userName={session.user.name || "User"} 
      preorders={JSON.parse(JSON.stringify(preorders))} 
    />
  );
}

