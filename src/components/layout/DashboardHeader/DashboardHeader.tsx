"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Button } from "@/components/ui/Button";
import { useCartStore, useUIStore } from "@/store";

export function DashboardHeader() {
  const items = useCartStore((state) => state.items);
  const openCartDrawer = useUIStore((state) => state.openCartDrawer);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantite, 0),
    [items],
  );

  return (
    <header className="sticky top-0 z-30 mb-4 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-full items-center justify-between px-6 lg:px-8">
        <Link href={ROUTES.HOME} className="flex items-center group">
          <div className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image
              src="/favicon.ico"
              alt="Velure Logo"
              width={22}
              height={22}
              priority
              className="h-5.5 w-5.5 object-contain"
            />
            <span className="font-serif text-base font-bold tracking-wider text-white">
              VELURE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white"
            aria-label="Recherche dashboard"
            title="Recherche dashboard"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Link href={ROUTES.DASHBOARD.WISHLIST}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white"
              aria-label="Favoris"
              title="Favoris"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={openCartDrawer}
            className="relative h-8 w-8 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white"
            aria-label="Panier"
            title="Panier"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-slate-950">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
