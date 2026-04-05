'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/hooks/useCart/useCart';
import { ProductWithImages } from '@/types';
import { ROUTES } from '@/lib/utils/constants/routes';

interface ProductCardProps {
  product: ProductWithImages;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const mainImage = product.images?.[0]?.url || '/placeholder.png';
  const hasPromotion = product.ancienPrix && Number(product.ancienPrix) > Number(product.prix);
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
    <div className="group relative flex flex-col bg-white rounded-sm transition-all duration-300">
      {/* Professional Image Container */}
      <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} className="relative aspect-[4/5] overflow-hidden rounded-sm bg-neutral-50 border border-neutral-100">
        <Image
          src={mainImage}
          alt={product.nom}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Discrete Status Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20">
          {hasPromotion && (
            <div className="bg-black text-white px-2.5 py-1 rounded-sm shadow-sm">
               <span className="text-[9px] font-bold tracking-widest">-{discount}%</span>
            </div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="bg-neutral-100 border border-neutral-200 text-black px-2.5 py-1 rounded-sm shadow-sm">
               <span className="text-[8px] font-bold uppercase tracking-widest">Stock Limité</span>
            </div>
          )}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500 flex items-end p-4">
           <Button
             onClick={handleAddToCart}
             disabled={product.stock === 0}
             className="w-full h-11 rounded-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black border border-neutral-200 hover:bg-black hover:text-white text-[10px] uppercase font-bold tracking-widest"
           >
             <ShoppingCart className="h-3 w-3 mr-2" />
             Ajouter au panier
           </Button>
        </div>
      </Link>

      {/* Product Details - Sharp Typography */}
      <div className="pt-6 pb-2 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            {product.categorie?.nom || 'EXCLUSIVITÉ'}
          </p>
          <Heart className="h-4 w-4 text-neutral-300 hover:text-black cursor-pointer transition-colors" />
        </div>
        
        <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} className="flex items-center justify-between group/link mb-2">
          <h3 className="text-sm font-bold tracking-tight text-black uppercase">
            {product.nom}
          </h3>
          <ArrowUpRight className="h-3.5 w-3.5 text-neutral-300 group-hover/link:text-black transition-all" />
        </Link>
        
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-bold text-black tabular-nums">
            {formatPrice(Number(product.prix))}
          </span>
          {hasPromotion && (
            <span className="text-[10px] text-neutral-400 line-through font-bold opacity-60 tabular-nums">
              {formatPrice(Number(product.ancienPrix))}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
