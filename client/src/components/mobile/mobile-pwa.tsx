import * as React from "react"
import { cn } from "@/lib/utils"
import { Download, Share, Wifi, WifiOff, Battery, Signal } from "lucide-react"
import { useToastHelpers } from "./mobile-toast"

// PWA Install Prompt Component
interface PWAInstallPromptProps {
  className?: string
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ className }) => {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const [showPrompt, setShowPrompt] = React.useState(false)
  const toast = useToastHelpers()

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      toast.success('App installed!', 'You can now use the app offline')
    }
    
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className={cn(
      "fixed bottom-4 left-4 right-4 z-50 bg-card border border-border rounded-xl p-4 shadow-lg animate-slide-in-bottom",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">Install App</h4>
          <p className="text-xs text-muted-foreground">Add to home screen for better experience</p>
        </div>
        <button
          onClick={handleInstall}
          className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          Install
        </button>
      </div>
    </div>
  )
}

// Network Status Component
export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)
  const [connectionType, setConnectionType] = React.useState<string>('unknown')

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Get connection info if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      setConnectionType(connection.effectiveType || 'unknown')
      
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || 'unknown')
      }
      
      connection.addEventListener('change', handleConnectionChange)
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
        connection.removeEventListener('change', handleConnectionChange)
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm font-medium">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" />
        You're offline. Some features may not work.
      </div>
    </div>
  )
}

// Share Component
interface ShareButtonProps {
  title: string
  text: string
  url?: string
  className?: string
  children?: React.ReactNode
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url = window.location.href,
  className,
  children,
}) => {
  const toast = useToastHelpers()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          fallbackShare()
        }
      }
    } else {
      fallbackShare()
    }
  }

  const fallbackShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      toast.success('Link copied!', 'Share link has been copied to clipboard')
    } else {
      toast.info('Share not supported', 'Please copy the URL manually')
    }
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors",
        className
      )}
    >
      <Share className="w-4 h-4" />
      {children || 'Share'}
    </button>
  )
}

// Battery Status Component (if supported)
export const BatteryStatus: React.FC = () => {
  const [battery, setBattery] = React.useState<any>(null)
  const [batteryLevel, setBatteryLevel] = React.useState<number>(1)
  const [isCharging, setIsCharging] = React.useState<boolean>(false)

  React.useEffect(() => {
    const getBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const batteryManager = await (navigator as any).getBattery()
          setBattery(batteryManager)
          setBatteryLevel(batteryManager.level)
          setIsCharging(batteryManager.charging)

          const handleLevelChange = () => setBatteryLevel(batteryManager.level)
          const handleChargingChange = () => setIsCharging(batteryManager.charging)

          batteryManager.addEventListener('levelchange', handleLevelChange)
          batteryManager.addEventListener('chargingchange', handleChargingChange)

          return () => {
            batteryManager.removeEventListener('levelchange', handleLevelChange)
            batteryManager.removeEventListener('chargingchange', handleChargingChange)
          }
        } catch (error) {
          console.log('Battery API not supported')
        }
      }
    }

    getBattery()
  }, [])

  if (!battery) return null

  const percentage = Math.round(batteryLevel * 100)
  const isLowBattery = percentage < 20 && !isCharging

  return (
    <div className={cn(
      "flex items-center gap-1 text-xs",
      isLowBattery && "text-destructive"
    )}>
      <Battery className="w-3 h-3" />
      <span>{percentage}%</span>
      {isCharging && <span className="text-green-600">⚡</span>}
    </div>
  )
}

// Vibration Component
interface VibrationButtonProps {
  pattern?: number | number[]
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const VibrationButton: React.FC<VibrationButtonProps> = ({
  pattern = 100,
  children,
  className,
  onClick,
}) => {
  const handleClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors active:scale-95",
        className
      )}
    >
      {children}
    </button>
  )
}

// Device Orientation Component
export const DeviceOrientation: React.FC = () => {
  const [orientation, setOrientation] = React.useState<{
    alpha: number | null
    beta: number | null
    gamma: number | null
  }>({ alpha: null, beta: null, gamma: null })

  React.useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      })
    }

    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation)
      return () => window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  if (orientation.alpha === null) return null

  return (
    <div className="text-xs text-muted-foreground space-y-1">
      <div>α: {orientation.alpha?.toFixed(1)}°</div>
      <div>β: {orientation.beta?.toFixed(1)}°</div>
      <div>γ: {orientation.gamma?.toFixed(1)}°</div>
    </div>
  )
}