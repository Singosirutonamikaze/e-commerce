'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'
import { CheckCheck } from 'lucide-react'

interface ChatBubbleProps {
  message: {
    id: string
    contenu: string
    createdAt: Date | string
    expediteur: {
      role: string
      prenom?: string
    }
  }
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isMe = message.expediteur.role === 'ADMIN' // Simplified logic for admin chat view

  return (
    <div 
      className={cn(
        "flex flex-col max-w-[75%] md:max-w-[70%]",
        isMe ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      <div className={cn(
        "px-5 py-3 rounded-[24px] text-sm font-medium shadow-sm transition-all",
        isMe 
          ? "bg-accent text-white rounded-tr-none" 
          : "bg-white text-text-primary border border-border rounded-tl-none hover:bg-surface-alt/10"
      )}>
        {message.contenu}
      </div>
      <div className="flex items-center gap-1.5 mt-2 px-1">
        <span className="text-[9px] font-black uppercase text-text-hint tracking-widest">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {isMe && <CheckCheck className="h-3 w-3 text-accent" />}
      </div>
    </div>
  )
}
