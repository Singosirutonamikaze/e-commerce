"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Eye } from "lucide-react";
import { ProductWithImages } from "@/types";
import { ROUTES } from "@/lib/utils/constants/routes";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface CatalogTableProps {
  products: ProductWithImages[];
}

export function CatalogTable({ products }: Readonly<CatalogTableProps>) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!products || products.length === 0) {
    return (
      <div className="border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-8 text-center">
        <p className="text-xs font-medium text-slate-400">
          Aucun produit disponible dans le catalogue.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-800/80 bg-slate-900/60">
            <th className="px-6 py-3.5 text-left font-semibold text-slate-300">
              Produit
            </th>
            <th className="px-6 py-3.5 text-left font-semibold text-slate-300">
              Catégorie
            </th>
            <th className="px-6 py-3.5 text-right font-semibold text-slate-300">
              Prix
            </th>
            <th className="px-6 py-3.5 text-center font-semibold text-slate-300">
              Disponibilité
            </th>
            <th className="px-6 py-3.5 text-center font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {products.map((product) => {
            const isAvailable = product.estVisible && product.stock > 0;

            return (
              <React.Fragment key={product.id}>
                <tr className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-3.5">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === product.id ? null : product.id,
                        )
                      }
                      className="flex items-center gap-3 w-full text-left group"
                    >
                      {product.images?.[0]?.url && (
                        <div className="relative h-10 w-10 bg-slate-900 border border-slate-800 shrink-0 overflow-hidden">
                          <Image
                            src={product.images[0].url}
                            alt={product.nom}
                            fill
                            sizes="40px"
                            className="object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-white group-hover:text-slate-200">
                          {product.nom}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {product.slug}
                        </p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          expandedId === product.id ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-3.5 text-slate-300">
                    {product.categorie?.nom || "Non classé"}
                  </td>
                  <td className="px-6 py-3.5 text-right font-semibold text-white tabular-nums">
                    {formatPrice(Number(product.prix))}
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-medium border rounded-sm",
                        isAvailable
                          ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/50"
                          : "bg-rose-950/40 text-rose-400 border-rose-800/50",
                      )}
                    >
                      {isAvailable ? `${product.stock} en stock` : "Épuisé"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <Link
                      href={ROUTES.DASHBOARD.PRODUCT_DETAIL(product.slug)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-slate-300 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Voir</span>
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
