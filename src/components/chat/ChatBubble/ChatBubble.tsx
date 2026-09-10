"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { CheckCheck } from "lucide-react";

interface ChatBubbleProps {
  message: {
    id: string;
    contenu: string;
    createdAt: Date | string;
    expediteur?: {
      role: string;
      prenom?: string;
    };
  };
  isMe?: boolean;
}

export function ChatBubble({ message, isMe: isMeProp }: Readonly<ChatBubbleProps>) {
  const isMe = isMeProp ?? (message.expediteur?.role === "ADMIN");

  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex flex-col max-w-[82%] sm:max-w-[72%]",
        isMe ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      {!isMe && message.expediteur?.prenom && (
        <span className="text-[11px] font-medium text-slate-400 mb-1 px-1">
          {message.expediteur.prenom}
        </span>
      )}
      <div
        className={cn(
          "px-4 py-2.5 text-sm leading-relaxed transition-all shadow-sm",
          isMe
            ? "bg-white text-slate-950 font-normal rounded-lg rounded-br-xs"
            : "bg-slate-900 border border-slate-800/90 text-slate-100 font-normal rounded-lg rounded-bl-xs"
        )}
      >
        {message.contenu}
      </div>
      <div className="flex items-center gap-1.5 mt-1 px-1">
        <span className="text-[10px] text-slate-500 font-normal">
          {formattedTime}
        </span>
        {isMe && <CheckCheck className="h-3 w-3 text-slate-400" />}
      </div>
    </div>
  );
}
