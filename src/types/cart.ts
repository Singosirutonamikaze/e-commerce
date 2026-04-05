import { ProductWithImages } from './product';

export interface CartItemWithProduct {
  id: string;
  paniereId: string;
  produitId: string;
  quantite: number;
  ajouteLe: Date;
  produit: ProductWithImages;
}

export interface CartWithItems {
  id: string;
  userId: string;
  items: CartItemWithProduct[];
}
