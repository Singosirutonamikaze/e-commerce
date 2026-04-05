'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'danger'

interface ToastProps {
  id: string
  message: string
  type?: ToastType
  onClose: (id: string) => void
  duration?: number
}

export function Toast({ id, message, type = 'info', onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success" />,
    error: <XCircle className="h-5 w-5 text-danger" />,
    danger: <XCircle className="h-5 w-5 text-danger" />,
    warning: <AlertCircle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-accent" />,
  }

  const bgColors = {
    success: 'bg-success-bg border-success/20',
    error: 'bg-danger-bg border-danger/20',
    danger: 'bg-danger-bg border-danger/20',
    warning: 'bg-warning-bg border-warning/20',
    info: 'bg-accent-light border-accent/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-md rounded-xl border shadow-lg backdrop-blur-md",
        bgColors[type]
      )}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="flex-grow text-sm font-medium text-text-primary">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-text-hint hover:text-text-primary transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function ToastContainer({ toasts, onClose }: { toasts: Omit<ToastProps, 'onClose'>[], onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}

