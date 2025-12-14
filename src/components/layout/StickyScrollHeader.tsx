import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ajvsLogo from "@/assets/ajvs-logo-enhanced.png";

interface StickyScrollHeaderProps {
  isVisible: boolean;
}

export const StickyScrollHeader = ({ isVisible }: StickyScrollHeaderProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[60] bg-primary shadow-lg"
        >
          <div className="container mx-auto px-4">
            <div className="flex h-14 items-center justify-between">
              {/* Logo & Title */}
              <Link to="/" className="flex items-center gap-3 group">
                <img 
                  src={ajvsLogo} 
                  alt="AJVS Logo" 
                  className="w-9 h-9 object-contain drop-shadow-md transition-transform group-hover:scale-105" 
                />
                <span className="text-primary-foreground font-serif text-lg font-bold hidden sm:block">
                  African Journal of Veterinary Sciences
                </span>
                <span className="text-primary-foreground font-serif text-lg font-bold sm:hidden">
                  AJVS
                </span>
              </Link>

              {/* Quick Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  to="/current-issue" 
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Current Issue
                </Link>
                <Link 
                  to="/archives" 
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Archives
                </Link>
                <Link 
                  to="/for-authors" 
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Author Guidelines
                </Link>
              </nav>

              {/* CTA */}
              <Link to="/submit">
                <Button 
                  size="sm" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md"
                >
                  <span className="hidden sm:inline">Submit Manuscript</span>
                  <span className="sm:hidden">Submit</span>
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
