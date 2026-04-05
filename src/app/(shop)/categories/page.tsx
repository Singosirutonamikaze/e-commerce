import React from "react";
import { getCategories } from "@/lib/actions/category.actions";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Collections | Catalogue",
  description:
    "Explorez les univers de nos collections. Chaussures, vêtements et accessoires de luxe.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-20 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-accent">
              Catalogue Officiel
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-black leading-[1.1] mb-8">
            Explorez nos
            <br />
            collections
          </h1>

          <p className="max-w-2xl text-sm font-medium text-text-muted leading-relaxed">
            Plongez dans l&apos;univers à travers nos différentes catégories.
            Chaque collection est une invitation à redécouvrir l&apos;élégance
            contemporaine.
          </p>
        </div>

        {categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-hint font-bold uppercase tracking-widest text-sm">
              Aucune catégorie disponible pour le moment.
            </p>
          </div>
        )}

        <div className="mt-32 p-12 rounded-sm bg-surface-alt/30 border border-border flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold text-text-primary uppercase tracking-tight mb-4 italic">
            Besoin d&apos;un conseil personnalisé ?
          </h3>
          <p className="text-sm text-text-muted font-medium max-w-md mb-8 leading-relaxed">
            Nos conseillers sont disponibles via le chat pour vous aider à
            trouver la pièce parfaite dans nos collections.
          </p>
        </div>
      </div>
    </div>
  );
}
