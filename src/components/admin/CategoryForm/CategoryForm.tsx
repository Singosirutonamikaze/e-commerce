'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { categorySchema, CategoryInput } from '@/lib/utils/validators';
import { createCategory, updateCategory } from '@/lib/actions/category.actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/store/ui.store';
import { Save, Info, Layers, Loader2 } from 'lucide-react';
import { Category } from '@prisma/client';
import { ROUTES } from '@/lib/utils/constants/routes';

interface CategoryFormProps {
  categories: Category[]
  initialData?: Category
}

export function CategoryForm({ categories, initialData }: CategoryFormProps) {
  const router = useRouter()
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(false)
  const isEditing = !!initialData

  const { register, handleSubmit, formState: { errors } } = useForm<z.input<typeof categorySchema>, any, CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nom: initialData?.nom || '',
      imageUrl: initialData?.imageUrl || '',
      ordre: initialData?.ordre || 0,
      parentId: initialData?.parentId || ''
    }
  })

  const onSubmit = async (data: CategoryInput) => {
    setLoading(true)
    const result = isEditing && initialData
      ? await updateCategory(initialData.id, data)
      : await createCategory(data)
    
    if (result.success) {
      addToast({ title: isEditing ? 'Catégorie mise à jour' : 'Catégorie créée', type: 'success' })
      router.push(ROUTES.ADMIN.CATEGORIES);
      router.refresh()
    } else {
      addToast({ title: 'Erreur', description: result.error, type: 'danger' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 flex flex-col gap-8">
        <section className="bg-surface rounded-sm p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Info className="h-4 w-4 text-accent" />
            Informations de base
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-hint px-1">Nom de la catégorie</label>
              <Input {...register('nom')} error={!!errors.nom} placeholder="Ex: Chaussures de Luxe" className="h-12 rounded-sm" />
              {errors.nom && <p className="text-xs text-danger font-bold mt-1">{errors.nom.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-hint px-1">URL de l'image (Optionnel)</label>
              <Input {...register('imageUrl')} error={!!errors.imageUrl} placeholder="https://..." className="h-12 rounded-sm" />
            </div>
          </div>
        </section>

        <section className="bg-surface rounded-sm p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Layers className="h-4 w-4 text-accent" />
            Organisation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-hint px-1">Ordre d'affichage</label>
              <Input type="number" {...register('ordre', { valueAsNumber: true })} error={!!errors.ordre} className="h-12 rounded-sm" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-hint px-1">Catégorie parente</label>
              <select 
                {...register('parentId')} 
                className="w-full h-12 bg-surface rounded-sm border border-border px-4 text-sm font-bold focus:ring-2 focus:ring-accent/50 outline-none appearance-none cursor-pointer"
              >
                <option value="">Aucune (Catégorie principale)</option>
                {categories.filter(c => c.id !== initialData?.id).map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nom}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-8">
        <section className="sticky top-24 bg-surface rounded-sm p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-hint">Actions</h3>
          
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={loading} className="h-14 font-bold uppercase tracking-widest rounded-sm shadow-xl shadow-accent/20">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  <Save className="h-5 w-5 mr-3" />
                  {isEditing ? 'Enregistrer' : 'Créer la catégorie'}
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
