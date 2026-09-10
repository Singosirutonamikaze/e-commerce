import React from "react";
import Link from "next/link";
import { Users, ChevronRight, Mail, Calendar, UserCheck } from "lucide-react";
import { getCustomers } from "@/lib/actions/user";
import { formatDate } from "@/lib/utils/format";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Index Clients | Velure Admin",
  description: "Gestion de la base client professionnelle",
};

export default async function CustomersAdminPage() {
  const customers = await getCustomers();
  const customersWithOrders = customers as Array<
    (typeof customers)[number] & { _count?: { orders?: number } }
  >;

  return (
    <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
      {/* Pro Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
              Relations Clientèle
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase">
            Répertoire des clients
          </h1>
        </div>

        {/* Global Stats - Pro System Card */}
        <div className="bg-neutral-100 p-1 rounded-sm border border-neutral-200">
          <div className="bg-white px-10 py-3 border border-neutral-100 flex flex-col items-center gap-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-center">
              Total Enregistrés
            </span>
            <span className="text-xl font-bold text-black tabular-nums">
              {customers.length}
            </span>
          </div>
        </div>
      </header>

      {/* Search & Action Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400">
            <Users className="h-3.5 w-3.5" />
          </div>
          <input
            type="text"
            placeholder="RECHERCHER PAR NOM, EMAIL OU ID..."
            className="w-full h-12 pl-12 pr-6 bg-white rounded-sm border border-neutral-200 text-[10px] font-bold uppercase tracking-widest placeholder:text-neutral-400 focus:outline-none focus:border-black transition-all"
          />
        </div>
        <div className="lg:col-span-1">
          <Button
            variant="outline"
            className="w-full h-12 rounded-sm border-neutral-200 bg-white hover:border-black transition-all text-[10px] font-bold uppercase tracking-widest"
          >
            Exporter la liste
          </Button>
        </div>
      </div>

      <Card className="rounded-sm border border-neutral-200 shadow-sm overflow-hidden bg-white">
        {customers.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center gap-6 bg-neutral-50/50">
            <div className="h-16 w-16 bg-white rounded-sm flex items-center justify-center border border-neutral-200 shadow-sm text-neutral-300">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                Index Vide
              </p>
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest leading-relaxed">
                Aucun client n&apos;est encore enregistré dans le système.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 divide-y divide-neutral-100">
            {customersWithOrders.map((customer) => (
              <Link
                href={ROUTES.ADMIN.CUSTOMER_DETAIL(customer.id)}
                key={customer.id}
                className="px-8 py-6 flex items-center justify-between hover:bg-neutral-50/50 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 bg-black text-white rounded-sm flex items-center justify-center border border-neutral-800 font-bold text-xs">
                    {customer.prenom.charAt(0)}
                    {customer.nom.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">
                      {customer.prenom} {customer.nom}
                    </h3>
                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-neutral-400 mt-1">
                      <span className="flex items-center gap-2 border-b border-transparent hover:border-black transition-colors">
                        <Mail className="h-3 w-3" /> {customer.email}
                      </span>
                      <div className="h-1 w-1 rounded-full bg-neutral-200"></div>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> Inscrit le{" "}
                        {formatDate(customer.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                      Activité
                    </span>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-sm">
                      <UserCheck className="h-3 w-3 text-black" />
                      <span className="text-[9px] font-bold text-black uppercase tabular-nums">
                        {customer._count?.orders ?? 0} Commandes
                      </span>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-sm border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-black group-hover:text-black transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="p-8 border-t border-neutral-200 bg-neutral-50 flex justify-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400">
            Le système privilégie la discrétion et la sécurité des données
            client.
          </p>
        </div>
      </Card>
    </div>
  );
}
