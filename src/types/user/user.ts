import { User as PrismaUser } from '@prisma/client';

export type AuthUser = Omit<PrismaUser, 'updatedAt'>;
