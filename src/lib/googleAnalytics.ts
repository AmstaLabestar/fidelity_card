import { getStoredTrackingParams } from "@/src/lib/tracking";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const trackingParams = getStoredTrackingParams();
  window.gtag("event", eventName, {
    ...trackingParams,
    ...params,
  });
}

export function trackGooglePreorder(quantity: number) {
  trackGoogleEvent("preorder_created", {
    quantity,
  });
}

export function trackGoogleCtaClick(location: string, label: string) {
  trackGoogleEvent("cta_click", {
    location,
    label,
  });
}

export function trackGoogleSignUp(method = "credentials") {
  trackGoogleEvent("sign_up", {
    method,
  });
}

export function trackGoogleLogin(method = "credentials", intent?: string | null) {
  trackGoogleEvent("login", {
    method,
    intent: intent ?? undefined,
  });
}
