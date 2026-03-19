declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaPageView() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", "PageView");
}

export function trackMetaPreorder(quantity: number) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq("track", "Lead", {
    content_name: "SmartCard preorder",
    content_category: "preorder",
    num_items: quantity,
  });

  window.fbq("trackCustom", "PreorderCreated", {
    quantity,
  });
}
