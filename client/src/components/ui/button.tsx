import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "google-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "google-button-primary hover:translate-y-[-1px]",
        secondary: 
          "google-button-secondary hover:translate-y-[-1px]",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground hover:translate-y-[-1px]",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground hover:translate-y-[-1px]",
        link: 
          "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:translate-y-[-1px]",
        // Legacy gradient variants for compatibility
        gradient:
          "bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white shadow-sm hover:shadow-md hover:translate-y-[-1px]",
        gradientBlue:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-sm hover:shadow-md hover:translate-y-[-1px]",
      },
      size: {
        default: "min-h-9 px-4 py-2 text-sm",
        sm: "min-h-8 px-3 py-1.5 text-xs",
        lg: "min-h-10 px-6 py-2.5 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
