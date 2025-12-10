import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export const PageTransitionLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setShowSkeleton(true);
    
    // Progress bar duration
    const progressTimer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    // Skeleton slightly longer for smooth transition
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 300);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(skeletonTimer);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Top progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left"
          />
          
          {/* Shimmer effect on progress bar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </motion.div>
      )}

      {/* Page skeleton overlay */}
      {showSkeleton && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] pointer-events-none bg-background/30 backdrop-blur-[1px]"
        >
          <div className="container mx-auto px-4 pt-24">
            <div className="space-y-6 opacity-40">
              {/* Quick skeleton preview */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
