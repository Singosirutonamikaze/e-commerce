import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border bg-surface px-4 py-2 text-sm text-text-primary ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-hint focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          error 
            ? "border-danger focus-visible:ring-danger focus-visible:border-danger" 
            : "border-border focus-visible:ring-accent/20 focus-visible:border-accent",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
