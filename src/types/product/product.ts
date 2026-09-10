import { Product as PrismaProduct, ProductImage, Category as PrismaCategory } from '@prisma/client';

export interface ProductWithImages extends Omit<PrismaProduct, 'prix' | 'ancienPrix'> {
  prix: number;
  ancienPrix: number | null;
  images: ProductImage[];
  categorie: PrismaCategory;
}
