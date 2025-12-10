import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface PageSkeletonProps {
  variant?: "default" | "article" | "list" | "dashboard" | "form";
}

export const PageSkeleton = ({ variant = "default" }: PageSkeletonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-background"
    >
      {/* Header skeleton */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Content skeleton based on variant */}
      <div className="container mx-auto px-4 py-8">
        {variant === "default" && <DefaultSkeleton />}
        {variant === "article" && <ArticleSkeleton />}
        {variant === "list" && <ListSkeleton />}
        {variant === "dashboard" && <DashboardSkeleton />}
        {variant === "form" && <FormSkeleton />}
      </div>
    </motion.div>
  );
};

const DefaultSkeleton = () => (
  <div className="space-y-8">
    {/* Hero section */}
    <div className="space-y-4 text-center py-12">
      <Skeleton className="h-10 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <div className="flex justify-center gap-4 pt-4">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>

    {/* Cards grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl border border-border/50 p-6 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  </div>
);

const ArticleSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    {/* Title and meta */}
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-3/4" />
      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>

    {/* Featured image */}
    <Skeleton className="h-64 w-full rounded-xl" />

    {/* Content paragraphs */}
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  </div>
);

const ListSkeleton = () => (
  <div className="space-y-6">
    {/* Page title */}
    <div className="space-y-2">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-96" />
    </div>

    {/* Search/filter bar */}
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 flex-1 max-w-md" />
      <Skeleton className="h-10 w-32" />
    </div>

    {/* List items */}
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border/50">
          <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-xl border border-border/50 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>

    {/* Main content area */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-xl border border-border/50 p-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-64 w-full" />
      </div>
      <div className="rounded-xl border border-border/50 p-6 space-y-4">
        <Skeleton className="h-6 w-24" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FormSkeleton = () => (
  <div className="max-w-2xl mx-auto space-y-8">
    {/* Form header */}
    <div className="space-y-2 text-center">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-5 w-96 mx-auto" />
    </div>

    {/* Form fields */}
    <div className="rounded-xl border border-border/50 p-8 space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      
      {/* Textarea */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

export { DefaultSkeleton, ArticleSkeleton, ListSkeleton, DashboardSkeleton, FormSkeleton };
