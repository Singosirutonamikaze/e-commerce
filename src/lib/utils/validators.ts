import { z } from 'zod';

// AUTH
export const loginSchema = z.object({
  email: z.email({ message: 'Adresse email invalide' }),
  password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
});

export const registerSchema = z.object({
  prenom: z.string().min(2, 'Le prénom est trop court'),
  nom: z.string().min(2, 'Le nom est trop court'),
  email: z.email({ message: 'Adresse email invalide' }),
  password: z.string().min(8, 'Le mot de passe doit faire au moins 8 caractères'),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Adresse email invalide' }),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Le mot de passe doit faire au moins 8 caractères'),
  confirmPassword: z.string().min(8, 'Le mot de passe doit faire au moins 8 caractères'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

// PRODUCT
export const productSchema = z.object({
  nom: z.string().min(3, 'Le nom doit faire au moins 3 caractères'),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
  prix: z.number().positive('Le prix doit être positif'),
  ancienPrix: z.number().positive('Le prix doit être positif').optional(),
  stock: z.number().int().nonnegative('Le stock doit être positif'),
  slug: z.string().min(3, 'Slug invalide'),
  categorieId: z.uuid({ message: 'Catégorie invalide' }),
  estVisible: z.boolean().default(true),
  images: z.array(z.url()).min(1, 'Au moins une image est requise'),
});

// CATEGORY
export const categorySchema = z.object({
  nom: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  imageUrl: z.url({ message: 'URL d\'image invalide' }).optional().or(z.literal('')),
  ordre: z.number().int().default(0),
  parentId: z.uuid().optional().or(z.literal('')),
});

// ADDRESS
export const addressSchema = z.object({
  prenom: z.string().min(2, 'Le prénom est trop court'),
  nom: z.string().min(2, 'Le nom est trop court'),
  telephone: z.string().min(10, 'Téléphone invalide'),
  rue: z.string().min(5, 'L\'adresse est trop courte'),
  complementAdresse: z.string().optional().or(z.literal('')),
  ville: z.string().min(2, 'Ville invalide'),
  codePostal: z.string().min(4, 'Code postal invalide'),
  pays: z.string().min(2, 'Pays invalide'),
  estParDefaut: z.boolean(),
});

export const profileSchema = z.object({
  prenom: z.string().min(2, 'Le prénom est trop court'),
  nom: z.string().min(2, 'Le nom est trop court'),
  telephone: z.string().min(10, 'Téléphone invalide').optional().or(z.literal('')),
  avatarUrl: z.url({ message: 'URL d\'avatar invalide' }).optional().or(z.literal('')),
});
// PROMO
export const promoSchema = z.object({
  code: z.string().min(3, 'Le code doit faire au moins 3 caractères').toUpperCase(),
  reduction: z.number().positive('La réduction doit être positive'),
  type: z.enum(['POURCENTAGE', 'MONTANT_FIXE']),
  montantMinimum: z.number().nonnegative().optional(),
  limiteUtilisation: z.number().int().positive().optional(),
  dateExpiration: z.string().or(z.date()).transform((val) => new Date(val)),
  estActif: z.boolean().default(true),
});

// INFERRED TYPES
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type PromoInput = z.infer<typeof promoSchema>;
