'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@prisma/client';
import { ROUTES } from '@/lib/utils/constants/routes';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
      {categories.map((cat) => (
        <div key={cat.id} className="group flex flex-col gap-6">
          <Link 
            href={ROUTES.CATEGORY_DETAIL(cat.slug)} 
            className="group block relative overflow-hidden rounded-sm bg-neutral-50 border border-neutral-100 transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.05]"
          >
            {/* Background Image with Aspect Ratio */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Image 
                  src={cat.imageUrl || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'} 
                  alt={cat.nom} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Discrete Label */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-sm shadow-sm">
                   <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black">
                      Édition {new Date().getFullYear()}
                   </span>
                </div>
            </div>
            
            {/* Content Container - Sharp & Pro */}
            <div className="p-8 flex flex-col items-start gap-4 bg-white group-hover:bg-neutral-50 transition-colors duration-500">
               <div className="flex items-center justify-between w-full">
                  <ArrowUpRight className="h-4 w-4 text-neutral-300 group-hover:text-black transition-all" />
               </div>
               
               <div className="flex flex-col">
                  <h3 className="text-xl font-bold tracking-tight text-black uppercase">
                    {cat.nom}
                  </h3>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400 mt-2">
                     Explorer la collection
                  </p>
               </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
