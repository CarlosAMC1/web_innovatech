// Tipos de evento que registra la web (compartido entre navegador, API y panel).
export const EVENT_TYPES = [
  "pageview",
  "chat_open", // abrió el chat de Pacto
  "chat_start", // escribió su primer mensaje en el chat
  "whatsapp_click",
  "book_call", // clic en "Agendar llamada"
  "cta_cotizar", // clic en un botón que lleva al cotizador
  "quote_step", // avanzó un paso del cotizador
  "quote_submit",
  "contact_submit",
  "complaint_submit",
  "calculator_use", // movió la calculadora de Crece
  "contact_click", // clic en teléfono o correo
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_LABELS: Record<EventType, string> = {
  pageview: "Páginas vistas",
  chat_open: "Abrieron el chat",
  chat_start: "Escribieron en el chat",
  whatsapp_click: "Clics en WhatsApp",
  book_call: "Clics en agendar llamada",
  cta_cotizar: "Clics en cotizar",
  quote_step: "Pasos del cotizador",
  quote_submit: "Cotizaciones enviadas",
  contact_submit: "Formularios de contacto",
  complaint_submit: "Reclamos registrados",
  calculator_use: "Usaron la calculadora Crece",
  contact_click: "Clics en teléfono o correo",
};

// Datos de atribución que el navegador guarda al inicio de cada sesión.
export type Attribution = {
  visitorId: string;
  sessionId: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};
