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
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/utils/constants/routes";
import { logout } from "@/lib/actions/user.actions";

const ADMIN_NAV_LINKS = [
  { label: "Tableau de Bord", href: ROUTES.ADMIN.ROOT, icon: LayoutDashboard },
  { label: "Produits", href: ROUTES.ADMIN.PRODUCTS, icon: Package },
  { label: "Catégories", href: ROUTES.ADMIN.CATEGORIES, icon: Layers },
  { label: "Commandes", href: ROUTES.ADMIN.ORDERS, icon: ShoppingCart },
  { label: "Clients", href: ROUTES.ADMIN.CUSTOMERS, icon: Users },
  { label: "Promotions", href: ROUTES.ADMIN.PROMOS, icon: Ticket },
  { label: "Support", href: ROUTES.ADMIN.SUPPORT, icon: MessageSquare },
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 z-40 hidden h-screen flex-col border-r border-border bg-surface transition-all duration-300 md:flex",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href={ROUTES.ADMIN.ROOT} className="flex items-center space-x-2">
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tighter text-accent">VELURE ADMIN</span>
          )}
          {isCollapsed && (
            <span className="text-xl font-bold tracking-tighter text-accent">VA</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-surface-alt",
                pathname === link.href ? "bg-accent-light text-accent" : "text-text-muted hover:text-text-primary"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Toggle */}
      <div className="border-t border-border p-4 space-y-4">
        {/* Settings Button */}
        <Link href={ROUTES.ADMIN.SETTINGS}>
          <Button variant="ghost" className="w-full justify-start px-3">
            <Settings className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>Paramètres</span>}
          </Button>
        </Link>

        {/* Logout Button */}
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start px-3 text-danger hover:bg-danger-bg hover:text-danger"
          >
            <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>Déconnexion</span>}
          </Button>
        </form>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-center rounded-lg border border-border p-2 text-text-hint hover:bg-surface-alt hover:text-text-primary transition-all"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
