export const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

const TRACKING_STORAGE_KEY = "smartcard_tracking_params";

export type TrackingParams = Partial<Record<(typeof TRACKING_PARAM_KEYS)[number], string>>;

export function appendTrackingParams(
  href: string,
  currentParams?: URLSearchParams | ReadonlyURLSearchParams
) {
  const [pathname, query = ""] = href.split("?");
  const nextParams = new URLSearchParams(query);

  for (const key of TRACKING_PARAM_KEYS) {
    const value = currentParams?.get(key);
    if (value && !nextParams.has(key)) {
      nextParams.set(key, value);
    }
  }

  const hasInboundTracking = TRACKING_PARAM_KEYS.some((key) => currentParams?.has(key));

  if (!hasInboundTracking) {
    if (!nextParams.has("utm_source")) nextParams.set("utm_source", "facebook");
    if (!nextParams.has("utm_campaign")) nextParams.set("utm_campaign", "test1");
  }

  const serialized = nextParams.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
}

export function extractTrackingParams(currentParams?: URLSearchParams | ReadonlyURLSearchParams): TrackingParams {
  const params: TrackingParams = {};

  for (const key of TRACKING_PARAM_KEYS) {
    const value = currentParams?.get(key);
    if (value) params[key] = value;
  }

  if (!params.utm_source) params.utm_source = "facebook";
  if (!params.utm_campaign) params.utm_campaign = "test1";

  return params;
}

export function normalizeTrackingParams(input?: Record<string, unknown> | null): TrackingParams {
  if (!input) return {};

  const params: TrackingParams = {};
  for (const key of TRACKING_PARAM_KEYS) {
    const value = input[key];
    if (typeof value === "string" && value.trim()) {
      params[key] = value.trim();
    }
  }
  return params;
}

export function persistTrackingParams(currentParams?: URLSearchParams | ReadonlyURLSearchParams) {
  if (typeof window === "undefined") return;
  const params = extractTrackingParams(currentParams);
  window.localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(params));
}

export function getStoredTrackingParams() {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(TRACKING_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as TrackingParams;
    return parsed ?? {};
  } catch {
    return {};
  }
}

type ReadonlyURLSearchParams = {
  get(name: string): string | null;
  has(name: string): boolean;
};
