"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Trash2,
  BarChart3,
  Package,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem/CartItem";
import { CartSummary } from "@/components/cart/CartSummary/CartSummary";
import { ROUTES } from "@/lib/utils/constants/routes";
import { useCart } from "@/hooks/useCart/useCart";

export default function CartPage() {
  const { items, isEmpty, clearCart, itemCount } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCheckout = () => {
    router.push(ROUTES.CHECKOUT);
  };

  const cartTotal = useMemo(
    () => items.reduce((acc, item) => acc + item.prix * item.quantite, 0),
    [items],
  );

  const atRiskItems = useMemo(
    () => items.filter((item) => item.stock - item.quantite <= 2).length,
    [items],
  );

  const saturatedItems = useMemo(
    () => items.filter((item) => item.quantite >= item.stock).length,
    [items],
  );

  const topItems = useMemo(() => {
    return [...items]
      .map((item) => ({
        ...item,
        lineTotal: item.prix * item.quantite,
      }))
      .sort((a, b) => b.lineTotal - a.lineTotal)
      .slice(0, 4);
  }, [items]);

  const getShareClass = (share: number): string => {
    if (share >= 75) return "w-3/4";
    if (share >= 50) return "w-1/2";
    if (share >= 30) return "w-1/3";
    if (share >= 15) return "w-1/4";
    if (share > 0) return "w-[12%]";
    return "w-0";
  };

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-bg px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="h-12 w-72 animate-pulse rounded-sm bg-neutral-100" />
          <div className="mt-8 h-96 animate-pulse rounded-sm bg-neutral-50" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg px-6 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <Link
              href={ROUTES.PRODUCTS}
              className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:text-accent-hover"
            >
              <ArrowLeft className="h-4 w-4" />
              Continuer mes achats
            </Link>
            <h1 className="mb-2 text-3xl font-serif text-black md:text-4xl">
              Panier
            </h1>
            <p className="border-l border-border pl-4 text-[10px] font-bold uppercase tracking-widest text-text-hint">
              Registre des acquisitions
            </p>
          </div>

          <div className="rounded-sm border border-border bg-surface px-6 py-3 shadow-sm">
            <span className="text-sm font-bold uppercase tracking-widest text-text-primary">
              {itemCount} Articles selectionnes
            </span>
          </div>
        </header>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-surface py-32 text-center shadow-sm">
            <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-sm bg-surface-alt">
              <ShoppingBag className="h-10 w-10 text-text-hint" />
              <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-sm border-4 border-surface bg-accent">
                <span className="text-xs font-bold text-white">!</span>
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-text-primary">
              Votre panier est vide
            </h2>
            <p className="mb-10 max-w-sm font-medium text-text-muted">
              Il semble que vous n&apos;ayez pas encore trouve la piece
              parfaite. Explorez nos collections pour commencer.
            </p>
            <Link href={ROUTES.PRODUCTS}>
              <Button
                size="lg"
                className="group h-16 rounded-sm px-10 text-lg font-bold uppercase tracking-widest shadow-xl shadow-accent/10"
              >
                Explorer la collection
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-3">
            <div className="flex flex-col lg:col-span-2">
              <div className="flex items-center justify-between border-b border-border py-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="gap-2 rounded-sm text-[9px] font-bold uppercase tracking-widest text-text-hint hover:bg-danger-bg hover:text-danger"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Vider le registre
                </Button>
              </div>

              <div className="flex flex-col">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="mb-6 rounded-sm border border-border bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent-light text-accent">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-primary">
                      Visualisation panier
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-hint">
                      Repartition des montants
                    </p>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-3 gap-3">
                  <div className="rounded-sm border border-border bg-surface-alt/40 p-3 text-center">
                    <Package className="mx-auto mb-1 h-4 w-4 text-text-hint" />
                    <p className="text-xs font-bold text-text-primary">
                      {items.length}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-text-hint">
                      Lignes
                    </p>
                  </div>
                  <div className="rounded-sm border border-border bg-surface-alt/40 p-3 text-center">
                    <p className="text-xs font-bold text-text-primary">
                      {itemCount}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-text-hint">
                      Unites
                    </p>
                  </div>
                  <div className="rounded-sm border border-border bg-surface-alt/40 p-3 text-center">
                    <AlertTriangle className="mx-auto mb-1 h-4 w-4 text-warning" />
                    <p className="text-xs font-bold text-text-primary">
                      {atRiskItems}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-text-hint">
                      Stock bas
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {topItems.map((item) => {
                    const share =
                      cartTotal > 0 ? (item.lineTotal / cartTotal) * 100 : 0;
                    const barClass = getShareClass(share);

                    return (
                      <div key={item.id}>
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <p className="truncate text-[10px] font-bold uppercase tracking-widest text-text-primary">
                            {item.nom}
                          </p>
                          <p className="text-[10px] font-bold text-text-hint tabular-nums">
                            {Math.round(share)}%
                          </p>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-sm bg-neutral-100">
                          <div className={`h-full bg-black ${barClass}`}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {saturatedItems > 0 && (
                  <p className="mt-4 rounded-sm border border-warning/30 bg-warning-bg p-3 text-[10px] font-bold uppercase tracking-widest text-warning">
                    {saturatedItems} article(s) ont atteint le stock maximal
                    disponible.
                  </p>
                )}
              </div>

              <CartSummary onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
