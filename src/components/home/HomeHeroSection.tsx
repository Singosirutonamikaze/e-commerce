import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/utils/constants/routes";

export function HomeHeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center pt-32 pb-20 px-6 lg:px-12 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 text-style-font text-style-font-static">
              NOUVELLE COLLECTION 2024
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif text-black leading-tight text-style-font text-style-font-static">
            L&apos;élégance <br />à l&apos;état pur.
          </h1>

          <p className="max-w-md text-xs font-bold uppercase tracking-widest text-neutral-500 leading-relaxed mb-4 text-style-font text-style-font-static">
            Des pièces intemporelles et raffinées pour une garde-robe moderne.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={ROUTES.PRODUCTS}>
              <Button
                size="lg"
                className="rounded-sm px-10 bg-black text-white hover:bg-neutral-900 transition-all text-[10px] uppercase font-bold tracking-widest h-14"
              >
                Voir la Collection
                <ArrowRight className="ml-3 h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href={ROUTES.CATEGORIES}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-sm px-10 border-neutral-200 text-black hover:border-black transition-all text-[10px] uppercase font-bold tracking-widest h-14"
              >
                Catalogue Univers
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="aspect-4/5 bg-neutral-50 rounded-sm overflow-hidden border border-neutral-100 shadow-xl shadow-black/2">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68624d5517?auto=format&fit=crop&q=80&w=1200"
              alt="Velure Campaign"
              width={1200}
              height={1500}
              priority
              className="w-full h-full object-cover grayscale-30 transition-transform duration-2000 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
