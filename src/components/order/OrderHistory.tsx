'use client';

import React from 'react';
import { formatPrice, formatDate } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, ArrowRight, Package, CheckCircle2, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { OrderWithItems } from '@/types';
import { ROUTES } from '@/lib/utils/constants/routes';

interface OrderHistoryProps {
  orders: OrderWithItems[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-surface-alt/10 rounded-[40px] border-2 border-dashed border-border gap-6">
        <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-text-hint shadow-sm">
          <ShoppingBag className="h-10 w-10 opacity-20" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2">Aucune commande</h3>
          <p className="text-text-muted text-sm max-w-xs mb-8 font-medium leading-relaxed">
            Vous n&apos;avez pas encore passé de commande sur Velure. 
            Parcourez nos collections exclusives !
          </p>
          <Link href={ROUTES.PRODUCTS}>
            <Button className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-accent/20">
              Découvrir nos produits
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {orders.map((order) => {
        const isDelivered = order.statut === 'LIVRE';
        const isShipped = order.statut === 'EXPEDIE';
        const isCancelled = order.statut === 'ANNULE';

        return (
          <div key={order.id} className="bg-surface rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/5 hover:border-accent transition-all group duration-500">
            <div className="p-8 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-border bg-surface-alt/30">
              <div className="grid grid-cols-2 md:flex md:items-center gap-8 md:gap-14 w-full md:w-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-text-hint tracking-[0.2em] mb-2 italic">Code Commande</span>
                  <span className="text-sm font-black text-text-primary tracking-tight group-hover:text-accent transition-colors duration-300 uppercase">
                    #{order.id.slice(0, 12)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-text-hint tracking-[0.2em] mb-2 font-black">Date d&apos;achat</span>
                  <span className="text-sm font-bold text-text-primary uppercase tracking-tighter tabular-nums">{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-text-hint tracking-[0.2em] mb-2 font-black">Total TTC</span>
                  <span className="text-lg font-black text-accent">{formatPrice(Number(order.total))}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-text-hint tracking-[0.2em] mb-2 font-black">Statut</span>
                  <Badge 
                    variant={isDelivered ? "success" : isCancelled ? "danger" : isShipped ? "accent" : "warning"}
                    className="h-7 px-4 text-[9px] font-black uppercase tracking-widest rounded-full"
                  >
                    {order.statut}
                  </Badge>
                </div>
              </div>
              
              <Link href={ROUTES.ACCOUNT.ORDER_DETAIL(order.id)} className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs border-2 hover:bg-accent hover:text-white hover:border-accent transition-all flex items-center gap-3">
                   Détails
                   <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Tracking Progress Simulation */}
            <div className="p-8 sm:p-10 flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="flex-grow h-[2px] bg-border relative">
                   <div 
                    className={cn(
                      "absolute top-0 left-0 h-full bg-accent transition-all duration-1000",
                      isDelivered ? "w-full" : isShipped ? "w-2/3" : isCancelled ? "w-0" : "w-1/3"
                    )}
                   />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-text-hint tracking-widest italic opacity-60">
                   {isDelivered ? (
                     <CheckCircle2 className="h-4 w-4 text-success" />
                   ) : (
                     <Clock className="h-4 w-4 animate-spin" />
                   )}
                   <span>{isDelivered ? 'Livrée' : 'En transit'}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-2 scrollbar-hide">
                 {order.orderItems.map((item, idx: number) => (
                   <div key={idx} className="flex-shrink-0 flex items-center gap-4 bg-surface-alt/50 p-4 rounded-2xl border border-border/50 group-hover:border-accent/20 transition-all duration-500">
                      <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center border border-border shadow-sm group-hover:rotate-12 transition-transform">
                         <Package className="h-6 w-6 text-text-hint" />
                      </div>
                      <div className="flex flex-col pr-4">
                         <span className="text-[10px] font-black text-text-primary uppercase tracking-tighter max-w-[120px] truncate">{item.nomProduit}</span>
                         <span className="text-[9px] font-bold text-text-hint uppercase tracking-widest">Qty: {item.quantite}</span>
                      </div>
                   </div>
                 ))}
                 {order.orderItems.length > 3 && (
                   <div className="text-[10px] font-black uppercase text-accent tracking-widest bg-accent-light px-4 py-2 rounded-xl">
                      +{order.orderItems.length - 3} articles
                   </div>
                 )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
