import { Category as PrismaCategory } from '@prisma/client';

export interface CategoryWithChildren extends PrismaCategory {
  children?: CategoryWithChildren[];
  parent?: PrismaCategory | null;
}
