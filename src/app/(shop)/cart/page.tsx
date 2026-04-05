'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart/useCart';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { CartSummary } from '@/components/cart/CartSummary/CartSummary';
import { ROUTES } from '@/lib/utils/constants/routes';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, isEmpty, clearCart, itemCount } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoaded(true);
    };
    getUser();
  }, [supabase.auth]);

  const handleCheckout = () => {
    if (user) {
      router.push(ROUTES.CHECKOUT);
    } else {
      router.push(ROUTES.AUTH.LOGIN + `?redirect=${ROUTES.CART}`);
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Link href={ROUTES.PRODUCTS} className="flex items-center gap-2 text-sm font-bold uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2">
              <ArrowLeft className="h-4 w-4" />
              Continuer mes achats
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif text-black mb-2">
             Panier
          </h1>
          <p className="text-[10px] font-bold text-text-hint uppercase tracking-widest pl-4 border-l border-border">
             Registre des Acquisitions
          </p>
          </div>
          
          <div className="bg-surface border border-border px-6 py-3 rounded-sm shadow-sm">
            <span className="text-sm font-bold uppercase text-text-primary tracking-widest">
              {itemCount} Articles sélectionnés
            </span>
          </div>
        </header>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-32 text-center bg-surface border border-border rounded-sm shadow-sm">
              <div className="h-24 w-24 bg-surface-alt rounded-sm flex items-center justify-center mb-8 relative">
                <ShoppingBag className="h-10 w-10 text-text-hint" />
                <div className="absolute -top-1 -right-1 h-8 w-8 bg-accent rounded-sm border-4 border-surface flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Votre panier est vide</h2>
              <p className="text-text-muted max-w-sm mb-10 font-medium">
                Il semble que vous n&apos;ayez pas encore trouvé la pièce parfaite. 
                Explorez nos collections pour commencer.
              </p>
              <Link href={ROUTES.PRODUCTS}>
                <Button size="lg" className="h-16 px-10 text-lg font-bold uppercase tracking-widest rounded-sm shadow-xl shadow-accent/10 group">
                  Explorer la collection
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
              {/* Items List */}
              <div className="lg:col-span-2 flex flex-col">
                 <div className="flex items-center justify-between py-6 border-b border-border">
                    <Button 
                     variant="ghost" 
                     size="sm" 
                     onClick={clearCart}
                     className="text-text-hint hover:text-danger hover:bg-danger-bg rounded-sm gap-2 font-bold uppercase text-[9px] tracking-widest"
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

              {/* Summary */}
              <div className="lg:col-span-1">
                <CartSummary onCheckout={handleCheckout} />
              </div>
            </div>
          )}
      </div>
    </main>
  );
}
