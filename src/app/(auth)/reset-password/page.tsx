"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!password || password !== confirmPassword || isSubmitting) return;

    setIsSubmitting(true);
    // Simulation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-start text-left">
        <Link href={ROUTES.AUTH.LOGIN} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase text-neutral-400 hover:text-black tracking-[0.2em] transition-all mb-8 group">
          <ArrowLeft className="h-3 w-3" />
          Retour
        </Link>
        <div className="h-16 w-16 bg-neutral-50 border border-neutral-100 text-black rounded-sm flex items-center justify-center mb-6">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">Mot de passe modifié</h1>
        <p className="text-xs font-medium text-neutral-500 leading-relaxed mb-8">
          Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant accéder à votre compte.
        </p>
        <Link href={ROUTES.AUTH.LOGIN} className="w-full">
          <Button className="w-full h-12 rounded-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-neutral-900 transition-all">
            Se Connecter
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <header className="mb-8 flex flex-col items-start w-full">
        <Link href={ROUTES.AUTH.LOGIN} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase text-neutral-400 hover:text-black tracking-[0.2em] transition-all mb-8 group">
          <ArrowLeft className="h-3 w-3" />
          Retour
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif text-black mb-2">
          Nouveau mot de passe
        </h1>
        <p className="text-xs font-medium text-neutral-500 leading-relaxed text-left">
          Veuillez définir un nouveau mot de passe sécurisé.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
           <div className="flex flex-col gap-2">
             <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Nouveau Mot de Passe</label>
             <Input 
               type="password" 
               placeholder="••••••••" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="h-12 rounded-sm bg-neutral-50 border border-neutral-200 focus:border-black font-medium text-xs px-4 outline-none"
               required
             />
           </div>
           <div className="flex flex-col gap-2">
             <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Confirmer le Mot de Passe</label>
             <Input 
               type="password" 
               placeholder="••••••••" 
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="h-12 rounded-sm bg-neutral-50 border border-neutral-200 focus:border-black font-medium text-xs px-4 outline-none"
               required
             />
           </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting || password !== confirmPassword || password.length === 0}
          className="w-full h-12 text-xs font-bold uppercase tracking-widest rounded-sm bg-black text-white hover:bg-neutral-900 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Enregistrer"
          )}
        </Button>
      </form>
    </div>
  );
}
