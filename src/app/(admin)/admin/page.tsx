import React from "react";
import { Card } from "@/components/ui/Card";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Activity,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import prisma from "@/lib/prisma/client";
import { formatPrice } from "@/lib/utils/format";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Button } from "@/components/ui/Button";

export default async function AdminDashboard() {
  // Récupération des stats réelles depuis Prisma
  const [totalOrders, totalProducts, totalCustomers, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { user: true },
      }),
    ]);

  // Calcul du chiffre d'affaires total
  const revenueResult = await prisma.order.aggregate({
    _sum: { total: true },
    where: { statut: { not: "ANNULE" } },
  });
  const totalRevenue = revenueResult._sum.total || 0;

  const stats = [
    {
      label: "Ventes Totales",
      value: formatPrice(Number(totalRevenue)),
      icon: CreditCard,
      trend: "+12.5%",
      trendUp: true,
      color: "text-black",
    },
    {
      label: "Commandes Flux",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      trend: "+8.2%",
      trendUp: true,
      color: "text-black",
    },
    {
      label: "Répertoire Clients",
      value: totalCustomers.toString(),
      icon: Users,
      trend: "+3.1%",
      trendUp: true,
      color: "text-black",
    },
    {
      label: "Stock Actif",
      value: totalProducts.toString(),
      icon: Package,
      trend: "Stable",
      trendUp: true,
      color: "text-neutral-400",
    },
  ];

  const chartData = [
    { label: "T1", heightClass: "h-2/5" },
    { label: "T2", heightClass: "h-[70%]" },
    { label: "T3", heightClass: "h-[45%]" },
    { label: "T4", heightClass: "h-[90%]" },
    { label: "T5", heightClass: "h-[65%]" },
    { label: "T6", heightClass: "h-4/5" },
    { label: "T7", heightClass: "h-[55%]" },
    { label: "T8", heightClass: "h-3/4" },
    { label: "T9", heightClass: "h-2/5" },
    { label: "T10", heightClass: "h-[85%]" },
    { label: "T11", heightClass: "h-[95%]" },
    { label: "T12", heightClass: "h-3/5" },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
      {/* Pro Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              Bureau Administrateur
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase">
            Analytiques Système
          </h1>
        </div>
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-sm border border-neutral-200">
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm h-9 px-6 bg-white border-neutral-200 text-[9px] font-bold uppercase tracking-widest leading-none"
          >
            Aujourd&apos;hui
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm h-9 px-6 text-[9px] font-bold uppercase tracking-widest leading-none text-neutral-400 hover:text-black hover:bg-neutral-50 transition-all"
          >
            7 Jours
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm h-9 px-6 text-[9px] font-bold uppercase tracking-widest leading-none text-neutral-400 hover:text-black hover:bg-neutral-50 transition-all"
          >
            30 Jours
          </Button>
        </div>
      </header>

      {/* Professional Stats Registry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-8 border-neutral-200 shadow-sm rounded-sm bg-white hover:border-black transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div
                  className={cn(
                    "h-10 w-10 rounded-sm flex items-center justify-center transition-all bg-neutral-50 border border-neutral-100",
                    stat.color,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 text-[9px] font-bold tracking-widest uppercase border rounded-sm",
                    stat.trendUp
                      ? "bg-neutral-50 border-neutral-200 text-black"
                      : "bg-red-50 border-red-100 text-red-600",
                  )}
                >
                  {stat.trendUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.trend}
                </div>
              </div>

              <div className="flex flex-col relative z-10 pt-2 border-t border-neutral-50">
                <p className="text-[9px] font-bold uppercase text-neutral-400 tracking-[0.2em] mb-2">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-black tabular-nums">
                  {stat.value}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Data Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sales Performance Grid */}
        <section className="lg:col-span-8 flex flex-col gap-8">
          <Card className="p-8 border-neutral-200 shadow-sm rounded-sm bg-white flex flex-col gap-10">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold tracking-tight text-black uppercase">
                  Flux de Performance
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Intégration Stripe &bull; Prisma Index
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-sm bg-black"></div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                    REVENUS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-sm bg-neutral-200"></div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                    UNITÉS
                  </span>
                </div>
              </div>
            </div>

            {/* Static Professional Chart (No motion error) */}
            <div className="h-56 w-full relative flex items-end justify-between gap-1.5">
              {chartData.map((item) => (
                <div
                  key={item.label}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <div className="w-full relative h-full flex items-end">
                    <div
                      className={cn(
                        "w-full rounded-sm bg-neutral-100 transition-all group-hover:bg-black",
                        item.heightClass,
                      )}
                    />
                  </div>
                  <span className="text-[7px] font-bold uppercase tracking-widest text-neutral-300 group-hover:text-black transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-100">
              <div className="flex flex-col gap-1">
                <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                  Pic d&apos;activité
                </p>
                <p className="text-xs font-bold text-black uppercase">
                  Hebdomadaire &bull; Ven 14h
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                  Indice de Conversion
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xs font-bold text-black tabular-nums">
                    3.45%
                  </p>
                  <span className="text-[7px] font-bold text-black bg-neutral-100 px-1 rounded-sm">
                    OPTIMAL
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                  Panier Moyen
                </p>
                <p className="text-xs font-bold text-black tabular-nums">
                  154 200 FCFA
                </p>
              </div>
            </div>
          </Card>

          {/* Recent Orders - System List */}
          <Card className="border-neutral-200 shadow-sm rounded-sm overflow-hidden bg-white">
            <div className="px-8 py-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Index Acquisitions Récentes
                </h3>
                <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                  Journalisation système
                </p>
              </div>
              <Link href={ROUTES.ADMIN.ORDERS}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-sm h-8 px-4 border-neutral-200 font-bold text-[8px] uppercase tracking-[0.2em]"
                >
                  Accéder à l&apos;archive
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-neutral-50/50">
                    <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-400 tracking-[0.3em]">
                      Client ID
                    </th>
                    <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-400 tracking-[0.3em]">
                      Timestamp
                    </th>
                    <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-400 tracking-[0.3em]">
                      Valeur
                    </th>
                    <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-400 tracking-[0.3em] text-right">
                      État Flux
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-neutral-50/50 transition-all cursor-pointer group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-8 w-8 bg-black text-white rounded-sm flex items-center justify-center font-bold text-[9px] shrink-0">
                            {order.user.prenom[0]}
                            {order.user.nom[0]}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-black uppercase tracking-widest mb-0.5">
                              {order.user.prenom} {order.user.nom}
                            </span>
                            <span className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">
                              {order.user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-[9px] font-bold uppercase tracking-widest text-neutral-400 tabular-nums">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}{" "}
                        &bull;{" "}
                        {new Date(order.createdAt).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-8 py-5 text-[11px] font-bold text-black tabular-nums">
                        {formatPrice(Number(order.total))}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="inline-flex h-6 px-3 rounded-sm border border-neutral-200 bg-neutral-50 text-[8px] font-bold uppercase tracking-widest items-center text-black">
                          {order.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 flex justify-center">
              <Link
                href={ROUTES.ADMIN.ORDERS}
                className="text-[8px] font-bold uppercase tracking-[0.4em] text-neutral-400 hover:text-black transition-colors flex items-center gap-2"
              >
                Visualiser tout le registre
                <ArrowRight className="h-2.5 w-2.5" />
              </Link>
            </div>
          </Card>
        </section>

        {/* Right Columns: Configuration & Actions */}
        <section className="lg:col-span-4 flex flex-col gap-10">
          {/* Terminal Actions */}
          <Card className="p-8 border-neutral-200 shadow-sm rounded-sm bg-white relative overflow-hidden flex flex-col gap-8">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-5">
              <div className="h-3 w-3 bg-neutral-100 rounded-sm border border-neutral-200"></div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                Console Opérations
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {[
                {
                  label: "Ajouter un Produit",
                  icon: Package,
                  href: ROUTES.ADMIN.PRODUCT_NEW,
                },
                {
                  label: "Code de Promotion",
                  icon: CreditCard,
                  href: ROUTES.ADMIN.PROMO_NEW,
                },
                {
                  label: "Assistance Système",
                  icon: Users,
                  href: ROUTES.ADMIN.SUPPORT,
                },
                {
                  label: "Paramètres Maison",
                  icon: Layers,
                  href: ROUTES.ADMIN.SETTINGS,
                },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <button className="w-full h-12 bg-white border border-neutral-100 hover:border-black rounded-sm flex items-center justify-between px-4 transition-all group/btn">
                    <div className="flex items-center gap-3">
                      <action.icon className="h-3.5 w-3.5 text-neutral-300 group-hover/btn:text-black transition-all" />
                      <span className="text-[9px] font-bold text-black uppercase tracking-widest">
                        {action.label}
                      </span>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-neutral-200 group-hover/btn:text-black transition-all" />
                  </button>
                </Link>
              ))}
            </div>
          </Card>

          {/* Metrics Registry */}
          <Card className="p-8 border-neutral-200 shadow-sm rounded-sm bg-white">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                Indicateurs Objectifs
              </h3>
              <Calendar className="h-3.5 w-3.5 text-neutral-200" />
            </div>
            <div className="space-y-8">
              {[
                {
                  label: "Objectif Chiffre mensuel",
                  current: 75,
                  goal: "50k FCFA",
                },
                {
                  label: "Acquisition de Clientèle",
                  current: 40,
                  goal: "200 Users",
                },
              ].map((goal) => (
                <div key={goal.label} className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
                      {goal.label}
                    </span>
                    <span className="text-xs font-bold text-black tabular-nums">
                      {goal.current}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-50 rounded-sm overflow-hidden border border-neutral-100">
                    <div
                      className={cn(
                        "h-full rounded-sm bg-black transition-all duration-1000",
                        goal.current >= 70 ? "w-3/4" : "w-2/5",
                      )}
                    />
                  </div>
                  <p className="text-[7px] font-bold uppercase text-neutral-300 tracking-widest text-right">
                    Cible: {goal.goal}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-neutral-900 border border-neutral-800 rounded-sm flex flex-col items-center text-center gap-2">
              <Activity className="h-4 w-4 text-neutral-500" />
              <p className="text-[8px] font-bold uppercase tracking-widest text-white">
                État Logistique
              </p>
              <p className="text-[8px] font-medium text-neutral-500 uppercase tracking-widest leading-relaxed">
                Surveillance des flux de stock en cours. <br />
                Toutes les pièces sont tracées.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
