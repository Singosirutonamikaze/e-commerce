'use client'

import React, { useState } from 'react'
import { User, Mail, Phone, Camera, Save, Lock, ShieldCheck, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { useUIStore } from '@/store/ui.store'
import { updateProfile } from '@/lib/actions/user.actions'

interface ProfileFormProps {
  initialData: {
    prenom: string
    nom: string
    email: string
    telephone?: string | null
    avatarUrl?: string | null
    createdAt: Date
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    prenom: initialData.prenom,
    nom: initialData.nom,
    telephone: initialData.telephone || '',
    avatarUrl: initialData.avatarUrl || ''
  })

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await updateProfile({
        ...formData
      })
      
      if (result.success) {
        addToast({ title: 'Profil mis à jour avec succès !', type: 'success' })
      } else {
        addToast({ title: 'Erreur', description: result.error || 'Une erreur est survenue', type: 'danger' })
      }
    } catch (err) {
      addToast({ title: 'Erreur', description: 'Erreur de connexion serveur', type: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  const memberDate = new Date(initialData.createdAt).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-10">
      {/* Avatar Section */}
      <section className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-surface rounded-[40px] border border-border shadow-sm">
        <div className="relative group">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-surface-alt flex items-center justify-center">
            {formData.avatarUrl ? (
              <img src={formData.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <User className="h-12 w-12 text-text-hint" />
            )}
          </div>
          <button type="button" className="absolute bottom-0 right-0 h-10 w-10 bg-accent text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white hover:scale-110 active:scale-95 transition-all">
            <Camera className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col text-center sm:text-left">
          <h3 className="text-xl font-black text-text-primary tracking-tight mb-1">
            {formData.prenom} {formData.nom}
          </h3>
          <p className="text-sm text-text-muted mb-4 font-medium italic">Membre depuis {memberDate}</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="px-3 py-1 bg-success-bg text-success text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="h-3 w-3" />
              Compte Vérifié
            </span>
            <span className="px-3 py-1 bg-accent-light text-accent text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm border border-accent/10">
              Client Premium
            </span>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-border shadow-sm rounded-3xl flex flex-col gap-6 bg-white">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary mb-2 flex items-center gap-2">
            <User className="h-4 w-4 text-accent" />
            Informations Personnelles
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-hint px-1">Prénom</label>
              <Input 
                value={formData.prenom} 
                onChange={(e) => setFormData({...formData, prenom: e.target.value})} 
                className="h-12 rounded-xl focus:ring-accent/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-hint px-1">Nom</label>
              <Input 
                value={formData.nom} 
                onChange={(e) => setFormData({...formData, nom: e.target.value})} 
                className="h-12 rounded-xl focus:ring-accent/20" 
              />
            </div>
          </div>
        </Card>

        <Card className="p-8 border-border shadow-sm rounded-3xl flex flex-col gap-6 bg-white">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-primary mb-2 flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" />
            Coordonnées
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-hint px-1">Email <span className="opacity-50">(sécurisé)</span></label>
              <div className="relative">
                <Input 
                  value={initialData.email} 
                  disabled 
                  className="h-12 rounded-xl bg-surface-alt border-dashed border-border" 
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 text-text-hint" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-hint px-1">Téléphone</label>
              <Input 
                value={formData.telephone || ''} 
                onChange={(e) => setFormData({...formData, telephone: e.target.value})} 
                placeholder="+33 6 .." 
                className="h-12 rounded-xl focus:ring-accent/20" 
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Security Info Bundle */}
      <Card className="p-8 border-border shadow-sm rounded-3xl flex items-center justify-between group hover:border-accent/40 transition-all cursor-pointer bg-white">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 bg-surface-alt rounded-2xl flex items-center justify-center text-text-muted group-hover:bg-accent-light group-hover:text-accent transition-all">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-black text-text-primary uppercase tracking-tight">Sécurité du Compte</h4>
            <p className="text-xs font-medium text-text-muted">Gérer votre mot de passe et vos sessions actives</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-text-hint group-hover:text-accent group-hover:translate-x-1 transition-all" />
      </Card>

      {/* Footer Actions */}
      <div className="flex items-center justify-end pt-6 border-t border-border mt-4">
        <Button 
          type="submit" 
          disabled={loading}
          className="h-14 px-10 text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/10 transition-all hover:scale-105 active:scale-95"
        >
          {loading ? 'Mise à jour en cours...' : 'Enregistrer les modifications'}
          <Save className="h-5 w-5 ml-3" />
        </Button>
      </div>
    </form>
  )
}
