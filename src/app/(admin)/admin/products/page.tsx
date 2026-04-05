import React from 'react';
import prisma from "@/lib/prisma/client";
import { formatPrice } from "@/lib/utils/format";
import { Button } from '@/components/ui/Button';
import { Plus, Search, Edit3, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      categorie: true,
      images: { orderBy: { ordre: 'asc' }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase mb-2">
            Gestion des <span className="text-accent italic">Produits</span>
          </h1>
          <p className="text-sm font-medium text-text-muted">
            Ajoutez, modifiez ou supprimez des articles de votre catalogue Velure.
          </p>
        </div>
        <Link href={ROUTES.ADMIN.PRODUCT_NEW}>
          <Button className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-3" />
            Nouveau Produit
          </Button>
        </Link>
      </header>

      {/* Filters & Search */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-hint" />
          <input 
            type="text" 
            placeholder="Rechercher un produit..." 
            className="w-full h-12 pl-12 pr-4 bg-surface-alt/50 rounded-2xl border border-border focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none text-sm font-bold"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select className="h-12 px-6 bg-surface-alt/50 rounded-2xl border border-border text-sm font-bold focus:ring-2 focus:ring-accent/50 outline-none appearance-none cursor-pointer flex-grow md:flex-grow-0">
             <option>Toutes les catégories</option>
             <option>Chaussures</option>
             <option>Chemises</option>
          </select>
          <select className="h-12 px-6 bg-surface-alt/50 rounded-2xl border border-border text-sm font-bold focus:ring-2 focus:ring-accent/50 outline-none appearance-none cursor-pointer flex-grow md:flex-grow-0">
             <option>Derniers ajouts</option>
             <option>Prix croissant</option>
             <option>Stock bas</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <section className="bg-surface rounded-[32px] border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-fixed min-w-[900px]">
             <thead>
                <tr className="bg-surface-alt/30 border-b border-border">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/3">Produit</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/6 text-center">Prix</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/6 text-center">Stock</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/6 text-center">Statut</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-hint tracking-widest w-1/6 text-right">Actions</th>
                </tr>
             </thead>
             <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-surface-alt/10 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative h-16 w-14 rounded-xl overflow-hidden bg-surface-alt border border-border shrink-0">
                           <Image 
                            src={product.images[0]?.url || '/placeholder.png'} 
                            alt={product.nom} 
                            fill 
                            className="object-cover"
                            sizes="60px"
                           />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-sm font-black text-text-primary truncate group-hover:text-accent transition-colors">{product.nom}</h4>
                          <span className="text-[10px] font-bold text-text-hint uppercase tracking-widest mt-0.5">{product.categorie?.nom}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-sm font-black text-text-primary">{formatPrice(Number(product.prix))}</span>
                      {product.ancienPrix && (
                        <p className="text-[10px] text-text-hint line-through font-bold mt-0.5">{formatPrice(Number(product.ancienPrix))}</p>
                      )}
                    </td>
                    <td className="px-8 py-6 text-center">
                       <div className="flex flex-col items-center gap-1.5">
                          <span className="text-sm font-bold text-text-primary">{product.stock}</span>
                          <div className="h-1 w-12 bg-surface-alt rounded-full overflow-hidden">
                             <div 
                              className={`h-full rounded-full ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}
                              style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                             ></div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${product.estVisible ? 'bg-success-bg text-success shadow-sm' : 'bg-surface-alt text-text-hint border border-border'}`}>
                          {product.estVisible ? 'Visible' : 'Masqué'}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} target="_blank">
                           <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-text-hint hover:text-accent hover:bg-accent-light transition-all">
                              <ExternalLink className="h-4 w-4" />
                           </Button>
                        </Link>
                        <Link href={ROUTES.ADMIN.PRODUCT_EDIT(product.id)}>
                           <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-text-hint hover:text-accent hover:bg-accent-light transition-all">
                              <Edit3 className="h-4 w-4" />
                           </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl text-text-hint hover:text-danger hover:bg-danger-bg transition-all">
                           <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
