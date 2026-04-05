import { User as PrismaUser } from '@prisma/client';

export interface AuthUser extends Omit<PrismaUser, 'updatedAt'> {
  // Common for session storage or local state
}
