"use server";

import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { productSchema, ProductInput } from "@/lib/utils/validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { ROUTES } from "@/lib/utils/constants/routes";
import { slugify } from "@/lib/utils/slugify";

interface ProductFilters {
  categorieId?: string;
  search?: string;
  minPrix?: number;
  maxPrix?: number;
  sort?: "price_asc" | "price_desc" | "newest";
}

/**
 * Récupère le rôle de l'utilisateur actuel depuis la base de données.
 */
async function checkAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { role: true },
  });

  return dbUser?.role === "ADMIN";
}

export async function createProduct(formData: ProductInput) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Non autorisé");

  const validatedFields = productSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Données invalides" };
  }

  const {
    nom,
    description,
    prix,
    ancienPrix,
    stock,
    categorieId,
    estVisible,
    images,
  } = validatedFields.data;

  try {
    const product = await prisma.product.create({
      data: {
        nom,
        slug: slugify(nom),
        description,
        prix,
        ancienPrix,
        stock,
        estVisible,
        categorieId,
        images: {
          create: images.map((url, index) => ({
            url,
            ordre: index,
          })),
        },
      },
    });

    revalidatePath(ROUTES.ADMIN.PRODUCTS);
    revalidatePath(ROUTES.PRODUCTS);
    return { success: true, product };
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    return { error: "Erreur serveur lors de la création" };
  }
}

export async function updateProduct(id: string, formData: ProductInput) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Non autorisé");

  const validatedFields = productSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Données invalides" };
  }

  const {
    nom,
    description,
    prix,
    ancienPrix,
    stock,
    categorieId,
    estVisible,
    images,
  } = validatedFields.data;

  try {
    // Supprime les anciennes images et ajoute les nouvelles
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { produitId: id } }),
      prisma.product.update({
        where: { id },
        data: {
          nom,
          slug: slugify(nom),
          description,
          prix,
          ancienPrix,
          stock,
          estVisible,
          categorieId,
          images: {
            create: images.map((url, index) => ({
              url,
              ordre: index,
            })),
          },
        },
      }),
    ]);

    revalidatePath(ROUTES.ADMIN.PRODUCT_EDIT(id));
    revalidatePath(ROUTES.PRODUCT_DETAIL(slugify(nom)));
    revalidatePath(ROUTES.PRODUCTS);
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    return { error: "Erreur serveur lors de la mise à jour" };
  }
}

export async function deleteProduct(id: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Non autorisé");

  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath(ROUTES.ADMIN.PRODUCTS);
    revalidatePath(ROUTES.PRODUCTS);
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    return { error: "Erreur serveur lors de la suppression" };
  }
}

export async function getProducts(filters: ProductFilters = {}) {
  const { categorieId, search, minPrix, maxPrix, sort } = filters;

  const where: Prisma.ProductWhereInput = {
    estVisible: true,
  };

  if (categorieId) {
    where.categorieId = categorieId;
  }

  if (search) {
    where.OR = [
      { nom: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (minPrix !== undefined || maxPrix !== undefined) {
    where.prix = {
      gte: minPrix || 0,
      lte: maxPrix || 10000,
    };
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { prix: "asc" };
  if (sort === "price_desc") orderBy = { prix: "desc" };

  try {
    const products = await prisma.product.findMany({
      where,
      include: {
        images: { orderBy: { ordre: "asc" }, take: 1 },
        categorie: true,
      },
      orderBy,
    });

    return products.map((p) => ({
      ...p,
      prix: Number(p.prix),
      ancienPrix: p.ancienPrix ? Number(p.ancienPrix) : null,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { ordre: "asc" } },
        categorie: true,
      },
    });

    if (!product) return null;

    return {
      ...product,
      prix: Number(product.prix),
      ancienPrix: product.ancienPrix ? Number(product.ancienPrix) : null,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return null;
  }
}
