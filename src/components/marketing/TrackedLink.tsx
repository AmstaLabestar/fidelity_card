"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/src/i18n/navigation";
import { appendTrackingParams } from "@/src/lib/tracking";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function TrackedLink({ href, className, children }: TrackedLinkProps) {
  const searchParams = useSearchParams();
  const trackedHref = appendTrackingParams(href, searchParams);

  return (
    <Link href={trackedHref} className={className}>
      {children}
    </Link>
  );
}
