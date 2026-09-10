import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CategoryGrid } from "@/components/category/CategoryGrid";
import { PromoBanner } from "@/components/promo/PromoBanner";
import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { ROUTES } from "@/lib/utils/constants/routes";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { getCategories } from "@/lib/actions/category";
import { getProducts } from "@/lib/actions/product";
import { ShieldCheck, Truck, Clock, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Qualité artisanale",
    desc: "Confections soignées et matières sélectionnées pour une tenue durable.",
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    desc: "Expédition sécurisée avec suivi en temps réel de vos commandes.",
  },
  {
    icon: Clock,
    title: "Service client",
    desc: "Assistance dédiée pour vous accompagner dans vos choix.",
  },
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    desc: "Transactions chiffrées et protégées en toute simplicité.",
  },
];

export default async function HomePage() {
  const currentDateYears = new Date().getFullYear();

  const [dbCategories, products] = await Promise.all([
    getCategories(),
    getProducts({}),
  ]);

  const defaultCategories = [
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

  const categories = dbCategories.length > 0 ? dbCategories.slice(0, 3) : defaultCategories;
  const featuredProducts = products.slice(0, 4);

  const promo = {
    code: `season-${currentDateYears}`,
    reduction: 15,
    type: "POURCENTAGE",
    montantMinimum: 50000,
  };

  return (
    <div className="flex flex-col text-slate-100">
      <HomeHeroSection />

      <section className="py-16 bg-slate-950/40 backdrop-blur-sm border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              <h2 className="text-sm font-semibold text-white tracking-wide">
                Univers
              </h2>
            </div>
            <Link
              href={ROUTES.CATEGORIES}
              className="text-xs text-slate-400 hover:text-white transition-colors font-mono"
            >
              [Tout explorer]
            </Link>
          </div>

          <CategoryGrid categories={categories} />
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16 bg-slate-900/30 backdrop-blur-sm border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <h2 className="text-sm font-semibold text-white tracking-wide">
                  Sélection récente
                </h2>
              </div>
              <Link
                href={ROUTES.PRODUCTS}
                className="text-xs text-slate-400 hover:text-white transition-colors font-mono"
              >
                [Catalogue complet]
              </Link>
            </div>

            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto rounded-sm overflow-hidden border border-slate-800 backdrop-blur-md">
          <PromoBanner promo={promo} />
        </div>
      </section>

      <section className="py-16 bg-slate-900/20 backdrop-blur-sm border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-2.5 p-5 bg-slate-950/60 backdrop-blur-md border border-slate-800/80 rounded-sm"
            >
              <div className="h-8 w-8 rounded-sm bg-slate-900 flex items-center justify-center text-slate-300 border border-slate-800">
                <feature.icon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-md mx-auto text-center flex flex-col items-center gap-4 bg-slate-950/60 backdrop-blur-md p-8 border border-slate-800/80 rounded-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">
              Newsletter
            </span>
            <h2 className="text-xl font-bold text-white">
              Recevez nos actualités
            </h2>
            <p className="text-xs text-slate-400">
              Offres exclusives et nouveautés directement par email.
            </p>
          </div>

          <form
            onSubmit={undefined}
            className="flex flex-col sm:flex-row gap-2 w-full pt-2"
          >
            <input
              type="email"
              placeholder="votre@email.com"
              required
              className="grow h-9 bg-slate-900/80 border border-slate-800 px-3 rounded-sm text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-600 transition-all"
            />
            <Button
              type="submit"
              className="h-9 px-4 rounded-sm bg-white text-slate-950 text-xs font-semibold hover:bg-slate-200 transition-all shadow-sm shrink-0"
            >
              S&apos;inscrire
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
