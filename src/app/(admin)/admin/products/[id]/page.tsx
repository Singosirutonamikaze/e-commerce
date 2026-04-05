import { notFound } from 'next/navigation'
import prisma from "@/lib/prisma/client"
import { ProductForm } from "@/components/admin/ProductForm/ProductForm"
import { ChevronLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { getProduct } from '@/lib/actions/product.actions'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProduct(id),
    prisma.category.findMany({ orderBy: { nom: 'asc' } })
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Link href="/admin/products" className="flex items-center gap-2 text-xs font-bold uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-2 group">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour aux produits
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter text-text-primary uppercase">
            Modifier le <span className="text-accent italic">Produit</span>
            Modifier le <span className="text-accent">Produit</span>
          </h1>
          <p className="text-sm font-medium text-text-muted">
            ID: {product.id.slice(0, 12)}...
          </p>
        </div>
        <Link href={`/products/${product.slug}`} target="_blank">
          <Button variant="outline" className="rounded-sm font-bold h-10 px-6 hover:bg-accent-light hover:text-accent hover:border-accent/40 transition-all">
            Voir en boutique
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </header>

      <ProductForm categories={categories} initialData={product} />
    </div>
  )
}
