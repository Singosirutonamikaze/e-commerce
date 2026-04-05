import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-white hover:bg-accent-hover/80",
        secondary: "border-transparent bg-surface-alt text-text-primary hover:bg-surface-alt/80",
        outline: "text-text-primary border border-border",
        success: "border-transparent bg-success-bg text-success hover:bg-success-bg/80",
        danger: "border-transparent bg-danger-bg text-danger hover:bg-danger-bg/80",
        warning: "border-transparent bg-warning-bg text-warning hover:bg-warning-bg/80",
        accent: "border-transparent bg-accent-light text-accent hover:bg-accent-light/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
