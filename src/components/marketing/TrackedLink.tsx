"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/navigation";
import { appendTrackingParams } from "@/src/lib/tracking";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function TrackedLink({ href, className, children }: TrackedLinkProps) {
  const [trackedHref, setTrackedHref] = useState(() => appendTrackingParams(href));

  useEffect(() => {
    const nextHref = appendTrackingParams(href, new URLSearchParams(window.location.search));
    setTrackedHref(nextHref);
  }, [href]);

  return (
    <Link href={trackedHref} className={className}>
      {children}
    </Link>
  );
}
