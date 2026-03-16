"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, CreditCard, HelpCircle, Package, Plus } from "lucide-react";
import PreorderModal from "@/src/components/dashboard/PreorderModal";
import { useLocale, useTranslations } from "next-intl";

type Preorder = {
  id: string;
  quantity: number;
  status: string;
  createdAt: string | Date;
};

interface DashboardContentProps {
  userName: string;
  preorders: Preorder[];
  openPreorderOnLoad?: boolean;
}

export default function DashboardContent({
  userName,
  preorders,
  openPreorderOnLoad = false,
}: DashboardContentProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayName = userName?.trim() ? userName : t("fallbackName");

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const totalCards = useMemo(() => {
    return preorders.reduce((acc, curr) => acc + (curr?.quantity ?? 0), 0);
  }, [preorders]);
  const hasPreorder = preorders.length > 0;

  useEffect(() => {
    if (!openPreorderOnLoad) return;
    if (hasPreorder) return;
    setIsModalOpen(true);
  }, [hasPreorder, openPreorderOnLoad]);

  const dateFormatter = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    }
  }, [locale]);

  const statusLabel = useCallback(
    (status: string) => {
      if (status === "pending") return t("status.pending");
      if (status === "confirmed") return t("status.confirmed");
      if (status === "delivered") return t("status.delivered");
      return status;
    },
    [t]
  );

  const statusBadgeClass = useCallback((status: string) => {
    if (status === "pending") return "badge-warning";
    if (status === "confirmed") return "badge-success";
    if (status === "delivered") return "badge-info";
    return "badge-ghost";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <PreorderModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">
              {t("title", { name: displayName })}
            </h1>
            <p className="text-base-content/60 text-lg">{t("subtitle")}</p>
          </div>
          <button 
            onClick={handleOpenModal}
            className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            {t("newPreorder")}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden group">
            <div className="card-body relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Package size={80} />
              </div>
              <h2 className="card-title text-base-content/50 text-xs uppercase tracking-widest font-bold">
                {t("stats.cardsReserved")}
              </h2>
              <p className="text-5xl font-black mt-2">{totalCards}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-base-content/50">
                <CreditCard size={14} />
                <span>{hasPreorder ? t("status.reserved") : t("status.notOrdered")}</span>
              </div>
            </div>
          </div>

          <div className="card bg-primary text-primary-content shadow-xl shadow-primary/20 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="card-body">
              <h2 className="card-title text-primary-content/70 text-xs uppercase tracking-widest font-bold">
                {t("stats.cardStatus")}
              </h2>
              <div className={`badge ${hasPreorder ? 'badge-success' : 'badge-warning'} badge-lg font-black py-4 px-6 mt-2`}>
                {hasPreorder ? t("status.reserved") : t("status.notOrdered")}
              </div>
              <p className="text-sm opacity-80 mt-4">
                {hasPreorder ? t("cardStatusBodyReserved") : t("cardStatusBodyNotOrdered")}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
            <div className="card-body">
              <h2 className="card-title text-base-content/50 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <HelpCircle size={16} className="opacity-70" />
                {t("howToUse.title")}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-base-content/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                  <span>{t("howToUse.s1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                  <span>{t("howToUse.s2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  <span>{t("howToUse.s3")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
            <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-200/30">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                {t("orderHistory")}
              </h3>
            </div>
            <div className="p-0">
              {preorders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-base-200/50">
                        <th>{t("table.orderId")}</th>
                        <th>{t("table.quantity")}</th>
                        <th>{t("table.status")}</th>
                        <th>{t("table.date")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preorders.map((order) => (
                        <tr key={order.id} className="hover:bg-base-200/30 transition-colors">
                          <td className="font-mono text-xs opacity-60">{order.id}</td>
                          <td className="font-bold">{order.quantity}</td>
                          <td>
                            <span
                              className={`badge badge-sm font-bold ${statusBadgeClass(order.status)}`}
                            >
                              {statusLabel(order.status)}
                            </span>
                          </td>
                          <td className="text-sm opacity-60">
                            {dateFormatter.format(new Date(order.createdAt))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-20 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center text-base-content/20">
                    <Package size={32} />
                  </div>
                  <div className="max-w-xs">
                    <p className="font-bold text-lg">{t("empty.title")}</p>
                    <p className="text-sm text-base-content/50">{t("empty.body")}</p>
                  </div>
                  <button 
                    onClick={handleOpenModal}
                    className="btn btn-primary btn-sm rounded-full px-6 mt-2"
                  >
                    {t("empty.cta")}
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
