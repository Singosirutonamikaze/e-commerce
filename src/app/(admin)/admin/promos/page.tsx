import React from 'react'
import prisma from "@/lib/prisma/client"
import { formatPrice, formatDate } from "@/lib/utils/format"
import { Button } from '@/components/ui/Button'
import { Plus, Ticket, Edit3, Trash2, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

export default async function AdminPromosPage() {
  const promos = await prisma.promo.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-text-primary uppercase mb-2">
            Codes <span className="text-accent italic">Promo</span>
          </h1>
          <p className="text-sm font-medium text-text-muted">
            Gérez vos offres spéciales et stimulez vos ventes.
          </p>
        </div>
        <Link href="/admin/promos/new">
          <Button className="rounded-sm h-14 px-10 font-bold uppercase tracking-widest shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-3" />
            Nouveau Code
          </Button>
        </Link>
      </header>

      {/* Promos Table */}
      <section className="bg-surface rounded-sm border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed min-w-[900px]">
            <thead>
              <tr className="bg-surface-alt/30 border-b border-border">
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-hint tracking-widest w-1/4">Code</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-hint tracking-widest w-1/4">Réduction</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-hint tracking-widest w-1/4 text-center">Validité</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-hint tracking-widest w-1/6 text-center">Utilisations</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-text-hint tracking-widest w-1/6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.id} className="border-b border-border last:border-0 hover:bg-surface-alt/10 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 rounded-sm bg-accent-light text-accent flex items-center justify-center font-bold">
                         <Ticket className="h-5 w-5" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-text-primary tracking-widest uppercase">{promo.code}</span>
                          <Badge variant={promo.estActif ? 'success' : 'danger'} className="h-5 px-2 text-[8px] mt-1">
                             {promo.estActif ? 'ACTIF' : 'INACTIF'}
                          </Badge>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                       <span className="text-lg font-bold text-accent">
                          {promo.type === 'POURCENTAGE' ? `${Number(promo.reduction)}%` : formatPrice(Number(promo.reduction))}
                       </span>
                       <span className="text-[10px] font-bold text-text-hint uppercase tracking-widest mt-0.5">
                          Dès {formatPrice(Number(promo.montantMinimum || 0))} d'achat
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                       <span className={cn("text-xs font-bold", new Date() > promo.dateExpiration ? "text-danger" : "text-text-primary")}>
                          Jusqu'au {formatDate(promo.dateExpiration)}
                       </span>
                       <span className="text-[10px] text-text-hint font-medium uppercase tracking-widest flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date() > promo.dateExpiration ? 'Expiré' : 'En cours'}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center">
                       <span className="text-sm font-bold text-text-primary">{promo.nombreUtilisations}</span>
                       <span className="text-[10px] text-text-hint font-bold uppercase tracking-widest mt-0.5">
                          sur {promo.limiteUtilisation || '∞'}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/promos/${promo.id}`}>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-sm text-text-hint hover:text-accent hover:bg-accent-light transition-all">
                          <Edit3 className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-sm text-text-hint hover:text-danger hover:bg-danger-bg transition-all">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

import { cn } from '@/lib/utils/cn'
