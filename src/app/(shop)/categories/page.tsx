import React from "react";
import { getCategories } from "@/lib/actions/category";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos collections | Velure",
  description: "Explorez nos collections de prêt-à-porter et accessoires.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-16 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-10 text-left">
          <span className="text-xs font-medium text-slate-400">
            Univers
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1 mb-2">
            Nos collections
          </h1>

          <p className="max-w-xl text-xs md:text-sm text-slate-400 leading-relaxed">
            Découvrez nos différentes catégories et trouvez les pièces adaptées à votre style.
          </p>
        </div>

        {categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <div className="py-16 text-center bg-slate-950/60 backdrop-blur-md rounded-sm border border-slate-800">
            <p className="text-slate-400 text-xs lowercase">
              aucune catégorie disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
