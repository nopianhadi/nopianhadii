import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "compact"
  interactive?: boolean
}

const MobileCard = React.forwardRef<HTMLDivElement, MobileCardProps>(
  ({ className, variant = "default", interactive = false, ...props }, ref) => {
    const baseClasses = "rounded-xl transition-all duration-300 ease-out"
    
    const variantClasses = {
      default: "bg-card border border-card-border shadow-sm",
      elevated: "bg-card border border-card-border shadow-md hover:shadow-lg",
      glass: "bg-card/80 backdrop-blur-xl border border-card-border/50 shadow-sm",
      compact: "bg-card border border-card-border shadow-sm p-3"
    }
    
    const interactiveClasses = interactive 
      ? "hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] cursor-pointer" 
      : ""
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
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