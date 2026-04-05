"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ROUTES } from "@/lib/utils/constants/routes";

interface PromoBannerProps {
  promo: {
    code: string;
    reduction: number;
    type: string;
    montantMinimum?: number;
  };
}

export function PromoBanner({ promo }: Readonly<PromoBannerProps>) {
  const isPercentage = promo.type === "POURCENTAGE";

  return (
    <div className="group relative overflow-hidden bg-neutral-50 border border-neutral-100 rounded-sm p-12 md:p-20 text-center flex flex-col items-center gap-10">
      {/* Architectural Accents */}
      <div className="absolute top-0 right-0 h-48 w-48 bg-black/3 -translate-y-1/2 translate-x-1/2 rotate-45"></div>
      <div className="absolute bottom-0 left-0 h-32 w-32 border-l border-b border-neutral-200 -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-20 flex flex-col items-center max-w-2xl mx-auto gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black uppercase leading-tight">
            Offre Privilège
          </h2>
          <p className="text-sm font-medium text-neutral-500 leading-relaxed max-w-lg mx-auto px-8 border-x border-neutral-100">
            Des conditions exceptionnelles sur nos sélections. Renouvelez votre
            garde-robe avec Velure.
          </p>
        </div>

        {/* Sharp Promo Identity */}
        <div className="w-full max-w-sm bg-white p-10 border border-neutral-200 rounded-sm flex flex-col items-center gap-6 shadow-sm hover:border-black transition-all">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-300">
              Réduction Immédiate
            </span>
            <p className="text-5xl font-bold text-black tabular-nums">
              -{isPercentage ? Math.floor(promo.reduction) : promo.reduction}
              {isPercentage ? "%" : " FCFA"}
            </p>
          </div>

          <div className="w-full flex flex-col gap-3 pt-6 border-t border-neutral-100">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              Code Promo
            </span>
            <div className="h-14 bg-black text-white rounded-sm flex items-center justify-center font-bold text-xl tracking-[0.4em] select-all cursor-copy">
              {promo.code}
            </div>
          </div>

          <p className="text-[10px] font-medium text-neutral-500">
            Dès{" "}
            {promo.montantMinimum
              ? new Intl.NumberFormat("fr-FR").format(promo.montantMinimum)
              : 0}{" "}
            FCFA d&apos;achats &bull; Sur une sélection d&apos;articles
          </p>
        </div>

        <Link href={ROUTES.PRODUCTS}>
          <Button
            variant="outline"
            className="h-12 px-12 rounded-sm border-black text-black text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-black hover:text-white transition-all"
          >
            Visualiser le Catalogue
          </Button>
        </Link>
      </div>
    </div>
  );
}
