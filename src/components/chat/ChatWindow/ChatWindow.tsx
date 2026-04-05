'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Sparkles, Minus } from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubble } from '../ChatBubble/ChatBubble';

interface LocalMessage {
  id: string;
  role: 'ADMIN' | 'USER';
  content: string;
  createdAt: Date;
}

export function ChatWindow() {
  const { isChatWindowOpen, closeChatWindow } = useUIStore();
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Simulate or fetch conversation
  useEffect(() => {
    if (!isChatWindowOpen) return;

    // Initial messages
    setMessages([
      { id: '1', role: 'ADMIN', content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", createdAt: new Date() }
    ]);

    // Real-time subscription placeholder
    const channel = supabase.channel('chat-support')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Message' }, (payload: any) => {
        const msg = payload.new;
        if (msg) {
          setMessages(prev => [...prev, {
            id: msg.id,
            role: 'ADMIN', // Support side
            content: msg.contenu || msg.content,
            createdAt: new Date(msg.createdAt)
          }]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isChatWindowOpen, supabase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: LocalMessage = {
      id: Math.random().toString(36).substring(7),
      role: 'USER',
      content: inputValue,
      createdAt: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate support reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        role: 'ADMIN',
        content: "Merci pour votre message. Un conseiller va vous répondre sous peu.",
        createdAt: new Date()
      }]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isChatWindowOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
          className="fixed bottom-6 right-6 z-[100] w-[400px] max-w-[calc(100vw-48px)] flex flex-col bg-surface shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-sm border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="bg-accent p-6 flex items-center justify-between text-white relative h-24 overflow-hidden">
             <div className="absolute top-0 right-0 h-24 w-24 bg-white/10 rounded-sm -translate-y-12 translate-x-12 blur-2xl"></div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-sm bg-white/10 flex items-center justify-center border border-white/20">
                   <MessageSquare className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                   <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg tracking-tighter uppercase">Support Velure</h3>
                      <div className="h-2 w-2 rounded-sm bg-success animate-pulse"></div>
                   </div>
                   <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">En ligne maintenant</p>
                </div>
             </div>
             <button onClick={closeChatWindow} className="h-10 w-10 flex items-center justify-center rounded-sm hover:bg-white/10 transition-all text-white/80 hover:text-white relative z-10">
                <Minus className="h-6 w-6" />
             </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 min-h-[350px] max-h-[450px] overflow-y-auto p-6 flex flex-col gap-5 bg-surface-alt/20 scrollbar-hide"
          >
             {messages.map((msg) => (
                <ChatBubble 
                  key={msg.id} 
                  message={{
                    id: msg.id,
                    contenu: msg.content,
                    createdAt: msg.createdAt,
                    expediteur: { 
                      role: msg.role,
                      prenom: msg.role === 'ADMIN' ? 'Support' : 'Vous'
                    }
                  }} 
                />
             ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-6 bg-white border-t border-border flex items-center gap-3">
             <div className="relative flex-grow">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Écrivez votre message..." 
                  className="w-full h-12 bg-surface-alt/50 rounded-sm border border-transparent focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 px-5 text-sm font-bold placeholder:text-text-hint outline-none transition-all"
                />
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-accent/30" />
             </div>
             <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="h-12 w-12 bg-accent text-white rounded-sm flex items-center justify-center shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 disabled:grayscale disabled:opacity-50 transition-all shrink-0"
              >
                <Send className="h-5 w-5" />
             </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
