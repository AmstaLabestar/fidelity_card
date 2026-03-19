"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "@/src/i18n/navigation";
import { trackGoogleCtaClick } from "@/src/lib/googleAnalytics";
import { appendTrackingParams } from "@/src/lib/tracking";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  trackingLocation?: string;
  trackingLabel?: string;
};

export default function TrackedLink({
  href,
  className,
  children,
  trackingLocation,
  trackingLabel,
}: TrackedLinkProps) {
  const [trackedHref, setTrackedHref] = useState(() => appendTrackingParams(href));

  useEffect(() => {
    const nextHref = appendTrackingParams(href, new URLSearchParams(window.location.search));
    setTrackedHref(nextHref);
  }, [href]);

  return (
    <Link
      href={trackedHref}
      className={className}
      onClick={() => {
        if (!trackingLocation || !trackingLabel) return;
        trackGoogleCtaClick(trackingLocation, trackingLabel);
      }}
    >
      {children}
    </Link>
  );
}
