import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, MapPin, Settings, ArrowUpRight, Heart, ShieldCheck } from 'lucide-react';
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
    <div className="flex flex-col gap-12 max-w-5xl">
      {/* Pro Welcome Bar */}
      <Card className="p-10 border-neutral-200 shadow-sm bg-white rounded-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 h-48 w-48 bg-neutral-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="relative z-10 flex flex-col gap-5">
           <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 font-mono">ID: {dbUser.id.slice(0, 8).toUpperCase()}</span>
           </div>
           <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase leading-tight">
             Ravi de vous revoir, <br />
             <span className="text-neutral-400 italic font-medium">{dbUser.prenom} {dbUser.nom}</span>
           </h2>
           <p className="text-xs font-medium text-neutral-500 max-w-lg leading-relaxed uppercase tracking-widest mt-2 border-l border-neutral-100 pl-6">
             Gestion centralisée de vos acquisitions et préférences Système.
           </p>
        </div>
      </Card>

      {/* Pro Stat Registry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Historique Commandes", value: dbUser.orders.length, icon: ShoppingBag },
          { label: "Pièces Favorites", value: dbUser.wishlist.length, icon: Heart },
          { label: "Adresses Certifiées", value: 2, icon: MapPin }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-sm border border-neutral-100 shadow-sm flex flex-col items-center text-center group hover:border-black transition-all cursor-default">
             <div className="h-10 w-10 bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-black group-hover:text-white transition-all mb-4">
                <stat.icon className="h-4 w-4" />
             </div>
             <span className="text-2xl font-bold text-black tabular-nums mb-1">{stat.value}</span>
             <span className="text-[9px] font-bold uppercase text-neutral-400 tracking-[0.2em]">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Logic Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Activity List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           <div className="flex items-center justify-between px-1">
              <div className="flex flex-col gap-1">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Flux d&apos;activité récent</h3>
                 <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest leading-none">Actualisé en temps réel</p>
              </div>
              <Link href={ROUTES.ACCOUNT.ORDERS}>
                 <Button variant="outline" className="text-[9px] font-bold uppercase tracking-[0.2em] border-neutral-200 rounded-sm h-9 px-6 hover:border-black transition-all">Détails Complets</Button>
              </Link>
           </div>

           {dbUser.orders.length > 0 ? (
             <div className="flex flex-col gap-4">
               {dbUser.orders.map((order) => (
                 <div key={order.id} className="bg-white rounded-sm p-6 border border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:shadow-md transition-all">
                   <div className="flex items-center gap-5">
                      <div className="h-10 w-10 bg-neutral-50 text-neutral-400 border border-neutral-100 rounded-sm flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                         <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">ID: {order.id.slice(-8).toUpperCase()}</span>
                        <h4 className="text-sm font-bold text-black uppercase tracking-tight">{formatDate(order.createdAt)}</h4>
                      </div>
                   </div>
                   <div className="flex items-center gap-8">
                      <div className="flex flex-col items-end gap-1.5">
                         <span className="text-base font-bold text-black tabular-nums">{formatPrice(order.total)}</span>
                         <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-black">{order.statut}</span>
                         </div>
                      </div>
                      <Link href={ROUTES.ACCOUNT.ORDER_DETAIL(order.id)}>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-sm border border-neutral-200 hover:border-black transition-all">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </Link>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="bg-neutral-50 rounded-sm p-16 text-center border-dashed border border-neutral-200 flex flex-col items-center gap-4">
               <ShoppingBag className="h-8 w-8 text-neutral-200" />
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 leading-relaxed max-w-xs">Aucune transaction répertoriée dans le système pour cet identifiant.</p>
             </div>
           )}
        </div>

        {/* Action Sidebar - System Focus */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="flex flex-col gap-6 bg-white p-8 rounded-sm border border-neutral-200 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black border-b border-neutral-100 pb-4">Actions Système</h3>
              <div className="flex flex-col gap-3">
                 {[
                   { label: "Configuration Profil", icon: Settings, href: ROUTES.ACCOUNT.PROFILE },
                   { label: "Vérification Identité", icon: ShieldCheck, href: ROUTES.ACCOUNT.ROOT }
                 ].map((action, idx) => (
                   <Link key={idx} href={action.href}>
                     <div className="w-full h-12 bg-white border border-neutral-100 hover:border-black rounded-sm flex items-center justify-between px-4 transition-all group/btn cursor-pointer">
                        <div className="flex items-center gap-3">
                           <action.icon className="h-3.5 w-3.5 text-neutral-300 group-hover/btn:text-black transition-all" />
                           <span className="text-[9px] font-bold uppercase tracking-widest text-black">{action.label}</span>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-neutral-300 group-hover/btn:text-black transition-all" />
                     </div>
                   </Link>
                 ))}
              </div>
           </div>
           
           {/* Security Verification */}
           <div className="bg-neutral-900 p-6 rounded-sm border border-neutral-800 flex flex-col gap-4 text-center items-center">
              <div className="h-8 w-8 bg-white/5 border border-white/5 rounded-sm flex items-center justify-center text-neutral-500">
                 <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-1">
                 <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white">Chiffrement Certifié</p>
                 <p className="text-[8px] font-medium text-neutral-500 uppercase tracking-widest leading-relaxed max-w-[160px]">
                    Accès protégé par authentification multi-facteurs.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
