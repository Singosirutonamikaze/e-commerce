import { Search, Filter, ChevronRight } from "lucide-react";

interface ProductsFiltersProps {
  totalProducts: number;
}

export function ProductsFilters({
  totalProducts,
}: Readonly<ProductsFiltersProps>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Search Input */}
      <div className="lg:col-span-2 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
        <input
          type="text"
          placeholder="RECHERCHER PAR NOM OU SKU..."
          className="w-full h-12 pl-12 pr-6 bg-white rounded-sm border border-neutral-200 text-[10px] font-bold uppercase tracking-widest placeholder:text-neutral-400 focus:outline-none focus:border-black transition-all"
        />
      </div>

      {/* Category Filter */}
      <div className="lg:col-span-1 relative">
        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
        <select
          title="Filtrer par catégorie"
          className="w-full h-12 pl-12 pr-10 bg-white rounded-sm border border-neutral-200 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all appearance-none cursor-pointer"
        >
          <option>TOUTES LES CATÉGORIES</option>
        </select>
        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 rotate-90" />
      </div>

      {/* Total Counter */}
      <div className="lg:col-span-1 border border-neutral-200 bg-white rounded-sm h-12 flex items-center justify-center">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-400">
          Total: {totalProducts} Items
        </span>
      </div>
    </div>
  );
}
