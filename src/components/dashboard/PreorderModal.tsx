"use client";

import { useState } from "react";
import { createPreorder } from "@/src/modules/preorders/controllers/preorderActions";
import { Loader2, ShoppingCart, X } from "lucide-react";

interface PreorderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreorderModal({ isOpen, onClose }: PreorderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await createPreorder(quantity);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
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
            Reserve Your SmartCard
          </h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="text-center mb-8">
            <p className="text-base-content/60">
              Founder's Edition cards are limited. Reserve yours now to lock in the $29 lifetime price.
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-6 rounded-xl text-sm py-3">
              <span>{error}</span>
            </div>
          )}

          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text font-bold">Quantity</span>
              <span className="label-text-alt text-primary font-bold">${29 * quantity} Total</span>
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
              <span className="label-text-alt opacity-50">Max 10 cards per person</span>
            </label>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              <span>Founder's Edition Badge included</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              <span>Free shipping on first batch</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full rounded-xl btn-lg"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Confirm Pre-order"}
          </button>
        </form>
      </div>
    </div>
  );
}
