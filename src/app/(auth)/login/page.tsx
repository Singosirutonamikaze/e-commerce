import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col">
      <header className="mb-8 flex flex-col items-start w-full">
        <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 text-[9px] font-bold uppercase text-neutral-400 hover:text-black tracking-[0.2em] transition-all mb-8 group">
          <ArrowLeft className="h-3 w-3" />
          Retour
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif text-black">
          Connexion
        </h1>
      </header>

      <LoginForm />

      <footer className="mt-8 pt-8 border-t border-neutral-100 text-center">
        <p className="text-xs text-neutral-500 font-medium">
          Pas encore de compte ?{' '}
          <Link href={ROUTES.AUTH.REGISTER} className="text-black font-bold hover:underline underline-offset-4">
            Créer un compte
          </Link>
        </p>
      </footer>
    </div>
  );
}
