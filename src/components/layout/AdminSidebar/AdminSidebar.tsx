"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Ticket,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/lib/utils/constants/routes";
import { ScannerNavLink } from "@/components/ui/ScannerNavLink";
import { LogoutButtonWithModal } from "@/components/ui/LogoutModal";

const ADMIN_NAV_LINKS = [
  { label: "Tableau de bord", href: ROUTES.ADMIN.ROOT, icon: LayoutDashboard },
  {
    label: "Catalogue produits",
    href: ROUTES.DASHBOARD.CATALOGUE,
    icon: Package,
  },
  { label: "Boutique en ligne", href: ROUTES.DASHBOARD.SHOP, icon: Package },
  { label: "Répertoire articles", href: ROUTES.ADMIN.PRODUCTS, icon: Layers },
  { label: "Catégories", href: ROUTES.ADMIN.CATEGORIES, icon: Layers },
  {
    label: "Commandes clients",
    href: ROUTES.ADMIN.ORDERS,
    icon: ShoppingCart,
  },
  { label: "Base clients", href: ROUTES.ADMIN.CUSTOMERS, icon: Users },
  { label: "Codes promo", href: ROUTES.ADMIN.PROMOS, icon: Ticket },
  { label: "Support & tickets", href: ROUTES.ADMIN.SUPPORT, icon: MessageSquare },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 z-40 hidden h-screen flex-col border-r border-slate-800/80 bg-slate-950 text-slate-100 transition-all duration-300 md:flex",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex h-16 items-center px-6 border-b border-slate-800/80">
        <Link
          href={ROUTES.ADMIN.ROOT}
          className="flex items-center gap-3 group"
        >
          <div className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image
              src="/favicon.ico"
              alt="Velure Admin"
              width={22}
              height={22}
              className="h-5.5 w-5.5 object-contain"
            />
            {!isCollapsed && (
              <span className="font-serif text-base font-bold tracking-wider text-white">
                VELURE
              </span>
            )}
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[11px] font-semibold text-slate-400 mb-2 px-3">
            Menu principal
          </p>
        )}

        {ADMIN_NAV_LINKS.map((link) => (
          <ScannerNavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div
        className={cn(
          "p-3 space-y-2 border-t border-slate-800/80 bg-slate-950",
          isCollapsed && "items-center",
        )}
      >
        <Link href={ROUTES.ADMIN.SETTINGS}>
          <button
            className={cn(
              "flex items-center h-9 w-full px-3 text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all text-xs",
              isCollapsed && "justify-center px-0",
            )}
          >
            <Settings
              className={cn(
                "h-4 w-4 shrink-0",
                !isCollapsed && "mr-3",
              )}
            />
            {!isCollapsed && <span>Paramètres</span>}
          </button>
        </Link>

        <LogoutButtonWithModal isCollapsed={isCollapsed} />

        {!isCollapsed && (
          <div className="p-2.5 bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <p className="text-[11px] text-slate-400">
              Session sécurisée
            </p>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-8 w-full items-center justify-center border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
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
