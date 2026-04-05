import React from "react";
import prisma from "@/lib/prisma/client";
import { CategoriesTable } from "@/components/admin/CategoriesTable/CategoriesTable";

interface CategoriesPageProps {
  searchParams?: {
    page?: string;
  };
}

const PAGE_SIZE = 8;

export default async function AdminCategoriesPage({
  searchParams,
}: Readonly<CategoriesPageProps>) {
  const currentPage = Math.max(1, Number(searchParams?.page || "1"));

  const [totalCount, categories] = await Promise.all([
    prisma.category.count(),
    prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { nom: "asc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <CategoriesTable
      categories={categories}
      totalCount={totalCount}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
