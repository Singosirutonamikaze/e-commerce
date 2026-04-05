import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: Readonly<SpinnerProps>) {
  return (
    <output
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-accent",
        className,
      )}
      aria-live="polite"
    >
      <span className="sr-only">Chargement...</span>
    </output>
  );
}
