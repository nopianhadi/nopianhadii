import * as React from "react"
import { cn } from "@/lib/utils"

// Mobile-optimized container dengan spacing yang lebih rapi
interface MobileContainerOptimizedProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "compact" | "comfortable" | "spacious"
}

export const MobileContainerOptimized = React.forwardRef<HTMLDivElement, MobileContainerOptimizedProps>(
  ({ className, size = "lg", padding = "comfortable", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md", 
      lg: "max-w-4xl",
      xl: "max-w-6xl",
      full: "max-w-full"
    }
    
    const paddingClasses = {
      compact: "px-3 sm:px-4 md:px-6",
      comfortable: "px-4 sm:px-6 md:px-8",
      spacious: "px-6 sm:px-8 md:px-12"
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
MobileContainerOptimized.displayName = "MobileContainerOptimized"

// Mobile-optimized grid dengan spacing yang lebih konsisten
interface MobileGridOptimizedProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4
  gap?: "compact" | "comfortable" | "spacious"
  responsive?: boolean
}

export const MobileGridOptimized = React.forwardRef<HTMLDivElement, MobileGridOptimizedProps>(
  ({ className, cols = 1, gap = "comfortable", responsive = true, ...props }, ref) => {
    const gapClasses = {
      compact: "gap-2 sm:gap-3 md:gap-4",
      comfortable: "gap-3 sm:gap-4 md:gap-6",
      spacious: "gap-4 sm:gap-6 md:gap-8"
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
MobileGridOptimized.displayName = "MobileGridOptimized"

// Mobile-optimized icon wrapper dengan sizing yang konsisten
interface MobileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "contained" | "outlined"
  color?: "default" | "primary" | "secondary" | "muted"
}

export const MobileIcon = React.forwardRef<HTMLDivElement, MobileIconProps>(
  ({ className, size = "md", variant = "default", color = "default", children, ...props }, ref) => {
    const sizeClasses = {
      xs: "w-3 h-3 sm:w-4 sm:h-4",
      sm: "w-4 h-4 sm:w-5 sm:h-5",
      md: "w-5 h-5 sm:w-6 sm:h-6",
      lg: "w-6 h-6 sm:w-7 sm:h-7",
      xl: "w-7 h-7 sm:w-8 sm:h-8"
    }
    
    const variantClasses = {
      default: "",
      contained: "p-1.5 sm:p-2 rounded-lg bg-primary/10",
      outlined: "p-1.5 sm:p-2 rounded-lg border border-border"
    }
    
    const colorClasses = {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      muted: "text-muted-foreground"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          sizeClasses[size],
          variantClasses[variant],
          colorClasses[color],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MobileIcon.displayName = "MobileIcon"

// Mobile-optimized text dengan better line heights dan spacing
interface MobileTextOptimizedProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  weight?: "light" | "normal" | "medium" | "semibold" | "bold"
  color?: "default" | "muted" | "primary" | "secondary" | "accent"
  align?: "left" | "center" | "right"
  spacing?: "tight" | "normal" | "relaxed"
  as?: "p" | "span" | "div"
}

export const MobileTextOptimized = React.forwardRef<HTMLParagraphElement, MobileTextOptimizedProps>(
  ({ 
    className,
    size = "base",
    weight = "normal", 
    color = "default",
    align = "left",
    spacing = "normal",
    as = "p",
    children,
    ...props 
  }, ref) => {
    const Component = as
    
    const sizeClasses = {
      xs: "text-xs sm:text-sm",
      sm: "text-sm sm:text-base",
      base: "text-sm sm:text-base md:text-lg",
      lg: "text-base sm:text-lg md:text-xl",
      xl: "text-lg sm:text-xl md:text-2xl"
    }
    
    const weightClasses = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
    
    const colorClasses = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      accent: "text-accent-foreground"
    }
    
    const alignClasses = {
      left: "text-left",
      center: "text-center", 
      right: "text-right"
    }
    
    const spacingClasses = {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed"
    }
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          "font-sans",
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          alignClasses[align],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MobileTextOptimized.displayName = "MobileTextOptimized"

// Mobile-optimized spacing component
interface MobileSpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  direction?: "vertical" | "horizontal"
}

export const MobileSpacer: React.FC<MobileSpacerProps> = ({ 
  size = "md", 
  direction = "vertical" 
}) => {
  const sizeClasses = {
    xs: direction === "vertical" ? "h-2 sm:h-3" : "w-2 sm:w-3",
    sm: direction === "vertical" ? "h-3 sm:h-4" : "w-3 sm:w-4",
    md: direction === "vertical" ? "h-4 sm:h-6" : "w-4 sm:w-6",
    lg: direction === "vertical" ? "h-6 sm:h-8" : "w-6 sm:w-8",
    xl: direction === "vertical" ? "h-8 sm:h-12" : "w-8 sm:w-12"
  }
  
  return <div className={cn("shrink-0", sizeClasses[size])} />
}

// Mobile-optimized divider
interface MobileDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  spacing?: "none" | "sm" | "md" | "lg"
}

export const MobileDivider = React.forwardRef<HTMLDivElement, MobileDividerProps>(
  ({ className, orientation = "horizontal", spacing = "md", ...props }, ref) => {
    const orientationClasses = {
      horizontal: "w-full h-px",
      vertical: "h-full w-px"
    }
    
    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "my-2 sm:my-3" : "mx-2 sm:mx-3",
      md: orientation === "horizontal" ? "my-3 sm:my-4" : "mx-3 sm:mx-4",
      lg: orientation === "horizontal" ? "my-4 sm:my-6" : "mx-4 sm:mx-6"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "bg-border",
          orientationClasses[orientation],
          spacingClasses[spacing],
          className
        )}
        {...props}
      />
    )
  }
)
MobileDivider.displayName = "MobileDivider"