"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/utils/validators";
import { register as registerUser } from "@/lib/actions/user";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/store/ui/ui.store";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { ROUTES } from "@/lib/utils/constants/routes";

/**
 * The register form component.
 *
 * @returns The register form component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export function RegisterForm() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    const result = await registerUser(data);

    if (result.success) {
      addToast({
        title: "Inscription réussie",
        description:
          "Veuillez vérifier votre email pour confirmer votre compte.",
        type: "success",
      });
      router.push(ROUTES.AUTH.LOGIN);
    } else {
      addToast({
        title: "Erreur d'inscription",
        description: result.error,
        type: "danger",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label
            htmlFor="register-prenom"
            className="text-xs font-semibold text-slate-300 px-0.5"
          >
            Prénom
          </label>
          <div className="relative">
            <Input
              id="register-prenom"
              {...register("prenom")}
              error={!!errors.prenom}
              placeholder="Prénom"
              className="h-10 pl-9 rounded-sm border-slate-700/80 bg-slate-900/70 text-xs text-white placeholder:text-slate-500 focus:border-slate-400"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          {errors.prenom && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.prenom.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="register-nom"
            className="text-xs font-semibold text-slate-300 px-0.5"
          >
            Nom
          </label>
          <div className="relative">
            <Input
              id="register-nom"
              {...register("nom")}
              error={!!errors.nom}
              placeholder="Nom"
              className="h-10 pl-9 rounded-sm border-slate-700/80 bg-slate-900/70 text-xs text-white placeholder:text-slate-500 focus:border-slate-400"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          {errors.nom && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.nom.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="register-email"
          className="text-xs font-semibold text-slate-300 px-0.5"
        >
          Adresse email
        </label>
        <div className="relative">
          <Input
            id="register-email"
            {...register("email")}
            error={!!errors.email}
            placeholder="nom@exemple.com"
            className="h-10 pl-9 rounded-sm border-slate-700/80 bg-slate-900/70 text-xs text-white placeholder:text-slate-500 focus:border-slate-400"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
        {errors.email && (
          <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="register-password"
          className="text-xs font-semibold text-slate-300 px-0.5"
        >
          Mot de passe
        </label>
        <div className="relative">
          <Input
            id="register-password"
            {...register("password")}
            type="password"
            error={!!errors.password}
            placeholder="••••••••"
            className="h-10 pl-9 rounded-sm border-slate-700/80 bg-slate-900/70 text-xs text-white placeholder:text-slate-500 focus:border-slate-400"
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
        {errors.password && (
          <p className="text-xs text-rose-400 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <p className="text-xs text-slate-400 font-normal text-center mt-1 px-2">
        En créant un compte, vous acceptez nos conditions d&apos;utilisation.
      </p>

      <Button
        type="submit"
        disabled={loading}
        className="h-10 w-full text-xs font-semibold rounded-sm bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-sm mt-1 flex items-center justify-center group"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Créer mon compte
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>
    </form>
  );
}
