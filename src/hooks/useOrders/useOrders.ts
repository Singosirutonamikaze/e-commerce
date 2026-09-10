'use client'

import { useState, useEffect, useCallback } from 'react'
import { getOrders } from '@/lib/actions/order'
import type { Order, OrderItem } from '@prisma/client'

export type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    product: { nom: string; imageUrl: string }
  })[]
}

export function useOrders() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getOrders()
      // @ts-expect-error - Prisma return type handling
      setOrders(data)
      setError(null)
    } catch (err) {
      setError('Erreur lors du chargement des commandes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return {
    orders,
    loading,
    error,
    refresh: fetchOrders
  }
}
