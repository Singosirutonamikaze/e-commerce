"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart/useCart";
import { Button } from "@/components/ui/Button";
import { CartItem as CartItemType } from "@/store/cart/cart.store";

export function CartItem({ item }: Readonly<{ item: CartItemType }>) {
  const { removeItem, updateQuantity } = useCart();
  const [imgSrc, setImgSrc] = React.useState(item.image || "/placeholder.png");

  return (
    <div className="flex flex-col sm:flex-row gap-5 py-6 border-b border-slate-800/80 group">
      <div className="relative aspect-square w-full sm:w-28 bg-slate-900 rounded-none overflow-hidden shrink-0 border border-slate-800/80">
        <Image
          src={imgSrc}
          alt={item.nom}
          fill
          onError={() => setImgSrc("/placeholder.png")}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 112px"
        />
      </div>

      <div className="flex flex-col grow justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-base font-medium text-white transition-colors">
              {item.nom}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {formatPrice(item.prix)} / unité
            </p>
          </div>
          <p className="text-base font-semibold text-white tabular-nums">
            {formatPrice(item.prix * item.quantite)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-none">
            <button
              type="button"
              aria-label="Diminuer la quantité"
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantite - 1))}
              className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-30 border-r border-slate-800"
              disabled={item.quantite <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center font-medium text-xs text-slate-200 tabular-nums">
              {item.quantite}
            </span>
            <button
              type="button"
              aria-label="Augmenter la quantité"
              onClick={() => updateQuantity(item.id, item.quantite + 1)}
              className="h-8 w-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-30 border-l border-slate-800"
              disabled={item.quantite >= item.stock}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-none gap-2 h-8 px-3 text-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Supprimer</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

