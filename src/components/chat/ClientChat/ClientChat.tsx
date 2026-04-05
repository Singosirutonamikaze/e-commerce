'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useChat } from '@/hooks/useChat/useChat';
import { ChatBubble } from '../ChatBubble/ChatBubble';
import { MessageWithSender } from '@/types/chat';

interface ClientChatProps {
  conversationId: string;
}

export function ClientChat({ conversationId }: ClientChatProps) {
  const { messages, loading, sendMessage } = useChat(conversationId);
  const [inputValue, setInputValue] = useState('');
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
      setInputValue('');
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-20">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-sm border border-border shadow-2xl overflow-hidden">
      {/* Header Info */}
      <div className="px-8 py-6 bg-surface-alt/50 border-b border-border flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-accent text-white rounded-sm flex items-center justify-center font-bold">V</div>
            <div className="flex flex-col">
               <span className="text-sm font-bold text-text-primary uppercase tracking-tighter italic">Support Velure</span>
               <span className="text-[10px] font-bold text-success uppercase tracking-widest flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-sm bg-success animate-pulse"></div>
                  En ligne
               </span>
            </div>
         </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-surface-alt/10"
      >
        {messages.length > 0 ? (
          messages.map((msg: MessageWithSender) => (
            <ChatBubble key={msg.id} message={msg} />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-40">
             <div className="h-16 w-16 bg-surface rounded-sm flex items-center justify-center mb-6">
                <User className="h-8 w-8 text-text-hint" />
             </div>
             <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-hint mb-2">Début de conversation</p>
             <p className="text-sm font-medium text-text-muted max-w-xs">
                Posez vos questions à notre équipe support ci-dessous.
             </p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-8 bg-white border-t border-border">
        <div className="relative flex items-center gap-4 bg-surface-alt px-4 py-2 rounded-sm border border-transparent focus-within:border-accent focus-within:bg-white focus-within:ring-4 focus-within:ring-accent/5 transition-all">
           <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Écrivez votre message ici..." 
            className="flex-grow h-12 bg-transparent outline-none text-sm font-bold placeholder:text-text-hint/70"
           />
           <Button 
            type="submit" 
            disabled={!inputValue.trim() || sending}
            className="h-12 w-12 p-0 rounded-sm font-bold uppercase tracking-widest shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95 disabled:grayscale shrink-0"
           >
              {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
           </Button>
        </div>
        <p className="text-[10px] font-bold text-text-hint uppercase tracking-widest mt-4 text-center opacity-60">
           Protégé par le chiffrement Velure
        </p>
      </form>
    </div>
  );
}
