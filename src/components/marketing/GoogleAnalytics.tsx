"use client";

import { useEffect } from "react";
import { usePathname } from "@/src/i18n/navigation";
import Script from "next/script";
import { persistTrackingParams } from "@/src/lib/tracking";

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    persistTrackingParams(new URLSearchParams(window.location.search));
  }, [pathname]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
