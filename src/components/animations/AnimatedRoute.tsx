import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface AnimatedRouteProps {
  children: ReactNode;
}

export const AnimatedRoute = ({ children }: AnimatedRouteProps) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        delay: 0.05,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};
