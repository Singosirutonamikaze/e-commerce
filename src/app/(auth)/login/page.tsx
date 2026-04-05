import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md flex flex-col">
      <header className="mb-10 text-center sm:text-left">
        <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 text-xs font-black uppercase text-accent hover:text-accent-hover tracking-widest transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour boutique
        </Link>
        <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="text-sm font-black uppercase tracking-widest text-accent italic">Ravi de vous revoir</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-text-primary uppercase mb-3">
          Se <span className="text-accent italic">Connecter</span>
        </h1>
        <p className="text-text-muted font-medium">
          Accédez à votre compte premium Velure pour suivre vos commandes et gérer vos favoris.
        </p>
      </header>

      <LoginForm />

      <footer className="mt-10 text-center">
        <p className="text-sm text-text-muted font-medium">
          Pas encore de compte ?{' '}
          <Link href={ROUTES.AUTH.REGISTER} className="text-accent font-black hover:underline underline-offset-4">
            Créer un compte
          </Link>
        </p>
      </footer>
    </div>
  );
}
