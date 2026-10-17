"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";

// Mensaje prellenado según la página en la que está la persona.
function messageFor(pathname: string) {
  if (pathname.startsWith("/crece")) return "Hola, quiero información sobre los planes de Innovatech Crece.";
  if (pathname.startsWith("/solutions")) return "Hola, quiero cotizar un proyecto de software con Innovatech.";
  return "Hola, quiero información sobre los servicios de Innovatech.";
}

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={whatsappLink(messageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 animate-fade-up"
      style={{ animationDelay: "1s", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <span className="hidden md:block px-4 py-2 rounded-xl bg-white text-slate-800 text-sm font-bold shadow-lg border border-slate-100 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        ¿Hablamos por WhatsApp?
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-xl shadow-green-900/25 group-hover:scale-105 transition-transform">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping [animation-iteration-count:3]" />
        <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true" className="relative">
          <path d="M16.003 3C8.832 3 3 8.832 3 16.003c0 2.29.6 4.528 1.74 6.5L3 29l6.66-1.716a12.95 12.95 0 0 0 6.34 1.62h.004C23.174 28.904 29 23.072 29 15.9 29 8.732 23.174 3 16.003 3Zm0 23.7h-.004a10.75 10.75 0 0 1-5.48-1.5l-.393-.233-3.953 1.018 1.056-3.853-.256-.396a10.72 10.72 0 0 1-1.644-5.733c0-5.934 4.83-10.763 10.77-10.763 5.934 0 10.762 4.83 10.762 10.763 0 5.935-4.83 10.697-10.858 10.697Zm5.903-8.06c-.323-.162-1.913-.944-2.21-1.052-.296-.108-.512-.162-.727.162-.216.323-.835 1.052-1.023 1.268-.189.216-.377.243-.7.081-.323-.162-1.365-.503-2.6-1.605-.96-.857-1.61-1.915-1.798-2.238-.189-.323-.02-.498.141-.659.146-.145.323-.377.485-.566.162-.189.216-.323.323-.539.108-.216.054-.404-.027-.566-.08-.162-.727-1.753-.996-2.4-.262-.63-.529-.545-.727-.555l-.62-.011a1.19 1.19 0 0 0-.862.404c-.296.323-1.131 1.105-1.131 2.695s1.158 3.126 1.32 3.342c.161.216 2.28 3.48 5.524 4.88.772.333 1.374.532 1.844.681.775.246 1.48.211 2.038.128.622-.093 1.913-.782 2.183-1.537.27-.755.27-1.402.189-1.537-.081-.135-.296-.216-.62-.377Z" />
        </svg>
      </span>
    </a>
  );
}
