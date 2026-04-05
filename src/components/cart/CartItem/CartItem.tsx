'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/hooks/useCart/useCart';
import { Button } from '@/components/ui/Button';
import { CartItem as CartItemType } from '@/store/cart.store';

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-6 py-8 border-b border-border group">
      {/* Image */}
      <div className="relative aspect-[4/5] w-full sm:w-32 bg-surface-alt rounded-sm overflow-hidden shrink-0">
        <Image
          src={item.image || '/placeholder.png'}
          alt={item.nom}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 128px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-text-primary hover:text-accent transition-colors cursor-pointer">
            {item.nom}
          </h3>
          <p className="text-lg font-bold text-text-primary">
            {formatPrice(item.prix * item.quantite)}
          </p>
        </div>
        
        <p className="text-sm text-text-hint font-medium mb-6">
          Prix unitaire: {formatPrice(item.prix)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center bg-surface border border-border rounded-sm p-1 gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantite - 1)}
              className="h-8 w-8 p-0 rounded-sm text-text-muted hover:text-accent"
              disabled={item.quantite <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-bold text-sm">{item.quantite}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantite + 1)}
              className="h-8 w-8 p-0 rounded-sm text-text-muted hover:text-accent"
              disabled={item.quantite >= item.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-text-hint hover:text-danger hover:bg-danger-bg rounded-sm gap-2 h-10"
          >
            <Trash2 className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Supprimer</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
