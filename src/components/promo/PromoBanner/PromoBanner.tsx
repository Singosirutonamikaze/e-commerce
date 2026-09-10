"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-sm border border-slate-800/90 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 shrink-0 rounded-sm bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
            <Tag className="h-4 w-4" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded-sm border border-slate-800">
                Privilège
              </span>
              <span className="text-xs font-semibold text-white">
                -{isPercentage ? Math.floor(promo.reduction) : promo.reduction}
                {isPercentage ? "%" : " FCFA"}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal">
              Utiliser le code <span className="font-mono text-white bg-slate-800 px-1.5 py-0.5 rounded-sm">{promo.code}</span> dès {promo.montantMinimum ? new Intl.NumberFormat("fr-FR").format(promo.montantMinimum) : 0} FCFA.
            </p>
          </div>
        </div>

        <Link href={ROUTES.PRODUCTS} className="shrink-0">
          <Button
            size="sm"
            className="h-8 px-4 rounded-sm bg-white text-slate-950 hover:bg-slate-200 text-xs font-semibold transition-all"
          >
            Profiter de l&apos;offre
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
