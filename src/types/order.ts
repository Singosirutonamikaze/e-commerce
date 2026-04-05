import { 
  Order as PrismaOrder, 
  OrderItem as PrismaOrderItem, 
  User as PrismaUser, 
  Address, 
  Promo as PrismaPromo 
} from '@prisma/client';

export interface OrderItemWithNumber extends Omit<PrismaOrderItem, 'prixUnitaire'> {
  prixUnitaire: number;
}

export interface OrderWithItems extends Omit<PrismaOrder, 'total' | 'sousTotal' | 'fraisLivraison' | 'montantReduction'> {
  total: number;
  sousTotal: number;
  fraisLivraison: number;
  montantReduction: number | null;
  orderItems: OrderItemWithNumber[];
  user: PrismaUser;
  adresse: Address;
  promo?: PrismaPromo | null;
}
