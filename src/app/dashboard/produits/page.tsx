import { ProductGrid } from "@/components/product/ProductGrid/ProductGrid";
import { getProducts } from "@/lib/actions/product.actions";

export default async function DashboardProduitsPage() {
  const products = await getProducts({});

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-400 text-style-font text-style-font-static">
          Dashboard / Produits
        </span>
        <h2 className="text-3xl font-bold text-black text-style-font text-style-font-static">
          Produits disponibles
        </h2>
        <p className="max-w-2xl text-sm font-medium text-neutral-500">
          Vue produits dediee au dashboard, independante des autres modules.
        </p>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
