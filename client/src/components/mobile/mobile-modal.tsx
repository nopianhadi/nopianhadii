import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { MobileButton } from "./mobile-button"

interface MobileModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "full"
  position?: "center" | "bottom" | "top"
  backdrop?: "blur" | "dark" | "light"
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
}

const MobileModal: React.FC<MobileModalProps> = ({
  open,
  onClose,
  children,
  className,
  size = "md",
  position = "center",
  backdrop = "blur",
  closeOnBackdrop = true,
  showCloseButton = true,
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }
    
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  if (!open) return null

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    full: "max-w-full mx-4"
  }

  const positionClasses = {
    center: "items-center justify-center",
    bottom: "items-end justify-center pb-4",
    top: "items-start justify-center pt-4"
  }

  const backdropClasses = {
    blur: "bg-black/50 backdrop-blur-sm",
    dark: "bg-black/70",
    light: "bg-white/70"
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose()
    }
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex",
        positionClasses[position],
        backdropClasses[backdrop]
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "relative w-full bg-background border border-border rounded-2xl shadow-2xl animate-slide-up",
          sizeClasses[size],
          position === "bottom" && "rounded-b-none",
          position === "top" && "rounded-t-none",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <MobileButton
            variant="ghost"
            size="icon-sm"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </MobileButton>
        )}
        {children}
      </div>
    </div>,
    document.body
  )
}

const MobileModalHeader: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn("p-6 pb-4 border-b border-border", className)}>
    {children}
  </div>
)

const MobileModalBody: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
)

const MobileModalFooter: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn("p-6 pt-4 border-t border-border flex gap-3 justify-end", className)}>
    {children}
  </div>
)

// Bottom Sheet Component untuk mobile
interface MobileBottomSheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  snapPoints?: string[]
  defaultSnap?: number
}

const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  open,
  onClose,
  children,
  className,
}) => {
  const [isClosing, setIsClosing] = React.useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }

  if (!open && !isClosing) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={cn(
          "w-full max-w-md bg-background rounded-t-3xl shadow-2xl transition-transform duration-200 ease-out",
          isClosing ? "translate-y-full" : "translate-y-0",
          className
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export {
  MobileModal,
  MobileModalHeader,
  MobileModalBody,
  MobileModalFooter,
  MobileBottomSheet
}