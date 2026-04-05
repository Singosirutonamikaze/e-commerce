import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Star, MapPin, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 3
      },
      wishlist: {
        take: 4,
        include: { produit: { include: { images: true } } }
      }
    }
  })

  if (!dbUser) return null

  return (
    <div className="flex flex-col gap-10">
      {/* Welcome Card */}
      <Card className="p-10 border-accent/10 bg-accent-light rounded-[40px] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-accent/5 rounded-full -translate-y-10 translate-x-10 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-text-primary tracking-tighter mb-2">
            Bonjour, {dbUser.prenom} !
          </h2>
          <p className="text-text-muted font-medium max-w-md">
            Ravi de vous revoir. Voici un aperçu de votre activité récente et de vos préférences Velure.
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <span className="text-3xl font-black text-text-primary mb-1">{dbUser.orders.length}</span>
          <span className="text-xs font-black uppercase text-text-hint tracking-widest">Commandes</span>
        </div>
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center mb-4">
            <Star className="h-6 w-6" />
          </div>
          <span className="text-3xl font-black text-text-primary mb-1">{dbUser.wishlist.length}</span>
          <span className="text-xs font-black uppercase text-text-hint tracking-widest">Coups de cœur</span>
        </div>
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6" />
          </div>
          <span className="text-3xl font-black text-text-primary mb-1">2</span>
          <span className="text-xs font-black uppercase text-text-hint tracking-widest">Adresses</span>
        </div>
      </div>

      {/* Recent Orders */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">
            Dernières Commandes
          </h3>
          <Link href={ROUTES.ACCOUNT.ORDERS} className="text-sm font-bold text-accent hover:underline">
            Voir tout
          </Link>
        </div>

        {dbUser.orders.length > 0 ? (
          <div className="flex flex-col gap-4">
            {dbUser.orders.map((order) => (
              <div key={order.id} className="bg-surface rounded-2xl p-6 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-accent/40 transition-all">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-black uppercase text-text-hint">N° {order.id.slice(0, 8)}</p>
                  <p className="text-sm font-bold text-text-primary">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-lg font-black text-text-primary">{formatPrice(order.total)}</span>
                  <div className="h-8 px-4 rounded-full bg-warning-bg text-warning text-xs font-black flex items-center">
                    {order.statut}
                  </div>
                  <Link href={ROUTES.ACCOUNT.ORDER_DETAIL(order.id)}>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl group-hover:bg-accent group-hover:text-white transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface-alt rounded-2xl p-12 text-center border-dashed border-2 border-border">
            <p className="text-sm font-bold text-text-muted">Aucune commande pour le moment.</p>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href={ROUTES.ACCOUNT.PROFILE}>
          <div className="bg-white p-6 rounded-3xl border border-border flex items-center justify-between hover:border-accent group transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-surface-alt flex items-center justify-center text-text-muted group-hover:bg-accent-light group-hover:text-accent transition-all">
                <Settings className="h-6 w-6" />
              </div>
              <span className="font-bold text-text-primary">Gérer mon profil</span>
            </div>
            <ArrowRight className="h-5 w-5 text-text-hint group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        <Link href={ROUTES.ACCOUNT.SUPPORT}>
          <div className="bg-white p-6 rounded-3xl border border-border flex items-center justify-between hover:border-accent group transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-surface-alt flex items-center justify-center text-text-muted group-hover:bg-accent-light group-hover:text-accent transition-all">
                <Star className="h-6 w-6" />
              </div>
              <span className="font-bold text-text-primary">Contacter le support</span>
            </div>
            <ArrowRight className="h-5 w-5 text-text-hint group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>
    </div>
  )
}
