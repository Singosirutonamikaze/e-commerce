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
          "flex h-11 w-full rounded-sm border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-black transition-all placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error 
            ? "border-red-500 focus:border-red-500" 
            : "border-neutral-200 focus:border-black",
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
