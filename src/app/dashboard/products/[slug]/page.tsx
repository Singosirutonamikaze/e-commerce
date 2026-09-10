import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductImages } from "@/components/product/ProductImages/ProductImages";
import { AddToCartButton } from "@/components/cart/AddToCartButton/AddToCartButton";
import { formatPrice } from "@/lib/utils/format";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "@/lib/actions/product";
import { ROUTES } from "@/lib/utils/constants/routes";
import prisma from "@/lib/prisma/client";

export default async function DashboardProductDetailPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;

  const rawProduct = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!rawProduct) {
    notFound();
  }

  const product = await getProduct(rawProduct.id);
  if (!product) {
    notFound();
  }

  const hasPromotion = product.ancienPrix && product.ancienPrix > product.prix;

  return (
    <main className="pb-16 text-slate-100">
      <div className="max-w-6xl mx-auto">
        <Link
          href={ROUTES.DASHBOARD.CATALOGUE}
          className="inline-flex items-center gap-2 mb-8 text-xs text-slate-400 hover:text-white transition-colors lowercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="border border-slate-800/80 bg-slate-950 p-2">
              <ProductImages images={product.images} />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-400 lowercase">
                  {product.categorie?.nom || "collection"}
                </span>
                <span className="text-xs text-emerald-400 lowercase font-medium">
                  {product.stock > 0 ? `${product.stock} disponibles` : "épuisé"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-snug">
                {product.nom}
              </h1>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-xl font-bold text-white tabular-nums">
                  {formatPrice(product.prix)}
                </span>
                {hasPromotion && (
                  <span className="text-xs text-slate-500 line-through tabular-nums">
                    {formatPrice(product.ancienPrix)}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            <div className="pt-2">
              <AddToCartButton
                product={product}
                className="w-full h-11 bg-white text-slate-950 hover:bg-slate-200 font-medium text-xs lowercase"
              />
            </div>

            <div className="border-t border-slate-800/80 pt-6 space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between py-1 border-b border-slate-900">
                <span>Livraison</span>
                <span className="text-slate-300">24 à 48 heures ouvrées</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-900">
                <span>Retours</span>
                <span className="text-slate-300">14 jours garantis</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Confection</span>
                <span className="text-slate-300">Atelier certifié</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
