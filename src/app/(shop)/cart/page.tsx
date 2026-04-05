'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart/useCart';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { CartSummary } from '@/components/cart/CartSummary/CartSummary';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function CartPage() {
  const { items, isEmpty, clearCart, itemCount } = useCart();

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Link href={ROUTES.PRODUCTS} className="flex items-center gap-2 text-sm font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2">
              <ArrowLeft className="h-4 w-4" />
              Continuer mes achats
            </Link>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary uppercase">
              Mon Panier <span className="text-accent italic">Velure</span>
            </h1>
            <p className="text-text-muted font-medium">
              Vérifiez vos articles avant de finaliser votre commande premium.
            </p>
          </div>
          
          <div className="bg-surface border border-border px-6 py-3 rounded-2xl shadow-sm">
            <span className="text-sm font-black uppercase text-text-primary tracking-widest">
              {itemCount} Articles sélectionnés
            </span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 text-center bg-surface border border-border rounded-[40px] shadow-sm"
            >
              <div className="h-24 w-24 bg-surface-alt rounded-full flex items-center justify-center mb-8 relative">
                <ShoppingBag className="h-10 w-10 text-text-hint" />
                <div className="absolute -top-1 -right-1 h-8 w-8 bg-accent rounded-full border-4 border-surface flex items-center justify-center">
                  <span className="text-white text-xs font-black">!</span>
                </div>
              </div>
              <h2 className="text-2xl font-black text-text-primary mb-4">Votre panier est vide</h2>
              <p className="text-text-muted max-w-sm mb-10 font-medium">
                Il semble que vous n&apos;ayez pas encore trouvé la pièce parfaite. 
                Explorez nos collections pour commencer.
              </p>
              <Link href={ROUTES.PRODUCTS}>
                <Button size="lg" className="h-16 px-10 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/10 group">
                  Explorer la collection
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
              {/* Items List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 flex flex-col"
              >
                <div className="flex items-center justify-between py-6 border-b border-border">
                   <h2 className="text-lg font-black text-text-primary uppercase tracking-tighter">Mes Articles</h2>
                   <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-text-hint hover:text-danger hover:bg-danger-bg rounded-xl gap-2 font-bold"
                  >
                    <Trash2 className="h-4 w-4" />
                    Vider le panier
                  </Button>
                </div>

                <div className="flex flex-col">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <CartSummary />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
