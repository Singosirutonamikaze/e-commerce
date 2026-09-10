"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { CartItem } from "@/components/cart/CartItem/CartItem";
import { CartSummary } from "@/components/cart/CartSummary/CartSummary";
import { ROUTES } from "@/lib/utils/constants/routes";
import { useCart } from "@/hooks/useCart/useCart";

const emptySubscribe = () => () => {};

export default function CartPage() {
  const { items, isEmpty, clearCart, itemCount } = useCart();
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const router = useRouter();

  const handleCheckout = () => {
    router.push(ROUTES.CHECKOUT);
  };

  if (!isHydrated) {
    return (
      <section className="pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-48 animate-pulse bg-slate-900/60" />
          <div className="mt-8 h-80 animate-pulse bg-slate-900/40" />
        </div>
      </section>
    );
  }

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <Link
              href={ROUTES.PRODUCTS}
              className="flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continuer mes achats
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Mon panier
            </h1>
            <p className="text-xs text-slate-400">
              {itemCount} {itemCount > 1 ? "articles sélectionnés" : "article sélectionné"}
            </p>
          </div>

          {!isEmpty && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="gap-2 rounded-none text-xs text-slate-400 hover:bg-red-500/10 hover:text-red-400 h-8 px-3 self-start sm:self-auto"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Vider le panier
            </Button>
          )}
        </header>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-none border border-slate-800/80 bg-slate-900/40 py-24 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none border border-slate-800 bg-slate-900 text-slate-500">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h2 className="mb-2 text-lg font-medium text-white">
              Votre panier est actuellement vide
            </h2>
            <p className="mb-8 max-w-sm text-xs text-slate-400 leading-relaxed">
              Explorez notre catalogue pour découvrir nos dernières collections et pièces exclusives.
            </p>
            <Link href={ROUTES.PRODUCTS}>
              <Button
                size="sm"
                className="h-10 rounded-none px-6 text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                Explorer le catalogue
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
            <div className="flex flex-col lg:col-span-2">
              <div className="flex flex-col">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <CartSummary onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

