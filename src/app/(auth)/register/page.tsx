"use client";

import React, { useRef } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * The register page component for creating new accounts.
 *
 * @returns The register page component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export default function RegisterPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".register-anim-header", {
        opacity: 0,
        y: -18,
        duration: 0.6,
        stagger: 0.08,
      })
        .from(
          ".register-anim-form",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".register-anim-footer",
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
      <header className="register-anim-header mb-6 flex flex-col items-start w-full">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-all mb-4 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Retour à l&apos;accueil
        </Link>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Créer un compte
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Rejoignez Velure et profitez d&apos;avantages exclusifs.
        </p>
      </header>

      <div className="register-anim-form w-full">
        <RegisterForm />
      </div>

      <footer className="register-anim-footer mt-6 pt-6 border-t border-slate-800/80 text-center">
        <p className="text-xs text-slate-400 font-normal">
          Vous avez déjà un compte ?{" "}
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="text-white font-semibold hover:underline underline-offset-4"
          >
            Se connecter
          </Link>
        </p>
      </footer>
    </div>
  );
}
