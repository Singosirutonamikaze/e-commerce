import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma/client";

export async function POST(request: Request) {
  try {
    const { userId, secret } = await request.json();

    // Vérification du secret
    if (!secret || secret !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json({ error: 'Accès refusé. Secret incorrect.' }, { status: 403 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'ID Utilisateur requis.' }, { status: 400 });
    }

    // Mise à jour de l'utilisateur
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: 'ADMIN' },
    });

    return NextResponse.json({ 
      success: true, 
      message: `L'utilisateur ${user.prenom} ${user.nom} est désormais ADMINISTRATEUR.`,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('Erreur Setup Admin:', errorMessage);
    return NextResponse.json({ error: 'Erreur lors de la promotion admin.' }, { status: 500 });
  }
}
