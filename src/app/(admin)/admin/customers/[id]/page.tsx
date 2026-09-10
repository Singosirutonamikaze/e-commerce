import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCustomer } from '@/lib/actions/user'
import { formatDate, formatPrice } from '@/lib/utils/format'
import { Mail, Phone, Calendar, MapPin, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export default async function CustomerDetailsPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const customer = await getCustomer(id)
  
  if (!customer) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8 p-0 md:p-6">
      <header className="flex items-center gap-4">
        <Link href="/admin/customers" className="h-10 w-10 bg-surface rounded-sm flex items-center justify-center shadow-sm border border-border hover:scale-105 transition-transform">
          <ChevronLeft className="h-5 w-5 text-text-primary" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter text-text-primary flex items-center gap-3">
            Détails Client <span className="text-accent italic">#{customer.id.slice(0, 8)}</span>
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <section className="bg-surface rounded-sm p-8 border border-border shadow-sm flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-accent/10"></div>
             <div className="h-24 w-24 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-3xl shadow-xl mt-6 relative z-10 border-4 border-white">
                {customer.prenom.charAt(0)}{customer.nom.charAt(0)}
             </div>
             <h3 className="text-xl font-bold text-text-primary mt-4 mb-1">
                {customer.prenom} {customer.nom}
             </h3>
             <Badge variant={customer.emailVerifie ? "success" : "secondary"}>
                {customer.emailVerifie ? "Vérifié" : "Non Vérifié"}
             </Badge>
             
             <div className="w-full mt-8 flex flex-col gap-4 text-left">
               <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                 <Mail className="h-4 w-4 text-accent" /> {customer.email}
               </div>
               <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                 <Phone className="h-4 w-4 text-accent" /> {customer.telephone || 'Non renseigné'}
               </div>
               <div className="flex items-center gap-3 text-sm font-medium text-text-primary">
                 <Calendar className="h-4 w-4 text-accent" /> Inscrit le {formatDate(customer.createdAt)}
               </div>
             </div>
          </section>

          <section className="bg-surface rounded-sm p-6 border border-border shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> Carnet d&apos;adresses
            </h3>
            {customer.addresses && customer.addresses.length > 0 ? (
               <div className="flex flex-col gap-3">
                 {customer.addresses.map((addr) => (
                   <div key={addr.id} className="p-4 bg-surface-alt rounded-sm border border-border text-xs font-medium text-text-muted">
                      <p className="font-bold text-text-primary mb-1">{addr.rue}</p>
                      {addr.complementAdresse && <p>{addr.complementAdresse}</p>}
                      <p>{addr.codePostal} {addr.ville}</p>
                      <p>{addr.pays}</p>
                   </div>
                 ))}
               </div>
            ) : (
               <p className="text-xs text-text-muted font-medium italic">Aucune adresse enregistrée</p>
            )}
          </section>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
           <section className="bg-surface rounded-sm border border-border shadow-sm overflow-hidden">
             <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary flex items-center gap-2">
                  <Package className="h-4 w-4 text-accent" /> Dernières Commandes
                </h3>
             </div>
             {customer.orders && customer.orders.length > 0 ? (
                <div className="flex flex-col">
                  {customer.orders.map((order) => (
                    <Link href={`/admin/orders/${order.id}`} key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-surface-alt/50 transition-colors border-b border-border last:border-0 group">
                       <div className="flex flex-col">
                          <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                            Commande {order.id.slice(0,8)}
                          </p>
                          <p className="text-xs text-text-hint mt-1 font-medium">{formatDate(order.createdAt)}</p>
                       </div>
                       <div className="flex items-center gap-4 mt-3 sm:mt-0">
                          <Badge variant="outline">{order.statut}</Badge>
                          <p className="text-sm font-bold text-text-primary min-w-[70px] text-right">{formatPrice(Number(order.total))}</p>
                          <ChevronRight className="h-4 w-4 text-text-muted group-hover:translate-x-1 group-hover:text-accent transition-all hidden sm:block" />
                       </div>
                    </Link>
                  ))}
                </div>
             ) : (
                <div className="p-10 text-center flex flex-col items-center justify-center">
                   <Package className="h-10 w-10 text-text-hint mb-3 opacity-50" />
                   <p className="text-sm font-medium text-text-muted">Aucune commande pour ce client</p>
                </div>
             )}
           </section>
        </div>
      </div>
    </div>
  )
}
