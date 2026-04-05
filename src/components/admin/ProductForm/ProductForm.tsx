'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { productSchema } from '@/lib/utils/validators'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useUIStore } from '@/store/ui.store'
import { Save, Plus, X, Package, Layers, Info, Trash2, ChevronRight, Loader2 } from 'lucide-react'

import { ProductWithImages } from '@/types'
import { Category } from '@prisma/client'
import { ProductInput } from '@/lib/utils/validators'
import { Card } from '@/components/ui/Card'

interface ProductFormProps {
  categories: Category[]
  initialData?: ProductWithImages
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter()
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(false)
  const isEditing = !!initialData

  const { register, handleSubmit, formState: { errors } } = useForm<z.input<typeof productSchema>, any, ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      nom: initialData.nom,
      description: initialData.description || '',
      prix: initialData.prix,
      ancienPrix: initialData.ancienPrix || 0,
      stock: initialData.stock,
      slug: initialData.slug,
      categorieId: initialData.categorieId,
      estVisible: initialData.estVisible
    } : {
      nom: '',
      description: '',
      prix: 0,
      ancienPrix: 0,
      stock: 10,
      slug: '',
      categorieId: categories[0]?.id || '',
      estVisible: true
    }
  })

  // Gestion simplifiée des images
  const [images, setImages] = useState<string[]>(initialData?.images?.map((img) => img.url) || [])

  const onSubmit = async (data: ProductInput) => {
    setLoading(true)
    const result = isEditing && initialData
      ? await updateProduct(initialData.id, { ...data, images })
      : await createProduct({ ...data, images })
    
    if (result.success) {
      addToast({ title: isEditing ? 'Produit mis à jour' : 'Produit créé', type: 'success' })
      router.push('/admin/products')
      router.refresh()
    } else {
      addToast({ title: 'Erreur', description: result.error, type: 'danger' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Content */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Info className="h-4 w-4 text-accent" />
            Informations Générales
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Nom du produit</label>
              <Input {...register('nom')} error={!!errors.nom} placeholder="Veste en Cuir Premium" className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Description</label>
              <textarea 
                {...register('description')} 
                className="w-full min-h-[160px] bg-surface rounded-xl border border-border px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none"
                placeholder="Décrivez les caractéristiques du produit..."
              />
            </div>
          </div>
        </section>

        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Package className="h-4 w-4 text-accent" />
            Tarification & Stock
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Prix de vente (€)</label>
              <Input type="number" step="0.01" {...register('prix', { valueAsNumber: true })} error={!!errors.prix} className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Ancien Prix (Promo)</label>
              <Input type="number" step="0.01" {...register('ancienPrix', { valueAsNumber: true })} error={!!errors.ancienPrix} className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-hint px-1">Stock disponible</label>
              <Input type="number" {...register('stock', { valueAsNumber: true })} error={!!errors.stock} className="h-12 rounded-xl" />
            </div>
          </div>
        </section>

        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary flex items-center gap-3">
            <Layers className="h-4 w-4 text-accent" />
            Images du produit
          </h3>
          
          <div className="flex flex-wrap gap-4">
             {images.map((url, idx) => (
                <div key={idx} className="relative h-24 w-24 rounded-2xl overflow-hidden border border-border group">
                  <img src={url} alt="Aperçu" className="h-full w-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
             ))}
             <button 
                type="button" 
                onClick={() => setImages([...images, 'https://placehold.co/600x800'])} // Placeholder simulation pour l'upload
                className="h-24 w-24 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-text-hint hover:border-accent hover:text-accent transition-all bg-surface-alt/50"
             >
                <Plus className="h-5 w-5 mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest">Ajouter</span>
             </button>
          </div>
        </section>
      </div>

      {/* Sidebar: Details & Summary */}
      <div className="lg:col-span-1 flex flex-col gap-8">
        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Catégorie & Visibilité</h3>
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-hint">Catégorie</label>
            <select 
              {...register('categorieId')} 
              className="w-full h-12 bg-surface rounded-xl border border-border px-4 text-sm font-bold focus:ring-2 focus:ring-accent/50 outline-none appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-hint">Slug URL</label>
            <Input {...register('slug')} error={!!errors.slug} placeholder="ma-veste-cuir" className="h-12 rounded-xl" />
            <p className="text-[10px] font-bold text-text-hint px-1">Laissez vide pour générer automatiquement via le nom.</p>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group p-4 rounded-xl border border-border hover:border-accent/40 transition-all bg-surface-alt/30 mt-4">
            <input type="checkbox" {...register('estVisible')} className="h-5 w-5 rounded border-border text-accent focus:ring-accent" />
            <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors uppercase tracking-widest">Activer la visibilité</span>
          </label>
        </section>

        <section className="sticky top-24">
          <Card className="p-8 border-accent/20 bg-accent-light rounded-3xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 h-24 w-24 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            <h4 className="text-xs font-black uppercase tracking-widest text-accent mb-6 relative z-10">Actions</h4>
            
            <div className="flex flex-col gap-4 relative z-10">
              <Button type="submit" disabled={loading} className="h-14 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/20">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>
                    <Save className="h-5 w-5 mr-3" />
                    {isEditing ? 'Mettre à jour' : 'Publier le produit'}
                  </>
                )}
              </Button>
              <Button type="button" variant="ghost" onClick={() => router.back()} className="h-14 font-bold text-text-muted hover:text-danger">
                Annuler
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </form>
  )
}
