import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { getProducts } from "@/lib/actions/product";

export default async function ProductsPage() {
  const products = await getProducts({});

  return (
    <main className="pt-28 pb-16 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">
              Catalogue
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Tous nos produits
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl leading-relaxed">
              Découvrez notre sélection de pièces aux coupes épurées et matières nobles.
            </p>
          </div>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {products.length} {products.length > 1 ? "produits disponibles" : "produit disponible"}
          </span>

          <select
            title="Trier les produits"
            className="bg-slate-900 border border-slate-800 rounded-sm px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-slate-600 cursor-pointer"
          >
            <option>Plus récents</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
          </select>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
