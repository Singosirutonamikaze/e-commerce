'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { promoSchema, PromoInput } from '@/lib/utils/validators';
import { createPromoCode, updatePromoCode } from '@/lib/actions/promo.actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/store/ui.store';
import { Save, Ticket, Calendar, Loader2 } from 'lucide-react';
import { Promo } from '@prisma/client';
import { ROUTES } from '@/lib/utils/constants/routes';

interface PromoFormProps {
  initialData?: Promo
}

export function PromoForm({ initialData }: PromoFormProps) {
  const router = useRouter()
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(false)
  const isEditing = !!initialData

  const { register, handleSubmit, formState: { errors }, watch } = useForm<z.input<typeof promoSchema>, any, PromoInput>({
    resolver: zodResolver(promoSchema),
    defaultValues: initialData ? {
      code: initialData.code,
      type: initialData.type,
      estActif: initialData.estActif,
      reduction: Number(initialData.reduction),
      montantMinimum: initialData.montantMinimum ? Number(initialData.montantMinimum) : 0,
      limiteUtilisation: initialData.limiteUtilisation || 0,
      dateExpiration: new Date(initialData.dateExpiration).toISOString().split('T')[0]
    } : {
      code: '',
      reduction: 0,
      type: 'POURCENTAGE',
      montantMinimum: 0,
      limiteUtilisation: 0,
      dateExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estActif: true
    }
  })

  const promoType = watch('type')

  const onSubmit = async (data: PromoInput) => {
    setLoading(true)
    const result = isEditing
      ? await updatePromoCode(initialData.id, data)
      : await createPromoCode(data)

    if (result.success) {
      addToast({ title: isEditing ? 'Promo mise à jour' : 'Promo créée', type: 'success' })
      router.push(ROUTES.ADMIN.PROMOS);
      router.refresh()
    } else {
      addToast({ title: 'Erreur', description: result.error, type: 'danger' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 flex flex-col gap-8">
        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Ticket className="h-4 w-4 text-accent" />
            Configuration du Code
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Code Promo (Unique)</label>
              <Input {...register('code')} error={!!errors.code} placeholder="SUMMER25" className="h-12 rounded-xl uppercase" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Type de réduction</label>
              <select
                {...register('type')}
                className="w-full h-12 bg-surface rounded-xl border border-border px-4 text-sm font-bold focus:ring-2 focus:ring-accent/50 outline-none appearance-none cursor-pointer"
              >
                <option value="POURCENTAGE">Pourcentage (%)</option>
                <option value="MONTANT_FIXE">Montant Fixe (€)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">
                Valeur ({promoType === 'POURCENTAGE' ? '%' : '€'})
              </label>
              <Input type="number" step="0.01" {...register('reduction', { valueAsNumber: true })} error={!!errors.reduction} className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Seuil minimal d'achat (€)</label>
              <Input type="number" step="0.01" {...register('montantMinimum', { valueAsNumber: true })} error={!!errors.montantMinimum} className="h-12 rounded-xl" />
            </div>
          </div>
        </section>

        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Calendar className="h-4 w-4 text-accent" />
            Limites & Validité
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Date d'expiration</label>
              <Input type="date" {...register('dateExpiration')} error={!!errors.dateExpiration} className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Limit d'utilisation (Optionnel)</label>
              <Input type="number" {...register('limiteUtilisation', { valueAsNumber: true })} error={!!errors.limiteUtilisation} placeholder="Laisser vide pour illimité" className="h-12 rounded-xl" />
            </div>
          </div>
        </section>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-8">
        <section className="sticky top-24 bg-surface rounded-3xl p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-hint">Activer la Promo</h3>

          <label className="flex items-center gap-3 cursor-pointer group p-4 rounded-xl border border-border hover:border-accent/40 transition-all bg-surface-alt/30">
            <input type="checkbox" {...register('estActif')} className="h-5 w-5 rounded border-border text-accent focus:ring-accent" />
            <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-widest">Actif</span>
          </label>

          <div className="flex flex-col gap-4 mt-4">
            <Button type="submit" disabled={loading} className="h-14 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/20">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  <Save className="h-5 w-5 mr-3" />
                  {isEditing ? 'Mettre à jour' : 'Créer le code'}
                </>
              )}
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.back()} className="h-14 font-bold text-text-muted hover:text-danger">
              Annuler
            </Button>
          </div>
        </section>
      </div>
    </form>
  )
}
