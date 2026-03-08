import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redirect /news to /blog?type=announcement for backwards compatibility
const News = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/blog", { replace: true });
  }, [navigate]);
  return null;
};

export default News;
