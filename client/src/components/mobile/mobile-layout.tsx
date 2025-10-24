import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
}

const MobileContainer = React.forwardRef<HTMLDivElement, MobileContainerProps>(
  ({ className, size = "lg", padding = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md", 
      lg: "max-w-4xl",
      xl: "max-w-6xl",
      full: "max-w-full"
    }
    
    const paddingClasses = {
      none: "",
      sm: "px-3 sm:px-4",
      md: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          sizeClasses[size],
          paddingClasses[padding],
          className
        )}
        {...props}
      />
    )
  }
)
MobileContainer.displayName = "MobileContainer"

interface MobileSectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  background?: "default" | "muted" | "accent"
}

const MobileSection = React.forwardRef<HTMLElement, MobileSectionProps>(
  ({ className, spacing = "md", background = "default", ...props }, ref) => {
    const spacingClasses = {
      none: "",
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16 lg:py-20",
      lg: "py-16 sm:py-20 lg:py-24",
      xl: "py-20 sm:py-24 lg:py-32"
    }
    
    const backgroundClasses = {
      default: "bg-background",
      muted: "bg-muted/30",
      accent: "bg-accent/5"
    }
    
    return (
      <section
        ref={ref}
        className={cn(
          spacingClasses[spacing],
          backgroundClasses[background],
          className
        )}
        {...props}
      />
    )
  }
)
MobileSection.displayName = "MobileSection"

interface MobileGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  responsive?: boolean
}

const MobileGrid = React.forwardRef<HTMLDivElement, MobileGridProps>(
  ({ className, cols = 1, gap = "md", responsive = true, ...props }, ref) => {
    const gapClasses = {
      sm: "gap-2 sm:gap-3 md:gap-4",
      md: "gap-3 sm:gap-4 md:gap-6",
      lg: "gap-4 sm:gap-6 md:gap-8"
    }
    
    const getColsClass = () => {
      if (!responsive) return `grid-cols-${cols}`
      
      switch (cols) {
        case 1: return "grid-cols-1"
        case 2: return "grid-cols-1 sm:grid-cols-2"
        case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        default: return "grid-cols-1"
      }
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          getColsClass(),
          gapClasses[gap],
          className
        )}
        {...props}
      />
    )
  }
)
MobileGrid.displayName = "MobileGrid"

interface MobileStackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "xs" | "sm" | "md" | "lg"
  align?: "start" | "center" | "end" | "stretch"
}

const MobileStack = React.forwardRef<HTMLDivElement, MobileStackProps>(
  ({ className, spacing = "md", align = "stretch", ...props }, ref) => {
    const spacingClasses = {
      none: "space-y-0",
      xs: "space-y-1 sm:space-y-1.5 md:space-y-2",
      sm: "space-y-1.5 sm:space-y-2 md:space-y-3",
      md: "space-y-2 sm:space-y-3 md:space-y-4",
      lg: "space-y-3 sm:space-y-4 md:space-y-6"
    }
    
    const alignClasses = {
      start: "items-start",
      center: "items-center", 
      end: "items-end",
      stretch: "items-stretch"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          spacingClasses[spacing],
          alignClasses[align],
          className
        )}
        {...props}
      />
    )
  }
)
MobileStack.displayName = "MobileStack"

export {
  MobileContainer,
  MobileSection,
  MobileGrid,
  MobileStack
}