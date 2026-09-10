"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Heart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart/useCart";
import { ProductWithImages } from "@/types";
import { ROUTES } from "@/lib/utils/constants/routes";

interface ProductCardProps {
  product: ProductWithImages;
}

export function ProductCard({ product }: Readonly<ProductCardProps>) {
  const { addItem } = useCart();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const detailHref = isDashboard
    ? ROUTES.DASHBOARD.PRODUCT_DETAIL(product.slug)
    : ROUTES.PRODUCT_DETAIL(product.slug);

  const mainImage = product.images?.[0]?.url || "/placeholder.png";
  const hasPromotion =
    product.ancienPrix && Number(product.ancienPrix) > Number(product.prix);
  const discount = hasPromotion
    ? Math.round((1 - Number(product.prix) / Number(product.ancienPrix)) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-${Date.now()}`,
      produitId: product.id,
      nom: product.nom,
      prix: Number(product.prix),
      image: mainImage,
      quantite: 1,
      stock: product.stock,
    });
  };

  return (
    <div className="group relative flex flex-col bg-slate-900 border border-slate-800 rounded-sm p-3 transition-all duration-300 hover:border-slate-700">
      <Link
        href={detailHref}
        className="relative aspect-4/5 overflow-hidden rounded-sm bg-slate-950"
      >
        <Image
          src={mainImage}
          alt={product.nom}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
          {hasPromotion && (
            <div className="bg-white text-slate-950 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">
              -{discount}%
            </div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded-sm text-[9px] font-bold">
              stock limité
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-end p-2">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full h-8 rounded-sm bg-white text-slate-950 hover:bg-slate-200 text-xs font-semibold shadow transition-all lowercase"
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
            ajouter
          </Button>
        </div>
      </Link>

      <div className="pt-2.5 pb-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] font-medium text-slate-400 lowercase">
            {product.categorie?.nom || "collection"}
          </p>
          <Heart className="h-3.5 w-3.5 text-slate-500 hover:text-rose-400 cursor-pointer transition-colors" />
        </div>

        <Link
          href={detailHref}
          className="flex items-center justify-between group/link mb-1"
        >
          <h3 className="text-xs font-semibold text-white line-clamp-1 lowercase group-hover/link:text-slate-300 transition-colors">
            {product.nom}
          </h3>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover/link:text-white transition-all shrink-0 ml-1" />
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-white tabular-nums">
            {formatPrice(Number(product.prix))}
          </span>
          {hasPromotion && (
            <span className="text-[10px] text-slate-500 line-through tabular-nums">
              {formatPrice(Number(product.ancienPrix))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
