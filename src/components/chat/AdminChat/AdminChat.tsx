"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useChat } from "@/hooks/useChat/useChat";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { MessageWithSender } from "@/types/chat";

interface AdminChatProps {
  conversationId: string;
  customerName: string;
}

export function AdminChat({
  conversationId,
  customerName,
}: Readonly<AdminChatProps>) {
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
      <div className="flex-1 flex items-center justify-center min-h-100 bg-slate-950/60 rounded-lg border border-slate-800/80">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-125 bg-slate-950/80 backdrop-blur-xl rounded-lg border border-slate-800/80 shadow-sm overflow-hidden">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-950/40"
      >
        {messages.length > 0 ? (
          messages.map((msg: MessageWithSender) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isMe={msg.expediteur.role === "ADMIN"}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-3 opacity-60">
            <div className="h-12 w-12 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400">
              <User className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-300">
              Aucun historique de message
            </p>
            <p className="text-xs text-slate-500">
              Commencez la conversation avec {customerName}.
            </p>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 bg-slate-900/60 border-t border-slate-800/80 backdrop-blur-md flex items-center gap-3"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Répondre à ${customerName}...`}
          className="grow h-11 bg-slate-950 border border-slate-800/80 rounded-lg px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition-all"
        />
        <Button
          type="submit"
          disabled={!inputValue.trim() || sending}
          className="h-11 px-5 bg-white text-slate-950 hover:bg-slate-200 font-medium rounded-lg text-xs tracking-wide transition-all shadow-sm flex items-center gap-2 shrink-0 disabled:opacity-40 disabled:hover:bg-white"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
          ) : (
            <>
              <span>Répondre</span>
              <Send className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
