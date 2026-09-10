'use client'

import React from 'react'
import { useUIStore } from '@/store'
import { ToastContainer } from '../Toast'
import { ChatWindow } from '@/components/chat/ChatWindow/ChatWindow'

export function GlobalUI() {
  const { toasts, removeToast } = useUIStore()

  return (
    <>
      <ToastContainer 
        toasts={toasts.map(t => ({ ...t, message: t.title }))} 
        onClose={removeToast} 
      />
      <ChatWindow />
    </>
  )
}
