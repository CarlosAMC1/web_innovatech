import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Configuración del chat de Pacto leída al ejecutar (no al compilar): cambiar
// PACTO_URL o PACTO_WEBSITE_TOKEN en el servidor solo requiere reiniciar.
// Con PACTO_CHAT_DISABLED=1 se oculta el chat.
export const dynamic = "force-dynamic";

export function GET() {
  if (process.env.PACTO_CHAT_DISABLED === "1") {
    return NextResponse.json({ enabled: false });
  }
  return NextResponse.json(
    {
      enabled: true,
      url: (process.env.PACTO_URL || site.pacto.url).replace(/\/$/, ""),
      websiteToken: process.env.PACTO_WEBSITE_TOKEN || site.pacto.websiteToken,
    },
    { headers: { "Cache-Control": "public, max-age=300" } }
  );
}
