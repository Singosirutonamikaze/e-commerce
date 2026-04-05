"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { formatPrice } from "@/lib/utils/format";

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-bg shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-6 font-bold">
                <div className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-accent" />
                  <span>Votre Panier ({items.reduce((acc, item) => acc + item.quantite, 0)})</span>
                </div>
                <Button variant="ghost" size="icon" onClick={closeCartDrawer}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-surface-alt p-6">
                      <ShoppingBag className="h-12 w-12 text-text-hint" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">Votre panier est vide</h3>
                    <p className="mt-2 text-sm text-text-muted">
                      Il semble que vous n&apos;ayez pas encore ajouté de produits.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={closeCartDrawer}
                    >
                      Continuer mes achats
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-surface-alt">
                          <Image
                            src={item.image || "/placeholder-product.png"}
                            alt={item.nom}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between">
                              <h4 className="text-sm font-bold">{item.nom}</h4>
                              <p className="text-sm font-bold text-accent">{formatPrice(item.prix)}</p>
                            </div>
                            <p className="mt-1 text-xs text-text-muted">
                              Quantité: {item.quantite}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center rounded-lg border border-border">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantite - 1)}
                                className="p-1 px-2 text-text-muted hover:text-accent"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[20px] text-center text-xs font-medium">
                                {item.quantite}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantite + 1)}
                                className="p-1 px-2 text-text-muted hover:text-accent"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-text-hint hover:text-danger"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-6 bg-surface">
                  <div className="flex justify-between text-base font-bold">
                    <span>Total estimé</span>
                    <span className="text-accent">{formatPrice(totalPrice())}</span>
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    Frais de livraison calculés lors de la commande.
                  </p>
                  <Link href={ROUTES.CART} className="w-full" onClick={closeCartDrawer}>
                    <Button variant="outline" className="mt-6 w-full prose-sm rounded-lg py-3">
                      Voir le panier
                    </Button>
                  </Link>
                  <Link href={ROUTES.CHECKOUT} className="w-full" onClick={closeCartDrawer}>
                    <Button className="mt-3 w-full prose-sm rounded-lg py-3">
                      Commander maintenant
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
