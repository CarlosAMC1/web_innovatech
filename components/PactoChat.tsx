"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    chatwootSettings?: Record<string, unknown>;
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
    $chatwoot?: { toggle: (state?: "open" | "close") => void };
  }
}

// El chat está activo por defecto; la configuración real llega de /api/pacto-config.
export const isPactoChatEnabled = true;

let started = false;

async function loadPacto() {
  if (started) return;
  started = true;
  try {
    const config = await fetch("/api/pacto-config").then((r) => r.json());
    if (!config.enabled || !config.url || !config.websiteToken) return;
    window.chatwootSettings = { position: "right", type: "expanded_bubble", launcherTitle: "Chatea con nosotros", locale: "es" };
    const script = document.createElement("script");
    script.src = `${config.url}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => window.chatwootSDK?.run({ websiteToken: config.websiteToken, baseUrl: config.url });
    document.body.appendChild(script);
  } catch (error) {
    console.error("No se pudo cargar el chat de Pacto:", error);
  }
}

// Widget de chat de Pacto (CRM basado en Chatwoot). La IA de Pacto responde si la bandeja
// "Sitio web" tiene asignado el bot de Pacto AI. Se carga cuando la página ya terminó de cargar.
export default function PactoChat() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const start = () => setTimeout(loadPacto, 1500);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [isAdmin]);

  return null;
}

// Abre el chat de Pacto si está cargado; si no, WhatsApp.
export function openChat(fallbackUrl: string) {
  if (window.$chatwoot) {
    window.$chatwoot.toggle("open");
  } else {
    window.open(fallbackUrl, "_blank", "noopener,noreferrer");
  }
}
