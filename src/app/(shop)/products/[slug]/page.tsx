import { notFound } from 'next/navigation'
import { ProductImages } from "@/components/product/ProductImages/ProductImages"
import { AddToCartButton } from "@/components/cart/AddToCartButton/AddToCartButton"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils/format"
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react'
import { getProduct } from '@/lib/actions/product.actions'
import prisma from "@/lib/prisma/client"

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const rawProduct = await prisma.product.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (!rawProduct) {
    notFound();
  }

  const product = await getProduct(rawProduct.id)
  if (!product) {
    notFound();
  }

  const hasPromotion = product.ancienPrix && product.ancienPrix > product.prix;

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ProductImages images={product.images} />

          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm font-black text-accent uppercase tracking-widest">
                {product.categorie?.nom || 'Collection Premium'}
              </p>
              {product.stock > 0 ? (
                <Badge variant="success" className="font-bold">En Stock</Badge>
              ) : (
                <Badge variant="danger" className="font-bold">Épuisé</Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary mb-6 leading-tight">
              {product.nom}
            </h1>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-text-primary">
                {formatPrice(product.prix)}
              </span>
              {hasPromotion && (
                <span className="text-xl text-text-hint line-through font-medium mb-1">
                  {formatPrice(product.ancienPrix!)}
                </span>
              )}
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-text-muted leading-relaxed text-lg whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <AddToCartButton product={product} className="flex-grow h-14 text-lg" />
              <button className="h-14 w-14 flex items-center justify-center rounded-2xl border border-border bg-white hover:bg-surface-alt transition-colors text-text-muted hover:text-danger hover:border-danger/30">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent-light text-accent">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Livraison Express</h4>
                  <p className="text-xs text-text-muted mt-1">Gratuite dès 150€ d'achat.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent-light text-accent">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Retours Facilités</h4>
                  <p className="text-xs text-text-muted mt-1">30 jours pour changer d'avis.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent-light text-accent">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Paiement Sécurisé</h4>
                  <p className="text-xs text-text-muted mt-1">SSL 256-bit crypté.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent-light text-accent">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Stock local</h4>
                  <p className="text-xs text-text-muted mt-1">Expédié de France par nos équipes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
