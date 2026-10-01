type AnalyticsParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, parameters?: AnalyticsParameters) => void;
  }
}

export const trackEvent = (eventName: string, parameters: AnalyticsParameters = {}) => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(["event", eventName, parameters]);
};

export const trackAuthorPortalVisit = () => {
  trackEvent("author_portal_view", {
    page_path: "/author-portal",
    page_title: "Author Portal",
  });
};

export const trackOjsSubmitClick = (source: string) => {
  trackEvent("ojs_submit_click", {
    source,
    destination: "ojs_submission_portal",
  });
};