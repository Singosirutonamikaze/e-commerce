import React from 'react';
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/utils/constants/routes';
import prisma from "@/lib/prisma/client";
import { LifeBuoy, MessageSquare, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/format';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Support Client | Velure',
  description: 'Contacter le support client',
};

export default async function SupportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary uppercase mb-2">
             Assistance Technique
          </h1>
          <p className="text-[10px] font-bold text-text-hint uppercase tracking-widest pl-4 border-l border-border">
             Registre des Requêtes et Support Client
          </p>
        </div>
        
        <Link href={ROUTES.CONTACT}>
          <Button className="rounded-sm h-12 px-8 font-bold uppercase tracking-widest shadow-lg shadow-accent/10 transition-transform hover:scale-105 active:scale-95">
            Nouveau Ticket
          </Button>
        </Link>
      </header>
      
      <div className="grid grid-cols-1 gap-4">
        {conversations.length === 0 ? (
          <div className="bg-surface rounded-sm p-8 py-20 border border-border shadow-sm flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 bg-accent-light text-accent rounded-sm flex items-center justify-center mb-6">
              <LifeBuoy className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Aucun ticket ouvert</h3>
            <p className="text-text-muted max-w-sm font-medium">
              Vous n&apos;avez pas encore créé de ticket de support. Si vous avez besoin d&apos;aide, notre équipe est là pour vous.
            </p>
          </div>
        ) : (
          conversations.map((conv) => (
            <Link 
              key={conv.id} 
              href={ROUTES.ACCOUNT.SUPPORT_DETAIL(conv.id)}
              className="bg-surface rounded-sm p-6 border border-border shadow-sm hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                 <div className={`h-14 w-14 rounded-sm flex items-center justify-center transition-colors ${conv.statut === 'OUVERTE' ? 'bg-accent-light text-accent' : 'bg-surface-alt text-text-hint'}`}>
                    <MessageSquare className="h-6 w-6" />
                 </div>
                 <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="text-base font-bold text-text-primary uppercase tracking-tight group-hover:text-accent transition-colors">
                          Ticket #{conv.id.slice(0, 8).toUpperCase()}
                       </h3>
                       <span className={`inline-flex px-3 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest ${conv.statut === 'OUVERTE' ? 'bg-success-bg text-success' : 'bg-surface-alt text-text-hint border border-border'}`}>
                          {conv.statut === 'OUVERTE' ? 'Ouvert' : 'Fermé'}
                       </span>
                    </div>
                    <p className="text-sm text-text-muted font-medium truncate max-w-[200px] sm:max-w-md">
                       {conv.messages[0]?.contenu || 'Aucun message'}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-text-hint uppercase tracking-widest mt-2 overflow-hidden">
                       <Clock className="h-3 w-3" />
                       <span>Mis à jour le {formatDate(conv.updatedAt)}</span>
                    </div>
                 </div>
              </div>
              <ChevronRight className="h-5 w-5 text-text-hint group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Link>
          ))
        )}
      </div>

      <div className="bg-surface-alt/10 rounded-sm p-8 border border-border mt-8">
         <div className="flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
            <div>
               <h4 className="text-sm font-bold uppercase tracking-tight text-text-primary mb-2">Engagement Velure</h4>
               <p className="text-xs text-text-muted font-medium leading-relaxed">
                  Notre équipe support s&apos;engage à vous répondre sous un délai de 24h ouvrées. 
                  Chaque demande est traitée avec le plus grand soin par nos conseillers personnels.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
