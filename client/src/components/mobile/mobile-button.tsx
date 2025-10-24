import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const mobileButtonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 [&_svg]:pointer-events-none [&_svg]:shrink-0 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md",
        gradient: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-sm hover:shadow-md",
      },
      size: {
        sm: "h-7 sm:h-8 px-2 sm:px-3 text-xs [&_svg]:size-3",
        default: "h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm [&_svg]:size-3 sm:[&_svg]:size-4", 
        lg: "h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base [&_svg]:size-4 sm:[&_svg]:size-5",
        xl: "h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg [&_svg]:size-5 sm:[&_svg]:size-6",
        icon: "h-9 w-9 sm:h-10 sm:w-10 [&_svg]:size-3 sm:[&_svg]:size-4",
        "icon-sm": "h-7 w-7 sm:h-8 sm:w-8 [&_svg]:size-3",
        "icon-lg": "h-10 w-10 sm:h-12 sm:w-12 [&_svg]:size-4 sm:[&_svg]:size-5",
      },
      rounded: {
        default: "rounded-md sm:rounded-lg",
        sm: "rounded sm:rounded-md",
        lg: "rounded-lg sm:rounded-xl", 
        full: "rounded-full",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fit: "w-fit",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      width: "auto",
    },
  },
)

export interface MobileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mobileButtonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    width,
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const content = (
      <>
        {loading && (
          <div className="animate-spin rounded-full border-2 border-current border-t-transparent" 
               style={{ width: '1em', height: '1em' }} />
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </>
    )

    if (asChild) {
      return (
        <Slot
          className={cn(mobileButtonVariants({ variant, size, rounded, width, className }))}
          ref={ref}
          {...props}
        >
          {React.isValidElement(children) ? 
            React.cloneElement(children, {
              className: cn(
                mobileButtonVariants({ variant, size, rounded, width }),
                children.props.className,
                className
              ),
              disabled: disabled || loading,
              ...props
            }) : 
            children
          }
        </Slot>
      )
    }
    
    return (
      <button
        className={cn(mobileButtonVariants({ variant, size, rounded, width, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    )
  },
)
MobileButton.displayName = "MobileButton"

// Floating Action Button untuk mobile
interface FABProps extends Omit<MobileButtonProps, 'size' | 'width'> {
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  size?: "default" | "lg"
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ className, position = "bottom-right", size = "default", ...props }, ref) => {
    const positionClasses = {
      "bottom-right": "fixed bottom-6 right-6 z-50",
      "bottom-left": "fixed bottom-6 left-6 z-50", 
      "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    }
    
    const sizeVariant = size === "lg" ? "icon-lg" : "icon"
    
    return (
      <MobileButton
        ref={ref}
        className={cn(
          positionClasses[position],
          "shadow-lg hover:shadow-xl",
          className
        )}
        size={sizeVariant}
        rounded="full"
        {...props}
      />
    )
  }
)
FloatingActionButton.displayName = "FloatingActionButton"

export { MobileButton, FloatingActionButton, mobileButtonVariants }