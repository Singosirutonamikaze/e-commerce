import { Card } from "@/components/ui/Card";
import { ProductRow } from "@/components/admin/ProductRow/ProductRow";
import { ProductWithImages } from "@/types";

interface ProductsTableProps {
  products: (ProductWithImages & { categorie: { nom: string } | null })[];
}

export function ProductsTable({ products }: Readonly<ProductsTableProps>) {
  if (products.length === 0) {
    return (
      <Card className="rounded-sm border border-neutral-200 shadow-sm overflow-hidden bg-white p-8 text-center">
        <p className="text-sm font-bold text-neutral-400">
          Aucun produit trouvé
        </p>
      </Card>
    );
  }

  return (
    <Card className="rounded-sm border border-neutral-200 shadow-sm overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-250">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em]">
                Identification
              </th>
              <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center">
                Prix Unitaire
              </th>
              <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center">
                Disponibilité
              </th>
              <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-center">
                Status Vente
              </th>
              <th className="px-8 py-4 text-[9px] font-bold uppercase text-neutral-500 tracking-[0.3em] text-right">
                Opérations
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
