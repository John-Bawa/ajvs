import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackAuthorPortalVisit } from "@/lib/analytics";

export const RouteAnalytics = () => {
  const location = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current === location.pathname) return;
    previousPathname.current = location.pathname;

    if (location.pathname === "/author-portal") {
      trackAuthorPortalVisit();
    }
  }, [location.pathname]);

  return null;
};