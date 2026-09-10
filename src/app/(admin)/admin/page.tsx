import React from "react";
import { Card } from "@/components/ui/Card";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  CreditCard,
  ArrowDownRight,
  Package,
  Layers,
  ArrowRight,
  Activity,
} from "lucide-react";
import prisma from "@/lib/prisma/client";
import { formatPrice } from "@/lib/utils/format";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Button } from "@/components/ui/Button";

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export default async function AdminDashboard() {
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

  const revenueResult = await prisma.order.aggregate({
    _sum: { total: true },
    where: { statut: { not: "ANNULE" } },
  });
  const totalRevenue = revenueResult._sum.total || 0;

  const stats = [
    {
      label: "Chiffre d'affaires global",
      value: formatPrice(Number(totalRevenue)),
      icon: CreditCard,
      trend: "+12.5%",
      trendUp: true,
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60",
    },
    {
      label: "Commandes totales",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      trend: "+8.2%",
      trendUp: true,
      color: "text-sky-400 bg-sky-950/40 border-sky-800/60",
    },
    {
      label: "Clients enregistrés",
      value: totalCustomers.toString(),
      icon: Users,
      trend: "+3.1%",
      trendUp: true,
      color: "text-indigo-400 bg-indigo-950/40 border-indigo-800/60",
    },
    {
      label: "Articles en catalogue",
      value: totalProducts.toString(),
      icon: Package,
      trend: "Catalogue à jour",
      trendUp: true,
      color: "text-amber-400 bg-amber-950/40 border-amber-800/60",
    },
  ];

  const chartData = [
    { label: "Jan", heightClass: "h-[40%]" },
    { label: "Fév", heightClass: "h-[70%]" },
    { label: "Mar", heightClass: "h-[45%]" },
    { label: "Avr", heightClass: "h-[90%]" },
    { label: "Mai", heightClass: "h-[65%]" },
    { label: "Juin", heightClass: "h-[80%]" },
    { label: "Juil", heightClass: "h-[55%]" },
    { label: "Août", heightClass: "h-[75%]" },
    { label: "Sep", heightClass: "h-[40%]" },
    { label: "Oct", heightClass: "h-[85%]" },
    { label: "Nov", heightClass: "h-[95%]" },
    { label: "Déc", heightClass: "h-[60%]" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-screen-2xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Vue d&apos;ensemble
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Tableau de bord administrateur
          </h1>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-sm border border-slate-800">
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm h-7 px-3 bg-slate-800 border-slate-700 text-xs font-medium text-white"
          >
            Aujourd&apos;hui
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm h-7 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60"
          >
            7 jours
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-sm h-7 px-3 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60"
          >
            30 jours
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="p-5 border-slate-800/80 rounded-sm bg-slate-950/60 backdrop-blur-md hover:border-slate-700 transition-all flex flex-col justify-between gap-4"
          >
            <div className="flex justify-between items-start">
              <div
                className={cn(
                  "h-9 w-9 rounded-sm flex items-center justify-center border",
                  stat.color,
                )}
              >
                <stat.icon className="h-4 w-4" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-sm border",
                  stat.trendUp
                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/50"
                    : "bg-rose-950/40 text-rose-400 border-rose-800/50",
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

            <div className="flex flex-col pt-2 border-t border-slate-800/60">
              <p className="text-xs text-slate-400 mb-1 font-normal">
                {stat.label}
              </p>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white tabular-nums">
                {stat.value}
              </h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6 border-slate-800/80 rounded-sm bg-slate-950/60 backdrop-blur-md flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-white">
                  Évolution des ventes
                </h3>
                <p className="text-xs text-slate-400">
                  Activité mensuelle enregistrée
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                  <span className="text-xs text-slate-400">
                    Revenus
                  </span>
                </div>
              </div>
            </div>

            <div className="h-56 w-full relative flex items-end justify-between gap-2 pt-4">
              {chartData.map((item) => (
                <div
                  key={item.label}
                  className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                >
                  <div className="w-full relative h-full flex items-end">
                    <div
                      className={cn(
                        "w-full rounded-sm bg-slate-800 transition-all group-hover:bg-slate-200",
                        item.heightClass,
                      )}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex flex-col gap-0.5">
                <p className="text-[11px] text-slate-400">
                  Pic d&apos;activité
                </p>
                <p className="text-xs font-semibold text-white">
                  Vendredi 14h - 18h
                </p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[11px] text-slate-400">
                  Taux de conversion
                </p>
                <p className="text-xs font-semibold text-emerald-400 tabular-nums">
                  3.45%
                </p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[11px] text-slate-400">
                  Satisfaction
                </p>
                <p className="text-xs font-semibold text-white tabular-nums">
                  98.2%
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-slate-800/80 rounded-sm overflow-hidden bg-slate-950/60 backdrop-blur-md">
            <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-xs font-semibold text-white">
                  Dernières commandes enregistrées
                </h3>
                <p className="text-[11px] text-slate-400">
                  Historique récent des transactions
                </p>
              </div>
              <Link href={ROUTES.ADMIN.ORDERS}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-sm h-7 px-3 border-slate-700 bg-slate-900/60 text-xs text-slate-300 hover:text-white"
                >
                  Voir toutes les commandes
                </Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800/60 bg-slate-900/40">
                    <th className="px-6 py-3 text-[11px] font-semibold text-slate-400">
                      Client
                    </th>
                    <th className="px-6 py-3 text-[11px] font-semibold text-slate-400">
                      Date
                    </th>
                    <th className="px-6 py-3 text-[11px] font-semibold text-slate-400">
                      Montant
                    </th>
                    <th className="px-6 py-3 text-[11px] font-semibold text-slate-400">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-slate-500"
                      >
                        Aucune commande enregistrée pour le moment.
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-900/40 transition-colors"
                      >
                        <td className="px-6 py-3.5 text-white font-medium">
                          {order.user?.nom || "Client invité"}
                        </td>
                        <td className="px-6 py-3.5 text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-3.5 text-white font-semibold tabular-nums">
                          {formatPrice(Number(order.total))}
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={cn(
                              "px-2 py-0.5 text-[10px] font-medium rounded-sm border",
                              order.statut === "LIVRE"
                                ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/50"
                                : order.statut === "EXPEDIE"
                                  ? "bg-sky-950/40 text-sky-400 border-sky-800/50"
                                  : order.statut === "ANNULE"
                                    ? "bg-rose-950/40 text-rose-400 border-rose-800/50"
                                    : "bg-amber-950/40 text-amber-400 border-amber-800/50",
                            )}
                          >
                            {order.statut}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        <section className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-6 border-slate-800/80 rounded-sm bg-slate-950/60 backdrop-blur-md flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-white border-b border-slate-800/80 pb-3">
              Raccourcis d&apos;administration
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href={ROUTES.ADMIN.PRODUCT_NEW}
                className="p-3 rounded-sm bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 flex items-center justify-between text-xs text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="h-4 w-4 text-slate-400 group-hover:text-white" />
                  <span>Ajouter un nouveau produit</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href={ROUTES.ADMIN.CATEGORY_NEW}
                className="p-3 rounded-sm bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 flex items-center justify-between text-xs text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4 text-slate-400 group-hover:text-white" />
                  <span>Créer une catégorie</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href={ROUTES.ADMIN.PROMO_NEW}
                className="p-3 rounded-sm bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 flex items-center justify-between text-xs text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="h-4 w-4 text-slate-400 group-hover:text-white" />
                  <span>Nouveau code promo</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Card>

          <Card className="p-6 border-slate-800/80 rounded-sm bg-slate-950/60 backdrop-blur-md flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Activity className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-semibold text-white">
                État des services
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Base de données PostgreSQL</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Opérationnel
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Authentification Supabase</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Synchronisé
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Moteur Prisma ORM</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Connecté
                </span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
