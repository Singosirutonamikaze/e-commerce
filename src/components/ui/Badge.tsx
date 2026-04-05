import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] transition-all",
  {
    variants: {
      variant: {
        default: "bg-black text-white border border-neutral-800",
        secondary: "bg-neutral-50 text-neutral-400 border border-neutral-100",
        outline: "bg-white text-black border border-neutral-200",
        success: "bg-neutral-900 text-white border border-neutral-800",
        danger: "bg-red-50 text-red-600 border border-red-100",
        warning: "bg-neutral-100 text-black border border-neutral-200",
        accent: "bg-black text-white",
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
