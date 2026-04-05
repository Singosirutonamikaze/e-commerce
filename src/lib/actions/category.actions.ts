'use server';

import prisma from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/utils/constants/routes";
import { CategoryInput } from "@/lib/utils/validators";

/**
 * Récupère toutes les catégories.
 */
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { ordre: 'asc' },
    });
  } catch (error) {
    console.error('getCategories error:', error);
    return [];
  }
}

/**
 * Admin: Crée une catégorie.
 */
export async function createCategory(data: CategoryInput) {
  try {
    const category = await prisma.category.create({
      data: {
        ...data,
        parentId: data.parentId || null,
        slug: data.nom.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      },
    });

    revalidatePath(ROUTES.ADMIN.CATEGORIES);
    return { success: true, category };
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    return { error: 'Erreur lors de la création' };
  }
}

/**
 * Admin: Met à jour une catégorie.
 */
export async function updateCategory(id: string, data: CategoryInput) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...data,
        parentId: data.parentId || null,
        slug: data.nom.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      },
    });

    revalidatePath(ROUTES.ADMIN.CATEGORIES);
    return { success: true, category };
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    return { error: 'Erreur lors de la mise à jour' };
  }
}

/**
 * Admin: Supprime une catégorie.
 */
export async function deleteCategory(id: string) {
  try {
    // Vérifier si des produits sont liés
    const productsCount = await prisma.product.count({
      where: { categorieId: id },
    });

    if (productsCount > 0) {
      return { error: 'Impossible de supprimer une catégorie liée à des produits' };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath(ROUTES.ADMIN.CATEGORIES);
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    return { error: 'Erreur lors de la suppression' };
  }
}
