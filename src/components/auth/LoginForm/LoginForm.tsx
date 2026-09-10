"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

import { loginSchema, LoginInput } from "@/lib/utils/validators";
import { login } from "@/lib/actions/user";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/store/ui/ui.store";
import { ROUTES } from "@/lib/utils/constants/routes";

/**
 * The login form component.
 *
 * @returns The login form component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    const result = await login(data);

    if (result.success) {
      addToast({ title: "Connexion réussie", type: "success" });

      const redirectTo = searchParams.get("redirect");
      const safeRedirect = redirectTo?.startsWith("/") ? redirectTo : null;

      if (safeRedirect) {
        router.push(safeRedirect);
      } else if (result.role === "ADMIN") {
        router.push(ROUTES.ADMIN.ROOT);
      } else {
        router.push(ROUTES.DASHBOARD.ROOT);
      }

      router.refresh();
    } else {
      addToast({
        title: "Erreur de connexion",
        description: result.error,
        type: "danger",
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="space-y-1.5">
        <label
          htmlFor="login-email"
          className="px-0.5 text-xs font-semibold text-slate-300"
        >
          Adresse email
        </label>
        <div className="relative">
          <Input
            id="login-email"
            {...register("email")}
            error={!!errors.email}
            placeholder="nom@exemple.com"
            className="h-10 rounded-sm border-slate-700/80 bg-slate-900/70 pl-9 text-xs text-white placeholder:text-slate-500 focus:border-slate-400"
          />
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-rose-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-0.5">
          <label
            htmlFor="login-password"
            className="text-xs font-semibold text-slate-300"
          >
            Mot de passe
          </label>
          <Link
            href={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-xs font-medium text-slate-300 hover:text-white hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <div className="relative">
          <Input
            id="login-password"
            {...register("password")}
            type="password"
            error={!!errors.password}
            placeholder="••••••••"
            className="h-10 rounded-sm border-slate-700/80 bg-slate-900/70 pl-9 text-xs text-white placeholder:text-slate-500 focus:border-slate-400"
          />
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        {errors.password && (
          <p className="mt-1 text-xs text-rose-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-10 w-full items-center justify-center rounded-sm bg-white text-xs font-semibold text-slate-950 shadow-sm transition-all hover:bg-slate-200"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Se connecter
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>
    </form>
  );
}
