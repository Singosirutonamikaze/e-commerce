"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";

export function DashboardHeader() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const openCartDrawer = useUIStore((state) => state.openCartDrawer);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantite, 0),
    [items],
  );

  return (
    <header className="sticky top-0 z-30 mb-10 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <Link
            href={ROUTES.DASHBOARD.ROOT}
            className="flex h-9 w-9 items-center justify-center rounded-sm bg-black text-lg font-bold text-white"
          >
            V
          </Link>

          <p className="hidden text-xs font-semibold tracking-[0.2em] text-neutral-500 sm:block text-style-font text-style-font-static">
            Espace dashboard
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-sm"
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
              className="h-9 w-9 rounded-sm"
              aria-label="Liste de souhaits"
              title="Liste de souhaits"
            >
              <Heart
                className={`h-4 w-4 ${pathname === ROUTES.DASHBOARD.WISHLIST ? "text-black" : "text-neutral-500"}`}
              />
            </Button>
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-sm"
            aria-label="Ouvrir le panier"
            title="Ouvrir le panier"
            onClick={openCartDrawer}
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-sm bg-black px-1 text-[9px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Button>

          <Link href={ROUTES.DASHBOARD.PROFILE}>
            <Button
              type="button"
              variant="default"
              size="sm"
              className="h-9 rounded-sm px-4 text-xs font-semibold"
            >
              <User className="mr-2 h-4 w-4" />
              Profil
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
