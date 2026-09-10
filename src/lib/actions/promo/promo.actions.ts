"use server";

import prisma from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { PromoInput } from "@/lib/utils/validators";

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

/**
 * Valide un code promo.
 */
export async function validatePromoCode(code: string) {
  try {
    const promo = await prisma.promo.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo?.estActif) {
      return { error: "Code promo invalide" };
    }

    if (new Date() > promo.dateExpiration) {
      return { error: "Code promo expiré" };
    }

    if (
      promo.limiteUtilisation &&
      promo.nombreUtilisations >= promo.limiteUtilisation
    ) {
      return { error: "Limite d'utilisation atteinte" };
    }

    return { success: true, promo };
  } catch (error) {
    console.error("Erreur lors de la validation du code promo:", error);
    return { error: "Erreur lors de la validation" };
  }
}

/**
 * Admin: Récupère tous les codes promo.
 */
export async function getPromoCodes() {
  try {
    return await prisma.promo.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des codes promo:", error);
    return [];
  }
}

/**
 * Admin: Crée un code promo.
 */
export async function createPromoCode(data: PromoInput) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Non autorisé");

  try {
    const promo = await prisma.promo.create({
      data: {
        ...data,
        code: data.code.toUpperCase(),
      },
    });

    revalidatePath("/admin/promos");
    return { success: true, promo };
  } catch (error) {
    console.error("Erreur lors de la création du code promo:", error);
    return { error: "Erreur lors de la création" };
  }
}

/**
 * Admin: Supprime un code promo.
 */
export async function deletePromoCode(id: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Non autorisé");

  try {
    await prisma.promo.delete({
      where: { id },
    });

    revalidatePath("/admin/promos");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression du code promo:", error);
    return { error: "Erreur lors de la suppression" };
  }
}

/**
 * Admin: Met à jour un code promo.
 */
export async function updatePromoCode(id: string, data: PromoInput) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Non autorisé");

  try {
    const promo = await prisma.promo.update({
      where: { id },
      data: {
        ...data,
        code: data.code.toUpperCase(),
      },
    });

    revalidatePath("/admin/promos");
    return { success: true, promo };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la promo:", error);
    return { error: "Erreur lors de la mise à jour" };
  }
}
