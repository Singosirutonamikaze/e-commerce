import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { getProducts } from "@/lib/actions/product.actions";

export default async function ProductsPage() {
  const products = await getProducts({});

  return (
    <main className="pt-24 pb-20 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                Registre des Articles
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-black mb-6">
              Catalogue <span className="text-neutral-300">officiel</span>
            </h1>
            <p className="text-sm font-medium text-text-muted max-w-xl leading-relaxed pl-4 border-l border-neutral-100">
              Découvrez notre sélection de pièces d&apos;exception, alliant
              design moderne et matériaux d&apos;exception pour une garde-robe
              sans compromis.
            </p>
          </div>
        </header>

        {/* Filters Placeholder */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold uppercase text-text-hint tracking-widest">
              {products.length} Produits
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              title="Trier les produits"
              className="bg-surface border border-border rounded-sm px-4 py-2 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer"
            >
              <option>Les plus récents</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
