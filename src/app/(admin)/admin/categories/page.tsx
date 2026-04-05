import React from 'react';
import prisma from "@/lib/prisma/client";
import { Button } from '@/components/ui/Button';
import { Plus, Edit3, Trash2, Layers, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { nom: 'asc' },
  });

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase mb-2">
            Gestion des <span className="text-accent italic">Catégories</span>
          </h1>
          <p className="text-sm font-medium text-text-muted">
            Organisez votre catalogue par thématiques pour une meilleure navigation.
          </p>
        </div>
        <Link href={ROUTES.ADMIN.CATEGORY_NEW}>
          <Button className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-3" />
            Nouvelle Catégorie
          </Button>
        </Link>
      </header>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="bg-surface rounded-3xl p-8 border border-border shadow-sm hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all group relative overflow-hidden">
             {/* Icon Background */}
             <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>
             
             <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-accent-light text-accent flex items-center justify-center">
                   <Layers className="h-7 w-7" />
                </div>
                <div className="flex items-center gap-2">
                    <Link href={ROUTES.ADMIN.CATEGORY_EDIT(category.id)}>
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-text-hint hover:text-accent hover:bg-accent-light transition-all">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-text-hint hover:text-danger hover:bg-danger-bg transition-all">
                       <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
             </div>

             <div className="flex flex-col relative z-10">
                <h3 className="text-xl font-black text-text-primary tracking-tight mb-2 group-hover:text-accent transition-colors">{category.nom}</h3>
                <p className="text-xs font-bold text-text-hint uppercase tracking-widest mb-6">Slug: {category.slug}</p>
                <div className="flex items-center justify-between pt-6 border-t border-border">
                   <span className="text-xs font-black uppercase text-accent tracking-widest">
                      {category._count.products} Produits
                   </span>
                   <Link href={ROUTES.CATEGORY_DETAIL(category.slug)} target="_blank">
                      <ArrowUpRight className="h-4 w-4 text-text-hint hover:text-accent cursor-pointer" />
                   </Link>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
