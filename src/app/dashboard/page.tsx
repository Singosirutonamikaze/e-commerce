"use client";

import { useCart } from "@/hooks/useCart/useCart";
import { DashboardHeader } from "@/components/dashboard/DashboardHome/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardHome/DashboardStats";
import { DashboardEmptyOrders } from "@/components/dashboard/DashboardHome/DashboardEmptyOrders";
import { DashboardQuickLinks } from "@/components/dashboard/DashboardHome/DashboardQuickLinks";

export default function DashboardPage() {
  const { items } = useCart();

  const totalOrders: number = 0;
  const totalSpent: number = 0;

  const calculatedCartTotal = items.reduce(
    (acc, item) => acc + item.quantite,
    0,
  );

  let cartLabel = "Panier vide";
  if (calculatedCartTotal > 0) {
    cartLabel = `${calculatedCartTotal} article${calculatedCartTotal > 1 ? "s" : ""}`;
  }

  let ordersLabel = "Aucune commande";
  if (totalOrders > 0) {
    ordersLabel = `${totalOrders} commande${totalOrders > 1 ? "s" : ""}`;
  }

  return (
    <section className="space-y-10">
      <DashboardHeader />

      <DashboardStats
        cartTotal={calculatedCartTotal}
        totalOrders={totalOrders}
        totalSpent={totalSpent}
        cartLabel={cartLabel}
        ordersLabel={ordersLabel}
      />

      {totalOrders === 0 && <DashboardEmptyOrders />}

      <DashboardQuickLinks />
    </section>
  );
}
