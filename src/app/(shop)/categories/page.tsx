import React from 'react';
import { getCategories } from '@/lib/actions/category.actions';
import { CategoryGrid } from '@/components/category/CategoryGrid';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Collections | VELURE',
  description: 'Explorez les univers de VELURE. Chaussures, vêtements et accessoires de luxe.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="relative mb-20 text-center sm:text-left">
           <div className="flex items-center justify-center sm:justify-start gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-accent-light text-accent flex items-center justify-center shadow-sm">
                 <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">
                 Catalogue Officiel
              </span>
           </div>
           
           <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-text-primary uppercase leading-[0.9] mb-8">
              Explorez nos <br />
              <span className="text-accent italic relative">
                 Collections
                 <Sparkles className="absolute -top-6 -right-10 h-12 w-12 text-accent/20 animate-pulse" />
              </span>
           </h1>
           
           <p className="max-w-2xl text-lg font-medium text-text-muted leading-relaxed">
              Plongez dans l&apos;univers VELURE à travers nos différentes catégories. 
              Chaque collection est une invitation à redécouvrir l&apos;élégance contemporaine.
           </p>

           {/* Decorative Line */}
           <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-border via-border/40 to-transparent"></div>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <div className="py-20 text-center">
             <p className="text-text-hint font-bold uppercase tracking-widest text-sm">
                Aucune catégorie disponible pour le moment.
             </p>
          </div>
        )}

        {/* Bottom Banner Placeholder */}
        <div className="mt-32 p-12 rounded-[48px] bg-surface-alt/30 border border-border flex flex-col items-center justify-center text-center">
           <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight mb-4 italic">
              Besoin d&apos;un conseil personnalisé ?
           </h3>
           <p className="text-sm text-text-muted font-medium max-w-md mb-8 leading-relaxed">
              Nos conseillers sont disponibles via le chat pour vous aider à trouver 
              la pièce parfaite dans nos collections.
           </p>
        </div>
      </div>
    </div>
  );
}
