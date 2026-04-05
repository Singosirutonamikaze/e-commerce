'use server'

import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Récupère le panier de l'utilisateur actuel.
 */
export async function getCart() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  return await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          produit: {
            include: { images: true }
          }
        }
      }
    }
  });
}

/**
 * Ajoute un produit au panier.
 */
export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Non authentifié' };

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id }
    });

    if (!cart) return { error: 'Panier introuvable' };

    // Vérifie si l'item est déjà dans le panier
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        paniereId: cart.id,
        produitId: productId
      }
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantite: existingItem.quantite + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          paniereId: cart.id,
          produitId: productId,
          quantite: quantity
        }
      });
    }

    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors de l\'ajout au panier' };
  }
}

/**
 * Met à jour la quantité d'un item dans le panier.
 */
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  if (quantity < 1) return removeFromCart(itemId);

  try {
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantite: quantity }
    });

    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' };
  }
}

/**
 * Supprime un item du panier.
 */
export async function removeFromCart(itemId: string) {
  try {
    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors de la suppression' };
  }
}

/**
 * Vide le panier.
 */
export async function clearCart() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Non authentifié' };

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id }
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { paniereId: cart.id }
      });
    }

    revalidatePath('/cart');
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors de la vidange du panier' };
  }
}
