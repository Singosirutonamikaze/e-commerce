import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";
import { Truck, ShieldCheck, Clock, ChevronRight } from "lucide-react";

export default function ShippingPage() {
  const options = [
    {
      title: "Livraison standard (Togo)",
      delay: "24 à 48 heures ouvrées",
      price: "5 000 FCFA",
      note: "Expédition offerte dès 100 000 FCFA d'achats.",
      icon: Truck,
    },
    {
      title: "Express coursier (Lomé)",
      delay: "Le jour même (commandes passées avant 14h)",
      price: "10 000 FCFA",
      note: "Service réservé exclusivement aux résidents de Lomé.",
      icon: Clock,
    },
  ];

  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-800/80 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-slate-400">
              Services
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Expédition et livraison
          </h1>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
            Toutes nos pièces sont conditionnées avec le plus grand soin et expédiées de façon sécurisée.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="p-6 rounded-sm bg-slate-950/60 backdrop-blur-md border border-slate-800/80 flex flex-col justify-between gap-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-white">
                    {opt.title}
                  </span>
                  <span className="text-xs text-slate-400">
                    {opt.delay}
                  </span>
                </div>
                <div className="h-8 w-8 rounded-sm bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                  <opt.icon className="h-4 w-4" />
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Tarif
                </span>
                <span className="text-xs font-semibold text-white">
                  {opt.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <section className="p-6 rounded-sm bg-slate-950/60 backdrop-blur-md border border-slate-800/80 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-slate-400" />
            <h2 className="text-xs font-semibold text-white">
              Processus d&apos;expédition
            </h2>
          </div>
          <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
            <p>
              Toute commande validée avant 14h00 (heure de Lomé) est traitée par notre atelier d&apos;expédition le jour même. Les commandes passées après cet horaire sont expédiées le jour ouvré suivant.
            </p>
            <p>
              Un numéro de suivi vous est transmis dès la prise en charge du colis. Chaque pièce fait l&apos;objet d&apos;un contrôle rigoureux avant son emballage.
            </p>
          </div>
        </section>

        <div className="p-6 rounded-sm bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Besoin d&apos;une livraison spéciale ?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Contactez notre service client pour les envois régionaux ou internationaux.
            </p>
          </div>
          <Link
            href={ROUTES.HOME}
            className="text-xs font-medium text-white hover:text-slate-300 flex items-center gap-1 transition-colors"
          >
            Retourner à l&apos;accueil
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
