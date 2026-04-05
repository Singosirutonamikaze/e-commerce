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
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/utils/constants/routes';
import { logout } from '@/lib/actions/user.actions';

const ACCOUNT_LINKS = [
  { label: 'Tableau de bord', href: ROUTES.ACCOUNT.ROOT, icon: User },
  { label: 'Mes Commandes', href: ROUTES.ACCOUNT.ORDERS, icon: ShoppingBag },
  { label: 'Liste de souhaits', href: ROUTES.ACCOUNT.WISHLIST, icon: Heart },
  { label: 'Mes Adresses', href: ROUTES.ACCOUNT.ADDRESSES, icon: MapPin },
  { label: 'Configuration Profil', href: ROUTES.ACCOUNT.PROFILE, icon: Settings },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-black text-white flex flex-col border-r border-white/5 sticky top-0 hidden md:flex shrink-0">
      {/* Brand Section - Signature Logo Only */}
      <div className="p-10 pb-12 border-b border-white/5 flex flex-col gap-6 items-center md:items-start">
        <Link href={ROUTES.HOME} className="flex items-center justify-center h-10 w-10 bg-white text-black rounded-sm font-bold text-xl transition-transform hover:scale-110">
          V
        </Link>
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-2">
              <ShieldCheck className="h-3 w-3 text-neutral-500" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">ID Certifié</span>
           </div>
           <p className="text-[10px] font-bold text-white uppercase tracking-[0.4em] mt-1 pr-4">ESPACE PRIVÉ</p>
        </div>
      </div>

      {/* Navigation - High Density Pro */}
      <nav className="flex-1 px-4 py-8 flex flex-col gap-1.5 overflow-y-auto">
        {ACCOUNT_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-6 h-11 rounded-sm transition-all duration-300 group",
                isActive
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <Icon className={cn("h-4 w-4", isActive ? "text-black" : "text-neutral-500 group-hover:text-white")} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Account Management - Minimalist Registry */}
      <div className="p-6 border-t border-white/5 flex flex-col gap-4 bg-neutral-900/40">
        <div className="flex items-center gap-4 px-4 py-2 border border-white/5 rounded-sm bg-neutral-900/60">
           <div className="h-4 w-4 text-neutral-500">
              <User className="h-full w-full" />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Utilisateur</span>
              <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest leading-none mt-1">SESSION ACTIVE</span>
           </div>
        </div>
        
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center justify-between px-6 h-11 w-full rounded-sm text-neutral-400 hover:text-red-500 transition-all group"
          >
            <div className="flex items-center gap-4">
               <LogOut className="h-4 w-4 text-neutral-500 group-hover:text-red-500 transition-transform group-hover:-translate-x-1" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Fermer Session</span>
            </div>
          </button>
        </form>
      </div>
    </aside>
  );
}
