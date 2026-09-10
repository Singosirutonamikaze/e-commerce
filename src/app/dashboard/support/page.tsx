import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import prisma from "@/lib/prisma/client";
import { MessageSquare, ChevronRight, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Support client | Velure",
  description: "Contacter le support client",
};

export default async function SupportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-400">
              Assistance
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
            Support et tickets
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Échangez directement avec notre équipe pour toute question sur vos commandes.
          </p>
        </div>

        <Link href={ROUTES.CONTACT}>
          <Button className="h-8 px-4 font-semibold text-xs bg-white text-slate-950 hover:bg-slate-200 flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Nouveau ticket
          </Button>
        </Link>
      </header>

      {conversations.length > 0 ? (
        <div className="flex flex-col gap-3">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/dashboard/support/${conversation.id}`}
              className="border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-5 flex items-center justify-between gap-4 hover:border-slate-700 hover:bg-slate-900/40 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-9 w-9 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-white group-hover:text-slate-200">
                    {conversation.messages[0]?.contenu || "Demande d'assistance"}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    Mis à jour le {formatDate(new Date(conversation.updatedAt))}
                  </span>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-950/60 backdrop-blur-md border border-slate-800/80 p-8 gap-5">
          <div className="h-14 w-14 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
            <MessageSquare className="h-7 w-7 opacity-50" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Aucun ticket ouvert
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
              Vous n&apos;avez aucune conversation en cours avec notre service client.
            </p>
            <Link href={ROUTES.CONTACT}>
              <Button className="h-9 px-6 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200">
                Ouvrir un ticket
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
