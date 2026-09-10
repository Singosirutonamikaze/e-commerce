import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { getProducts } from "@/lib/actions/product";

export default async function DashboardProduitsPage() {
  const products = await getProducts({});

  return (
    <section className="space-y-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-black"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">
            Galerie Privée
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-black">
          Sélection <span className="text-neutral-300">Disponible</span>
        </h2>
        <p className="max-w-2xl text-sm font-medium text-neutral-500 leading-relaxed pl-4 border-l border-neutral-100">
          Vue immersive de nos articles. Explorez visuellement nos collections 
          directement depuis votre interface de gestion.
        </p>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
