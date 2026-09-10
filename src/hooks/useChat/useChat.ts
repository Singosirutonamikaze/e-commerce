'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getMessages, sendMessage } from '@/lib/actions/chat';
import { MessageWithSender } from '@/types/chat';

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMessages(conversationId);
      if (data) {
        setMessages(data as MessageWithSender[]);
      }
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;

    fetchMessages();

    // Configuration du Realtime Supabase
    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Message',
          filter: `conversationId=eq.${conversationId}`,
        },
        () => {
          // Note: Realtime payload doesn't include relations. 
          // We could fetch the sender or just refresh the list.
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, fetchMessages, supabase]);

  const sendNewMessage = async (content: string) => {
    try {
      const result = await sendMessage(conversationId, content);
      if (!result.success) {
        setError(result.error || 'Erreur lors de l\'envoi');
        return false;
      }
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message', err);
      return false;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage: sendNewMessage,
    refresh: fetchMessages,
  };
}
