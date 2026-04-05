'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (resending) return;
    setResending(true);
    // Simulation d'envoi d'email de vérification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResent(true);
    setResending(false);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="min-h-screen py-32 px-6 flex flex-col items-center justify-center bg-bg relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_transparent_40%)] from-accent/10 opacity-50"></div>
      
      <div className="w-full max-w-lg bg-white rounded-[60px] p-16 border border-border shadow-2xl relative z-10 text-center flex flex-col items-center">
        {/* Verification Icon */}
        <div className="h-24 w-24 bg-accent-light text-accent rounded-[32px] flex items-center justify-center mb-10 shadow-lg shadow-accent/5 rotate-3 hover:rotate-0 transition-transform">
           <Mail className="h-10 w-10" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-text-primary uppercase mb-6 leading-[0.9]">
          Vérifiez votre <br />
          <span className="text-accent italic">Boîte Email</span>.
        </h1>
        
        <p className="text-base font-medium text-text-muted leading-relaxed mb-12 max-w-sm">
          Un lien de confirmation a été envoyé à votre adresse email. 
          Veuillez cliquer dessus pour activer votre accès exclusif à <span className="text-text-primary font-bold">Velure</span>.
        </p>

        <div className="flex flex-col gap-4 w-full">
           <Link href={ROUTES.AUTH.LOGIN} className="w-full">
              <Button size="lg" className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/20 group">
                 Continuer vers la connexion
                 <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
              </Button>
           </Link>
           
           <AnimatePresence mode="wait">
             {!resent ? (
               <motion.button 
                key="resend"
                onClick={handleResend}
                disabled={resending}
                className="text-sm font-black uppercase tracking-widest text-text-hint hover:text-accent flex items-center justify-center gap-2 transition-all p-4 disabled:opacity-50"
               >
                 {resending ? <RefreshCcw className="h-4 w-4 animate-spin" /> : null}
                 Renvoyer l&apos;email de vérification
               </motion.button>
             ) : (
               <motion.div 
                key="resent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-black uppercase tracking-widest text-success flex items-center justify-center gap-2 p-4"
               >
                 <CheckCircle2 className="h-4 w-4" />
                 Email renvoyé avec succès
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-2 p-4 bg-surface-alt/30 rounded-2xl border border-border/50">
           <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></div>
           <span className="text-[10px] font-black uppercase text-text-hint tracking-widest">Temps estimé: 2 minutes</span>
        </div>
      </div>

      <p className="mt-12 text-xs font-black uppercase tracking-[0.3em] text-text-hint">Velure Maison de Mode &copy; 2024</p>
    </div>
  );
}
