import React from 'react'
import prisma from "@/lib/prisma/client"
import { ProductForm } from "@/components/admin/ProductForm/ProductForm"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { nom: 'asc' }
  })

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <Link href="/admin/products" className="flex items-center gap-2 text-xs font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour aux produits
        </Link>
        <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase">
          Ajouter un <span className="text-accent italic">Nouveau Produit</span>
        </h1>
        <p className="text-sm font-medium text-text-muted">
          Remplissez les informations ci-dessous pour publier une nouvelle pièce d&apos;exception dans votre catalogue.
        </p>
      </header>

      <ProductForm categories={categories} />
    </div>
  )
}
