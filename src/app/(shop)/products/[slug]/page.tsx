import { notFound } from 'next/navigation'
import { ProductImages } from "@/components/product/ProductImages/ProductImages"
import { AddToCartButton } from "@/components/cart/AddToCartButton/AddToCartButton"
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
    <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Left: Sticky Image Gallery - Pro Sharp */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 rounded-sm overflow-hidden border border-neutral-100">
               <ProductImages images={product.images} />
            </div>
          </div>

          {/* Right: Product Pro Details */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="flex flex-col gap-6 mb-12">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em]">
                      {product.categorie?.nom || 'EXCLUSIVITÉ'}
                    </span>
                  </div>
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-2 text-black border border-neutral-200 px-3 py-1 rounded-sm">
                       <ShieldCheck className="h-3 w-3" />
                       <span className="text-[9px] font-bold uppercase tracking-widest">CERTIFIÉ DISPONIBLE</span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">RUPTURE</span>
                  )}
               </div>

               <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black uppercase leading-tight">
                 {product.nom}
               </h1>

               <div className="flex items-baseline gap-4 pt-2 border-t border-neutral-50">
                 <span className="text-3xl font-bold text-black tabular-nums">
                   {formatPrice(product.prix)}
                 </span>
                 {hasPromotion && (
                   <span className="text-sm text-neutral-400 line-through font-bold opacity-60 tabular-nums">
                     {formatPrice(product.ancienPrix!)}
                   </span>
                 )}
               </div>
            </div>

            <div className="space-y-6 mb-12">
               <p className="text-neutral-500 leading-relaxed text-sm font-medium tracking-tight">
                 {product.description}
               </p>
            </div>

            {/* Actions Block - Pro & Functional */}
            <div className="bg-neutral-50 p-8 rounded-sm border border-neutral-100 flex flex-col gap-6 mb-16 shadow-sm">
               <div className="flex flex-col sm:flex-row gap-3">
                 <AddToCartButton product={product} className="flex-grow h-12 rounded-sm font-bold uppercase tracking-widest text-[11px] bg-black text-white hover:bg-neutral-800" />
                 <button className="h-12 w-12 flex items-center justify-center rounded-sm border border-neutral-200 bg-white hover:border-black transition-all group">
                    <Heart className="h-4 w-4 text-neutral-400 group-hover:text-black" />
                 </button>
               </div>
               <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] flex-1 bg-neutral-200"></div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                     Logistique Prioritaire
                  </span>
                  <div className="h-[1px] flex-1 bg-neutral-200"></div>
               </div>
            </div>

            {/* Pro Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="h-9 w-9 flex items-center justify-center rounded-sm bg-black text-white shrink-0">
                  <Truck className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] font-bold text-black uppercase tracking-widest">Livraison Pro</h4>
                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">Expédition sécurisée sous 24/48h.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-9 w-9 flex items-center justify-center rounded-sm bg-neutral-100 text-black border border-neutral-200 shrink-0">
                  <RefreshCw className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] font-bold text-black uppercase tracking-widest">Retours Simple</h4>
                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">Procédure simplifiée sous 30 jours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-9 w-9 flex items-center justify-center rounded-sm bg-neutral-100 text-black border border-neutral-200 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] font-bold text-black uppercase tracking-widest">Authenticité</h4>
                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">Contrôle qualité certifié Système.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-9 w-9 flex items-center justify-center rounded-sm bg-neutral-100 text-black border border-neutral-200 shrink-0">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] font-bold text-black uppercase tracking-widest">Collecte</h4>
                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">Disponible en point de retrait agréé.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
