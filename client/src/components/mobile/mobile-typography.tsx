import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  weight?: "normal" | "medium" | "semibold" | "bold"
  color?: "default" | "muted" | "primary" | "accent"
  gradient?: boolean
}

const MobileHeading = React.forwardRef<HTMLHeadingElement, MobileHeadingProps>(
  ({ 
    className, 
    level = 2, 
    size,
    weight = "semibold",
    color = "default",
    gradient = false,
    children,
    ...props 
  }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements
    
    // Auto size based on heading level if not specified
    const autoSize = size || {
      1: "3xl",
      2: "2xl", 
      3: "xl",
      4: "lg",
      5: "md",
      6: "sm"
    }[level] as typeof size
    
    const sizeClasses = {
      xs: "text-xs sm:text-sm",
      sm: "text-sm sm:text-base",
      md: "text-sm sm:text-base md:text-lg",
      lg: "text-base sm:text-lg md:text-xl",
      xl: "text-lg sm:text-xl md:text-2xl",
      "2xl": "text-xl sm:text-2xl md:text-3xl",
      "3xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
    }
    
    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium", 
      semibold: "font-semibold",
      bold: "font-bold"
    }
    
    const colorClasses = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent-foreground"
    }
    
    const gradientClass = gradient 
      ? "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
      : ""
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          "font-sans leading-tight tracking-tight",
          sizeClasses[autoSize!],
          weightClasses[weight],
          gradient ? gradientClass : colorClasses[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MobileHeading.displayName = "MobileHeading"

interface MobileTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg"
  weight?: "light" | "normal" | "medium" | "semibold"
  color?: "default" | "muted" | "primary" | "accent" | "success" | "destructive"
  align?: "left" | "center" | "right"
  truncate?: boolean
  as?: "p" | "span" | "div"
}

const MobileText = React.forwardRef<HTMLParagraphElement, MobileTextProps>(
  ({ 
    className,
    size = "base",
    weight = "normal", 
    color = "default",
    align = "left",
    truncate = false,
    as = "p",
    children,
    ...props 
  }, ref) => {
    const Component = as
    
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-xs sm:text-sm",
      base: "text-xs sm:text-sm md:text-base",
      lg: "text-sm sm:text-base md:text-lg"
    }
    
    const weightClasses = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold"
    }
    
    const colorClasses = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent-foreground",
      success: "text-green-600",
      destructive: "text-destructive"
    }
    
    const alignClasses = {
      left: "text-left",
      center: "text-center", 
      right: "text-right"
    }
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          "font-sans leading-relaxed",
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          alignClasses[align],
          truncate && "truncate",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MobileText.displayName = "MobileText"

interface MobileBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
  size?: "sm" | "md" | "lg"
  rounded?: boolean
}

const MobileBadge = React.forwardRef<HTMLSpanElement, MobileBadgeProps>(
  ({ className, variant = "default", size = "md", rounded = true, ...props }, ref) => {
    const variantClasses = {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "border border-border text-foreground",
      success: "bg-green-100 text-green-800 border border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border border-yellow-200", 
      destructive: "bg-red-100 text-red-800 border border-red-200"
    }
    
    const sizeClasses = {
      sm: "px-1.5 py-0.5 text-xs",
      md: "px-2 py-0.5 text-xs sm:text-xs",
      lg: "px-2.5 py-1 text-xs sm:text-sm"
    }
    
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium transition-colors",
          variantClasses[variant],
          sizeClasses[size],
          rounded ? "rounded-full" : "rounded-md",
          className
        )}
        {...props}
      />
    )
  }
)
MobileBadge.displayName = "MobileBadge"

export { MobileHeading, MobileText, MobileBadge }