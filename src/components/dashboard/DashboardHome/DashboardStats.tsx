import Link from "next/link";
import { CheckCircle, ShoppingCart, TrendingUp } from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";
import { formatPrice } from "@/lib/utils/format";

interface DashboardStatsProps {
  cartTotal: number;
  totalOrders: number;
  totalSpent: number;
  cartLabel: string;
  ordersLabel: string;
}

/**
 * The `DashboardStats` component displays key statistics for the user's dashboard, including the current cart total, total orders, and total spent. It provides quick access links to view the cart, order history, and shop.
 * 
 * @param cartTotal The total number of items in the user's cart.
 * @param totalOrders The total number of orders the user has placed.
 * @param totalSpent The total amount of money the user has spent.
 * @param cartLabel A label describing the current state of the cart (e.g., "Panier vide" or "3 articles").
 * @param ordersLabel A label describing the user's order history (e.g., "Aucune commande" or "5 commandes"). 
 * @returns The `DashboardStats` component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */

export function DashboardStats({
  cartTotal,
  totalOrders,
  totalSpent,
  cartLabel,
  ordersLabel,
}: Readonly<DashboardStatsProps>) {
  const spentLabel =
    totalSpent === 0 ? "Aucune transaction" : "Total cumulé";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-sm border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-5 transition-all hover:border-slate-700 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-900 border border-slate-800 text-sky-400">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <span className="text-xs text-slate-400 font-normal">
              Panier en cours
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-bold tracking-tight text-white">{cartTotal}</p>
            <p className="text-xs text-slate-400">{cartLabel}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <Link
            href={ROUTES.DASHBOARD.CART}
            className="inline-flex items-center text-xs font-semibold text-white hover:text-slate-300 transition-colors"
          >
            Consulter le panier →
          </Link>
        </div>
      </div>

      <div className="rounded-sm border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-5 transition-all hover:border-slate-700 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-900 border border-slate-800 text-emerald-400">
              <CheckCircle className="h-4 w-4" />
            </div>
            <span className="text-xs text-slate-400 font-normal">
              Historique
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-bold tracking-tight text-white">{totalOrders}</p>
            <p className="text-xs text-slate-400">{ordersLabel}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <Link
            href={ROUTES.DASHBOARD.ORDERS}
            className="inline-flex items-center text-xs font-semibold text-white hover:text-slate-300 transition-colors"
          >
            Voir mes commandes →
          </Link>
        </div>
      </div>

      <div className="rounded-sm border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-5 transition-all hover:border-slate-700 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-900 border border-slate-800 text-indigo-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="text-xs text-slate-400 font-normal">
              Dépenses
            </span>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl font-bold tracking-tight text-white">
              {formatPrice(totalSpent)}
            </p>
            <p className="text-xs text-slate-400">{spentLabel}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <Link
            href={ROUTES.DASHBOARD.SHOP}
            className="inline-flex items-center text-xs font-semibold text-white hover:text-slate-300 transition-colors"
          >
            Découvrir la boutique →
          </Link>
        </div>
      </div>
    </div>
  );
}
