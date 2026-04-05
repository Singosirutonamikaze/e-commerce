import React from 'react'
import { notFound } from 'next/navigation'
import prisma from "@/lib/prisma/client"
import { PromoForm } from "@/components/admin/PromoForm/PromoForm"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function EditPromoPage({ params }: { params: { id: string } }) {
  const { id } = await params
  
  const promo = await prisma.promo.findUnique({
    where: { id }
  })

  if (!promo) notFound()

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <Link href="/admin/promos" className="flex items-center gap-2 text-xs font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour aux promos
        </Link>
        <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase">
          Modifier le <span className="text-accent italic">Code Promo</span>
        </h1>
        <p className="text-sm font-medium text-text-muted">
          ID: {promo.id.slice(0, 12)}...
        </p>
      </header>

      <PromoForm initialData={promo} />
    </div>
  )
}
