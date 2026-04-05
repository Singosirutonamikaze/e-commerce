'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    // Simulation d'envoi d'email de récupération
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSent(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-32 px-6 flex flex-col items-center justify-center bg-bg">
      <div className="w-full max-w-md bg-white rounded-[48px] p-12 border border-border shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-accent/5 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>

        <Link 
          href={ROUTES.AUTH.LOGIN}
          className="text-xs font-black uppercase text-text-hint hover:text-accent tracking-widest transition-all mb-8 inline-block"
        >
          &larr; Retour à la connexion
        </Link>
        
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-4xl font-black tracking-tighter text-text-primary uppercase mb-4 leading-tight">
                Mot de <span className="text-accent italic">Passe</span> perdu ?
              </h1>
              <p className="text-sm font-medium text-text-muted mb-10 leading-relaxed">
                Pas d&apos;inquiétude. Entrez votre email ci-dessous et nous vous enverrons 
                un lien sécurisé pour le réinitialiser.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint group-focus-within:text-accent transition-colors" />
                    <Input 
                      type="email" 
                      placeholder="votre@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-surface-alt/50 border border-border focus:ring-4 focus:ring-accent/5 transition-all font-bold"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/20 mt-4 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-3">
                      Envoyer le lien
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="h-20 w-20 bg-success-bg text-success rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-black text-text-primary uppercase mb-4 tracking-tight">Email Envoyé !</h2>
              <p className="text-sm font-medium text-text-muted leading-relaxed mb-10">
                Nous avons envoyé un lien de réinitialisation à <span className="text-text-primary font-bold">{email}</span>. 
                N&apos;oubliez pas de vérifier vos spams.
              </p>
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl font-black uppercase tracking-widest border-2"
                onClick={() => setIsSent(false)}
              >
                Ressayer avec un autre email
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
