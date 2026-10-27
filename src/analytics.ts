/** Anonymous site analytics. Configure VITE_UMAMI_WEBSITE_ID in the Pages build. */
declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}
export function initAnalytics() {
  const id = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  if (!id || !/^[a-zA-Z0-9-]{8,64}$/.test(id)) return;
  if (document.querySelector('script[data-website-id]')) return;
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://cloud.umami.is/script.js";
  script.dataset.websiteId = id;
  document.head.appendChild(script);
}
export function trackGame(event: "game_start" | "app_open" | "content_open", app?: string) {
  // Never send chat text, names, phone numbers, image URLs or personal identifiers.
  const data = app ? { app: app.replace(/[^a-z0-9_-]/gi, "").slice(0, 40) } : undefined;
  window.umami?.track(event, data);
}
