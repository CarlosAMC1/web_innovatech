"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

declare global {
  interface Window {
    chatwootSettings?: Record<string, unknown>;
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
    $chatwoot?: { toggle: (state?: "open" | "close") => void };
  }
}

export const isPactoChatEnabled = Boolean(site.pacto.url && site.pacto.websiteToken);

// Widget de chat de Pacto (CRM basado en Chatwoot). La IA de Pacto responde si la bandeja
// "Sitio web" tiene asignado el bot de Pacto AI. Se carga cuando la página ya terminó de cargar.
export default function PactoChat() {
  const pathname = usePathname();
  if (!isPactoChatEnabled || pathname.startsWith("/admin")) return null;

  return (
    <>
      <Script id="pacto-settings" strategy="lazyOnload">
        {`window.chatwootSettings = { position: "right", type: "expanded_bubble", launcherTitle: "Chatea con nosotros", locale: "es" };`}
      </Script>
      <Script
        src={`${site.pacto.url}/packs/js/sdk.js`}
        strategy="lazyOnload"
        onLoad={() => window.chatwootSDK?.run({ websiteToken: site.pacto.websiteToken, baseUrl: site.pacto.url })}
      />
    </>
  );
}

// Abre el chat de Pacto si está activo; si no, WhatsApp.
export function openChat(fallbackUrl: string) {
  if (isPactoChatEnabled && window.$chatwoot) {
    window.$chatwoot.toggle("open");
  } else {
    window.open(fallbackUrl, "_blank", "noopener,noreferrer");
  }
}
