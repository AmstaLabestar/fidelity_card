export const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

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

type ReadonlyURLSearchParams = {
  get(name: string): string | null;
  has(name: string): boolean;
};
