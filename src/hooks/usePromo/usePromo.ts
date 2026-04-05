'use client'

import { useState } from 'react'
import { validatePromoCode } from '@/lib/actions/promo.actions'
import type { Promo } from '@prisma/client'

export function usePromo() {
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateCode = async (code: string, cartTotal: number) => {
    try {
      setLoading(true)
      const result = await validatePromoCode(code)
      
      if (result.success && result.promo) {
        setAppliedPromo(result.promo)
        setError(null)
        return result.promo
      } else {
        setError(result.error || 'Code promo invalide')
        setAppliedPromo(null)
        return null
      }
    } catch (err) {
      setError('Erreur lors de la validation du code')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setError(null)
  }

  const calculateDiscount = (total: number) => {
    if (!appliedPromo) return 0
    
    if (appliedPromo.type === 'POURCENTAGE') {
      return (total * Number(appliedPromo.reduction)) / 100
    } else {
      return Number(appliedPromo.reduction)
    }
  }

  return {
    appliedPromo,
    loading,
    error,
    validateCode,
    removePromo,
    calculateDiscount
  }
}
