import * as React from "react"
import { cn } from "@/lib/utils"

interface SwipeDirection {
  x: number
  y: number
}

interface SwipeHandlerProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  className?: string
}

export const SwipeHandler: React.FC<SwipeHandlerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  className,
}) => {
  const [touchStart, setTouchStart] = React.useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > threshold
    const isRightSwipe = distanceX < -threshold
    const isUpSwipe = distanceY > threshold
    const isDownSwipe = distanceY < -threshold

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp()
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown()
    }
  }

  return (
    <div
      className={cn("touch-pan-y", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
  className?: string
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  className,
}) => {
  const [isPulling, setIsPulling] = React.useState(false)
  const [pullDistance, setPullDistance] = React.useState(0)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setTouchStart(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === 0 || window.scrollY > 0) return

    const touchY = e.touches[0].clientY
    const distance = touchY - touchStart

    if (distance > 0) {
      setIsPulling(true)
      setPullDistance(Math.min(distance, threshold * 1.5))
      e.preventDefault()
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    
    setIsPulling(false)
    setPullDistance(0)
    setTouchStart(0)
  }

  const pullProgress = Math.min(pullDistance / threshold, 1)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Pull to refresh indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center transition-transform duration-200 z-10",
          "bg-background/90 backdrop-blur-sm border-b border-border",
          isPulling || isRefreshing ? "translate-y-0" : "-translate-y-full"
        )}
        style={{
          height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
        }}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          {isRefreshing ? (
            <>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Refreshing...</span>
            </>
          ) : (
            <>
              <div
                className="w-4 h-4 border-2 border-muted-foreground rounded-full transition-transform duration-200"
                style={{
                  transform: `rotate(${pullProgress * 180}deg)`,
                  borderTopColor: pullProgress >= 1 ? "hsl(var(--primary))" : "transparent",
                }}
              />
              <span className="text-sm font-medium">
                {pullProgress >= 1 ? "Release to refresh" : "Pull to refresh"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${isPulling || isRefreshing ? Math.max(pullDistance, isRefreshing ? 60 : 0) : 0}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}

interface LongPressProps {
  children: React.ReactNode
  onLongPress: () => void
  delay?: number
  className?: string
}

export const LongPressHandler: React.FC<LongPressProps> = ({
  children,
  onLongPress,
  delay = 500,
  className,
}) => {
  const [isPressed, setIsPressed] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const handleStart = () => {
    setIsPressed(true)
    timeoutRef.current = setTimeout(() => {
      onLongPress()
      setIsPressed(false)
    }, delay)
  }

  const handleEnd = () => {
    setIsPressed(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={cn(
        "transition-transform duration-100",
        isPressed && "scale-95",
        className
      )}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {children}
    </div>
  )
}