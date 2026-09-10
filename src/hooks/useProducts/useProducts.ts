'use client'

import { useState, useEffect, useCallback } from 'react'
import { getProducts } from '@/lib/actions/product'
import { ProductWithImages } from '@/types'

export function useProducts() {
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [filters, setFilters] = useState({
    categorieId: '',
    search: '',
    minPrix: 0,
    maxPrix: 10000,
    sort: 'newest' as 'newest' | 'price_asc' | 'price_desc'
  })

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getProducts(filters)
      setProducts(data as ProductWithImages[])
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des produits')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    products,
    loading,
    error,
    filters,
    updateFilters,
    refresh: fetchProducts
  }
}
