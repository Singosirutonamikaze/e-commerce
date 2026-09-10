import { CatalogTable } from "@/components/dashboard/CatalogTable/CatalogTable";
import { getProducts } from "@/lib/actions/product";

export default async function DashboardCataloguePage() {
  const products = await getProducts({});

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-slate-400">
            Articles
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Catalogue des produits
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Consultez l&apos;ensemble de nos articles disponibles et filtrez votre sélection.
        </p>
      </div>

      <div className="border border-slate-800/80 bg-slate-950/60 backdrop-blur-md overflow-hidden">
        <CatalogTable products={products} />
      </div>
    </section>
  );
}
