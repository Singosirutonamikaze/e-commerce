"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (resending) return;
    setResending(true);
    // Simulation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResent(true);
    setResending(false);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="w-full flex flex-col items-start text-left">
      <Link href={ROUTES.AUTH.LOGIN} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase text-neutral-400 hover:text-black tracking-[0.2em] transition-all mb-8 group">
        <ArrowLeft className="h-3 w-3" />
        Retour
      </Link>
      <div className="h-16 w-16 bg-neutral-50 border border-neutral-100 text-black rounded-sm flex items-center justify-center mb-6">
        <CheckCircle2 className="h-6 w-6" />
      </div>

      <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">
         Vérification requise
      </h1>
      
      <p className="text-xs font-medium text-neutral-500 leading-relaxed mb-8">
        Un lien de confirmation a été envoyé à votre adresse email. 
        Veuillez l&apos;utiliser pour activer votre compte.
      </p>

      <div className="flex flex-col gap-4 w-full">
         <Link href={ROUTES.AUTH.LOGIN} className="w-full">
            <Button className="w-full h-12 text-xs font-bold uppercase tracking-widest rounded-sm bg-black text-white hover:bg-neutral-900 transition-all">
               Se Connecter
            </Button>
         </Link>
         
         <button 
          onClick={handleResend}
          disabled={resending || resent}
          className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-all p-4 disabled:opacity-50"
         >
           {resending ? "Envoi en cours..." : resent ? "Email Renvoyé" : "Renvoyer l'email"}
         </button>
      </div>
    </div>
  );
}
