import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg flex flex-col">
      <header className="mb-10 text-center sm:text-left">
        <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 text-xs font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour boutique
        </Link>
        <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="text-sm font-black uppercase tracking-widest text-accent italic">Rejoignez-nous</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-text-primary uppercase mb-3">
          Créer un <span className="text-accent italic">Compte</span>
        </h1>
        <p className="text-text-muted font-medium">
          Profitez d&apos;une expérience de shopping privilégiée, d&apos;un suivi simplifié et d&apos;offres exclusives.
        </p>
      </header>

      <RegisterForm />

      <footer className="mt-10 text-center">
        <p className="text-sm text-text-muted font-medium">
          Vous avez déjà un compte ?{' '}
          <Link href={ROUTES.AUTH.LOGIN} className="text-accent font-black hover:underline underline-offset-4">
            Se connecter
          </Link>
        </p>
      </footer>
    </div>
  );
}
