import prisma from "@/lib/prisma/client";
import { ProductsHeader } from "@/components/admin/ProductsHeader/ProductsHeader";
import { ProductsFilters } from "@/components/admin/ProductsFilters/ProductsFilters";
import { ProductsTable } from "@/components/admin/ProductsTable/ProductsTable";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      categorie: true,
      images: { orderBy: { ordre: "asc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  const productsForUI = products.map((product) => ({
    ...product,
    prix: Number(product.prix),
    ancienPrix: product.ancienPrix ? Number(product.ancienPrix) : null,
  }));

  return (
    <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
      <ProductsHeader />
      <ProductsFilters totalProducts={productsForUI.length} />
      <ProductsTable products={productsForUI} />
    </div>
  );
}
