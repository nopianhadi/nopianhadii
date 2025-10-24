import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface MobileLoadingProps {
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "dots" | "pulse" | "bars"
  className?: string
  text?: string
}

const MobileLoading: React.FC<MobileLoadingProps> = ({
  size = "md",
  variant = "spinner",
  className,
  text,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  const renderSpinner = () => (
    <Loader2 className={cn("animate-spin", sizeClasses[size])} />
  )

  const renderDots = () => (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-current rounded-full animate-pulse",
            size === "sm" && "w-1 h-1",
            size === "md" && "w-1.5 h-1.5",
            size === "lg" && "w-2 h-2"
          )}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div className={cn(
      "bg-current rounded-full animate-pulse",
      sizeClasses[size]
    )} />
  )

  const renderBars = () => (
    <div className="flex gap-0.5 items-end">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-current animate-pulse",
            size === "sm" && "w-0.5 h-2",
            size === "md" && "w-1 h-3",
            size === "lg" && "w-1.5 h-4"
          )}
          style={{ 
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.8s"
          }}
        />
      ))}
    </div>
  )

  const renderVariant = () => {
    switch (variant) {
      case "dots": return renderDots()
      case "pulse": return renderPulse()
      case "bars": return renderBars()
      default: return renderSpinner()
    }
  }

  return (
    <div className={cn(
      "flex flex-col items-center gap-2 text-muted-foreground",
      className
    )}>
      {renderVariant()}
      {text && (
        <span className="text-sm font-medium">{text}</span>
      )}
    </div>
  )
}

// Full screen loading overlay
interface MobileLoadingOverlayProps {
  visible: boolean
  text?: string
  className?: string
}

const MobileLoadingOverlay: React.FC<MobileLoadingOverlayProps> = ({
  visible,
  text = "Loading...",
  className,
}) => {
  if (!visible) return null

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "bg-background/80 backdrop-blur-sm",
      className
    )}>
      <MobileLoading size="lg" text={text} />
    </div>
  )
}

// Skeleton components
interface MobileSkeletonProps {
  className?: string
  variant?: "text" | "rectangular" | "circular"
  width?: string | number
  height?: string | number
  lines?: number
}

const MobileSkeleton: React.FC<MobileSkeletonProps> = ({
  className,
  variant = "rectangular",
  width,
  height,
  lines = 1,
}) => {
  const baseClasses = "animate-pulse bg-muted rounded"
  
  const variantClasses = {
    text: "h-4 rounded-md",
    rectangular: "rounded-lg",
    circular: "rounded-full"
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === "number" ? `${width}px` : width
  if (height) style.height = typeof height === "number" ? `${height}px` : height

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses[variant],
              i === lines - 1 && "w-3/4", // Last line shorter
              className
            )}
            style={i === lines - 1 ? { ...style, width: "75%" } : style}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={style}
    />
  )
}

// Card skeleton
const MobileCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("p-6 space-y-4", className)}>
    <div className="flex items-center gap-3">
      <MobileSkeleton variant="circular" width={40} height={40} />
      <div className="flex-1 space-y-2">
        <MobileSkeleton variant="text" width="60%" />
        <MobileSkeleton variant="text" width="40%" />
      </div>
    </div>
    <MobileSkeleton variant="text" lines={3} />
    <div className="flex gap-2">
      <MobileSkeleton width={80} height={32} />
      <MobileSkeleton width={60} height={32} />
    </div>
  </div>
)

// List skeleton
const MobileListSkeleton: React.FC<{ 
  items?: number
  className?: string 
}> = ({ items = 5, className }) => (
  <div className={cn("space-y-3", className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3">
        <MobileSkeleton variant="circular" width={32} height={32} />
        <div className="flex-1 space-y-2">
          <MobileSkeleton variant="text" width="70%" />
          <MobileSkeleton variant="text" width="50%" />
        </div>
        <MobileSkeleton width={24} height={24} />
      </div>
    ))}
  </div>
)

export {
  MobileLoading,
  MobileLoadingOverlay,
  MobileSkeleton,
  MobileCardSkeleton,
  MobileListSkeleton
}