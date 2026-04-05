import { 
  Conversation as PrismaConversation, 
  Message as PrismaMessage, 
  User as PrismaUser, 
  Order as PrismaOrder,
  Role
} from '@prisma/client';
import { OrderWithItems } from './order';

export interface MessageWithSender extends PrismaMessage {
  expediteur: {
    prenom: string;
    nom: string;
    role: Role;
    avatarUrl: string | null;
  };
}

export interface ConversationWithDetails extends PrismaConversation {
  user: PrismaUser;
  messages: MessageWithSender[];
  order?: OrderWithItems | null;
}
