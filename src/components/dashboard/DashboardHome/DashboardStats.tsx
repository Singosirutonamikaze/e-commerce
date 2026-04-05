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

export function DashboardStats({
  cartTotal,
  totalOrders,
  totalSpent,
  cartLabel,
  ordersLabel,
}: Readonly<DashboardStatsProps>) {
  const spentLabel =
    totalSpent === 0 ? "Aucune transaction" : "Depuis votre inscription";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-sm border border-neutral-200 bg-white p-6 shadow-sm hover:border-black/20 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Panier
          </h3>
          <ShoppingCart className="h-5 w-5 text-neutral-400" />
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-black">{cartTotal}</p>
          <p className="text-xs text-neutral-500">{cartLabel}</p>
          <Link
            href={ROUTES.DASHBOARD.CART}
            className="inline-flex text-xs font-bold text-black hover:text-neutral-600 transition-colors mt-2"
          >
            Voir le panier →
          </Link>
        </div>
      </div>

      <div className="rounded-sm border border-neutral-200 bg-white p-6 shadow-sm hover:border-black/20 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Commandes
          </h3>
          <CheckCircle className="h-5 w-5 text-neutral-400" />
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-black">{totalOrders}</p>
          <p className="text-xs text-neutral-500">{ordersLabel}</p>
          <Link
            href={ROUTES.DASHBOARD.ORDERS}
            className="inline-flex text-xs font-bold text-black hover:text-neutral-600 transition-colors mt-2"
          >
            Historique →
          </Link>
        </div>
      </div>

      <div className="rounded-sm border border-neutral-200 bg-white p-6 shadow-sm hover:border-black/20 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Total dépensé
          </h3>
          <TrendingUp className="h-5 w-5 text-neutral-400" />
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-black">
            {formatPrice(totalSpent)}
          </p>
          <p className="text-xs text-neutral-500">{spentLabel}</p>
        </div>
      </div>
    </div>
  );
}
