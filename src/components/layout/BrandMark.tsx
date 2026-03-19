import { CreditCard } from "lucide-react";

type BrandMarkProps = {
  size?: "sm" | "md";
};

export default function BrandMark({ size = "sm" }: BrandMarkProps) {
  const frameSize = size === "md" ? "h-12 w-12" : "h-9 w-9";
  const innerSize = size === "md" ? "h-6 w-6" : "h-5 w-5";
  const iconSize = size === "md" ? 18 : 16;

  return (
    <div className={`relative grid place-items-center ${frameSize}`}>
      <div className="absolute inset-0 rotate-45 rounded-2xl border border-primary/45 bg-primary/12 shadow-[0_0_18px_oklch(var(--color-primary)/0.18)] transition-transform duration-300 group-hover:rotate-[55deg]" />
      <div className={`relative grid place-items-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20 ${innerSize}`}>
        <CreditCard size={iconSize} />
      </div>
    </div>
  );
}
