import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid"
import { getProducts } from "@/lib/actions/product.actions"

export default async function ProductsPage() {
  const products = await getProducts({});

  return (
    <main className="pt-24 pb-20 px-6 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tighter text-text-primary uppercase">
              Catalogue <span className="text-accent italic">Velure</span>
            </h1>
            <p className="text-text-muted font-medium max-w-xl">
              Découvrez notre sélection de pièces premium, alliant design moderne et 
              matériaux d'exception pour une garde-robe sans compromis.
            </p>
          </div>
          
          <div className="h-0.5 w-16 bg-accent mt-8 rounded-full"></div>
        </header>

        {/* Filters Placeholder */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-black uppercase text-text-hint tracking-widest">
              {products.length} Produits
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <select className="bg-surface border border-border rounded-xl px-4 py-2 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer">
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
  )
}
