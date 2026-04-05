'use client';

import React from 'react';
import { Button } from "@/components/ui/Button";
import { ArrowRight, TrendingUp, Zap, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { PromoBanner } from "@/components/promo/PromoBanner";
import { ROUTES } from '@/lib/utils/constants/routes';

export default function HomePage() {
  const categories = [
    { id: '1', nom: "Chaussures", slug: "chaussures", imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800", ordre: 0, parentId: null, createdAt: new Date() },
    { id: '2', nom: "Chemises", slug: "chemises", imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800", ordre: 1, parentId: null, createdAt: new Date() },
    { id: '3', nom: "Accessoires", slug: "accessoires", imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800", ordre: 2, parentId: null, createdAt: new Date() },
  ];

  const promo = {
    code: 'VELURE2024',
    reduction: 15,
    type: 'POURCENTAGE',
    montantMinimum: 100,
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg text-center px-6 pt-20 pb-32">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%)] from-accent/10"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from)_0%,_transparent_50%)] from-accent/5"></div>
        
        <div className="z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
               <div className="h-[1px] w-12 bg-accent/30"></div>
               <span className="text-sm font-black uppercase tracking-[0.3em] text-accent italic">Collection 2024</span>
               <div className="h-[1px] w-12 bg-accent/30"></div>
            </div>
            
            <h1 className="text-6xl font-black tracking-tighter text-text-primary sm:text-8xl leading-[0.9] uppercase mb-10">
              L&apos;Élégance <br />
              <span className="text-accent italic relative">
                Redéfinie
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>.
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-text-muted sm:text-xl font-medium leading-relaxed mb-12">
              Découvrez une sélection exclusive de pièces maîtresses, fusionnant 
              l&apos;artisanat traditionnel et le design contemporain pour une allure inégalée.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href={ROUTES.PRODUCTS}>
                <Button size="lg" className="h-16 px-12 text-base font-black uppercase tracking-widest shadow-2xl shadow-accent/20 rounded-2xl group overflow-hidden relative">
                  <span className="relative z-10 flex items-center gap-2">
                    Découvrir l&apos;Exclusivité
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-accent-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Button>
              </Link>
              <Link href={ROUTES.CATEGORIES}>
                <Button variant="outline" size="lg" className="h-16 px-12 text-base font-black uppercase tracking-widest rounded-2xl border-2 hover:bg-surface-alt transition-all">
                  Les Univers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements simulation */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 hidden lg:block"
        >
           <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="h-10 w-10 bg-success-bg text-success rounded-full flex items-center justify-center">
                 <TrendingUp className="h-5 w-5" />
              </div>
              <div className="text-left">
                 <p className="text-[10px] font-black uppercase text-text-hint tracking-widest">Tendance actuelle</p>
                 <p className="text-sm font-bold text-text-primary">+150% d&apos;élégance</p>
              </div>
           </div>
        </motion.div>
      </section>

      {/* Featured Categories Grid */}
      <section className="bg-bg py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-16">
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">Découvrir</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-text-primary uppercase">
                Nos <span className="text-accent italic">Incontournables</span>
              </h2>
            </div>
            <Link href={ROUTES.CATEGORIES}>
               <Button variant="ghost" className="rounded-full font-black uppercase tracking-widest text-xs h-12 px-8 border border-border group">
                  Voir tout l&apos;univers
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
               </Button>
            </Link>
          </div>

          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* Featured Promo Section */}
      <section className="px-6 py-24 bg-surface-alt/10">
        <div className="mx-auto max-w-7xl">
           <PromoBanner promo={promo} />
        </div>
      </section>

      {/* Trust & Features */}
      <section className="bg-surface py-32 relative overflow-hidden border-y border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            <div className="flex flex-col items-center text-center group">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-light text-accent mb-8 group-hover:rotate-12 transition-transform duration-300">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-text-primary mb-4">Livraison Express</h3>
              <p className="text-sm text-text-muted font-medium leading-relaxed">
                Expédition prioritaire sous 24h. L&apos;excellence n&apos;attend pas, votre style non plus.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-light text-accent mb-8 group-hover:-rotate-12 transition-transform duration-300">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-text-primary mb-4">Confiance Totale</h3>
              <p className="text-sm text-text-muted font-medium leading-relaxed">
                Paiements sécurisés et protection des données. Votre sérénité est notre priorité absolue.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-light text-accent mb-8 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-text-primary mb-4">Savoir-faire Unique</h3>
              <p className="text-sm text-text-muted font-medium leading-relaxed">
                Chaque pièce est sélectionnée pour son excellence artisanale et sa qualité irréprochable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Call to Action */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl bg-accent rounded-[60px] p-12 sm:p-24 relative overflow-hidden text-center shadow-2xl shadow-accent/20">
           {/* Abstract Circles */}
           <div className="absolute -top-10 -right-10 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-white/10 rounded-full blur-3xl"></div>
           
           <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-white/70 mb-6 block">Privilège Velure</span>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase mb-10 leading-tight">
                Ne manquez aucune <br />
                <span className="italic opacity-80 underline underline-offset-8 decoration-white/30">Nouveauté</span>
              </h2>
              <p className="text-white/70 font-medium text-lg mb-12">
                Inscrivez-vous à notre newsletter exclusive et recevez 
                <span className="text-white font-bold"> -10% sur votre première commande</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                 <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="flex-grow h-16 rounded-2xl bg-white/10 border border-white/20 px-6 text-white placeholder:text-white/50 focus:outline-none focus:ring-4 focus:ring-white/10 transition-all font-bold"
                 />
                 <Button className="h-16 px-10 bg-white text-accent hover:bg-white/90 rounded-2xl font-black uppercase tracking-widest shadow-xl">
                   S&apos;abonner
                 </Button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
