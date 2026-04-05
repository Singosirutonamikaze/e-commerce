'use server';

import prisma from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema, addressSchema, profileSchema, LoginInput, RegisterInput, AddressInput, ProfileInput } from "@/lib/utils/validators";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";

export async function login(formData: LoginInput) {
  const validatedFields = loginSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return { error: 'Données invalides' };
  }

  const { email, password } = validatedFields.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erreur Supabase au login:', error);
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Veuillez confirmer votre numéro ou adresse email avant de vous connecter.' };
    }
    return { error: error.message || 'Identifiants invalides' };
  }

  let role = 'CLIENT';
  if (data?.user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: { role: true }
    });
    if (dbUser) {
      role = dbUser.role;
    }
  }

  revalidatePath(ROUTES.HOME);
  revalidatePath(ROUTES.ADMIN.ROOT);
  return { success: true, role };
}

export async function register(formData: RegisterInput) {
  const validatedFields = registerSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return { error: 'Données invalides' };
  }

  const { email, password, prenom, nom } = validatedFields.data;
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
  
  // Bypass email verification using admin client
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Inscription Supabase Auth
  const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { prenom, nom }
  });

  if (authError) {
    return { error: authError.message };
  }

  if (user) {
    // Création utilisateur dans la BDD Prisma
    try {
      await prisma.user.create({
        data: {
          id: user.id, // Garde le même ID que Supabase Auth
          email,
          prenom,
          nom,
          role: 'CLIENT'
        }
      });
      // Création du panier vide
      await prisma.cart.create({
        data: { userId: user.id }
      });
    } catch (dbError) {
      console.error('Erreur lors de la création de l\'utilisateur dans la BDD:', dbError);
      return { error: 'Erreur lors de la création du profil' };
    }
  }

  revalidatePath(ROUTES.HOME);
  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath(ROUTES.HOME);
  redirect(ROUTES.HOME);
}

export async function updateProfile(formData: ProfileInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Non authentifié' };

  const validatedFields = profileSchema.safeParse(formData);
  if (!validatedFields.success) return { error: 'Données invalides' };

  const { prenom, nom, telephone, avatarUrl } = validatedFields.data;

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { prenom, nom, telephone, avatarUrl }
    });

    revalidatePath(ROUTES.ACCOUNT.PROFILE);
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' };
  }
}

export async function addAddress(formData: AddressInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Non authentifié' };

  const validatedFields = addressSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return { error: 'Données invalides' };
  }

  const data = validatedFields.data;

  try {
    // Si estParDefaut, on retire le défaut aux autres adresses
    if (data.estParDefaut) {
      await prisma.address.updateMany({
        where: { userId: user.id },
        data: { estParDefaut: false }
      });
    }

    await prisma.address.create({
      data: {
        ...data,
        userId: user.id
      }
    });

    revalidatePath(ROUTES.ACCOUNT.ADDRESSES);
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors de l\'ajout de l\'adresse' };
  }
}

/**
 * Admin: Récupère la liste des clients
 */
export async function getCustomers() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true }
  });

  if (dbUser?.role !== 'ADMIN') return [];

  try {
    return await prisma.user.findMany({
      where: { role: 'CLIENT' },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { orders: true }
        }
      }
    });
  } catch (error) {
    console.error('Erreur getCustomers:', error);
    return [];
  }
}

/**
 * Admin: Récupère les détails d'un client
 */
export async function getCustomer(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true }
  });

  if (dbUser?.role !== 'ADMIN') return null;

  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        addresses: true
      }
    });
  } catch (error) {
    console.error('Erreur getCustomer:', error);
    return null;
  }
}

export async function getWishlist() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  try {
    const rawWishlist = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: {
        produit: {
          include: {
            images: { orderBy: { ordre: 'asc' }, take: 1 },
            categorie: true
          }
        }
      },
      orderBy: { ajouteLe: 'desc' }
    });

    return rawWishlist.map(item => ({
      ...item,
      produit: {
        ...item.produit,
        prix: Number(item.produit.prix),
        ancienPrix: item.produit.ancienPrix ? Number(item.produit.ancienPrix) : null
      }
    }));
  } catch (error) {
    return [];
  }
}

export async function toggleWishlist(productId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Non authentifié' };

  try {
    const existing = await prisma.wishlist.findFirst({
      where: { userId: user.id, produitId: productId }
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
    } else {
      await prisma.wishlist.create({
        data: { userId: user.id, produitId: productId }
      });
    }

    revalidatePath(ROUTES.ACCOUNT.WISHLIST);
    revalidatePath(ROUTES.PRODUCTS);
    return { success: true };
  } catch (error) {
    return { error: 'Erreur lors du changement de statut' };
  }
}
