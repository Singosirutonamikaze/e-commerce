"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

import { loginSchema, LoginInput } from "@/lib/utils/validators";
import { login } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/store/ui.store";
import { ROUTES } from "@/lib/utils/constants/routes";

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
      addToast({ title: "Connexion reussie", type: "success" });

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="px-1 text-xs font-bold uppercase tracking-widest text-text-muted"
        >
          Email
        </label>
        <div className="relative">
          <Input
            id="login-email"
            {...register("email")}
            error={!!errors.email}
            placeholder="votre@email.com"
            className="h-12 rounded-sm pl-10"
          />
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-hint" />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs font-bold text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <label
            htmlFor="login-password"
            className="text-xs font-bold uppercase tracking-widest text-text-muted"
          >
            Mot de passe
          </label>
          <Link
            href={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-xs font-bold text-accent hover:underline"
          >
            Oublie ?
          </Link>
        </div>

        <div className="relative">
          <Input
            id="login-password"
            {...register("password")}
            type="password"
            error={!!errors.password}
            placeholder="********"
            className="h-12 rounded-sm pl-10"
          />
          <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-hint" />
        </div>

        {errors.password && (
          <p className="mt-1 text-xs font-bold text-danger">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="group mt-2 flex h-12 w-full items-center justify-center rounded-sm bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md shadow-black/5 transition-all hover:bg-neutral-900"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>
            Se connecter
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}
