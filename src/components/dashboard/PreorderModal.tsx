"use client";

import { useEffect, useMemo, useState } from "react";
import { createPreorder } from "@/src/modules/preorders/controllers/preorderActions";
import { Loader2, ShoppingCart, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackMetaPreorder } from "@/src/lib/metaPixel";

interface PreorderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreorderModal({ isOpen, onClose }: PreorderModalProps) {
  const t = useTranslations("preorderModal");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setQuantity(1);
    setIsLoading(false);
    setErrorCode(null);
  }, [isOpen]);

  const errorMessage = useMemo(() => {
    if (!errorCode) return null;
    if (errorCode === "UNAUTHORIZED") return t("errors.unauthorized");
    if (errorCode === "INVALID_QUANTITY") return t("errors.invalidQuantity");
    if (errorCode === "RATE_LIMITED") return t("errors.rateLimited");
    return t("errors.generic");
  }, [errorCode, t]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorCode(null);

    const result = await createPreorder(quantity);

    if ("errorCode" in result) {
      setErrorCode(result.errorCode);
      setIsLoading(false);
    } else {
      trackMetaPreorder(quantity);
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-base-100 w-full max-w-md rounded-3xl shadow-2xl border border-base-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-200/50">
          <h3 className="text-xl font-black tracking-tighter flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary" />
            {t("title")}
          </h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="text-center mb-8">
            <p className="text-base-content/60">{t("body")}</p>
          </div>

          {errorMessage && (
            <div className="alert alert-error mb-6 rounded-xl text-sm py-3">
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text font-bold">{t("quantity")}</span>
            </label>
            <div className="flex items-center gap-4">
              <button 
                type="button"
                className="btn btn-circle btn-outline btn-sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                className="input input-bordered w-full text-center font-bold text-xl rounded-xl" 
              />
              <button 
                type="button"
                className="btn btn-circle btn-outline btn-sm"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
              >
                +
              </button>
            </div>
            <label className="label">
              <span className="label-text-alt opacity-50">{t("max")}</span>
            </label>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              <span>{t("included1")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              <span>{t("included2")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              <span>{t("included3")}</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full rounded-xl btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="animate-spin" />
                {t("confirming")}
              </span>
            ) : (
              t("confirm")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
