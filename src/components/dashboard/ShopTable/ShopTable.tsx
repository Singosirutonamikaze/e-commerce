"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Category } from "@prisma/client";
import { ROUTES } from "@/lib/utils/constants/routes";

interface ShopTableProps {
  categories: Category[];
}

export function ShopTable({ categories }: Readonly<ShopTableProps>) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!categories || categories.length === 0) {
    return (
      <div className="border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-8 text-center">
        <p className="text-xs font-medium text-slate-400">
          Aucune catégorie disponible.
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
              Univers
            </th>
            <th className="px-6 py-3.5 text-left font-semibold text-slate-300">
              Identifiant (slug)
            </th>
            <th className="px-6 py-3.5 text-center font-semibold text-slate-300">
              Ordre
            </th>
            <th className="px-6 py-3.5 text-center font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="px-6 py-3.5">
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === category.id ? null : category.id,
                      )
                    }
                    className="flex items-center gap-3 w-full text-left group"
                  >
                    {category.imageUrl && (
                      <div className="relative h-10 w-10 bg-slate-900 border border-slate-800 shrink-0 overflow-hidden">
                        <Image
                          src={category.imageUrl}
                          alt={category.nom}
                          fill
                          sizes="40px"
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-white group-hover:text-slate-200">
                        {category.nom}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        expandedId === category.id ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">
                  {category.slug}
                </td>
                <td className="px-6 py-3.5 text-center font-mono text-[11px] text-slate-300">
                  {category.ordre}
                </td>
                <td className="px-6 py-3.5 text-center">
                  <Link
                    href={ROUTES.DASHBOARD.CATEGORY_DETAIL(category.slug)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-slate-300 transition-colors"
                  >
                    <span>Explorer</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
