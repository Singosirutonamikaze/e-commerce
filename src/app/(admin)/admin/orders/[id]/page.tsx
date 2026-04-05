import { notFound } from 'next/navigation';
import prisma from "@/lib/prisma/client";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { Badge } from '@/components/ui/Badge';
import { MapPin, Package, CreditCard, ChevronLeft, User, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { updateOrderStatus } from '@/lib/actions/order.actions';
import { OrderStatus } from '@/types';
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: { produit: { include: { images: { take: 1 } } } },
      },
      adresse: true,
      promo: true,
      user: true,
    },
  });

  if (!order) notFound();

  // Inline Server Action for status update in the admin view
  async function handleStatusChange(formData: FormData) {
    'use server';
    const newStatus = formData.get('status') as OrderStatus;
    const orderId = formData.get('orderId') as string;
    await updateOrderStatus(orderId, newStatus);
  }

  const statusOptions: OrderStatus[] = ['EN_ATTENTE', 'CONFIRME', 'EXPEDIE', 'LIVRE', 'ANNULE'];

  return (
    <div className="flex flex-col gap-10">
      <header className="mb-6 flex flex-col gap-4">
        <Link href={ROUTES.ADMIN.ORDERS} className="flex items-center gap-2 text-xs font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour à la gestion
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black text-text-primary tracking-tighter uppercase leading-tight">
              Détails <span className="text-accent italic">Commande</span>
            </h2>
            <p className="text-sm font-medium text-text-muted">
              Client: <span className="text-text-primary font-bold">{order.user.prenom} {order.user.nom}</span> • {formatDate(order.createdAt, true)}
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
              className="font-bold h-10 px-6 rounded-full uppercase tracking-widest text-[11px] shadow-sm"
             >
               {order.statut}
             </Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Status Management */}
          <section className="bg-accent-light p-8 rounded-3xl border border-accent/10 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest text-accent mb-6">Mettre à jour le statut</h3>
             <form action={handleStatusChange} className="flex flex-wrap items-center gap-4">
                <input type="hidden" name="orderId" value={order.id} />
                <select 
                  name="status" 
                  defaultValue={order.statut}
                  className="h-14 px-6 bg-white rounded-2xl border border-accent/20 text-sm font-black uppercase tracking-widest focus:ring-2 focus:ring-accent outline-none appearance-none cursor-pointer flex-grow"
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <Button type="submit" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-accent/20">
                  Enregistrer
                </Button>
             </form>
          </section>

          {/* Items List */}
          <section className="bg-surface rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-border bg-surface-alt/50 flex items-center gap-3">
              <Package className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Articles</h3>
            </div>
            <div className="flex flex-col">
              {order.orderItems.map((item) => (
                <div key={item.id} className="p-8 border-b border-border last:border-0 flex gap-6 group hover:bg-surface-alt/10 transition-all">
                  <div className="relative h-24 w-20 bg-surface-alt rounded-2xl overflow-hidden shrink-0 border border-border">
                    <Image
                      src={item.produit?.images[0]?.url || item.imageProduit || '/placeholder.png'}
                      alt={item.nomProduit}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-text-primary">{item.nomProduit}</h4>
                        <p className="text-xs font-black uppercase tracking-widest text-text-hint mt-1">ID: {item.produitId?.slice(0,8) || 'Non assigné'}</p>
                      </div>
                      <p className="text-sm font-black text-text-primary">x{item.quantite}</p>
                    </div>
                    <p className="text-lg font-black text-accent">{formatPrice(Number(item.prixUnitaire) * item.quantite)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-10">
          {/* Customer Card */}
          <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Client</h3>
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center font-black">
                     {order.user.prenom[0]}{order.user.nom[0]}
                  </div>
                  <div className="flex flex-col">
                     <p className="font-bold text-text-primary">{order.user.prenom} {order.user.nom}</p>
                     <p className="text-xs text-text-muted font-medium">Inscrit le {formatDate(order.user.createdAt)}</p>
                  </div>
               </div>
               <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-sm font-medium text-text-muted">
                     <Mail className="h-4 w-4 text-text-hint" />
                     <span>{order.user.email}</span>
                  </div>
                  {order.user.telephone && (
                    <div className="flex items-center gap-3 text-sm font-medium text-text-muted">
                       <Phone className="h-4 w-4 text-text-hint" />
                       <span>{order.user.telephone}</span>
                    </div>
                  )}
               </div>
            </div>
          </section>

          {/* Delivery Card */}
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

          {/* Summary */}
          <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary font-bold tracking-tight">Récapitulatif</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-text-muted">Sous-total</span>
                <span className="text-text-primary font-bold">{formatPrice(Number(order.sousTotal))}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-text-muted">Livraison</span>
                <span className="text-text-primary font-bold">{formatPrice(Number(order.fraisLivraison))}</span>
              </div>
              {order.montantReduction !== null && Number(order.montantReduction) > 0 && (
                <div className="flex justify-between items-center text-sm font-bold text-success">
                  <span>Réduction</span>
                  <span>-{formatPrice(Number(order.montantReduction))}</span>
                </div>
              )}
            </div>

            <hr className="border-border mb-6" />

            <div className="flex justify-between items-end">
              <span className="text-sm font-black text-text-primary uppercase tracking-tighter">Total</span>
              <span className="text-3xl font-black text-accent">{formatPrice(Number(order.total))}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
