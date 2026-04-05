"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart.store";
import { useUIStore } from "@/store/ui.store";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { formatPrice } from "@/lib/utils/format";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleCheckout = () => {
    closeCartDrawer();
    if (user) {
      router.push(ROUTES.CHECKOUT);
    } else {
      router.push(ROUTES.AUTH.LOGIN);
    }
  };

  const totalItems = useMemo(() => items.reduce((acc, item) => acc + item.quantite, 0), [items]);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay - Pro Minimalist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 z-[60] bg-black/40"
          />

          {/* Drawer - Architectural Layout */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl border-l border-neutral-100"
          >
            <div className="flex h-full flex-col">
              {/* Header - System Registry */}
              <div className="flex items-center justify-between border-b border-neutral-100 p-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Récapitulatif Panier</h3>
                  <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">{totalItems} ARTICLE(S) RÉPERTORIÉ(S)</p>
                </div>
                <Button variant="ghost" size="icon" onClick={closeCartDrawer} className="h-10 w-10 rounded-sm hover:bg-neutral-50 transition-all">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Items List - High Density Pro */}
              <div className="flex-1 overflow-y-auto p-8">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center gap-6">
                    <div className="h-16 w-16 bg-neutral-50 rounded-sm flex items-center justify-center border border-neutral-100">
                      <ShoppingBag className="h-6 w-6 text-neutral-200" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <h3 className="text-sm font-bold uppercase tracking-tight text-black">Panier Vide</h3>
                       <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest max-w-[180px] leading-relaxed">
                          Aucune pièce n&apos;est actuellement indexée dans votre sélection.
                       </p>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-sm px-8 h-12 text-[10px] font-bold uppercase tracking-widest border-neutral-200 hover:border-black transition-all"
                      onClick={closeCartDrawer}
                    >
                      Explorer le Catalogue
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-6 group">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-neutral-50 border border-neutral-100">
                          <Image
                            src={item.image || "/placeholder-product.png"}
                            alt={item.nom}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-[11px] font-bold uppercase tracking-tight text-black">{item.nom}</h4>
                              <p className="text-[11px] font-bold text-black tabular-nums">{formatPrice(item.prix)}</p>
                            </div>
                            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                               PRO REF: {item.produitId.slice(-6).toUpperCase()}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center rounded-sm border border-neutral-100 bg-neutral-50 overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantite - 1)}
                                className="h-8 w-8 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all border-r border-neutral-100"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[32px] text-center text-[10px] font-bold tabular-nums">
                                {item.quantite}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantite + 1)}
                                className="h-8 w-8 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all border-l border-neutral-100"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-300 hover:text-black transition-colors"
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

              {/* Footer - Pro Summary */}
              {items.length > 0 && (
                <div className="border-t border-neutral-100 p-8 bg-neutral-50/50">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest leading-none">VALEUR TOTALE</span>
                         <span className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">TAXES & FLUX INCLUS</span>
                      </div>
                      <span className="text-xl font-bold text-black tabular-nums tracking-tighter">{formatPrice(totalPrice())}</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                       <Link href={ROUTES.CART} onClick={closeCartDrawer}>
                         <Button variant="outline" className="w-full h-12 rounded-sm text-[10px] font-bold uppercase tracking-widest border-neutral-200 hover:border-black transition-all bg-white">
                           Détails Panier
                         </Button>
                       </Link>
                       <Button 
                         onClick={handleCheckout}
                         className="w-full h-14 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] bg-black text-white hover:bg-neutral-900 transition-all flex items-center justify-center gap-3"
                       >
                         Finaliser la Commande
                         <ArrowRight className="h-3.5 w-3.5" />
                       </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
