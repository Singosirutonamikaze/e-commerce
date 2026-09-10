"use client";

import { LogoutButtonWithModal } from "@/components/ui/LogoutModal";
import { ScannerNavLink } from "@/components/ui/ScannerNavLink";
import { ROUTES } from "@/lib/utils/constants/routes";
import {
    Heart,
    MapPin,
    Settings,
    ShoppingBag,
    User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DASHBOARD_LINKS = [
  { label: "Tableau de bord", href: ROUTES.DASHBOARD.ROOT, icon: User },
  { label: "Catalogue", href: ROUTES.DASHBOARD.CATALOGUE, icon: ShoppingBag },
  { label: "Boutique", href: ROUTES.DASHBOARD.SHOP, icon: ShoppingBag },
  { label: "Mes commandes", href: ROUTES.DASHBOARD.ORDERS, icon: ShoppingBag },
  { label: "Liste de souhaits", href: ROUTES.DASHBOARD.WISHLIST, icon: Heart },
  { label: "Mes adresses", href: ROUTES.DASHBOARD.ADDRESSES, icon: MapPin },
  {
    label: "Paramètres du profil",
    href: ROUTES.DASHBOARD.PROFILE,
    icon: Settings,
  },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-800/80 bg-slate-950 text-slate-100 md:sticky md:top-0 md:flex md:flex-col">
      <div className="flex items-center gap-3 border-b border-slate-800/80 px-6 h-16">
        <Link
          href={ROUTES.HOME}
          className="flex items-center group"
        >
          <div className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image
              src="/favicon.ico"
              alt="Velure Logo"
              width={22}
              height={22}
              className="h-5.5 w-5.5 object-contain"
            />
            <span className="font-serif text-base font-bold tracking-wider text-white">
              VELURE
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <p className="text-[11px] font-semibold text-slate-400 mb-2 px-3">
          Mon espace
        </p>
        {DASHBOARD_LINKS.map((link) => (
          <ScannerNavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </nav>

      <div className="flex flex-col gap-2.5 border-t border-slate-800/80 bg-slate-950 p-4">
        <div className="flex items-center gap-2.5 border border-slate-800/80 bg-slate-900/60 p-2.5">
          <div className="flex h-7 w-7 items-center justify-center bg-slate-800 text-slate-300">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">
              Client Velure
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-normal">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Connecté</span>
            </span>
          </div>
        </div>

        <LogoutButtonWithModal />
      </div>
    </aside>
  );
}
