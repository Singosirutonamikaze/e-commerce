"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart/useCart";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface CartSummaryProps {
  onCheckout?: () => void;
}

export function CartSummary({ onCheckout }: Readonly<CartSummaryProps>) {
  const { subTotal, itemCount } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const shippingCost = subTotal > 100000 || subTotal === 0 ? 0 : 5000;
  const total = subTotal + shippingCost;
  const freeShippingThreshold = 100000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subTotal);
  const progressPercent = Math.min(100, (subTotal / freeShippingThreshold) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm rounded-none">
        <h2 className="text-sm font-semibold text-white tracking-tight mb-6">
          Récapitulatif de la commande
        </h2>

        <div className="space-y-3.5 mb-6 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>
              Sous-total ({itemCount} {itemCount > 1 ? "articles" : "article"})
            </span>
            <span className="font-medium text-white tabular-nums">
              {formatPrice(subTotal)}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-300">
            <span>Frais de livraison</span>
            <span
              className={
                shippingCost === 0 ? "text-emerald-400 font-medium" : "text-white tabular-nums"
              }
            >
              {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Livraison offerte dès</span>
              <span>{formatPrice(freeShippingThreshold)}</span>
            </div>
            <div className="h-1 w-full bg-slate-800 mt-2 rounded-none overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {remainingForFreeShipping > 0 && (
              <p className="text-[11px] text-slate-400 mt-1.5 text-right">
                Plus que {formatPrice(remainingForFreeShipping)} pour la livraison offerte
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-4 mb-6">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-white">
              Total
            </span>
            <span className="text-xl font-semibold text-white tabular-nums">
              {formatPrice(total)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            TVA incluse
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="promoCodeInput" className="block text-xs font-medium text-slate-400 mb-2">
            Code promo
          </label>
          <div className="flex gap-2">
            <Input
              id="promoCodeInput"
              placeholder="Code de réduction"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="h-9 rounded-none border-slate-800 bg-slate-950 text-xs text-slate-200 placeholder:text-slate-600 focus:border-slate-600"
            />
            <Button
              variant="outline"
              className="h-9 px-4 rounded-none border-slate-700 bg-slate-950 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              Appliquer
            </Button>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          className="w-full h-11 text-xs font-medium rounded-none bg-white text-slate-950 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          Passer la commande
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>

        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col gap-2.5 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Paiement sécurisé et chiffré</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="h-4 w-4 text-slate-300 shrink-0" />
            <span>Expédition soignée sous 24 à 48h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

