'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg relative overflow-hidden px-6">

      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-sm blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-sm blur-[120px] pointer-events-none animate-pulse"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 max-w-2xl"
      >
        <div className="relative inline-block mb-12">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-[180px] md:text-[240px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-muted/10 select-none opacity-20"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center translate-y-10">
            <motion.div
               animate={{ 
                 y: [0, -15, 0],
                 rotate: [-2, 2, -2]
               }}
               transition={{ 
                 duration: 4, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="relative"
            >
               <Ghost className="h-32 w-32 text-accent drop-shadow-2xl" strokeWidth={1.5} />
               <div className="absolute -top-4 -right-4 h-12 w-12 bg-white rounded-sm flex items-center justify-center shadow-lg border border-border">
                  <Search className="h-6 w-6 text-accent" />
               </div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black flex items-center justify-center gap-3">
             404: RESSOURCE NON RÉPERTORIÉE
          </h1>
          <p className="text-lg font-medium text-text-muted max-w-md mx-auto leading-relaxed">
            Désolé, l&apos;adresse que vous recherchez n&apos;existe plus ou a été déplacée vers une nouvelle destination.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Button 
            asChild
            className="h-16 px-10 text-lg font-bold uppercase tracking-widest rounded-sm shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95 group"
          >
            <Link href={ROUTES.HOME}>
              <Home className="h-6 w-6 mr-3 transition-transform group-hover:-translate-y-1" />
              Retour à l&apos;accueil
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="h-16 px-10 text-lg font-bold uppercase tracking-widest rounded-sm border-2 transition-all hover:bg-surface-alt"
          >
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="h-6 w-6 mr-3" />
              Page précédente
            </button>
          </Button>
        </div>

        <p className="mt-16 text-xs font-black uppercase tracking-[0.3em] text-text-hint/40">
          Velure Premium Support — Disponible via le chat
        </p>
      </motion.div>

      <div className="hidden lg:block">
         <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/4 left-1/4 h-3 w-3 bg-accent/20 rounded-sm"></motion.div>
         <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 h-2 w-2 bg-text-hint/20 rounded-sm"></motion.div>
         <motion.div animate={{ x: [0, 40, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-2/3 left-1/3 h-4 w-4 bg-accent-light border border-accent/10 rounded-sm"></motion.div>
      </div>
    </div>
  );
}
