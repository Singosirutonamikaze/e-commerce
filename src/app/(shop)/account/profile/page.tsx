import React from 'react';
import { ProfileForm } from '@/components/auth/ProfileForm/ProfileForm';
import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return (
    <div className="flex flex-col max-w-4xl">
      <header className="mb-12">
        <h2 className="text-2xl font-black text-text-primary tracking-tighter uppercase mb-2">
          Mon Profil <span className="text-accent italic">Velure</span>
        </h2>
        <p className="text-sm font-medium text-text-muted">
          Gérez vos informations personnelles et vos paramètres de sécurité.
        </p>
      </header>

      <ProfileForm initialData={{
        prenom: dbUser.prenom,
        nom: dbUser.nom,
        email: dbUser.email,
        telephone: dbUser.telephone,
        avatarUrl: dbUser.avatarUrl,
        createdAt: dbUser.createdAt,
      }} />
    </div>
  );
}
