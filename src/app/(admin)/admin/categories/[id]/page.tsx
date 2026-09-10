import React from 'react'
import { notFound } from 'next/navigation'
import prisma from "@/lib/prisma/client"
import { CategoryForm } from "@/components/admin/CategoryForm/CategoryForm"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function EditCategoryPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  
  const [category, categories] = await Promise.all([
    prisma.category.findUnique({
      where: { id }
    }),
    prisma.category.findMany({
      orderBy: { nom: 'asc' }
    })
  ])

  if (!category) notFound()

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <Link href="/admin/categories" className="flex items-center gap-2 text-xs font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour aux catégories
        </Link>
        <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase">
          Modifier la <span className="text-accent italic">Catégorie</span>
        </h1>
        <p className="text-sm font-medium text-text-muted">
          ID: {category.id.slice(0, 12)}...
        </p>
      </header>

      <CategoryForm categories={categories} initialData={category} />
    </div>
  )
}
