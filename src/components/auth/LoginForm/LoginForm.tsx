'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/lib/utils/validators';
import { login } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/store/ui.store';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export function LoginForm() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    const result = await login(data);
    
    if (result.success) {
      addToast({ title: 'Connexion réussie', type: 'success' });
      if (result.role === 'ADMIN') {
        router.push(ROUTES.ADMIN.ROOT);
      } else {
        router.push(ROUTES.HOME);
      }
      router.refresh();
    } else {
      addToast({ title: 'Erreur de connexion', description: result.error, type: 'danger' });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-text-muted px-1">Email</label>
        <div className="relative">
          <Input 
            {...register('email')} 
            error={!!errors.email} 
            placeholder="votre@email.com" 
            className="h-12 pl-10 rounded-sm" 
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
        </div>
        {errors.email && <p className="text-xs text-danger font-bold mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Mot de passe</label>
          <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="text-xs font-bold text-accent hover:underline">
            Oublié ?
          </Link>
        </div>
        <div className="relative">
          <Input 
            {...register('password')} 
            type="password"
            error={!!errors.password} 
            placeholder="••••••••" 
            className="h-12 pl-10 rounded-sm" 
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
        </div>
        {errors.password && <p className="text-xs text-danger font-bold mt-1">{errors.password.message}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="h-12 w-full text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm bg-black text-white hover:bg-neutral-900 transition-all shadow-md shadow-black/5 mt-2 flex items-center justify-center group"
      >
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
          <>
            Se connecter
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}
