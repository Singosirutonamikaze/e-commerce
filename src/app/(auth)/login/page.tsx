"use client";

import { Suspense, useRef } from "react";
import { LoginForm } from "@/components/auth/LoginForm/LoginForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * The login page component for user authentication.
 *
 * @returns The login page component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".login-anim-header", {
        opacity: 0,
        y: -18,
        duration: 0.6,
        stagger: 0.08,
      })
        .from(
          ".login-anim-form",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".login-anim-footer",
          {
            opacity: 0,
            y: 10,
            duration: 0.4,
          },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full flex flex-col">
      <header className="login-anim-header mb-6 flex flex-col items-start w-full">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-all mb-4 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Retour à l&apos;accueil
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Connexion
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Accédez à votre espace personnel Velure.
        </p>
      </header>

      <div className="login-anim-form w-full">
        <Suspense
          fallback={
            <div className="flex min-h-64 items-center justify-center rounded-sm border border-slate-800 bg-slate-900/50">
              <p className="text-xs text-slate-400">
                Chargement du formulaire...
              </p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>

      <footer className="login-anim-footer mt-6 pt-6 border-t border-slate-800/80 text-center">
        <p className="text-xs text-slate-400 font-normal">
          Pas encore de compte ?{" "}
          <Link
            href={ROUTES.AUTH.REGISTER}
            className="text-white font-semibold hover:underline underline-offset-4"
          >
            Créer un compte
          </Link>
        </p>
      </footer>
    </div>
  );
}
