import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { PromoBanner } from "@/components/promo/PromoBanner";
import { ROUTES } from "@/lib/utils/constants/routes";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const FEATURES = [
  {
    title: "Qualité Artisanale",
    desc: "Un savoir-faire unique avec des matériaux d'exception pour un style durable.",
  },
  {
    title: "Service Client",
    desc: "Une navigation fluide et un service client dédié à votre satisfaction.",
  },
  {
    title: "Authenticité Garantie",
    desc: "Toutes nos pièces sont certifiées et soigneusement sélectionnées par nos experts.",
  },
];
export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(ROUTES.DASHBOARD.ROOT);
  }

  const categories = [
    {
      id: "1",
      nom: "Chaussures",
      slug: "chaussures",
      imageUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
      ordre: 0,
      parentId: null,
      createdAt: new Date(),
    },
    {
      id: "2",
      nom: "Chemises",
      slug: "chemises",
      imageUrl:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
      ordre: 1,
      parentId: null,
      createdAt: new Date(),
    },
    {
      id: "3",
      nom: "Accessoires",
      slug: "accessoires",
      imageUrl:
        "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800",
      ordre: 2,
      parentId: null,
      createdAt: new Date(),
    },
  ];

  const promo = {
    code: "SEASON-2026",
    reduction: 15,
    type: "POURCENTAGE",
    montantMinimum: 50000,
  };

  return (
    <div className="flex flex-col bg-white">
      <HomeHeroSection />

      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-lg flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400 text-style-font text-style-font-static">
                  Nos Coups de Cœur
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase text-style-font text-style-font-static">
                NOTRE SÉLECTION
              </h2>
            </div>
            <Link href={ROUTES.CATEGORIES}>
              <Button
                variant="ghost"
                className="rounded-sm border border-neutral-100 h-10 px-8 text-[9px] font-bold uppercase tracking-widest hover:border-black transition-all"
              >
                TOUT EXPLORER
              </Button>
            </Link>
          </div>

          <CategoryGrid categories={categories} />
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto rounded-sm overflow-hidden border border-neutral-100">
          <PromoBanner promo={promo} />
        </div>
      </section>

      <section className="py-24 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-16">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-5 p-8 bg-white border border-neutral-100 rounded-sm hover:border-black transition-all shadow-sm shadow-black/1"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black border-b border-neutral-100 pb-4">
                {feature.title}
              </h3>
              <p className="text-[10px] font-bold text-neutral-400 leading-relaxed max-w-xs uppercase tracking-widest">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-neutral-400">
              Newsletter
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase">
              RESTEZ CONNECTÉ À NOS NOUVEAUTÉS
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full bg-neutral-50 p-3 rounded-sm border border-neutral-100">
            <input
              type="email"
              placeholder="votre@email.com"
              className="grow h-12 bg-white border border-neutral-100 px-6 rounded-sm text-[10px] font-bold tracking-widest placeholder:text-neutral-300 focus:outline-none focus:border-black transition-all"
            />
            <Button className="h-12 px-10 rounded-sm bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-all">
              S&apos;INSCRIRE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
