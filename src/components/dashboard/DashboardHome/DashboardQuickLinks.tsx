import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  CreditCard,
  Headset,
  ArrowRight,
} from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";

const quickLinks = [
  {
    title: "Mes commandes",
    description: "Suivre mes livraisons et factures",
    href: ROUTES.DASHBOARD.ORDERS,
    icon: ShoppingBag,
  },
  {
    title: "Liste de souhaits",
    description: "Accéder à mes articles enregistrés",
    href: ROUTES.DASHBOARD.WISHLIST,
    icon: Heart,
  },
  {
    title: "Carnet d'adresses",
    description: "Gérer mes lieux de livraison",
    href: ROUTES.DASHBOARD.ADDRESSES,
    icon: MapPin,
  },
  {
    title: "Paramètres du compte",
    description: "Modifier mes informations personnelles",
    href: ROUTES.DASHBOARD.PROFILE,
    icon: Settings,
  },
  {
    title: "Catalogue de la boutique",
    description: "Découvrir les nouvelles collections",
    href: ROUTES.DASHBOARD.CATALOGUE,
    icon: CreditCard,
  },
  {
    title: "Assistance & Support",
    description: "Contacter le service client",
    href: ROUTES.DASHBOARD.SUPPORT,
    icon: Headset,
  },
];

/**
 * The `DashboardQuickLinks` component renders a set of quick access links for the dashboard. Each link is represented as a card with an icon, title, description, and a navigation arrow.
 * 
 * @param {void} The props for the component (currently none).
 * @returns The `DashboardQuickLinks` component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */

export function DashboardQuickLinks() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xs font-semibold text-white">
          Services et raccourcis
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex flex-col justify-between rounded-sm border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-5 transition-all hover:border-slate-700 hover:bg-slate-900/40"
          >
            <div>
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-sm bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-white transition-colors">
                <item.icon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-slate-200 transition-colors">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400 font-normal">
                {item.description}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
              <span>Accéder</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
