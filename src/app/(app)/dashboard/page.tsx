import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { PreorderService } from "@/src/services/PreorderService";
import DashboardContent from "@/src/components/dashboard/DashboardContent";
import { redirect } from "@/src/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect({ href: "/login", locale });
  }

  const preorderService = new PreorderService();
  const userId = (session.user as any).id;
  const preorders = await preorderService.getUserPreorders(userId);

  const preorderParam = searchParams?.preorder;
  const openPreorderOnLoad =
    preorderParam === "1" ||
    preorderParam === "true" ||
    (Array.isArray(preorderParam) && preorderParam.includes("1"));

  return (
    <DashboardContent 
      userName={session.user.name || ""} 
      preorders={JSON.parse(JSON.stringify(preorders))} 
      openPreorderOnLoad={openPreorderOnLoad}
    />
  );
}
