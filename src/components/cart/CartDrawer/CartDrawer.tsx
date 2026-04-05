"use client";

import { useMemo } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
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
            className="fixed inset-0 z-60 bg-black/40"
          />

          <div className="fixed right-0 top-0 z-70 h-full w-full max-w-md border-l border-neutral-100 bg-white shadow-2xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-neutral-100 p-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                    Recapitulatif Panier
                  </h3>
                  <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
                    {totalItems} ARTICLE(S) REPERTORIE(S)
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCartDrawer}
                  title="Fermer le panier"
                  className="h-10 w-10 rounded-sm hover:bg-neutral-50 transition-all"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-neutral-100 bg-neutral-50">
                      <ShoppingBag className="h-6 w-6 text-neutral-200" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-bold uppercase tracking-tight text-black">
                        Panier Vide
                      </h3>
                      <p className="max-w-45 text-[10px] font-bold uppercase tracking-widest leading-relaxed text-neutral-400">
                        Aucune piece n est actuellement indexee dans votre
                        selection.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 h-12 rounded-sm border-neutral-200 px-8 text-[10px] font-bold uppercase tracking-widest transition-all hover:border-black"
                      onClick={closeCartDrawer}
                    >
                      Explorer le Catalogue
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {items.map((item) => (
                      <div key={item.id} className="group flex gap-6">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm border border-neutral-100 bg-neutral-50">
                          <Image
                            src={item.image || "/placeholder-product.png"}
                            alt={item.nom}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-start justify-between">
                              <h4 className="text-[11px] font-bold uppercase tracking-tight text-black">
                                {item.nom}
                              </h4>
                              <p className="tabular-nums text-[11px] font-bold text-black">
                                {formatPrice(item.prix * item.quantite)}
                              </p>
                            </div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                              PRO REF: {item.produitId.slice(-6).toUpperCase()}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center overflow-hidden rounded-sm border border-neutral-100 bg-neutral-50">
                              <button
                                type="button"
                                title="Diminuer la quantite"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantite - 1)
                                }
                                className="flex h-8 w-8 items-center justify-center border-r border-neutral-100 text-neutral-400 transition-all hover:bg-neutral-100 hover:text-black"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-8 text-center text-[10px] font-bold tabular-nums">
                                {item.quantite}
                              </span>
                              <button
                                type="button"
                                title="Augmenter la quantite"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantite + 1)
                                }
                                className="flex h-8 w-8 items-center justify-center border-l border-neutral-100 text-neutral-400 transition-all hover:bg-neutral-100 hover:text-black"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              title="Supprimer cet article"
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-300 transition-colors hover:text-black"
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
                <div className="border-t border-neutral-100 bg-neutral-50/50 p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest leading-none text-neutral-400">
                          VALEUR TOTALE
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-300">
                          TAXES ET FLUX INCLUS
                        </span>
                      </div>
                      <span className="text-xl font-bold tracking-tighter tabular-nums text-black">
                        {formatPrice(totalPrice())}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Link href={ROUTES.CART} onClick={closeCartDrawer}>
                        <Button
                          variant="outline"
                          className="h-12 w-full rounded-sm border-neutral-200 bg-white text-[10px] font-bold uppercase tracking-widest transition-all hover:border-black"
                        >
                          Details Panier
                        </Button>
                      </Link>
                      <Button
                        onClick={handleCheckout}
                        className="flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-black text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-neutral-900"
                      >
                        Finaliser la Commande
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
