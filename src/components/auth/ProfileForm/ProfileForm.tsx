'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { User, Mail, Camera, Save, Lock, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useUIStore } from '@/store/ui/ui.store'
import { updateProfile } from '@/lib/actions/user'

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
    } catch {
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
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      <section className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-900/60 rounded-lg border border-slate-800/80 backdrop-blur-md">
        <div className="relative group">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
            {formData.avatarUrl ? (
              <Image
                src={formData.avatarUrl}
                alt="Avatar"
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-slate-500" />
            )}
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 h-8 w-8 bg-white text-slate-950 rounded-lg flex items-center justify-center shadow-md hover:bg-slate-200 transition-all"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col text-center sm:text-left gap-1">
          <h3 className="text-lg font-semibold text-white tracking-tight">
            {formData.prenom} {formData.nom}
          </h3>
          <p className="text-xs text-slate-400">Membre depuis {memberDate}</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
            <span className="px-2.5 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 text-[10px] font-medium rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" />
              Compte vérifié
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-medium rounded-lg flex items-center gap-1.5">
              Client Velure
            </span>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-slate-800/80 rounded-lg flex flex-col gap-4 bg-slate-900/40 backdrop-blur-md">
          <h3 className="text-xs font-semibold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <User className="h-3.5 w-3.5 text-slate-400" />
            Informations personnelles
          </h3>
          
          <div className="space-y-3.5 text-xs">
            <div>
              <label htmlFor="profil_prenom" className="block text-slate-400 mb-1 font-medium">Prénom</label>
              <Input 
                id="profil_prenom"
                value={formData.prenom} 
                onChange={(e) => setFormData({...formData, prenom: e.target.value})} 
                className="h-9 rounded-lg border-slate-800 bg-slate-950 text-xs text-slate-200" 
              />
            </div>
            <div>
              <label htmlFor="profil_nom" className="block text-slate-400 mb-1 font-medium">Nom</label>
              <Input 
                id="profil_nom"
                value={formData.nom} 
                onChange={(e) => setFormData({...formData, nom: e.target.value})} 
                className="h-9 rounded-lg border-slate-800 bg-slate-950 text-xs text-slate-200" 
              />
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-800/80 rounded-lg flex flex-col gap-4 bg-slate-900/40 backdrop-blur-md">
          <h3 className="text-xs font-semibold text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            Coordonnées de contact
          </h3>
          
          <div className="space-y-3.5 text-xs">
            <div>
              <label htmlFor="profil_email" className="block text-slate-400 mb-1 font-medium">Adresse email (sécurisée)</label>
              <div className="relative">
                <Input 
                  id="profil_email"
                  value={initialData.email} 
                  disabled 
                  className="h-9 rounded-lg bg-slate-950/40 border-slate-800 text-xs text-slate-400 pr-8" 
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              </div>
            </div>
            <div>
              <label htmlFor="profil_tel" className="block text-slate-400 mb-1 font-medium">Numéro de téléphone</label>
              <Input 
                id="profil_tel"
                value={formData.telephone || ''} 
                onChange={(e) => setFormData({...formData, telephone: e.target.value})} 
                placeholder="+228 90 00 00 00" 
                className="h-9 rounded-lg border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Info Card */}
      <div className="p-5 border border-slate-800/80 rounded-lg flex items-center justify-between group hover:border-slate-700 transition-all bg-slate-900/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Sécurité du compte</h4>
            <p className="text-[11px] text-slate-400">Authentification et sessions actives protégées</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Actif</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end pt-4 border-t border-slate-800/80">
        <Button 
          type="submit" 
          disabled={loading}
          className="h-10 px-6 text-xs font-medium rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-all flex items-center gap-2"
        >
          <Save className="h-3.5 w-3.5" />
          {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </div>
    </form>
  )
}
