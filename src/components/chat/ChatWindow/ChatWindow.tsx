"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Minus } from "lucide-react";
import { useUIStore } from "@/store";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { askConciergeBot } from "@/lib/actions/chat";
import Link from "next/link";

interface LocalMessage {
  id: string;
  role: "ADMIN" | "USER";
  content: string;
  createdAt: Date;
  actionLink?: string;
  suggestions?: string[];
}

interface MessageRow {
  id: string;
  contenu?: string | null;
  content?: string | null;
  createdAt: string;
}

const INITIAL_MESSAGE: LocalMessage = {
  id: "1",
  role: "ADMIN",
  content: "Bonjour. Bienvenue à la Conciergerie Velure. Comment pouvons-nous vous accompagner aujourd'hui ?",
  createdAt: new Date(),
  suggestions: ["Suivi de commande", "Délais de livraison", "Guide des tailles", "Modes de paiement"],
};

export function ChatWindow() {
  const { isChatWindowOpen, closeChatWindow } = useUIStore();
  const [messages, setMessages] = useState<LocalMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!isChatWindowOpen) return;

    const channel = supabase
      .channel("chat-support")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Message" },
        (payload: RealtimePostgresInsertPayload<MessageRow>) => {
          const msg = payload.new;
          if (msg) {
            setMessages((prev) => [
              ...prev,
              {
                id: msg.id,
                role: "ADMIN",
                content: msg.contenu || msg.content || "",
                createdAt: new Date(msg.createdAt),
              },
            ]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isChatWindowOpen, supabase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMessage: LocalMessage = {
      id: crypto.randomUUID(),
      role: "USER",
      content: queryText,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const { botReply } = await askConciergeBot(queryText);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "ADMIN",
            content: botReply.message,
            createdAt: new Date(),
            actionLink: botReply.actionLink,
            suggestions: botReply.suggestions,
          },
        ]);
        setIsTyping(false);
      }, 600);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "ADMIN",
            content:
              "Votre message a été transmis à la Conciergerie. Un conseiller va vous répondre sous peu.",
            createdAt: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 600);
    }
  };

  const handleSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendQuery(inputValue);
  };

  const latestSuggestions = messages[messages.length - 1]?.suggestions;

  return (
    <AnimatePresence>
      {isChatWindowOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex w-96 max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-lg border border-slate-800/90 bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-black/80"
        >
          {/* En-tête */}
          <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-3.5 flex items-center justify-between text-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
                V
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm text-slate-100 tracking-tight">
                  Conciergerie Velure
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>En ligne • Assistant direct</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              title="Fermer le chat"
              onClick={closeChatWindow}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex flex-1 min-h-75 max-h-100 flex-col gap-3.5 overflow-y-auto bg-slate-950/50 p-4"
          >
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col gap-1.5">
                <ChatBubble
                  isMe={msg.role === "USER"}
                  message={{
                    id: msg.id,
                    contenu: msg.content,
                    createdAt: msg.createdAt,
                    expediteur: {
                      role: msg.role,
                      prenom: msg.role === "ADMIN" ? "Conciergerie" : "Vous",
                    },
                  }}
                />
                {msg.actionLink && (
                  <div className="ml-10">
                    <Link
                      href={msg.actionLink}
                      onClick={closeChatWindow}
                      className="inline-flex items-center text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                    >
                      Accéder à la rubrique dédiée →
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 italic ml-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1">La conciergerie vous répond...</span>
              </div>
            )}
          </div>

          {/* Suggestions rapides */}
          {latestSuggestions && latestSuggestions.length > 0 && (
            <div className="px-3 py-2 bg-slate-900/40 border-t border-slate-800/50 flex flex-wrap gap-1.5">
              {latestSuggestions.slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendQuery(suggestion)}
                  className="text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition-colors border border-slate-700/50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Formulaire de saisie */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-900/70 border-t border-slate-800/80 backdrop-blur-md flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Écrivez votre message..."
              className="grow h-10 bg-slate-950 border border-slate-800/80 rounded-lg px-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600 transition-all"
            />
            <button
              type="submit"
              title="Envoyer le message"
              disabled={!inputValue.trim()}
              className="h-10 w-10 bg-white text-slate-950 hover:bg-slate-200 rounded-lg flex items-center justify-center shadow-sm disabled:opacity-40 disabled:hover:bg-white transition-all shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
