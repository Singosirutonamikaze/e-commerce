'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils/format'
import { useCart } from '@/hooks/useCart/useCart'
import { Ticket, ArrowRight, ShieldCheck, Truck } from 'lucide-react'
import { Input } from '@/components/ui/Input'

interface CartSummaryProps {
  onCheckout?: () => void;
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const { subTotal, itemCount } = useCart()
  const [promoCode, setPromoCode] = useState('')
  
  const shippingCost = subTotal > 100000 ? 0 : 5000
  const total = subTotal + shippingCost

  return (
    <div className="flex flex-col gap-8">
      <Card className="p-8 border-border shadow-xl rounded-sm sticky top-32 overflow-hidden bg-white">
        {/* Background Structural Accent */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-neutral-50 rounded-sm -translate-y-12 translate-x-12 blur-3xl pointer-events-none"></div>
        
        <h2 className="text-xl font-bold text-text-primary uppercase tracking-tighter mb-8 relative z-10">Résumé de la commande</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-text-muted">Sous-total ({itemCount} articles)</span>
            <span className="text-text-primary font-bold">{formatPrice(subTotal)}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
            <span className="text-text-muted">Frais de livraison</span>
            <span className={shippingCost === 0 ? "text-success" : "text-text-primary"}>
              {shippingCost === 0 ? 'Exonéré (Gratuit)' : formatPrice(shippingCost)}
            </span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-dashed border-border">
             <div className="flex justify-between items-center text-[9px] font-bold text-text-hint uppercase tracking-[0.2em]">
                <span>Seuil Livraison Gratuite</span>
                <span>{formatPrice(100000)}</span>
             </div>
             {/* Simple architectural progress bar */}
             <div className="h-1 w-full bg-neutral-100 mt-2 rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-black transition-all duration-1000" 
                  style={{ width: `${Math.min((subTotal / 100000) * 100, 100)}%` }}
                ></div>
             </div>
             {subTotal < 100000 && (
               <p className="text-[8px] font-bold text-accent uppercase tracking-widest mt-2 text-center">
                  Plus que {formatPrice(100000 - subTotal)} pour la gratuité
               </p>
             )}
          </div>
        </div>

        <hr className="border-border mb-6" />

        <div className="flex justify-between items-end mb-10">
          <span className="text-lg font-bold text-text-primary uppercase tracking-tighter">Total TTC</span>
          <span className="text-3xl font-bold text-accent">{formatPrice(total)}</span>
        </div>

        {/* Promo Code */}
        <div className="mb-10 group relative">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Code Promo</p>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Input
                placeholder="Entrez votre code..."
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="pl-10 h-12 rounded-sm lowercase"
              />
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
            </div>
            <Button variant="outline" className="h-12 px-6 rounded-sm font-bold">Appliquer</Button>
          </div>
        </div>

        <Button 
          onClick={onCheckout}
          className="w-full h-16 text-lg font-bold uppercase tracking-widest rounded-sm shadow-xl shadow-accent/10 group"
        >
          Finaliser la commande
          <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Value Propositions */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-success" />
            <span className="text-xs font-bold text-text-muted tracking-tight">Paiement 100% sécurisé</span>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-accent" />
            <span className="text-xs font-bold text-text-muted tracking-tight">Expédié sous 24-48h</span>
          </div>
        </div>
      </Card>
      
      {/* Mini Banner Help */}
      <div className="bg-surface-alt rounded-sm p-6 border border-border flex items-center justify-between group cursor-pointer hover:border-accent/40 transition-all">
        <div>
          <h4 className="text-sm font-bold text-text-primary">Besoin d'un conseil ?</h4>
          <p className="text-xs text-text-hint font-medium">Nos conseillers sont disponibles 7j/7.</p>
        </div>
        <div className="h-10 w-10 flex items-center justify-center rounded-sm bg-white border border-border text-text-muted group-hover:text-accent transition-colors">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
