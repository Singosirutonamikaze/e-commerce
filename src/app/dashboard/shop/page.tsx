import { getCategories } from "@/lib/actions/category";
import { ShopTable } from "@/components/dashboard/ShopTable/ShopTable";

export default async function DashboardShopPage() {
  const categories = await getCategories();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-slate-400">
            Univers
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
          Exploration des univers
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Accédez à l&apos;ensemble des collections et catégories de la boutique.
        </p>
      </div>

      {categories.length > 0 ? (
        <ShopTable categories={categories} />
      ) : (
        <div className="border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-8 text-center">
          <p className="text-xs font-medium text-slate-400">
            Aucune catégorie disponible actuellement.
          </p>
        </div>
      )}
    </section>
  );
}
