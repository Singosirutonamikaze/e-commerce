'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '@prisma/client';
import { ROUTES } from '@/lib/utils/constants/routes';

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {categories.map((cat) => (
        <motion.div key={cat.id} variants={item}>
          <Link 
            href={ROUTES.CATEGORY_DETAIL(cat.slug)} 
            className="group relative block aspect-[4/5] overflow-hidden rounded-[40px] bg-surface-alt shadow-2xl transition-all hover:-translate-y-4 duration-500"
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
            
            {/* Background Image */}
            <Image 
              src={cat.imageUrl || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'} 
              alt={cat.nom} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            
            {/* Content Container */}
            <div className="absolute bottom-12 left-12 right-12 z-20 flex flex-col items-start">
               <div className="h-[2px] w-12 bg-white/40 mb-6 transition-all group-hover:w-24 group-hover:bg-accent duration-500"></div>
               
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3 italic">
                 Découvrez la collection
               </span>
               
               <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-8 transition-colors group-hover:text-accent">
                 {cat.nom}
               </h3>
               
               <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                 <span>Explorer</span>
                 <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all group-hover:bg-accent group-hover:border-accent">
                   <ArrowRight className="h-5 w-5 text-white" />
                 </div>
               </div>
            </div>
            
            {/* Reflection Effect */}
            <div className="absolute inset-0 z-15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-0 right-0 h-full w-[20%] bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:-translate-x-[400%] transition-transform duration-1000 ease-in-out"></div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
