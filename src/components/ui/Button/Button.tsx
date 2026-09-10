"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm",
        outline:
          "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200/60",
        ghost: "hover:bg-neutral-100/80 hover:text-neutral-900",
        link: "text-neutral-900 underline-offset-4 hover:underline tracking-normal font-semibold",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        glass:
          "bg-white/80 backdrop-blur-md border border-neutral-200/80 text-neutral-900 hover:bg-white shadow-sm",
        glow: "hidden", // Deprecated variant
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-3.5 text-[11px] rounded-md",
        lg: "h-12 px-8 text-sm",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
