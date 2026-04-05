'use client'

import React from 'react'
import { ProductCard } from '../ProductCard/ProductCard'
import { motion, Variants } from 'framer-motion'
import { Spinner } from '@/components/ui/Spinner'
import { ProductWithImages } from '@/types'

interface ProductGridProps {
  products: ProductWithImages[]
  loading?: boolean
  emptyMessage?: string
}

export function ProductGrid({ products, loading, emptyMessage = "Aucun produit trouvé." }: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Spinner className="h-8 w-8 text-accent" />
        <p className="text-sm font-bold text-text-hint tracking-widest uppercase">Chargement des produits...</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-20 w-20 bg-surface-alt rounded-sm flex items-center justify-center mb-6">
          <span className="text-4xl text-text-hint opacity-50">?</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Pas encore de produits</h3>
        <p className="text-text-muted text-sm max-w-xs">{emptyMessage}</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}
