"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/utils/constants/routes";
import { logout } from "@/lib/actions/user.actions";

const DASHBOARD_LINKS = [
  { label: "Tableau de bord", href: ROUTES.DASHBOARD.ROOT, icon: User },
  { label: "Catalogue", href: ROUTES.DASHBOARD.CATALOGUE, icon: ShoppingBag },
  { label: "Shop", href: ROUTES.DASHBOARD.SHOP, icon: ShoppingBag },
  { label: "Mes commandes", href: ROUTES.DASHBOARD.ORDERS, icon: ShoppingBag },
  { label: "Liste de souhaits", href: ROUTES.DASHBOARD.WISHLIST, icon: Heart },
  { label: "Mes adresses", href: ROUTES.DASHBOARD.ADDRESSES, icon: MapPin },
  {
    label: "Configuration profil",
    href: ROUTES.DASHBOARD.PROFILE,
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-white/5 bg-black text-white md:sticky md:top-0 md:flex md:flex-col">
      <div className="flex flex-col items-center gap-6 border-b border-white/5 p-10 pb-12 md:items-start">
        <Link
          href={ROUTES.DASHBOARD.ROOT}
          className="flex h-10 w-10 items-center justify-center rounded-sm bg-white text-xl font-bold text-black transition-transform hover:scale-110"
        >
          V
        </Link>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-neutral-500" />
            <span className="text-[9px] font-semibold tracking-[0.2em] text-neutral-500">
              ID certifie
            </span>
          </div>
          <p className="mt-1 pr-4 text-[10px] font-semibold tracking-[0.25em] text-white">
            Espace prive
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-8">
        {DASHBOARD_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex h-11 items-center justify-between rounded-sm px-6 transition-all duration-300",
                isActive
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white",
              )}
            >
              <div className="flex items-center gap-4">
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive
                      ? "text-black"
                      : "text-neutral-500 group-hover:text-white",
                  )}
                />
                <span className="text-[10px] font-bold tracking-[0.15em]">
                  {link.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-4 border-t border-white/5 bg-neutral-900/40 p-6">
        <div className="flex items-center gap-4 rounded-sm border border-white/5 bg-neutral-900/60 px-4 py-2">
          <div className="h-4 w-4 text-neutral-500">
            <User className="h-full w-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest text-white">
              Utilisateur
            </span>
            <span className="mt-1 text-[8px] font-semibold leading-none tracking-widest text-neutral-600">
              Session active
            </span>
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="group flex h-11 w-full items-center justify-between rounded-sm px-6 text-neutral-400 transition-all hover:text-red-500"
          >
            <div className="flex items-center gap-4">
              <LogOut className="h-4 w-4 text-neutral-500 transition-transform group-hover:-translate-x-1 group-hover:text-red-500" />
              <span className="text-[10px] font-bold tracking-[0.15em]">
                Fermer session
              </span>
            </div>
          </button>
        </form>
      </div>
    </aside>
  );
}
