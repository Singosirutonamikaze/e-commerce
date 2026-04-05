import { Promo as PrismaPromo } from '@prisma/client';

export interface PromoWithNumbers extends Omit<PrismaPromo, 'reduction' | 'montantMinimum'> {
  reduction: number;
  montantMinimum: number | null;
}
