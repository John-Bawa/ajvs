import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
