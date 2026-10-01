import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackAuthorPortalVisit, trackEvent } from "@/lib/analytics";

export const RouteAnalytics = () => {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    if (previousPath.current === pagePath) return;
    previousPath.current = pagePath;

    trackEvent("page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });

    if (location.pathname === "/author-portal") {
      trackAuthorPortalVisit();
    }
  }, [location.pathname, location.search]);

  return null;
};