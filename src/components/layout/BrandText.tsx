type BrandTextProps = {
  className?: string;
};

export default function BrandText({ className = "text-xl font-black tracking-tighter" }: BrandTextProps) {
  return (
    <span className={className}>
      <span className="text-base-content">Smart</span>
      <span className="text-primary">Card</span>
    </span>
  );
}
