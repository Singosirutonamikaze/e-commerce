'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/lib/utils/validators';
import { register as registerUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/store/ui.store';
import { Mail, Lock, User, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export function RegisterForm() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    const result = await registerUser(data);
    
    if (result.success) {
      addToast({ 
        title: 'Inscription réussie', 
        description: 'Veuillez vérifier votre email pour confirmer votre compte.',
        type: 'success',
      });
      router.push(ROUTES.AUTH.LOGIN);
    } else {
      addToast({ title: 'Erreur d\'inscription', description: result.error, type: 'danger' });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-text-muted px-1">Prénom</label>
          <div className="relative">
            <Input 
              {...register('prenom')} 
              error={!!errors.prenom} 
              placeholder="Prénom" 
              className="h-12 pl-10 rounded-xl" 
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
          </div>
          {errors.prenom && <p className="text-xs text-danger font-bold mt-1">{errors.prenom.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-text-muted px-1">Nom</label>
          <div className="relative">
            <Input 
              {...register('nom')} 
              error={!!errors.nom} 
              placeholder="Nom" 
              className="h-12 pl-10 rounded-xl" 
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
          </div>
          {errors.nom && <p className="text-xs text-danger font-bold mt-1">{errors.nom.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-text-muted px-1">Email</label>
        <div className="relative">
          <Input 
            {...register('email')} 
            error={!!errors.email} 
            placeholder="votre@email.com" 
            className="h-12 pl-10 rounded-xl" 
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
        </div>
        {errors.email && <p className="text-xs text-danger font-bold mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-text-muted px-1">Mot de passe</label>
        <div className="relative">
          <Input 
            {...register('password')} 
            type="password"
            error={!!errors.password} 
            placeholder="••••••••" 
            className="h-12 pl-10 rounded-xl" 
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
        </div>
        {errors.password && <p className="text-xs text-danger font-bold mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-3 p-4 bg-surface-alt/50 rounded-2xl border border-border mt-2">
        <ShieldCheck className="h-6 w-6 text-success shrink-0" />
        <p className="text-xs text-text-muted leading-relaxed font-medium">
          En m&apos;inscrivant, j&apos;accepte les **Conditions Générales** et la **Politique de Confidentialité** de Velure.
        </p>
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="h-14 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-accent/10 mt-2 group"
      >
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
          <>
            Créer mon compte
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}
