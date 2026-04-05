"use client";

import React from "react";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { Eye, ArrowUpRight, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { OrderWithItems } from "@/types";
import { ROUTES } from "@/lib/utils/constants/routes";

interface OrderListProps {
  orders: OrderWithItems[];
}

function getStatusClass(statut: string): string {
  if (statut === "LIVRE") return "bg-neutral-50 border-neutral-200 text-black";
  if (statut === "ANNULE") return "bg-red-50 border-red-100 text-red-600";
  return "bg-neutral-900 border-neutral-800 text-white";
}

export function OrderList({ orders }: Readonly<OrderListProps>) {
  if (!orders || orders.length === 0) {
    return (
      <div className="py-24 text-center flex flex-col items-center gap-6 bg-neutral-50 rounded-sm border border-dashed border-neutral-200">
        <div className="h-16 w-16 bg-white rounded-sm flex items-center justify-center text-neutral-300 shadow-sm border border-neutral-100">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
            Index Vide
          </p>
          <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest leading-relaxed">
            Aucune transaction enregistrée dans le système.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white">
      <table className="w-full text-left min-w-250">
        <thead>
          <tr className="bg-neutral-50 border-b border-neutral-200">
            <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] w-1/4">
              Identification Client
            </th>
            <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] w-1/4">
              Référence
            </th>
            <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center w-1/6">
              Valeurs
            </th>
            <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center w-1/6">
              Logistique
            </th>
            <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-right w-1/6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-neutral-50/50 transition-all group"
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 bg-black text-white rounded-sm flex items-center justify-center font-bold text-[10px] border border-neutral-800">
                    {order.user.prenom[0]}
                    {order.user.nom[0]}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-[11px] font-bold text-black uppercase tracking-widest">
                      {order.user.prenom} {order.user.nom}
                    </h4>
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                      {order.user.email}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-neutral-400" />
                    <span className="text-sm font-bold tracking-tight text-black">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                    {formatDate(order.createdAt, true)}
                  </span>
                </div>
              </td>
              <td className="px-8 py-6 text-center tabular-nums">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-bold text-black">
                    {formatPrice(Number(order.total))}
                  </span>
                  <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
                    {order.orderItems.length} ARTICLES
                  </span>
                </div>
              </td>
              <td className="px-8 py-6 text-center">
                <span
                  className={`inline-flex px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm border ${getStatusClass(order.statut)}`}
                >
                  {order.statut}
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center justify-end gap-2">
                  <Link href={ROUTES.ADMIN.ORDER_DETAIL(order.id)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-sm border border-neutral-200 hover:border-black transition-all"
                    >
                      <Eye className="h-3.5 w-3.5 text-neutral-400" />
                    </Button>
                  </Link>
                  <Link href={ROUTES.ADMIN.ORDER_DETAIL(order.id)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-sm border border-neutral-200 hover:border-black transition-all"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-8 border-t border-neutral-200 bg-neutral-50 flex justify-center">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400">
          Index système certifié &bull; Flux Archivés
        </p>
      </div>
    </div>
  );
}
