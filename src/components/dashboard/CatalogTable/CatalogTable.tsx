"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ShoppingBag, Eye } from "lucide-react";
import { ProductWithImages } from "@/types";
import { ROUTES } from "@/lib/utils/constants/routes";
import { formatPrice } from "@/lib/utils/format";

interface CatalogTableProps {
  products: ProductWithImages[];
}

export function CatalogTable({ products }: Readonly<CatalogTableProps>) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStockClassName = (stock: number): string => {
    if (stock > 5) return "bg-green-50 text-green-700";
    if (stock > 0) return "bg-yellow-50 text-yellow-700";
    return "bg-red-50 text-red-700";
  };

  if (!products || products.length === 0) {
    return (
      <div className="rounded-sm border border-neutral-200 bg-white p-8 text-center">
        <p className="text-sm font-bold text-neutral-400">
          Aucun produit disponible
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
              Produit
            </th>
            <th className="px-6 py-4 text-left font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Catégorie
            </th>
            <th className="px-6 py-4 text-right font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Prix
            </th>
            <th className="px-6 py-4 text-center font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Stock
            </th>
            <th className="px-6 py-4 text-center font-bold text-neutral-700 text-[11px] uppercase tracking-widest">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === product.id ? null : product.id,
                      )
                    }
                    className="flex items-center gap-3 w-full group"
                  >
                    {product.images?.[0] && (
                      <div className="relative h-12 w-12 rounded-sm overflow-hidden bg-neutral-100 shrink-0">
                        <Image
                          src={product.images[0].url}
                          alt={product.nom}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="text-left flex-1">
                      <p className="text-sm font-bold text-black truncate">
                        {product.nom}
                      </p>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-400 transition-transform shrink-0 ${
                        expandedId === product.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-neutral-600">
                    {product.categorie?.nom || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-baseline justify-end gap-2">
                    <span className="font-bold text-black">
                      {formatPrice(product.prix)}
                    </span>
                    {product.ancienPrix && (
                      <span className="text-xs text-neutral-400 line-through">
                        {formatPrice(product.ancienPrix)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div
                    className={`inline-flex px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${getStockClassName(
                      product.stock,
                    )}`}
                  >
                    {product.stock}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    href={ROUTES.DASHBOARD.PRODUCT_DETAIL(product.slug)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-sm border border-neutral-200 text-neutral-700 hover:border-black hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Détails
                  </Link>
                </td>
              </tr>

              {expandedId === product.id && (
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  <td colSpan={5} className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-2">
                          Description
                        </h4>
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Info simple */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1">
                            Catégorie
                          </p>
                          <p className="text-sm text-neutral-700">
                            {product.categorie?.nom || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1">
                            Prix
                          </p>
                          <p className="text-sm font-bold text-black">
                            {formatPrice(product.prix)}
                          </p>
                        </div>
                        <Link
                          href={ROUTES.DASHBOARD.PRODUCT_DETAIL(product.slug)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all mt-4"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Voir le produit
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
