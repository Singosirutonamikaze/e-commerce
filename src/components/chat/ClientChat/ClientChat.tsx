"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useChat } from "@/hooks/useChat/useChat";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { MessageWithSender } from "@/types/chat";

interface ClientChatProps {
  conversationId: string;
}

export function ClientChat({ conversationId }: Readonly<ClientChatProps>) {
  const { messages, loading, sendMessage } = useChat(conversationId);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || sending) return;

    setSending(true);
    const success = await sendMessage(inputValue);
    if (success) {
      setInputValue("");
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-20 min-h-100 bg-slate-950/60 rounded-lg border border-slate-800/80">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-150 bg-slate-950/80 backdrop-blur-xl rounded-lg border border-slate-800/80 shadow-2xl overflow-hidden">
      <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="h-9 w-9 bg-white text-slate-950 rounded-lg flex items-center justify-center font-bold text-sm tracking-widest shadow-sm">
            V
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-100 tracking-tight">
              Conciergerie Velure
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-normal">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>En ligne • Réponse rapide</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-950/40"
      >
        {messages.length > 0 ? (
          messages.map((msg: MessageWithSender) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isMe={msg.expediteur.role === "CLIENT"}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-60">
            <div className="h-12 w-12 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center mb-4 text-slate-400">
              <User className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-200 mb-1">
              Votre espace de discussion
            </p>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Posez vos questions à notre conciergerie ci-dessous. Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 bg-slate-900/60 border-t border-slate-800/80 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Écrivez votre message..."
            className="grow h-11 bg-slate-950 border border-slate-800/80 rounded-lg px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition-all"
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || sending}
            className="h-11 px-4 bg-white text-slate-950 hover:bg-slate-200 font-medium rounded-lg text-xs tracking-wide transition-all shadow-sm flex items-center gap-2 shrink-0 disabled:opacity-40 disabled:hover:bg-white"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
            ) : (
              <>
                <span>Envoyer</span>
                <Send className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Échanges chiffrés et confidentiels</span>
        </div>
      </form>
    </div>
  );
}
