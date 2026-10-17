import { site } from "@/lib/site";
import { escapeHtml } from "@/lib/notify";

export const RESPONSE_BUSINESS_DAYS = 15;

export function complaintCode(number: number, createdAt: Date) {
  return `LR-${createdAt.getFullYear()}-${String(number).padStart(6, "0")}`;
}

// Suma días hábiles (lunes a viernes). No descuenta feriados: revísalos al responder.
export function addBusinessDays(date: Date, days: number) {
  const d = new Date(date);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}

export const dateTimeFormat = new Intl.DateTimeFormat("es-PE", { dateStyle: "long", timeStyle: "short", timeZone: "America/Lima" });
export const dateFormat = new Intl.DateTimeFormat("es-PE", { dateStyle: "long", timeZone: "America/Lima" });

export type ComplaintRecord = {
  number: number;
  kind: string;
  name: string;
  documentType: string;
  documentNum: string;
  address: string;
  phone: string;
  email: string;
  guardian: string | null;
  itemType: string;
  amount: string | null;
  itemDetail: string;
  detail: string;
  request: string;
  createdAt: Date;
};

// Hoja de reclamación en HTML (para el correo de constancia al consumidor y al proveedor).
export function complaintEmailHtml(c: ComplaintRecord) {
  const row = (k: string, v: string | null | undefined) =>
    v ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b;vertical-align:top">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>` : "";
  const provider = site.legal;
  return `
  <div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;max-width:640px">
    <h2 style="margin:0 0 4px">Hoja de Reclamación ${complaintCode(c.number, c.createdAt)}</h2>
    <p style="margin:0 0 16px;color:#64748b">Fecha: ${dateTimeFormat.format(c.createdAt)}</p>
    <h3>Proveedor</h3>
    <table>${row("Razón social", provider.businessName || site.name)}${row("RUC", provider.ruc)}${row("Dirección", provider.address)}</table>
    <h3>Consumidor</h3>
    <table>${row("Nombre", c.name)}${row(c.documentType, c.documentNum)}${row("Domicilio", c.address)}${row("Teléfono", c.phone)}${row("Correo", c.email)}${row("Padre, madre o apoderado", c.guardian)}</table>
    <h3>Bien contratado</h3>
    <table>${row("Tipo", c.itemType === "producto" ? "Producto" : "Servicio")}${row("Monto reclamado", c.amount)}${row("Descripción", c.itemDetail)}</table>
    <h3>${c.kind === "reclamo" ? "Reclamo" : "Queja"}</h3>
    <table>${row("Detalle", c.detail)}${row("Pedido", c.request)}</table>
    <p style="margin-top:16px;color:#475569">El proveedor responderá en un plazo no mayor a ${RESPONSE_BUSINESS_DAYS} días hábiles improrrogables.
    La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</p>
  </div>`;
}
