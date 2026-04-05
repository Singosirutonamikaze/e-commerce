'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils/format'
import { useCart } from '@/hooks/useCart/useCart'
import { Ticket, ArrowRight, ShieldCheck, Truck } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export function CartSummary() {
  const { subTotal, itemCount } = useCart()
  const [promoCode, setPromoCode] = useState('')
  
  const shippingCost = subTotal > 150 ? 0 : 9.99
  const total = subTotal + shippingCost

  return (
    <div className="flex flex-col gap-8">
      <Card className="p-8 border-border shadow-xl rounded-3xl sticky top-32 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
        
        <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter mb-8 relative z-10">Résumé de la commande</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-text-muted">Sous-total ({itemCount} articles)</span>
            <span className="text-text-primary font-bold">{formatPrice(subTotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-text-muted">Frais de livraison</span>
            <span className={shippingCost === 0 ? "text-success font-bold" : "text-text-primary font-bold"}>
              {shippingCost === 0 ? 'Gratuit' : formatPrice(shippingCost)}
            </span>
          </div>
          
          {shippingCost > 0 && (
            <p className="text-[10px] text-text-hint font-bold uppercase tracking-widest bg-surface-alt p-2 rounded-lg text-center">
              Livraison gratuite dès {formatPrice(150)} d'achats.
            </p>
          )}
        </div>

        <hr className="border-border mb-6" />

        <div className="flex justify-between items-end mb-10">
          <span className="text-lg font-black text-text-primary uppercase tracking-tighter">Total TTC</span>
          <span className="text-3xl font-black text-accent">{formatPrice(total)}</span>
        </div>

        {/* Promo Code */}
        <div className="mb-10 group relative">
          <p className="text-xs font-black uppercase tracking-widest text-text-muted mb-3">Code Promo</p>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Input
                placeholder="Entrez votre code..."
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="pl-10 h-12 rounded-xl lowercase"
              />
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
            </div>
            <Button variant="outline" className="h-12 px-6 rounded-xl font-bold">Appliquer</Button>
          </div>
        </div>

        <Button className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/20 group">
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
      <div className="bg-surface-alt rounded-3xl p-6 border border-border flex items-center justify-between group cursor-pointer hover:border-accent/40 transition-all">
        <div>
          <h4 className="text-sm font-bold text-text-primary">Besoin d'un conseil ?</h4>
          <p className="text-xs text-text-hint font-medium">Nos conseillers sont disponibles 7j/7.</p>
        </div>
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-border text-text-muted group-hover:text-accent transition-colors">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
