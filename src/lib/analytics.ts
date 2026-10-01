import { supabase } from "@/integrations/supabase/client";

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
  const params = new URLSearchParams(window.location.search);
  const referrerHost = document.referrer ? new URL(document.referrer).hostname : "";
  const source = params.get("utm_source")?.slice(0, 80) || referrerHost.slice(0, 80) || "direct";

  trackEvent("author_portal_view", {
    page_path: "/author-portal",
    page_title: "Author Portal",
    source,
  });
  void supabase.from("author_interest_events").insert({ event_type: "author_portal_view", source });
};

export const trackOjsSubmitClick = (source: string) => {
  trackEvent("ojs_submit_click", {
    source,
    destination: "ojs_submission_portal",
  });
  void supabase.from("author_interest_events").insert({ event_type: "ojs_submit_click", source });
};