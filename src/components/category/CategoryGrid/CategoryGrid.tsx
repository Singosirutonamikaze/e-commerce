"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@prisma/client";
import { ROUTES } from "@/lib/utils/constants/routes";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: Readonly<CategoryGridProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((cat, index) => (
        <Link
          key={cat.id}
          href={ROUTES.CATEGORY_DETAIL(cat.slug)}
          className="group relative h-64 sm:h-72 rounded-sm overflow-hidden border border-slate-800/80 bg-slate-950/80 p-5 flex flex-col justify-between transition-all duration-300 hover:border-slate-700"
        >
          <Image
            src={
              cat.imageUrl ||
              "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
            }
            alt={cat.nom}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50"
          />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">
              0{index + 1}
            </span>
            <div className="h-6 w-6 rounded-sm bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-slate-700 transition-all">
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-base font-semibold text-white lowercase">
              {cat.nom}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
