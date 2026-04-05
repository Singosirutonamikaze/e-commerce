import React from 'react';
import { getActiveConversations } from '@/lib/actions/chat.actions';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare, Clock, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/format';
import { ROUTES } from '@/lib/utils/constants/routes';

export default async function AdminSupportPage() {
  const conversations = await getActiveConversations();

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-3xl font-black tracking-tighter text-text-primary uppercase mb-2">
          Support <span className="text-accent italic">Client</span>
        </h1>
        <p className="text-sm font-medium text-text-muted">
          Gérez les demandes d&apos;assistance et les messages de vos clients Velure.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="p-6 border-border bg-surface-alt/20 flex flex-col items-center text-center">
            <div className="h-10 w-10 text-accent mb-2">
               <MessageSquare className="h-full w-full" />
            </div>
            <span className="text-2xl font-black text-text-primary">{conversations.length}</span>
            <span className="text-[10px] font-black uppercase text-text-hint tracking-widest">Conversations actives</span>
         </Card>
      </div>

      <section>
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Discussions en cours</h3>
        </div>

        {conversations.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {conversations.map((conv) => (
              <Link key={conv.id} href={ROUTES.ADMIN.SUPPORT_DETAIL(conv.id)}>
                <Card className="p-6 border-border hover:border-accent group transition-all flex items-center justify-between cursor-pointer bg-white">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-accent-light text-accent flex items-center justify-center font-black relative">
                       {conv.user.prenom[0]}{conv.user.nom[0]}
                       {conv.messages.some((m) => !m.lu && m.expediteurId === conv.userId) && (
                         <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent border-2 border-white rounded-full"></div>
                       )}
                    </div>
                    <div className="flex flex-col">
                       <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-text-primary">{conv.user.prenom} {conv.user.nom}</span>
                          <Badge variant="accent" className="text-[9px] font-black uppercase tracking-tighter h-5">
                             {conv.statut}
                          </Badge>
                       </div>
                       <p className="text-sm text-text-muted truncate max-w-md font-medium">
                          {conv.messages[0]?.contenu || 'Pas de message encore.'}
                       </p>
                       <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-bold text-text-hint flex items-center gap-1 uppercase tracking-widest">
                             <Clock className="h-3 w-3" />
                             {formatDate(conv.updatedAt, true)}
                          </span>
                          {conv.ordreId && (
                            <span className="text-[10px] font-black text-accent bg-accent-light px-2 py-0.5 rounded-full uppercase tracking-widest">
                               Commande: {conv.ordreId.slice(0, 8)}
                            </span>
                          )}
                       </div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-text-hint group-hover:text-accent group-hover:translate-x-2 transition-all" />
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-surface-alt/30 rounded-[40px] border-2 border-dashed border-border flex flex-col items-center gap-6">
             <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-text-hint shadow-sm">
                <Star className="h-10 w-10 opacity-20" />
             </div>
             <p className="text-sm font-bold text-text-muted tracking-tight">Aucune conversation active pour le moment.</p>
          </div>
        )}
      </section>
    </div>
  );
}
