'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/utils/constants/routes';
import { logout } from '@/lib/actions/user.actions';

const ACCOUNT_LINKS = [
  { label: 'Tableau de bord', href: ROUTES.ACCOUNT.ROOT, icon: User },
  { label: 'Mes Commandes', href: ROUTES.ACCOUNT.ORDERS, icon: ShoppingBag },
  { label: 'Liste de souhaits', href: ROUTES.ACCOUNT.WISHLIST, icon: Heart },
  { label: 'Mes Adresses', href: ROUTES.ACCOUNT.ADDRESSES, icon: MapPin },
  { label: 'Mon Profil', href: ROUTES.ACCOUNT.PROFILE, icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8">
      <div className="bg-surface rounded-3xl p-6 border border-border shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-full bg-accent-light flex items-center justify-center text-accent">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">Mon Compte</h3>
            <p className="text-xs text-text-hint font-medium">Gérer vos informations</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {ACCOUNT_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "text-text-muted hover:bg-surface-alt hover:text-text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-text-hint group-hover:text-accent")} />
                  <span className="text-sm font-bold tracking-tight">{link.label}</span>
                </div>
                {!isActive && <ChevronRight className="h-4 w-4 text-text-hint opacity-0 group-hover:opacity-100 transition-all" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-border">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-danger hover:bg-danger-bg transition-colors group"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-bold tracking-tight">Déconnexion</span>
            </button>
          </form>
        </div>
      </div>

      <div className="bg-accent-light rounded-3xl p-6 border border-accent/10">
        <h4 className="text-sm font-black text-accent uppercase tracking-widest mb-2">Besoin d&apos;aide ?</h4>
        <p className="text-xs text-accent/80 font-medium leading-relaxed mb-4">
          Notre équipe de support est là pour vous aider avec vos commandes et questions.
        </p>
        <Link href={ROUTES.ACCOUNT.SUPPORT}>
          <button className="text-xs font-black text-accent underline underline-offset-4 hover:text-accent-hover transition-colors">
            Ouvrir un ticket →
          </button>
        </Link>
      </div>
    </aside>
  );
}
