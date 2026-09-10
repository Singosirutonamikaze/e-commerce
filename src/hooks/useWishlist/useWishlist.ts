'use client'

import { useState, useEffect, useCallback } from 'react'
import { getWishlist, toggleWishlist } from '@/lib/actions/user'
import { ProductWithImages } from '@/types'
import type { Wishlist } from '@prisma/client'

export type WishlistItemWithProduct = Wishlist & {
  produit: ProductWithImages
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItemWithProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getWishlist()
      if (data) {
        setWishlist(data)
      }
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement de la liste de souhaits')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  const toggleProduct = async (productId: string) => {
    try {
      const result = await toggleWishlist(productId)
      if (result.success) {
        fetchWishlist() // Refresh list
        return true
      }
      return false
    } catch (err) {
      console.error('Erreur lors du changement de wishlist Status', err)
      return false
    }
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.produitId === productId)
  }

  return {
    wishlist,
    loading,
    error,
    toggleProduct,
    isInWishlist,
    refresh: fetchWishlist
  }
}
