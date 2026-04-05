import React from 'react';
import Link from 'next/link';
import { Users, ChevronRight, Mail, Calendar } from 'lucide-react';
import { getCustomers } from '@/lib/actions/user.actions';
import { formatDate } from '@/lib/utils/format';
import { ROUTES } from '@/lib/utils/constants/routes';

export const metadata = {
  title: 'Clients | Velure Admin',
  description: 'Gestion des clients',
};

export default async function CustomersAdminPage() {
  const customers = await getCustomers();
  
  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-text-primary">
            Gestion des <span className="text-accent italic">Clients</span>
          </h2>
          <p className="text-text-muted font-medium mt-1">
            Visualisez et gérez l&apos;ensemble de votre base clientèle.
          </p>
        </div>
        <div className="bg-surface-alt py-2 px-4 rounded-xl border border-border">
           <span className="font-bold text-accent">{customers.length}</span> <span className="text-sm text-text-hint font-medium">clients</span>
        </div>
      </header>
      
      <div className="bg-surface rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col">
        {customers.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-accent-light text-accent rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Aucun client</h3>
            <p className="text-text-muted max-w-md">
              Il n&apos;y a pas encore de clients inscrits sur la plateforme.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 divide-y divide-border">
            {customers.map((customer) => (
              <Link 
                href={ROUTES.ADMIN.CUSTOMER_DETAIL(customer.id)} 
                key={customer.id}
                className="p-6 flex items-center justify-between hover:bg-surface-alt/50 transition-colors group"
              >
                <div className="flex items-center gap-5">
                   <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center font-black text-lg">
                      {customer.prenom.charAt(0)}{customer.nom.charAt(0)}
                   </div>
                   <div className="flex flex-col">
                     <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors">
                        {customer.prenom} {customer.nom}
                     </h3>
                     <div className="flex items-center gap-3 text-xs font-medium text-text-hint mt-1 pl-1">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3"/> {customer.email}</span>
                        <span className="text-border">•</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {formatDate(customer.createdAt)}</span>
                     </div>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="flex flex-col items-end">
                      <p className="text-xs font-black uppercase tracking-widest text-text-hint mb-1">Commandes</p>
                      <p className="font-bold text-text-primary bg-surface-alt px-3 py-1 rounded-lg">{(customer as any)._count?.orders || 0}</p>
                   </div>
                   <ChevronRight className="h-5 w-5 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
