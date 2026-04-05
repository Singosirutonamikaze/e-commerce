'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useChat } from '@/hooks/useChat/useChat';
import { ChatBubble } from '../ChatBubble/ChatBubble';
import { MessageWithSender } from '@/types/chat';

interface AdminChatProps {
  conversationId: string;
  customerName: string;
}

export function AdminChat({ conversationId, customerName }: AdminChatProps) {
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
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] bg-white rounded-[32px] border border-border shadow-sm overflow-hidden">
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
          <div className="flex-1 flex flex-col items-center justify-center text-text-hint gap-4 opacity-40">
             <User className="h-12 w-12" />
             <p className="text-sm font-bold uppercase tracking-widest">Aucun historique</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-6 bg-white border-t border-border flex items-center gap-4">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Répondre à ${customerName}...`} 
          className="flex-grow h-14 bg-surface-alt rounded-2xl border border-transparent focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 px-6 text-sm font-bold placeholder:text-text-hint outline-none transition-all"
        />
        <Button 
          type="submit" 
          disabled={!inputValue.trim() || sending}
          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95 disabled:grayscale"
        >
          {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Répondre'}
          <Send className="h-4 w-4 ml-3" />
        </Button>
      </form>
    </div>
  );
}
