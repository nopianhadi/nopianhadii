import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "compact" | "glass-2025" | "gradient"
  interactive?: boolean
  padding?: "none" | "sm" | "md" | "lg"
  rounded?: "default" | "lg" | "xl" | "2xl"
}

const MobileCard = React.forwardRef<HTMLDivElement, MobileCardProps>(
  ({ className, variant = "default", interactive = false, padding = "md", rounded = "default", ...props }, ref) => {
    const baseClasses = "transition-all duration-300 ease-out"
    
    const variantClasses = {
      default: "card-2025",
      elevated: "card-2025-elevated",
      glass: "bg-card/80 backdrop-blur-xl border border-card-border/50 shadow-sm",
      compact: "bg-card border border-card-border shadow-sm",
      "glass-2025": "glass-2025",
      gradient: "bg-gradient-to-br from-card to-card/50 border border-card-border shadow-lg"
    }
    
    const paddingClasses = {
      none: "",
      sm: "p-3 sm:p-4",
      md: "p-4 sm:p-6",
      lg: "p-6 sm:p-8"
    }
    
    const roundedClasses = {
      default: "rounded-xl",
      lg: "rounded-xl sm:rounded-2xl",
      xl: "rounded-2xl",
      "2xl": "rounded-2xl sm:rounded-3xl"
    }
    
    const interactiveClasses = interactive 
      ? "hover-lift tap-scale cursor-pointer" 
      : ""
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          roundedClasses[rounded],
          interactiveClasses,
          className
        )}
        {...props}
      />
    )
  }
)
MobileCard.displayName = "MobileCard"

const MobileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 sm:space-y-2 p-3 sm:p-4 pb-1.5 sm:pb-2", className)}
    {...props}
  />
))
MobileCardHeader.displayName = "MobileCardHeader"

const MobileCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm sm:text-base md:text-lg font-semibold leading-tight text-card-foreground",
      className
    )}
    {...props}
  />
))
MobileCardTitle.displayName = "MobileCardTitle"

const MobileCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
MobileCardDescription.displayName = "MobileCardDescription"

const MobileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 sm:p-4 pt-1.5 sm:pt-2", className)} {...props} />
))
MobileCardContent.displayName = "MobileCardContent"

const MobileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between p-4 pt-2", className)}
    {...props}
  />
))
MobileCardFooter.displayName = "MobileCardFooter"

export {
  MobileCard,
  MobileCardHeader,
  MobileCardFooter,
  MobileCardTitle,
  MobileCardDescription,
  MobileCardContent,
}