import React from 'react';
import { Card } from '@/components/ui/Card';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
} from 'lucide-react';
import prisma from "@/lib/prisma/client";
import { formatPrice } from "@/lib/utils/format";
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function AdminDashboard() {
  // Récupération des stats réelles depuis Prisma
  const [totalOrders, totalProducts, totalCustomers, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { user: true },
    }),
  ]);

  // Calcul du chiffre d'affaires total
  const revenueResult = await prisma.order.aggregate({
    _sum: { total: true },
    where: { statut: { not: 'ANNULE' } },
  });
  const totalRevenue = revenueResult._sum.total || 0;

  const stats = [
    { label: "Chiffre d&apos;Affaires", value: formatPrice(Number(totalRevenue)), icon: CreditCard, trend: "+12.5%", trendUp: true },
    { label: "Commandes", value: totalOrders.toString(), icon: ShoppingBag, trend: "+8.2%", trendUp: true },
    { label: "Clients", value: totalCustomers.toString(), icon: Users, trend: "+3.1%", trendUp: true },
    { label: "Produits", value: totalProducts.toString(), icon: Package, trend: "Stable", trendUp: true },
  ];

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase mb-2">
          Tableau de <span className="text-accent italic">Bord</span>
        </h1>
        <p className="text-sm font-medium text-text-muted">
          Aperçu global des performances de votre boutique Velure.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-6 border-border shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 h-24 w-24 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div className={stat.trendUp ? "flex items-center text-success text-xs font-black bg-success-bg px-2 py-1 rounded-full" : "flex items-center text-danger text-xs font-black bg-danger-bg px-2 py-1 rounded-full"}>
                  {stat.trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.trend}
                </div>
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-2xl font-black text-text-primary tracking-tight">{stat.value}</span>
                <span className="text-[10px] font-black uppercase text-text-hint tracking-widest mt-1">{stat.label}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Orders Table */}
        <section className="lg:col-span-2">
          <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
            <div className="px-8 py-6 border-b border-border bg-surface-alt/50 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Dernières Commandes</h3>
              <Link href={ROUTES.ADMIN.ORDERS}>
                <button className="text-xs font-black text-accent hover:underline uppercase tracking-widest">Voir tout</button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-alt/30">
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-text-hint tracking-widest">Client</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-text-hint tracking-widest">Date</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-text-hint tracking-widest">Total</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-text-hint tracking-widest">Statut</th>
                  </tr>
                </thead>
                <tbody>
                   {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface-alt/20 transition-all cursor-pointer group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-accent-light text-accent flex items-center justify-center font-black text-[10px]">
                            {order.user.prenom[0]}{order.user.nom[0]}
                          </div>
                          <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">{order.user.prenom} {order.user.nom}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-text-muted">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-text-primary">
                        {formatPrice(Number(order.total))}
                      </td>
                      <td className="px-8 py-5">
                        <div className="inline-flex h-6 px-3 rounded-full bg-warning-bg text-warning text-[10px] font-black uppercase items-center">
                          {order.statut}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Quick Links / Tasks */}
        <section className="lg:col-span-1 flex flex-col gap-6">
           <Card className="p-8 border-border shadow-sm rounded-3xl bg-accent text-white">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-80">Actions Rapides</h3>
              <div className="flex flex-col gap-3">
                <Link href={ROUTES.ADMIN.PRODUCT_NEW}>
                  <button className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between px-4 transition-all text-sm font-bold">
                    <span>Ajouter un produit</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href={ROUTES.ADMIN.PROMO_NEW}>
                  <button className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between px-4 transition-all text-sm font-bold">
                    <span>Créer un code promo</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href={ROUTES.ADMIN.SUPPORT}>
                  <button className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-between px-4 transition-all text-sm font-bold">
                    <span>Voir les messages support</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
           </Card>

           <Card className="p-8 border-border shadow-sm rounded-3xl">
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary mb-6">Objectifs Journaliers</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold text-text-muted uppercase tracking-tighter">
                    <span>Objectif Ventes</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-accent rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold text-text-muted uppercase tracking-tighter">
                    <span>Nouveaux Clients</span>
                    <span>40%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
                    <div className="h-full w-2/5 bg-accent rounded-full"></div>
                  </div>
                </div>
              </div>
           </Card>
        </section>
      </div>
    </div>
  );
}
