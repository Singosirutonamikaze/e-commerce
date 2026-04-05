'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils/format';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300"
    >
      {/* Image Container */}
      <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={mainImage}
          alt={product.nom}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {hasPromotion && (
            <Badge variant="danger" className="font-black px-2.5 py-1">
              -{discount}%
            </Badge>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="warning" className="font-bold">
              Presque épuisé
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-text-muted font-bold">
              Rupture
            </Badge>
          )}
        </div>

        {/* Quick Actions (Desktop Hover) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <p className="text-xs font-black text-accent uppercase tracking-widest">
            {product.categorie?.nom || 'Collection'}
          </p>
          <button className="text-text-hint hover:text-danger transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        
        <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} className="mb-4">
          <h3 className="text-lg font-bold text-text-primary line-clamp-1 hover:text-accent transition-colors">
            {product.nom}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {hasPromotion && (
              <span className="text-xs text-text-hint line-through font-medium">
                {formatPrice(Number(product.ancienPrix))}
              </span>
            )}
            <span className="text-xl font-black text-text-primary">
              {formatPrice(Number(product.prix))}
            </span>
          </div>
          
          <Link href={ROUTES.PRODUCT_DETAIL(product.slug)}>
            <Button variant="ghost" size="sm" className="rounded-full p-0 h-10 w-10 text-accent hover:bg-accent-light">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
