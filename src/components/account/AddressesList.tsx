'use client';

import React, { useState } from 'react';
import { Plus, MapPin, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema, AddressInput } from '@/lib/utils/validators';
import { addAddress } from '@/lib/actions/user.actions';
import { useUIStore } from '@/store/ui.store';
import { Address } from '@prisma/client';

interface AddressesListProps {
  initialAddresses: Address[];
}

export function AddressesList({ initialAddresses }: AddressesListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useUIStore();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      telephone: '',
      rue: '',
      ville: '',
      codePostal: '',
      pays: '',
      complementAdresse: '',
      estParDefaut: false,
    },
  });

  const onSubmit = async (data: AddressInput) => {
    const result = await addAddress(data);
    if (result.success) {
      addToast({ title: 'Adresse ajoutée', type: 'success' });
      setIsModalOpen(false);
      reset();
    } else {
      addToast({ title: 'Erreur', description: result.error, type: 'danger' });
    }
  };

  return (
    <>
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-text-primary tracking-tighter uppercase mb-2">
            Mes Adresses
          </h2>
          <p className="text-sm font-medium text-text-muted">
            Gérez vos adresses de livraison pour des commandes plus rapides.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-sm h-12 px-8 font-bold uppercase tracking-widest shadow-lg shadow-accent/10 transition-transform hover:scale-105 active:scale-95">
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle Adresse
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {initialAddresses.length > 0 ? (
          initialAddresses.map((address) => (
            <div key={address.id} className="relative bg-surface rounded-sm p-8 border border-border shadow-sm hover:border-accent group transition-all">
              {address.estParDefaut && (
                <div className="absolute top-6 right-8 flex items-center gap-2 bg-success-bg text-success px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  <CheckCircle2 className="h-3 w-3" />
                  Par défaut
                </div>
              )}
              
              <div className="flex items-start gap-5 mb-8">
                <div className="h-12 w-12 bg-surface-alt rounded-sm flex items-center justify-center text-text-hint group-hover:bg-accent-light group-hover:text-accent transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-text-primary uppercase tracking-tight">{address.prenom} {address.nom}</h3>
                  <p className="text-sm text-text-muted font-medium mt-1">{address.rue}</p>
                  <p className="text-sm text-text-muted font-medium">{address.codePostal} {address.ville}</p>
                  <p className="text-[10px] font-bold text-text-hint uppercase tracking-widest mt-2">{address.pays}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button className="text-xs font-bold text-accent border-b-2 border-accent/10 hover:border-accent transition-all pb-0.5 uppercase tracking-widest">
                  Modifier
                </button>
                {!address.estParDefaut && (
                  <button className="text-xs font-bold text-text-hint hover:text-danger flex items-center gap-1 transition-colors uppercase tracking-widest ml-auto">
                    <Trash2 className="h-3.5 w-3.5" />
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-surface-alt/10 rounded-sm border-2 border-dashed border-border gap-4">
             <MapPin className="h-12 w-12 text-text-hint opacity-20" />
             <p className="text-sm font-bold text-text-muted uppercase tracking-widest">Aucune adresse enregistrée</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une adresse"
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Prénom</label>
              <Input {...register('prenom')} error={!!errors.prenom} placeholder="Jean" className="h-12 rounded-sm" />
              {errors.prenom && <p className="text-[10px] text-danger font-bold uppercase">{errors.prenom.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Nom</label>
              <Input {...register('nom')} error={!!errors.nom} placeholder="Dupont" className="h-12 rounded-sm" />
              {errors.nom && <p className="text-[10px] text-danger font-bold uppercase">{errors.nom.message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Rue & Numéro</label>
            <Input {...register('rue')} error={!!errors.rue} placeholder="123 rue de Rivoli" className="h-12 rounded-sm" />
            {errors.rue && <p className="text-[10px] text-danger font-bold uppercase">{errors.rue.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Ville</label>
              <Input {...register('ville')} error={!!errors.ville} placeholder="Paris" className="h-12 rounded-sm" />
              {errors.ville && <p className="text-[10px] text-danger font-bold uppercase">{errors.ville.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Code Postal</label>
              <Input {...register('codePostal')} error={!!errors.codePostal} placeholder="75001" className="h-12 rounded-sm" />
              {errors.codePostal && <p className="text-[10px] text-danger font-bold uppercase">{errors.codePostal.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Téléphone</label>
              <Input {...register('telephone')} error={!!errors.telephone} placeholder="06 12 34 56 78" className="h-12 rounded-sm" />
              {errors.telephone && <p className="text-[10px] text-danger font-bold uppercase">{errors.telephone.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Pays</label>
              <Input {...register('pays')} error={!!errors.pays} placeholder="France" className="h-12 rounded-sm" />
              {errors.pays && <p className="text-[10px] text-danger font-bold uppercase">{errors.pays.message}</p>}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-sm border border-border hover:border-accent/40 transition-all bg-surface-alt/30">
            <input type="checkbox" {...register('estParDefaut')} className="h-5 w-5 rounded border-border text-accent focus:ring-accent" />
            <span className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">Définir comme adresse par défaut</span>
          </label>

          <Button type="submit" className="w-full h-14 text-lg font-bold uppercase tracking-widest rounded-sm shadow-xl shadow-accent/10 mt-4">
            Enregistrer l&apos;adresse
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </form>
      </Modal>
    </>
  );
}
