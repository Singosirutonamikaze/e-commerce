import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Shield, ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Notre identité",
      content:
        "La boutique en ligne est gérée par Velure, située au quartier administratif de Lomé, au Togo. Pour toute question, vous pouvez contacter notre service client à contact@velure.tg ou au +228 90 00 00 00.",
    },
    {
      title: "2. Les commandes et les prix",
      content:
        "Tous les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises. Dès confirmation, la préparation de vos articles s'effectue immédiatement pour un envoi sous 24 à 48 heures.",
    },
    {
      title: "3. Vos données personnelles",
      content:
        "Vos informations (nom, adresse, contact) sont collectées exclusivement pour le bon acheminement de vos commandes. Elles ne sont ni cédées ni vendues à des tiers.",
    },
    {
      title: "4. Sécurité des transactions",
      content:
        "Toutes les transactions effectuées par carte bancaire ou Mobile Money sont protégées et chiffrées par des passerelles de paiement bancaires sécurisées.",
    },
    {
      title: "5. Retours et remboursements",
      content:
        "Vous bénéficiez d'un délai de 14 jours francs pour retourner un article non porté et dans son emballage d'origine pour obtenir un remboursement intégral.",
    },
  ];

  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-800/80 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-slate-400">
              Légal
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Politique de confidentialité
          </h1>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
            Découvrez nos engagements pour la protection de vos données personnelles et la transparence de nos services.
          </p>
        </header>

        <div className="space-y-4 mb-12">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="p-6 rounded-sm bg-slate-950/60 backdrop-blur-md border border-slate-800/80 flex flex-col gap-2"
            >
              <h2 className="text-xs font-semibold text-white">
                {sec.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-sm bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-slate-400 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-white">
                Protection garantie
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Vos données sont chiffrées et protégées selon les normes de sécurité en vigueur.
              </p>
            </div>
          </div>
          <Link
            href={ROUTES.HOME}
            className="text-xs font-medium text-white hover:text-slate-300 flex items-center gap-1 transition-colors shrink-0"
          >
            Retourner à l&apos;accueil
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
