"use client";

import React from "react";
import { formatPrice, formatDate } from "@/lib/utils/format";
import {
  ShoppingBag,
  ArrowRight,
  Package,
  Clock,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { OrderWithItems } from "@/types";
import { ROUTES } from "@/lib/utils/constants/routes";

interface OrderHistoryProps {
  orders: OrderWithItems[];
}

export function OrderHistory({ orders }: Readonly<OrderHistoryProps>) {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-950/60 backdrop-blur-md border border-slate-800/80 p-8 gap-5">
        <div className="h-14 w-14 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
          <ShoppingBag className="h-7 w-7 opacity-50" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Aucune commande enregistrée
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
            Vous n&apos;avez pas encore passé de commande sur Velure. Parcourez nos collections exclusives.
          </p>
          <Link href={ROUTES.DASHBOARD.CATALOGUE}>
            <Button className="h-9 px-6 font-semibold text-xs bg-white text-slate-950 hover:bg-slate-200">
              Découvrir nos produits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => {
        const isDelivered = order.statut === "LIVRE";
        const isShipped = order.statut === "EXPEDIE";

        return (
          <div
            key={order.id}
            className="border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-6 flex flex-col gap-5 transition-all hover:border-slate-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                  <Package className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">
                    Commande #{order.id.slice(0, 8)}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(new Date(order.createdAt))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "px-2.5 py-0.5 text-[10px] font-medium border rounded-sm",
                    isDelivered
                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/50"
                      : isShipped
                        ? "bg-sky-950/40 text-sky-400 border-sky-800/50"
                        : "bg-amber-950/40 text-amber-400 border-amber-800/50",
                  )}
                >
                  {order.statut}
                </span>

                <Link href={ROUTES.DASHBOARD.ORDER_DETAIL(order.id)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 text-xs border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Détails
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Articles</span>
                <span className="text-xs font-semibold text-white">
                  {order.orderItems?.length || 0} article(s) commandé(s)
                </span>
              </div>

              <div className="flex flex-col sm:text-right">
                <span className="text-xs text-slate-400">Total réglé</span>
                <span className="text-base font-bold text-white tabular-nums">
                  {formatPrice(Number(order.total))}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
