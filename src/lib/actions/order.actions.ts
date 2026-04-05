'use server';

import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";

/**
 * Crée une nouvelle commande pour l'utilisateur actuel.
 */
export async function createOrder(data: {
  adresseId: string;
  promoId?: string;
  noteLivraison?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Non authentifié' };

  try {
    // 1. Récupère le panier
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            produit: true
          }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      return { error: 'Panier vide' };
    }

    // 2. Calcule les totaux
    let sousTotal = 0;
    const orderItemsData = cart.items.map((item) => {
      const itemTotal = Number(item.produit.prix) * item.quantite;
      sousTotal += itemTotal;
      return {
        produitId: item.produitId,
        quantite: item.quantite,
        prixUnitaire: item.produit.prix,
        nomProduit: item.produit.nom,
        // (En option) On récupère la première image
        imageProduit: "" // Sera mis à jour après la création de l'item si nécessaire
      };
    });

    // 3. Applique la promo si présente
    let montantReduction = 0;
    if (data.promoId) {
      const promo = await prisma.promo.findUnique({ where: { id: data.promoId } });
      if (promo && promo.estActif && promo.dateExpiration > new Date()) {
        if (promo.type === 'POURCENTAGE') {
          montantReduction = (sousTotal * Number(promo.reduction)) / 100;
        } else {
          montantReduction = Number(promo.reduction);
        }
        
        // Incrémente le nombre d'utilisations de la promo
        await prisma.promo.update({
          where: { id: promo.id },
          data: { nombreUtilisations: { increment: 1 } }
        });
      }
    }

    const fraisLivraison = sousTotal > 150 ? 0 : 9.99;
    const total = sousTotal - montantReduction + fraisLivraison;

    // 4. Crée la commande sous forme de transaction
    const order = await prisma.$transaction(async (tx) => {
      // a. Crée la commande
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          adresseId: data.adresseId,
          promoId: data.promoId,
          sousTotal,
          fraisLivraison,
          montantReduction,
          total,
          statut: 'EN_ATTENTE',
          noteLivraison: data.noteLivraison,
          orderItems: {
            create: orderItemsData
          }
        }
      });

      // b. Décrémente le stock pour chaque produit
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.produitId },
          data: { stock: { decrement: item.quantite } }
        });
      }

      // c. Vide le panier
      await tx.cartItem.deleteMany({
        where: { paniereId: cart.id }
      });

      return newOrder;
    });

    revalidatePath(ROUTES.ACCOUNT.ORDERS);
    revalidatePath(ROUTES.CART);
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    return { error: 'Erreur lors de la commande' };
  }
}

import { OrderStatus } from "@prisma/client";

/**
 * Admin: Met à jour le statut d'une commande.
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Non authentifié' };

  // Vérifie si l'utilisateur est admin
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true }
  });

  if (dbUser?.role !== 'ADMIN') return { error: 'Non autorisé' };
  
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { statut: status }
    });

    revalidatePath(ROUTES.ADMIN.ORDER_DETAIL(orderId));
    revalidatePath(ROUTES.ACCOUNT.ORDER_DETAIL(orderId));
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' };
  }
}

/**
 * Récupère les détails d'une commande.
 */
export async function getOrder(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        adresse: true,
        promo: true,
        user: true
      }
    });

    if (!order) return null;

    return {
      ...order,
      total: Number(order.total),
      sousTotal: Number(order.sousTotal),
      fraisLivraison: Number(order.fraisLivraison),
      montantReduction: order.montantReduction ? Number(order.montantReduction) : 0,
      orderItems: order.orderItems.map(item => ({
        ...item,
        prixUnitaire: Number(item.prixUnitaire)
      }))
    };
  } catch (error) {
    return null;
  }
}

/**
 * Récupère l'historique des commandes d'un utilisateur.
 */
export async function getMyOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  try {
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        adresse: true,
        promo: true,
        orderItems: true
      }
    });

    return orders.map(order => ({
      ...order,
      total: Number(order.total),
      sousTotal: Number(order.sousTotal),
      fraisLivraison: Number(order.fraisLivraison),
      montantReduction: order.montantReduction ? Number(order.montantReduction) : null,
      orderItems: order.orderItems.map(item => ({
        ...item,
        prixUnitaire: Number(item.prixUnitaire)
      }))
    }));
  } catch (error) {
    return [];
  }
}
 export async function getOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  // Vérifie si l'utilisateur est admin
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true }
  });

  try {
    if (dbUser?.role === 'ADMIN') {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { 
          user: true,
          orderItems: true,
          adresse: true,
          promo: true
        }
      });

      return orders.map(order => ({
        ...order,
        total: Number(order.total),
        sousTotal: Number(order.sousTotal),
        fraisLivraison: Number(order.fraisLivraison),
        montantReduction: order.montantReduction ? Number(order.montantReduction) : null,
        orderItems: order.orderItems.map(item => ({
          ...item,
          prixUnitaire: Number(item.prixUnitaire)
        }))
      }));
    } else {
      const orders = await prisma.order.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          adresse: true,
          promo: true,
          orderItems: {
            include: { produit: { select: { nom: true, images: { take: 1 } } } }
          }
        }
      });

      return orders.map(order => ({
        ...order,
        total: Number(order.total),
        sousTotal: Number(order.sousTotal),
        fraisLivraison: Number(order.fraisLivraison),
        montantReduction: order.montantReduction ? Number(order.montantReduction) : null,
        orderItems: order.orderItems.map(item => ({
          ...item,
          prixUnitaire: Number(item.prixUnitaire)
        }))
      }));
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return [];
  }
}
