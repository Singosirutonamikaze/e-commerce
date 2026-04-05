"use server";

import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { MessageType } from "@prisma/client";
import { ROUTES } from "@/lib/utils/constants/routes";

/**
 * Récupère ou crée une conversation pour l'utilisateur actuel.
 */
export async function getOrCreateConversation(ordreId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Non authentifié" };

  try {
    let conversation = await prisma.conversation.findFirst({
      where: {
        userId: user.id,
        ordreId: ordreId || null,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          ordreId: ordreId,
          statut: "OUVERTE",
        },
      });
    }

    return { success: true, conversationId: conversation.id };
  } catch (error) {
    console.error("getOrCreateConversation error:", error);
    return { error: "Erreur lors de la conversation" };
  }
}

/**
 * Envoie un message dans une conversation.
 */
export async function sendMessage(
  conversationId: string,
  contenu: string,
  type: MessageType = "TEXTE",
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Non authentifié" };

  try {
    const message = await prisma.message.create({
      data: {
        conversationId,
        expediteurId: user.id,
        contenu,
        type,
      },
    });

    // On met à jour la date de mise à jour de la conversation
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    // Rechargement des routes concernées
    revalidatePath(`${ROUTES.DASHBOARD.SUPPORT}/${conversationId}`);
    revalidatePath(ROUTES.ADMIN.SUPPORT_DETAIL(conversationId));

    return { success: true, message };
  } catch (error) {
    console.error("sendMessage error:", error);
    return { error: "Erreur lors de l'envoi" };
  }
}

/**
 * Admin: Ferme une conversation.
 */
export async function closeConversation(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Non authentifié" };

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (dbUser?.role !== "ADMIN") return { error: "Action non autorisée" };

  try {
    await prisma.conversation.update({
      where: { id },
      data: { statut: "FERMEE" },
    });

    revalidatePath(ROUTES.ADMIN.SUPPORT_DETAIL(id));
    revalidatePath(ROUTES.ADMIN.SUPPORT);
    return { success: true };
  } catch (error) {
    console.error("closeConversation error:", error);
    return { error: "Erreur lors de la fermeture" };
  }
}

/**
 * Admin: Récupère toutes les conversations actives.
 */
export async function getActiveConversations() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (dbUser?.role !== "ADMIN") return [];

  try {
    return await prisma.conversation.findMany({
      where: { statut: { not: "FERMEE" } },
      include: {
        user: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  } catch (error) {
    console.error("getActiveConversations error:", error);
    return [];
  }
}

/**
 * Récupère les messages d'une conversation.
 */
export async function getMessages(conversationId: string) {
  try {
    return await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      include: {
        expediteur: {
          select: { prenom: true, nom: true, role: true, avatarUrl: true },
        },
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    return [];
  }
}
