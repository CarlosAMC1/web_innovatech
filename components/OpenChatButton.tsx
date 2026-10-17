"use client";

import { MessagesSquare } from "lucide-react";
import { openChat } from "@/components/PactoChat";
import { whatsappLink } from "@/lib/site";

// Botón "Prueba Pacto AI": abre el chat de la web (o WhatsApp si el chat no está activo).
export default function OpenChatButton({ className = "", label = "Probar Pacto AI ahora" }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => openChat(whatsappLink("Hola, quiero ver una demo de Pacto."))}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${className}`}
    >
      <MessagesSquare className="w-4 h-4" /> {label}
    </button>
  );
}
