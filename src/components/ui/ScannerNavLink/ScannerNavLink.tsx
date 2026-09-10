"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ScannerNavLinkProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  isCollapsed?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ScannerNavLink({
  href,
  label,
  icon: Icon,
  isCollapsed = false,
  className,
  onClick,
}: Readonly<ScannerNavLinkProps>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center h-10 px-3 transition-all duration-200 text-xs overflow-hidden",
        isActive
          ? "text-emerald-400 bg-emerald-950/20 font-semibold border border-emerald-500/40"
          : "text-slate-400 hover:text-white hover:bg-slate-900/60 font-normal border border-transparent",
        className,
      )}
    >
      {isActive && (
        <>
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-emerald-400"></span>
          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-emerald-400"></span>
          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-emerald-400"></span>
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-emerald-400"></span>
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-400/15 to-transparent scanner-beam pointer-events-none"></span>
        </>
      )}
      <div className="flex items-center gap-3 relative z-10">
        {Icon && (
          <Icon
            className={cn(
              "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
              !isCollapsed && "mr-1",
              isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white",
            )}
          />
        )}
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
