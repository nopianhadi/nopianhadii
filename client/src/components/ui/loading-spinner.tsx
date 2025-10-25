import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
          sizeClasses[size]
        )}
      />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="portfolio-card relative overflow-hidden cursor-pointer rounded-3xl border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          <div className="h-9 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}