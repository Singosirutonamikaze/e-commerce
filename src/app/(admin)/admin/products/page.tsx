import React from 'react';
import prisma from "@/lib/prisma/client";
import { formatPrice } from "@/lib/utils/format";
import { Button } from '@/components/ui/Button';
import { Plus, Search, Edit3, Trash2, ExternalLink, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/utils/constants/routes';
import { Card } from '@/components/ui/Card';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      categorie: true,
      images: { orderBy: { ordre: 'asc' }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
      {/* Pro Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Gestion de Stock</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase">
            Répertoire des Produits
          </h1>
        </div>
        <Link href={ROUTES.ADMIN.PRODUCT_NEW}>
          <Button size="lg" className="rounded-sm h-12 px-8 flex items-center gap-3 bg-black text-white hover:bg-neutral-800 transition-all">
            <Plus className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[11px]">Nouveau Produit</span>
          </Button>
        </Link>
      </header>

      {/* Professional Filter Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="RECHERCHER PAR NOM OU SKU..." 
            className="w-full h-12 pl-12 pr-6 bg-white rounded-sm border border-neutral-200 text-[10px] font-bold uppercase tracking-widest placeholder:text-neutral-400 focus:outline-none focus:border-black transition-all"
          />
        </div>
        <div className="lg:col-span-1 relative">
           <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
           <select className="w-full h-12 pl-12 pr-10 bg-white rounded-sm border border-neutral-200 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all appearance-none cursor-pointer">
              <option>TOUTES LES CATÉGORIES</option>
              {/* Dynamic categories could go here */}
           </select>
           <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 rotate-90" />
        </div>
        <div className="lg:col-span-1 border border-neutral-200 bg-white rounded-sm h-12 flex items-center justify-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400">Total: {products.length} Items</span>
        </div>
      </div>

      {/* Clean System Table */}
      <Card className="rounded-sm border border-neutral-200 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
             <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em]">Identification</th>
                  <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center">Prix Unitaire</th>
                  <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center">Disponibilité</th>
                  <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center">Status Vente</th>
                  <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-right">Opérations</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-neutral-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative h-16 w-12 rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                           <Image 
                            src={product.images[0]?.url || '/placeholder.png'} 
                            alt={product.nom} 
                            fill 
                            className="object-cover"
                            sizes="60px"
                           />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-sm font-bold tracking-tight text-black uppercase">{product.nom}</h4>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{product.categorie?.nom || 'NON CLASSÉ'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center tabular-nums">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold text-black">{formatPrice(Number(product.prix))}</span>
                        {product.ancienPrix && (
                          <span className="text-[9px] text-neutral-400 line-through font-bold">{formatPrice(Number(product.ancienPrix))}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <div className="flex flex-col items-center gap-2">
                          <div className="flex items-baseline gap-1">
                             <span className="text-xs font-bold text-black">{product.stock}</span>
                             <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">Unités</span>
                          </div>
                          <div className="h-1 w-20 bg-neutral-100 rounded-full overflow-hidden">
                             <div 
                              style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                              className={`h-full ${product.stock > 10 ? 'bg-black' : product.stock > 0 ? 'bg-neutral-400' : 'bg-red-500'}`}
                             />
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className={`inline-flex px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm border ${product.estVisible ? 'bg-neutral-50 border-neutral-200 text-black' : 'bg-red-50 border-red-100 text-red-600'}`}>
                          {product.estVisible ? 'En Ligne' : 'Masqué'}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} target="_blank">
                           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-sm border border-neutral-200 hover:border-black transition-all">
                              <ExternalLink className="h-3.5 w-3.5" />
                           </Button>
                        </Link>
                        <Link href={ROUTES.ADMIN.PRODUCT_EDIT(product.id)}>
                           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-sm border border-neutral-200 hover:border-black transition-all">
                              <Edit3 className="h-3.5 w-3.5" />
                           </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-sm border border-neutral-200 hover:text-red-600 hover:border-red-600 transition-all">
                           <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
        <div className="p-8 border-t border-neutral-200 bg-neutral-50 flex justify-between items-center">
           <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400">Index système certifié</p>
           <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-sm text-[9px] font-bold uppercase tracking-widest border-neutral-200 hover:border-black">Précédent</Button>
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-sm text-[9px] font-bold uppercase tracking-widest border-neutral-200 hover:border-black">Suivant</Button>
           </div>
        </div>
      </Card>
    </div>
  );
}
