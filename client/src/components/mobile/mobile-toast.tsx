import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within MobileToastProvider")
  }
  return context
}

// Toast Provider
interface ToastProviderProps {
  children: React.ReactNode
  maxToasts?: number
}

export const MobileToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    }

    setToasts((prev) => {
      const updated = [newToast, ...prev].slice(0, maxToasts)
      return updated
    })

    // Auto remove toast
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }, [maxToasts])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

// Toast Container
const ToastContainer: React.FC = () => {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  )
}

// Individual Toast Item
interface ToastItemProps {
  toast: Toast
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToast()
  const [isExiting, setIsExiting] = React.useState(false)

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      removeToast(toast.id)
    }, 200)
  }

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return "border-green-200 bg-green-50 text-green-900"
      case "error":
        return "border-red-200 bg-red-50 text-red-900"
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-900"
      case "info":
        return "border-blue-200 bg-blue-50 text-blue-900"
    }
  }

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm transition-all duration-200",
        getStyles(),
        isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100",
        "animate-slide-up"
      )}
    >
      {getIcon()}
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{toast.title}</div>
        {toast.description && (
          <div className="text-sm opacity-90 mt-1">{toast.description}</div>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="text-sm font-medium underline mt-2 hover:no-underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Hook untuk kemudahan penggunaan
export const useToastHelpers = () => {
  const { addToast } = useToast()

  return {
    success: (title: string, description?: string) =>
      addToast({ type: "success", title, description }),
    error: (title: string, description?: string) =>
      addToast({ type: "error", title, description }),
    warning: (title: string, description?: string) =>
      addToast({ type: "warning", title, description }),
    info: (title: string, description?: string) =>
      addToast({ type: "info", title, description }),
  }
}