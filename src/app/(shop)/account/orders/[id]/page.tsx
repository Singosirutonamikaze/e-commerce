import React from 'react';
import { notFound, redirect } from 'next/navigation';
import prisma from "@/lib/prisma/client";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { Badge } from '@/components/ui/Badge';
import { Truck, MapPin, Package, CreditCard, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/utils/constants/routes';
import { createClient } from '@/lib/supabase/server';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
      adresse: true,
      promo: true,
      user: true,
    },
  });

  if (!order || order.userId !== user.id) notFound();

  return (
    <div className="flex flex-col gap-10">
      <header className="mb-6 flex flex-col gap-4">
        <Link href={ROUTES.ACCOUNT.ORDERS} className="flex items-center gap-2 text-xs font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2">
          <ChevronLeft className="h-4 w-4" />
          Retour aux commandes
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black text-text-primary tracking-tighter uppercase leading-tight">
              Détails de la <span className="text-accent italic">Commande</span>
            </h2>
            <p className="text-sm font-medium text-text-muted">
              Passée le <span className="text-text-primary font-bold">{formatDate(order.createdAt, true)}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase text-text-hint tracking-widest">#{order.id.slice(0, 12).toUpperCase()}</span>
            <Badge
              variant={
                order.statut === 'LIVRE' ? 'success' :
                  order.statut === 'ANNULE' ? 'danger' :
                    order.statut === 'EXPEDIE' ? 'accent' :
                      'warning'
              }
              className="font-bold h-8 px-4 rounded-full uppercase tracking-widest text-[10px]"
            >
              {order.statut}
            </Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: Items List */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <section className="bg-surface rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-border bg-surface-alt/50 flex items-center gap-3">
              <Package className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Articles commandés</h3>
            </div>
            <div className="flex flex-col">
              {order.orderItems.map((item) => (
                <div key={item.id} className="p-8 border-b border-border last:border-0 flex gap-6 group hover:bg-surface-alt/20 transition-all">
                  <div className="relative h-24 w-20 bg-surface-alt rounded-2xl overflow-hidden shrink-0 border border-border">
                    <Image
                      src={item.imageProduit || '/placeholder.png'}
                      alt={item.nomProduit}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h4 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">{item.nomProduit}</h4>
                      <p className="text-sm font-medium text-text-muted">Quantité: x{item.quantite}</p>
                    </div>
                    <p className="text-lg font-black text-text-primary">{formatPrice(Number(item.prixUnitaire) * item.quantite)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery Timeline / Tracking Info */}
          <section className="bg-white rounded-3xl p-8 border border-border flex flex-col sm:flex-row items-center gap-8 shadow-sm">
            <div className="h-16 w-16 bg-accent-light rounded-2xl flex items-center justify-center text-accent shrink-0">
              <Truck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-1">Suivi de livraison</h3>
              <p className="text-sm text-text-muted font-medium mb-4">
                Votre commande {order.statut === 'CONFIRME' ? 'est en préparation' : 'arrive bientôt'}.
              </p>
              <Link href={ROUTES.ACCOUNT.SUPPORT}>
                <button className="text-xs font-black text-accent border-b-2 border-accent/20 hover:border-accent transition-all pb-1 uppercase tracking-widest">
                  Besoin d&apos;aide ? →
                </button>
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar: Details & Summary */}
        <div className="lg:col-span-1 flex flex-col gap-10">
          {/* Address Card */}
          <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Livraison</h3>
            </div>
            <div className="text-sm font-medium text-text-muted leading-relaxed">
              <p className="text-text-primary font-bold mb-1">{order.adresse.prenom} {order.adresse.nom}</p>
              <p>{order.adresse.rue}</p>
              {order.adresse.complementAdresse && <p>{order.adresse.complementAdresse}</p>}
              <p>{order.adresse.codePostal} {order.adresse.ville}</p>
              <p className="text-text-primary font-bold mt-2 uppercase tracking-widest text-[10px]">{order.adresse.pays}</p>
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-24 w-24 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <CreditCard className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary font-bold tracking-tight">Récapitulatif Financier</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-text-muted">Sous-total</span>
                <span className="text-text-primary font-bold">{formatPrice(Number(order.sousTotal))}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-text-muted">Livraison</span>
                <span className={Number(order.fraisLivraison) === 0 ? "text-success font-bold" : "text-text-primary font-bold"}>
                  {Number(order.fraisLivraison) === 0 ? 'Gratuit' : formatPrice(Number(order.fraisLivraison))}
                </span>
              </div>
              {order.montantReduction !== null && Number(order.montantReduction) > 0 && (
                <div className="flex justify-between items-center text-sm font-bold text-success">
                  <span>Réduction PROMO</span>
                  <span>-{formatPrice(Number(order.montantReduction))}</span>
                </div>
              )}
            </div>

            <hr className="border-border mb-6" />

            <div className="flex justify-between items-end">
              <span className="text-sm font-black text-text-primary uppercase tracking-tighter">Total Payé</span>
              <span className="text-3xl font-black text-accent">{formatPrice(Number(order.total))}</span>
            </div>

            {order.promo && (
              <p className="mt-6 text-[10px] font-black uppercase text-success tracking-widest text-center bg-success-bg p-2 rounded-xl">
                Code utilisé: {order.promo.code}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
