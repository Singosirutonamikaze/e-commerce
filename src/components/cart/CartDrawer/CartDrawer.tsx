"use client";

import { useMemo } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { useCartStore, useUIStore } from "@/store";
import { ROUTES } from "@/lib/utils/constants/routes";
import { formatPrice } from "@/lib/utils/format";

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    closeCartDrawer();
    router.push(ROUTES.CHECKOUT);
  };

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantite, 0),
    [items],
  );

  return (
    <>
      {isCartDrawerOpen && (
        <>
          <button
            type="button"
            aria-label="Fermer le panier"
            onClick={closeCartDrawer}
            className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          <aside className="fixed right-0 top-0 z-70 h-full w-full max-w-md border-l border-slate-800/80 bg-slate-950 text-slate-100 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-5">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  Mon panier
                </h3>
                <p className="text-xs text-slate-400">
                  {totalItems} {totalItems > 1 ? "articles" : "article"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCartDrawer}
                title="Fermer le panier"
                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-900 rounded-none transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-none border border-slate-800 bg-slate-900/50 text-slate-500">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-medium text-white">
                      Votre panier est vide
                    </h4>
                    <p className="max-w-xs text-xs text-slate-400 leading-relaxed">
                      Découvrez nos collections pour ajouter vos pièces préférées.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-2 h-9 rounded-none border-slate-700 bg-slate-900/40 px-6 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
                    onClick={() => {
                      closeCartDrawer();
                      router.push(ROUTES.PRODUCTS);
                    }}
                  >
                    Découvrir le catalogue
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-slate-800/60">
                  {items.map((item) => (
                    <div key={item.id} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-none border border-slate-800/80 bg-slate-900">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.nom}
                          fill
                          sizes="80px"
                          unoptimized={item.image?.startsWith("data:")}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-0.5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-medium text-slate-200 line-clamp-1">
                              {item.nom}
                            </h4>
                            <p className="text-xs font-semibold text-white tabular-nums shrink-0">
                              {formatPrice(item.prix * item.quantite)}
                            </p>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {formatPrice(item.prix)} / unité
                          </p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-none border border-slate-800 bg-slate-900">
                            <button
                              type="button"
                              title="Diminuer la quantité"
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantite - 1))
                              }
                              className="flex h-7 w-7 items-center justify-center border-r border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-7 text-center text-xs font-medium text-slate-200 tabular-nums">
                              {item.quantite}
                            </span>
                            <button
                              type="button"
                              title="Augmenter la quantité"
                              onClick={() =>
                                updateQuantity(item.id, item.quantite + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center border-l border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            title="Supprimer"
                            onClick={() => removeItem(item.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-slate-800/80 bg-slate-900/40 p-6 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">
                    Sous-total
                  </span>
                  <span className="text-base font-semibold text-white tabular-nums">
                    {formatPrice(totalPrice())}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <Link href={ROUTES.CART} onClick={closeCartDrawer} className="w-full">
                    <Button
                      variant="outline"
                      className="h-10 w-full rounded-none border-slate-700 bg-slate-950 text-xs font-medium text-slate-200 hover:bg-slate-900 hover:text-white"
                    >
                      Voir le panier
                    </Button>
                  </Link>
                  <Button
                    onClick={handleCheckout}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-none bg-white text-xs font-medium text-slate-950 hover:bg-slate-200 transition-colors"
                  >
                    Commander
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
}
