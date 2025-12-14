import { cn } from "@/lib/utils";

interface OrnamentalDividerProps {
  variant?: "simple" | "flourish" | "diamond" | "scroll";
  className?: string;
}

export const OrnamentalDivider = ({ 
  variant = "flourish", 
  className 
}: OrnamentalDividerProps) => {
  if (variant === "simple") {
    return (
      <div className={cn("flex items-center justify-center py-4", className)}>
        <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-primary/30" />
        <div className="mx-4 w-2 h-2 rotate-45 border border-primary/40" />
        <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-primary/30" />
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div className={cn("flex items-center justify-center py-6", className)}>
        <div className="flex-1 max-w-40 h-px bg-gradient-to-r from-transparent via-primary/20 to-primary/40" />
        <div className="mx-3 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
          <div className="w-2.5 h-2.5 rotate-45 bg-primary/50" />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/30" />
        </div>
        <div className="flex-1 max-w-40 h-px bg-gradient-to-l from-transparent via-primary/20 to-primary/40" />
      </div>
    );
  }

  if (variant === "scroll") {
    return (
      <div className={cn("flex items-center justify-center py-6", className)}>
        <div className="flex items-center gap-2">
          {/* Left scroll flourish */}
          <svg className="w-12 h-4 text-primary/40" viewBox="0 0 48 16" fill="none">
            <path 
              d="M0 8C8 8 8 2 16 2C24 2 24 14 32 14C40 14 40 8 48 8" 
              stroke="currentColor" 
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          
          {/* Right scroll flourish */}
          <svg className="w-12 h-4 text-primary/40 rotate-180" viewBox="0 0 48 16" fill="none">
            <path 
              d="M0 8C8 8 8 2 16 2C24 2 24 14 32 14C40 14 40 8 48 8" 
              stroke="currentColor" 
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Default: flourish variant
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="flex items-center gap-3">
        {/* Left flourish */}
        <div className="flex items-center">
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <svg className="w-6 h-6 text-primary/40 -ml-1" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 4C8 4 8 8 4 8M12 4C12 8 8 12 4 12M12 4V12" 
              stroke="currentColor" 
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        {/* Center ornament */}
        <div className="relative">
          <div className="w-3 h-3 rotate-45 border-2 border-primary/50 bg-background" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rotate-45 bg-primary/60" />
          </div>
        </div>
        
        {/* Right flourish */}
        <div className="flex items-center">
          <svg className="w-6 h-6 text-primary/40 -mr-1 scale-x-[-1]" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 4C8 4 8 8 4 8M12 4C12 8 8 12 4 12M12 4V12" 
              stroke="currentColor" 
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>
    </div>
  );
};
