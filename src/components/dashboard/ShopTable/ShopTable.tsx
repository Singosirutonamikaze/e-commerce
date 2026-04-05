"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Category } from "@prisma/client";
import { ROUTES } from "@/lib/utils/constants/routes";

interface ShopTableProps {
  categories: Category[];
}

export function ShopTable({ categories }: Readonly<ShopTableProps>) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!categories || categories.length === 0) {
    return (
      <div className="rounded-sm border border-neutral-200 bg-white p-8 text-center">
        <p className="text-sm font-bold text-neutral-400">
          Aucune catégorie disponible
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th className="px-6 py-4 text-left font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Univers
            </th>
            <th className="px-6 py-4 text-left font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Slug
            </th>
            <th className="px-6 py-4 text-center font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Ordre
            </th>
            <th className="px-6 py-4 text-center font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === category.id ? null : category.id,
                      )
                    }
                    className="flex items-center gap-3 w-full group"
                  >
                    {category.imageUrl && (
                      <div className="relative h-12 w-12 rounded-sm overflow-hidden bg-neutral-100 shrink-0">
                        <Image
                          src={category.imageUrl}
                          alt={category.nom}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="text-left flex-1">
                      <p className="text-sm font-bold text-black truncate">
                        {category.nom}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        ID: {category.id.slice(0, 8)}...
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-400 transition-transform shrink-0 ${
                        expandedId === category.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs font-mono bg-neutral-50 px-2 py-1 rounded text-neutral-700">
                    {category.slug}
                  </code>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-sm bg-neutral-100 text-xs font-bold text-neutral-700">
                    {category.ordre}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    href={ROUTES.CATEGORY_DETAIL(category.slug)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-sm border border-neutral-200 text-neutral-700 hover:border-black hover:text-black transition-all text-xs font-bold uppercase tracking-widest group"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Visiter
                  </Link>
                </td>
              </tr>

              {expandedId === category.id && (
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <td colSpan={4} className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Image preview */}
                      {category.imageUrl && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-3">
                            Aperçu
                          </h4>
                          <div className="relative h-40 w-full rounded-sm overflow-hidden bg-neutral-100">
                            <Image
                              src={category.imageUrl}
                              alt={category.nom}
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Info simple */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1">
                            Univers
                          </p>
                          <p className="text-sm text-neutral-700 font-semibold">
                            {category.nom}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1">
                            Créée le
                          </p>
                          <p className="text-sm text-neutral-700">
                            {new Date(category.createdAt).toLocaleDateString(
                              "fr-FR",
                            )}
                          </p>
                        </div>
                        <Link
                          href={ROUTES.CATEGORY_DETAIL(category.slug)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all mt-4"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          Explorer
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
