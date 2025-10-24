import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, MoreVertical, X } from "lucide-react"
import { useIsMobile, useScreenSize } from "@/hooks/use-mobile"

// Mobile App Bar Component
interface MobileAppBarProps {
  title: string
  leftAction?: React.ReactNode
  rightAction?: React.ReactNode
  onBack?: () => void
  className?: string
}

export const MobileAppBar: React.FC<MobileAppBarProps> = ({
  title,
  leftAction,
  rightAction,
  onBack,
  className,
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between h-14 px-4 bg-background/95 backdrop-blur-xl border-b border-border sticky top-0 z-40",
      className
    )}>
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {leftAction}
      </div>
      
      <h1 className="font-semibold text-lg truncate flex-1 text-center px-4">
        {title}
      </h1>
      
      <div className="flex items-center gap-2">
        {rightAction}
      </div>
    </div>
  )
}

// Mobile List Item Component
interface MobileListItemProps {
  children: React.ReactNode
  onClick?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  subtitle?: string
  badge?: string | number
  className?: string
}

export const MobileListItem: React.FC<MobileListItemProps> = ({
  children,
  onClick,
  leftIcon,
  rightIcon = <ChevronRight className="w-4 h-4 text-muted-foreground" />,
  subtitle,
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer active:bg-accent",
        className
      )}
      onClick={onClick}
    >
      {leftIcon && (
        <div className="flex-shrink-0">
          {leftIcon}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{children}</div>
        {subtitle && (
          <div className="text-sm text-muted-foreground truncate">{subtitle}</div>
        )}
      </div>
      
      {badge && (
        <div className="flex-shrink-0 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
          {badge}
        </div>
      )}
      
      {rightIcon && (
        <div className="flex-shrink-0">
          {rightIcon}
        </div>
      )}
    </div>
  )
}

// Mobile Action Sheet Component
interface MobileActionSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export const MobileActionSheet: React.FC<MobileActionSheetProps> = ({
  open,
  onClose,
  title,
  children,
  className,
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className={cn(
        "w-full max-w-md bg-background rounded-t-3xl shadow-2xl animate-slide-in-bottom",
        className
      )}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
        
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-3 border-b border-border">
            <h3 className="font-semibold text-lg">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        
        {/* Safe area bottom padding */}
        <div className="h-safe-area-inset-bottom" />
      </div>
    </div>
  )
}

// Mobile Carousel Component
interface MobileCarouselProps {
  children: React.ReactNode[]
  className?: string
  showDots?: boolean
  autoPlay?: boolean
  interval?: number
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  className,
  showDots = true,
  autoPlay = false,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(autoPlay)

  React.useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isAutoPlaying, children.length, interval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      
      {showDots && children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Mobile Sticky Header Component
interface MobileStickyHeaderProps {
  children: React.ReactNode
  threshold?: number
  className?: string
}

export const MobileStickyHeader: React.FC<MobileStickyHeaderProps> = ({
  children,
  threshold = 100,
  className,
}) => {
  const [isSticky, setIsSticky] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return (
    <div className={cn(
      "sticky top-0 z-40 transition-all duration-200",
      isSticky && "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm",
      className
    )}>
      {children}
    </div>
  )
}

// Mobile Progress Bar Component
interface MobileProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
}

export const MobileProgressBar: React.FC<MobileProgressBarProps> = ({
  value,
  max = 100,
  className,
  showLabel = false,
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}