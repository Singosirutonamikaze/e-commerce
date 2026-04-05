import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import prisma from "@/lib/prisma/client";
import { LifeBuoy, MessageSquare, ChevronRight, Clock } from "lucide-react";
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
    <div className="flex flex-col gap-8">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-primary mb-2">
            Assistance technique
          </h1>
          <p className="text-[10px] font-bold text-text-hint tracking-widest pl-4 border-l border-border">
            Registre des requêtes et support client
          </p>
        </div>

        <Link href={ROUTES.CONTACT}>
          <Button className="rounded-sm h-12 px-8 font-bold tracking-widest shadow-lg shadow-accent/10 transition-transform hover:scale-105 active:scale-95">
            Nouveau ticket
          </Button>
        </Link>
      </header>

      {conversations.length > 0 ? (
        <div className="flex flex-col gap-3">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={ROUTES.DASHBOARD.SUPPORT_DETAIL(conversation.id)}
              className="group flex items-center justify-between rounded-sm border border-border p-4 bg-surface transition-all hover:border-text-primary hover:bg-surface-alt"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 flex items-center justify-center rounded-sm bg-surface-alt text-accent">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-text-primary">Ticket</div>
                  <p className="text-sm text-text-muted">
                    {conversation.messages[0]?.contenu.substring(0, 40)}...
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-text-hint">
                    <Clock className="h-3 w-3" />
                    {formatDate(new Date(conversation.updatedAt))}
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-sm border-2 border-dashed border-border bg-surface p-12 text-center">
          <LifeBuoy className="mx-auto h-12 w-12 text-text-hint/30 mb-4" />
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Aucune conversation
          </h3>
          <p className="text-text-muted mb-6">
            Vous n&apos;avez pas encore contacté le support.
          </p>
        </div>
      )}
    </div>
  );
}
