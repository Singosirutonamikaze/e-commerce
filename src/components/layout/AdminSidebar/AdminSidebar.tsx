"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Ticket,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/utils/constants/routes";
import { logout } from "@/lib/actions/user.actions";

const ADMIN_NAV_LINKS = [
  { label: "Tableau de Bord", href: ROUTES.ADMIN.ROOT, icon: LayoutDashboard },
  {
    label: "Catalogue Produits",
    href: ROUTES.DASHBOARD.CATALOGUE,
    icon: Package,
  },
  { label: "Shop Dashboard", href: ROUTES.DASHBOARD.SHOP, icon: Package },
  { label: "Répertoire Admin", href: ROUTES.ADMIN.PRODUCTS, icon: Layers },
  { label: "Index Catégories", href: ROUTES.ADMIN.CATEGORIES, icon: Layers },
  {
    label: "Registre Commandes",
    href: ROUTES.ADMIN.ORDERS,
    icon: ShoppingCart,
  },
  { label: "Base Clients", href: ROUTES.ADMIN.CUSTOMERS, icon: Users },
  { label: "Promotions", href: ROUTES.ADMIN.PROMOS, icon: Ticket },
  { label: "Support Système", href: ROUTES.ADMIN.SUPPORT, icon: MessageSquare },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 z-40 hidden h-screen flex-col border-r border-white/5 bg-black text-white transition-all duration-300 md:flex shadow-2xl",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Brand - Pro Admin Identity */}
      <div className="flex h-20 items-center px-8 border-b border-white/5">
        <Link
          href={ROUTES.ADMIN.ROOT}
          className="flex items-center gap-4 group"
        >
          <div className="h-10 w-10 bg-white text-black rounded-sm flex items-center justify-center font-bold text-xl transition-transform hover:scale-110">
            V
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                Administration
              </span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-600 mt-1">
                PRO SYSTEM
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation - Sharp & Minimal */}
      <nav className="flex-1 px-3 py-10 space-y-2 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-600 mb-8 px-5 border-l border-neutral-800">
            Flux Logistique
          </p>
        )}

        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center h-11 rounded-sm px-4 transition-all duration-300",
                isActive
                  ? "bg-white text-black"
                  : "text-neutral-500 hover:text-white hover:bg-neutral-900",
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:rotate-6",
                    !isCollapsed && "mr-4",
                  )}
                />
              </div>
              {!isCollapsed && (
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] leading-none">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Pro Actions */}
      <div
        className={cn(
          "p-4 space-y-4 border-t border-white/5 bg-neutral-950/50",
          isCollapsed && "items-center",
        )}
      >
        <Link href={ROUTES.ADMIN.SETTINGS}>
          <button
            className={cn(
              "flex items-center h-10 w-full px-4 rounded-sm text-neutral-500 hover:text-white transition-all group/opt",
              isCollapsed && "justify-center px-0",
            )}
          >
            <Settings
              className={cn(
                "h-4 w-4 transition-transform group-hover/opt:rotate-90",
                !isCollapsed && "mr-4",
              )}
            />
            {!isCollapsed && (
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Protocoles
              </span>
            )}
          </button>
        </Link>

        <form action={logout}>
          <button
            type="submit"
            className={cn(
              "flex items-center h-10 w-full px-4 rounded-sm text-neutral-500 hover:text-red-500 transition-all group/out",
              isCollapsed && "justify-center px-0",
            )}
          >
            <LogOut
              className={cn(
                "h-4 w-4 transition-transform group-hover/out:-translate-x-1",
                !isCollapsed && "mr-4",
              )}
            />
            {!isCollapsed && (
              <span className="text-[9px] font-bold uppercase tracking-widest">
                Déconnexion
              </span>
            )}
          </button>
        </form>

        {/* Global Security Status */}
        {!isCollapsed && (
          <div className="mt-2 p-4 bg-neutral-900/50 rounded-sm border border-white/5 flex items-center gap-4">
            <ShieldCheck className="h-3 w-3 text-neutral-600" />
            <p className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">
              Zone Certifiée
            </p>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-10 w-full items-center justify-center rounded-sm border border-white/5 bg-neutral-900/50 text-neutral-500 hover:text-white transition-all shadow-lg"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
