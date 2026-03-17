import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { AdminService } from "@/src/services/AdminService";
import { ArrowLeft, Clock, CreditCard, Coins, ShoppingBag, Users } from "lucide-react";
import { Link, redirect } from "@/src/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

const configuredAdminEmail = process.env.ADMIN_EMAIL?.trim();

if (process.env.NODE_ENV === "production" && !configuredAdminEmail) {
  throw new Error("ADMIN_EMAIL must be set in production.");
}

const ADMIN_EMAIL = configuredAdminEmail ?? "amsta405@gmail.com";

export default async function AdminDashboardPage() {
  const locale = await getLocale();
  const t = await getTranslations("admin");
  const session = await getServerSession(authOptions);

  const isAdmin =
    Boolean(session?.user?.isAdmin) || Boolean(session?.user?.email && session.user.email === ADMIN_EMAIL);

  if (!session || !isAdmin) {
    redirect({ href: "/dashboard", locale });
  }

  const adminService = new AdminService();
  const [stats, recentPreorders] = await Promise.all([
    adminService.getGlobalStats(),
    adminService.getRecentPreorders(12),
  ]);

  const numberFormatter = new Intl.NumberFormat(locale);
  const moneyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  });

  const pendingCount = stats.statusCounts?.pending ?? 0;
  const confirmedCount = stats.statusCounts?.confirmed ?? 0;
  const deliveredCount = stats.statusCounts?.delivered ?? 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="btn btn-ghost btn-sm gap-2 mb-4">
              <ArrowLeft size={16} />
              {t("back")}
            </Link>
            <h1 className="text-4xl font-black tracking-tighter">{t("title")}</h1>
            <p className="text-base-content/60">{t("subtitle")}</p>
          </div>
          <div className="badge badge-primary badge-lg font-bold py-4 px-6">{t("mode")}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">{t("stats.users")}</h2>
                <Users className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">{numberFormatter.format(stats.totalUsers)}</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">{t("stats.orders")}</h2>
                <ShoppingBag className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">{numberFormatter.format(stats.totalOrders)}</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">{t("stats.cards")}</h2>
                <CreditCard className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">{numberFormatter.format(stats.totalCards)}</p>
            </div>
          </div>

          <div className="card bg-neutral text-neutral-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">{t("stats.pending")}</h2>
                <Clock className="text-primary" size={20} />
              </div>
              <p className="text-4xl font-black">{numberFormatter.format(pendingCount)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge badge-warning badge-sm font-bold">
                  {t("stats.pending")}: {numberFormatter.format(pendingCount)}
                </span>
                <span className="badge badge-success badge-sm font-bold">
                  {t("stats.confirmed")}: {numberFormatter.format(confirmedCount)}
                </span>
                <span className="badge badge-info badge-sm font-bold">
                  {t("stats.delivered")}: {numberFormatter.format(deliveredCount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs uppercase tracking-widest font-bold opacity-50">{t("stats.price")}</h2>
                <Coins className="text-primary" size={20} />
              </div>
              <p className="text-3xl font-black">
                {stats.pricePerCardXof ? moneyFormatter.format(stats.pricePerCardXof) : t("priceNotSet")}
              </p>
              {stats.estimatedRevenueXof ? (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50">{t("stats.revenue")}</p>
                  <p className="text-2xl font-black">{moneyFormatter.format(stats.estimatedRevenueXof)}</p>
                </div>
              ) : null}
              {!stats.pricePerCardXof && (
                <p className="text-xs opacity-60 mt-2">{t("priceHint")}</p>
              )}
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200 lg:col-span-2 overflow-hidden">
            <div className="p-6 border-b border-base-200 bg-base-200/30">
              <h3 className="font-bold text-xl">{t("sections.recent")}</h3>
            </div>
            <div className="p-0">
              {recentPreorders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-base-200/50">
                        <th>{t("table.order")}</th>
                        <th>{t("table.customer")}</th>
                        <th>{t("table.qty")}</th>
                        <th>{t("table.status")}</th>
                        <th>{t("table.date")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPreorders.map((order) => {
                        const shortId = order.id.length > 10 ? `${order.id.slice(0, 8)}...` : order.id;
                        const created = new Date(order.createdAt);
                        const displayCustomer = order.user.name?.trim() ? order.user.name : order.user.email;
                        const statusLabel =
                          order.status === "pending"
                            ? t("status.pending")
                            : order.status === "confirmed"
                              ? t("status.confirmed")
                              : order.status === "delivered"
                                ? t("status.delivered")
                                : order.status;
                        const statusBadgeClass =
                          order.status === "pending"
                            ? "badge-warning"
                            : order.status === "confirmed"
                              ? "badge-success"
                              : order.status === "delivered"
                                ? "badge-info"
                                : "badge-ghost";
                        return (
                          <tr key={order.id} className="hover:bg-base-200/30 transition-colors">
                            <td className="font-mono text-xs opacity-60" title={order.id}>
                              {shortId}
                            </td>
                            <td className="text-sm">
                              <div className="font-semibold">{displayCustomer}</div>
                              {order.user.phone ? (
                                <div className="text-xs opacity-60">{order.user.phone}</div>
                              ) : null}
                            </td>
                            <td className="font-bold">{order.quantity}</td>
                            <td>
                              <span
                                className={`badge badge-sm font-bold ${statusBadgeClass}`}
                              >
                                {statusLabel}
                              </span>
                            </td>
                            <td className="text-sm opacity-60">{created.toLocaleDateString(locale)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-10 text-center text-sm opacity-70">{t("empty")}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
