'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart/useCart';
import { cn } from '@/lib/utils/cn';
import { ProductWithImages } from '@/types/product';

interface AddToCartButtonProps {
  product: ProductWithImages;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export function AddToCartButton({ product, variant = 'default', className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = async () => {
    if (product.stock === 0) return;
    
    setIsAdding(true);
    
    // Simulate slight delay for feedback
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem({
      id: Math.random().toString(36).substring(7),
      produitId: product.id,
      nom: product.nom,
      prix: Number(product.prix),
      image: product.images?.[0]?.url || '/placeholder.png',
      quantite: 1,
      stock: product.stock,
    });
    
    setIsAdding(false);
    setIsAdded(true);
    
    // Reset "Added" state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={product.stock === 0 || isAdding}
      variant={variant}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isAdded ? "bg-success hover:bg-success text-white border-success" : "",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {isAdding ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isAdded ? (
          <Check className="h-5 w-5" />
        ) : (
          <ShoppingCart className="h-5 w-5" />
        )}
        <span className="font-bold">
          {product.stock === 0 
            ? 'Rupture de stock' 
            : isAdding 
              ? 'Ajout...' 
              : isAdded 
                ? 'Ajouté !' 
                : 'Ajouter au panier'}
        </span>
      </div>
    </Button>
  );
}
