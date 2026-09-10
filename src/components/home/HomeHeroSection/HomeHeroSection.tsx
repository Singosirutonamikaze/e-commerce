import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/utils/constants/routes";
import hero from "@/assets/hero.png";

/**
 * The Hero section component displayed on the home page.
 *
 * @returns The Hero section component.
 * @author SINGO Yao Dieu Donné
 * @since 2026-09-10
 */
export function HomeHeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center border-b border-slate-800/80 bg-transparent px-6 lg:px-12 pt-20 pb-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md w-fit">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium tracking-wide text-slate-300">
              Édition Limitée • 2026
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.18] font-normal">
            L&apos;élégance contemporaine en toute simplicité
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            Une sélection de vêtements et accessoires aux coupes épurées et matières nobles, conçus pour traverser le temps avec justesse.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={ROUTES.PRODUCTS}>
              <Button
                size="sm"
                className="h-10 rounded-sm px-6 bg-white text-slate-950 hover:bg-slate-200 transition-all text-xs font-semibold shadow-sm"
              >
                Découvrir le vestiaire
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={ROUTES.CATEGORIES}>
              <Button
                variant="outline"
                size="sm"
                className="h-10 rounded-sm px-6 border-slate-700 bg-slate-900/60 backdrop-blur-md text-slate-200 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold shadow-sm"
              >
                Nos catégories
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 max-w-lg mt-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">100%</span>
                <span className="text-[11px] text-slate-400">Matières nobles</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Truck className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">24/48h</span>
                <span className="text-[11px] text-slate-400">Livraison soignée</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">14 jours</span>
                <span className="text-[11px] text-slate-400">Retours garantis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative aspect-[3/4] w-full max-w-md max-h-[460px] bg-slate-950/70 backdrop-blur-md rounded-sm overflow-hidden border border-slate-800 shadow-2xl group">
            <Image
              src={hero}
              alt="Velure collection"
              width={1200}
              height={1600}
              priority
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono text-[10px] uppercase text-slate-400">Atelier Velure</span>
              <span className="font-mono text-[10px] text-slate-400">Série N°01</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
