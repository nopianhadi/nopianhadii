import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileTabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const MobileTabsContext = React.createContext<MobileTabsContextType | undefined>(undefined)

const useMobileTabs = () => {
  const context = React.useContext(MobileTabsContext)
  if (!context) {
    throw new Error("useMobileTabs must be used within MobileTabs")
  }
  return context
}

interface MobileTabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

const MobileTabs: React.FC<MobileTabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue)

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value)
    }
  }, [value])

  const handleTabChange = (tab: string) => {
    if (value === undefined) {
      setActiveTab(tab)
    }
    onValueChange?.(tab)
  }

  return (
    <MobileTabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </MobileTabsContext.Provider>
  )
}

interface MobileTabsListProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "pills" | "underline"
}

const MobileTabsList: React.FC<MobileTabsListProps> = ({
  children,
  className,
  variant = "default",
}) => {
  const variantClasses = {
    default: "bg-muted p-1 rounded-lg",
    pills: "bg-transparent gap-2",
    underline: "bg-transparent border-b border-border"
  }

  return (
    <div className={cn(
      "flex w-full",
      variantClasses[variant],
      className
    )}>
      {children}
    </div>
  )
}

interface MobileTabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

const MobileTabsTrigger: React.FC<MobileTabsTriggerProps> = ({
  value,
  children,
  className,
  disabled = false,
}) => {
  const { activeTab, setActiveTab } = useMobileTabs()
  const isActive = activeTab === value

  return (
    <button
      className={cn(
        "flex-1 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-background/50",
        className
      )}
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  )
}

interface MobileTabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

const MobileTabsContent: React.FC<MobileTabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { activeTab } = useMobileTabs()
  
  if (activeTab !== value) return null

  return (
    <div
      className={cn("mt-4 animate-fade-in", className)}
      role="tabpanel"
    >
      {children}
    </div>
  )
}

// Bottom Tab Navigation untuk mobile apps
interface MobileBottomTabsProps {
  children: React.ReactNode
  className?: string
}

const MobileBottomTabs: React.FC<MobileBottomTabsProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-40",
      "bg-background/95 backdrop-blur-xl border-t border-border",
      "safe-area-pb",
      className
    )}>
      <div className="flex items-center justify-around px-2 py-2">
        {children}
      </div>
    </div>
  )
}

interface MobileBottomTabProps {
  value: string
  icon: React.ReactNode
  label: string
  badge?: number
  className?: string
  onClick?: () => void
}

const MobileBottomTab: React.FC<MobileBottomTabProps> = ({
  value,
  icon,
  label,
  badge,
  className,
  onClick,
}) => {
  const { activeTab, setActiveTab } = useMobileTabs()
  const isActive = activeTab === value

  const handleClick = () => {
    setActiveTab(value)
    onClick?.()
  }

  return (
    <button
      className={cn(
        "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200",
        "min-w-0 flex-1 max-w-[80px]",
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
        className
      )}
      onClick={handleClick}
    >
      <div className="relative">
        <div className={cn(
          "transition-transform duration-200",
          isActive && "scale-110"
        )}>
          {icon}
        </div>
        {badge && badge > 0 && (
          <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
            {badge > 99 ? "99+" : badge}
          </div>
        )}
      </div>
      <span className={cn(
        "text-xs font-medium truncate w-full text-center",
        isActive && "font-semibold"
      )}>
        {label}
      </span>
    </button>
  )
}

export {
  MobileTabs,
  MobileTabsList,
  MobileTabsTrigger,
  MobileTabsContent,
  MobileBottomTabs,
  MobileBottomTab
}