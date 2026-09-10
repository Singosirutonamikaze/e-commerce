import React from "react";
import { ProfileForm } from "@/components/auth/ProfileForm/ProfileForm";
import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import { User, ShieldCheck, MapPin, KeyRound } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      _count: {
        select: {
          orders: true,
          addresses: true,
          wishlist: true,
        },
      },
    },
  });

  if (!dbUser) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <header className="border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-slate-400">
            Mon Compte
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Paramètres & Profil
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Gérez vos informations personnelles, vos coordonnées et la sécurité de votre compte.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Volet gauche : Navigation & Résumé du compte */}
        <aside className="lg:col-span-4 flex flex-col gap-5">
          <div className="p-5 border border-slate-800/80 rounded-lg bg-slate-900/60 backdrop-blur-md flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
              <div className="h-11 w-11 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-semibold text-sm">
                {dbUser.prenom.charAt(0)}{dbUser.nom.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">
                  {dbUser.prenom} {dbUser.nom}
                </span>
                <span className="text-xs text-slate-400">
                  {dbUser.email}
                </span>
              </div>
            </div>

            <nav className="flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 text-white font-medium border border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <User className="h-4 w-4 text-slate-300" />
                  <span>Profil personnel</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Actif</span>
              </div>

              <Link
                href={ROUTES.DASHBOARD.ADDRESSES}
                className="flex items-center justify-between p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>Carnet d&apos;adresses</span>
                </div>
                <span className="text-xs font-mono text-slate-300">
                  {dbUser._count.addresses}
                </span>
              </Link>

              <Link
                href={ROUTES.DASHBOARD.ORDERS}
                className="flex items-center justify-between p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-slate-400" />
                  <span>Historique des commandes</span>
                </div>
                <span className="text-xs font-mono text-slate-300">
                  {dbUser._count.orders}
                </span>
              </Link>
            </nav>
          </div>

          <div className="p-5 border border-slate-800/80 rounded-lg bg-slate-900/60 backdrop-blur-md flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-white flex items-center gap-2">
              <KeyRound className="h-3.5 w-3.5 text-slate-400" />
              Confidentialité & Sécurité
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vos données personnelles sont protégées par chiffrement et ne sont partagées avec aucun tiers non autorisé.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Statut de protection</span>
              <span className="text-emerald-400 font-medium">Sécurisé</span>
            </div>
          </div>
        </aside>

        {/* Volet droit : Formulaire et personnalisation */}
        <main className="lg:col-span-8">
          <div className="bg-slate-950/60 backdrop-blur-md border border-slate-800/80 p-6 md:p-8 rounded-lg">
            <ProfileForm
              initialData={{
                prenom: dbUser.prenom,
                nom: dbUser.nom,
                email: dbUser.email,
                telephone: dbUser.telephone,
                avatarUrl: dbUser.avatarUrl,
                createdAt: dbUser.createdAt,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
