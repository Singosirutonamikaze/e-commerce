"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-xs font-bold tracking-[0.15em] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-neutral-800",
        outline:
          "border border-black bg-transparent text-black hover:bg-black hover:text-white",
        secondary:
          "bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-200",
        ghost: "hover:bg-neutral-100 hover:text-black",
        link: "text-black underline-offset-4 hover:underline tracking-normal font-bold",
        danger: "bg-red-600 text-white hover:bg-red-700",
        glass:
          "bg-white/90 backdrop-blur-md border border-neutral-200 text-black hover:bg-white",
        glow: "hidden", // Deprecated variant
      },
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-12 px-10 text-sm",
        icon: "h-11 w-11",
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
