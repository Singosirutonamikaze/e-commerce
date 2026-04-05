'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Ticket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

interface PromoBannerProps {
  promo: {
    code: string;
    reduction: number;
    type: string;
    montantMinimum?: number;
  };
}

export function PromoBanner({ promo }: PromoBannerProps) {
  const isPercentage = promo.type === 'POURCENTAGE';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden bg-accent rounded-[60px] p-12 sm:p-24 shadow-2xl shadow-accent/30 text-white"
    >
       {/* High-End Background Patterns */}
       <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_60%)] from-white/20 -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
       <div className="absolute -bottom-20 -left-10 h-64 w-64 bg-accent-light/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 ease-in-out"></div>
       
       {/* Animated Floating Sparks */}
       <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
          <motion.div 
            animate={{ 
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 h-2 w-2 bg-white rounded-full blur-sm" 
          />
       </div>

       <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto gap-10">
          <div className="flex items-center gap-4 animate-pulse">
             <div className="h-[1px] w-12 bg-white/40"></div>
             <Sparkles className="h-6 w-6 text-white" />
             <span className="text-xs font-black uppercase tracking-[0.4em] italic text-white/80">Offre Exclusive Velure</span>
             <div className="h-[1px] w-12 bg-white/40"></div>
          </div>
          
          <div className="flex flex-col gap-4">
             <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.95]">
                Dotez-vous de<br />
                <span className="text-white/40 italic relative">L&apos;Incomparable</span>.
             </h2>
             <p className="text-lg font-medium text-white/70 max-w-xl mx-auto mt-6">
                Profitez d&apos;une réduction exceptionnelle sur l&apos;ensemble de notre catalogue prestige.
             </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-12 rounded-[48px] flex flex-col items-center gap-6 shadow-2xl transition-all hover:scale-105 duration-500">
             <div className="flex items-center gap-4 mb-4">
                <Ticket className="h-6 w-6 text-white" />
                <span className="text-sm font-black uppercase tracking-widest italic opacity-60">Code d&apos;accès privilège</span>
             </div>
             
             <div className="flex flex-col items-center gap-2">
                <h3 className="text-6xl sm:text-8xl font-black tracking-tighter text-white uppercase tabular-nums">
                   -{isPercentage ? Math.floor(promo.reduction) : promo.reduction}
                   <span className="text-4xl text-white/50 ml-2">{isPercentage ? '%' : '€'}</span>
                </h3>
                <div className="px-10 py-5 bg-white text-accent rounded-3xl font-black text-3xl sm:text-4xl shadow-xl tracking-[0.1em] transition-all hover:rotate-3 cursor-pointer group-hover:scale-110 duration-300">
                   {promo.code}
                </div>
             </div>
             
             <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-4 italic">
                Dès {promo.montantMinimum || 0} € d&apos;achat • Limité dans le temps
             </p>
          </div>

          <Link href={ROUTES.PRODUCTS}>
            <Button className="h-16 px-14 bg-white text-accent hover:bg-white/90 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-black/10 group overflow-hidden relative">
               <span className="relative z-10 flex items-center gap-3">
                  Utiliser maintenant
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
               </span>
               <div className="absolute inset-0 bg-surface-alt -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Button>
          </Link>
       </div>
    </motion.div>
  );
}
