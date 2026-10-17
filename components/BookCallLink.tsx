import { CalendarClock } from "lucide-react";
import { bookingLink } from "@/lib/site";

// Botón para agendar una llamada de 15 minutos (enlace de agenda o WhatsApp si no hay).
export default function BookCallLink({ className = "", label = "Agendar llamada de 15 min" }: { className?: string; label?: string }) {
  return (
    <a
      href={bookingLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${className}`}
    >
      <CalendarClock className="w-4 h-4" /> {label}
    </a>
  );
}
