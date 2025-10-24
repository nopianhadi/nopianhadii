import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Search, X } from "lucide-react"

export interface MobileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ 
    className, 
    type = "text",
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    clearable = false,
    onClear,
    value,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type
    const hasValue = value && value.toString().length > 0

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-lg border border-border bg-background px-3 py-2 text-base transition-all duration-200",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              (rightIcon || isPassword || (clearable && hasValue)) && "pr-10",
              error && "border-destructive focus:ring-destructive",
              className
            )}
            ref={ref}
            value={value}
            {...props}
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {clearable && hasValue && onClear && (
              <button
                type="button"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                tabIndex={-1}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            
            {rightIcon && !isPassword && !(clearable && hasValue) && (
              <div className="text-muted-foreground">
                {rightIcon}
              </div>
            )}
          </div>
        </div>
        
        {(error || helperText) && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
MobileInput.displayName = "MobileInput"

// Search Input Component
interface MobileSearchInputProps extends Omit<MobileInputProps, 'leftIcon' | 'type'> {
  onSearch?: (value: string) => void
}

const MobileSearchInput = React.forwardRef<HTMLInputElement, MobileSearchInputProps>(
  ({ onSearch, onClear, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value)
      }
    }

    return (
      <MobileInput
        ref={ref}
        type="search"
        leftIcon={<Search className="w-4 h-4" />}
        clearable
        onClear={onClear}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )
  }
)
MobileSearchInput.displayName = "MobileSearchInput"

// Textarea Component
export interface MobileTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: boolean
}

const MobileTextarea = React.forwardRef<HTMLTextAreaElement, MobileTextareaProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    resize = true,
    ...props 
  }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border border-border bg-background px-3 py-2 text-base transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !resize && "resize-none",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        
        {(error || helperText) && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)
MobileTextarea.displayName = "MobileTextarea"

export { MobileInput, MobileSearchInput, MobileTextarea }