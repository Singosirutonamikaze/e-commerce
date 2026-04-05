'use client';

import React from 'react';
import { formatPrice, formatDate } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import { Eye, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { OrderWithItems } from '@/types';
import { ROUTES } from '@/lib/utils/constants/routes';

interface OrderListProps {
  orders: OrderWithItems[];
}

export function OrderList({ orders }: OrderListProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="py-24 text-center bg-surface-alt/20 rounded-[40px] border-2 border-dashed border-border flex flex-col items-center gap-6">
        <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-text-hint shadow-sm">
          <ShoppingBag className="h-10 w-10 opacity-20" />
        </div>
        <p className="text-sm font-bold text-text-muted tracking-tight">Aucune commande trouvée.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-3xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left table-fixed min-w-[900px]">
          <thead>
            <tr className="bg-surface-alt/30 border-b border-border">
              <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/4">Commande</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/4">Client</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/6 text-center">Total</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/6 text-center" >Statut</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface-alt/10 transition-all group">
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-text-primary tracking-tight">#{order.id.slice(0, 12)}</span>
                    <span className="text-[10px] font-bold text-text-hint uppercase tracking-widest mt-0.5">{formatDate(order.createdAt, true)}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent-light text-accent flex items-center justify-center font-black text-[10px]">
                      {order.user.prenom[0]}{order.user.nom[0]}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-sm font-black text-text-primary truncate">{order.user.prenom} {order.user.nom}</h4>
                      <span className="text-[10px] font-bold text-text-hint truncate">{order.user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-sm font-black text-text-primary">{formatPrice(Number(order.total))}</span>
                  <p className="text-[10px] text-text-hint font-bold mt-0.5 uppercase tracking-widest">{order.orderItems.length} articles</p>
                </td>
                <td className="px-8 py-6 text-center">
                  <Badge 
                    variant={
                      order.statut === 'LIVRE' ? 'success' : 
                      order.statut === 'ANNULE' ? 'danger' : 
                      order.statut === 'EXPEDIE' ? 'accent' : 
                      'warning'
                    }
                    className="h-7 px-4 rounded-full text-[10px] font-black uppercase tracking-widest"
                  >
                    {order.statut}
                  </Badge>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={ROUTES.ADMIN.ORDER_DETAIL(order.id)}>
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-text-hint hover:text-accent hover:bg-accent-light transition-all">
                        <Eye className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={ROUTES.ADMIN.ORDER_DETAIL(order.id)}>
                       <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-text-hint hover:text-accent hover:bg-accent-light transition-all">
                          <ArrowRight className="h-5 w-5" />
                       </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
