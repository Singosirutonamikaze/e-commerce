"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    // Simulation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSent(true);
    setIsSubmitting(false);
  };

  if (isSent) {
    return (
      <div className="w-full flex flex-col items-start text-left">
        <Link href={ROUTES.AUTH.LOGIN} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase text-neutral-400 hover:text-black tracking-[0.2em] transition-all mb-8 group">
          <ArrowLeft className="h-3 w-3" />
          Retour
        </Link>
        <div className="h-16 w-16 bg-neutral-50 border border-neutral-100 text-black rounded-sm flex items-center justify-center mb-6">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">Email envoyé</h1>
        <p className="text-xs font-medium text-neutral-500 leading-relaxed mb-8">
          Si un compte est associé à <span className="text-black font-bold">{email}</span>, un lien de réinitialisation a été envoyé.
        </p>
        <Button 
          variant="outline" 
          className="w-full h-12 rounded-sm font-bold uppercase tracking-widest border-neutral-200 text-black hover:border-black transition-all"
          onClick={() => setIsSent(false)}
        >
          Réessayer
        </Button>
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
          Mot de passe perdu
        </h1>
        <p className="text-xs font-medium text-neutral-500 leading-relaxed text-left">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
           <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Votre email</label>
           <Input 
             type="email" 
             placeholder="contact@entreprise.com" 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="h-12 rounded-sm bg-neutral-50 border border-neutral-200 focus:border-black font-medium text-xs px-4 outline-none"
             required
           />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 text-xs font-bold uppercase tracking-widest rounded-sm bg-black text-white hover:bg-neutral-900 transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Envoyer le lien"
          )}
        </Button>
      </form>
    </div>
  );
}
