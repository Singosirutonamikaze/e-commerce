import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import prisma from "@/lib/prisma/client";
import { ArrowLeft, MessageSquare, BadgeInfo } from "lucide-react";
import { ClientChat } from "@/components/chat/ClientChat/ClientChat";

export default async function SupportTicketPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });

  if (!conversation || conversation.userId !== user.id) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Link
            href={ROUTES.DASHBOARD.SUPPORT}
            className="flex items-center gap-2 text-xs font-bold text-accent hover:text-accent-hover tracking-[0.2em] transition-all group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour à l&apos;assistance
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary mb-2">
              Archive support
            </h1>
            <p className="text-[10px] font-bold text-text-hint tracking-widest pl-4 border-l border-border">
              ID ticket: {conversation.id.slice(0, 8).toUpperCase()}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span
                className={`inline-flex px-3 py-1 rounded-sm text-[9px] font-bold tracking-widest ${conversation.statut === "OUVERTE" ? "bg-success-bg text-success shadow-sm" : "bg-surface-alt text-text-hint border border-border"}`}
              >
                {conversation.statut === "OUVERTE" ? "En cours" : "Résolu"}
              </span>
              {conversation.ordreId && (
                <Link
                  href={ROUTES.DASHBOARD.ORDER_DETAIL(conversation.ordreId)}
                  className="text-[10px] font-bold text-text-muted hover:text-accent transition-colors underline underline-offset-4"
                >
                  Commande #{conversation.ordreId.slice(0, 12).toUpperCase()}
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="bg-surface-alt/50 border border-border p-4 rounded-sm flex items-center gap-4">
          <BadgeInfo className="h-6 w-6 text-accent shrink-0" />
          <p className="text-[10px] font-medium text-text-muted max-w-xs leading-relaxed">
            Veuillez fournir le maximum de détails pour que nos agents puissent
            vous aider efficacement.
          </p>
        </div>
      </header>

      <ClientChat conversationId={id} />

      <div className="flex items-center justify-between p-8 bg-surface rounded-[40px] border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-accent-light text-accent rounded-sm flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-text-primary tracking-tight">
              Besoin d&apos;aide immédiate ?
            </h4>
            <p className="text-xs text-text-muted font-medium mt-0.5">
              Appelez notre conciergerie au +33 (0)1 23 45 67 89
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
