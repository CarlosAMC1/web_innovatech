// Envía eventos de la web a Pacto (CRM) mediante un Flow con disparador "webhook".
// En Pacto: Flows → nuevo flow → disparador Webhook → copia la URL en PACTO_LEADS_WEBHOOK_URL.
// Si el flow tiene bandeja y plantilla de teléfono ({{ webhook.phone }}), Pacto crea el contacto
// y la conversación; el resto del payload queda disponible como {{ webhook.* }}.

export type PactoEvent = {
  source: "contacto" | "cotizador" | "reclamo";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  summary: string; // texto listo para usar en una nota o mensaje del flow
  details?: Record<string, unknown>;
  page?: string;
};

export async function sendToPacto(event: PactoEvent) {
  const url = process.env.PACTO_LEADS_WEBHOOK_URL;
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...event, phone: normalizePhone(event.phone), sent_at: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("Error sending lead to Pacto:", res.status);
  } catch (error) {
    console.error("Error sending lead to Pacto:", error);
  }
}

// Deja solo dígitos y agrega el código de Perú a números locales de 9 dígitos.
export function normalizePhone(phone?: string) {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9 && digits.startsWith("9")) return `51${digits}`;
  return digits || undefined;
}
